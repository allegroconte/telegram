import pg from "pg";
import { KTRON_CATALOG, buildSystemPrompt, type KtronProduct } from "./catalog.js";
import { logger } from "../lib/logger.js";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({ connectionString: process.env["DATABASE_URL"] });
  }
  return pool;
}

export async function seedProducts(): Promise<void> {
  const p = getPool();
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS ktron_products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        category VARCHAR(200) NOT NULL,
        subcategory VARCHAR(200),
        description TEXT,
        compressive_strength VARCHAR(200),
        compressive_strength_time VARCHAR(200),
        waterproofing VARCHAR(100),
        frost_resistance VARCHAR(100),
        bond_strength VARCHAR(200),
        bond_strength_time VARCHAR(200),
        flexural_strength VARCHAR(200),
        flexural_strength_time VARCHAR(200),
        application_temperature VARCHAR(200),
        workability_grade VARCHAR(100),
        aggregate_fraction VARCHAR(200),
        notes TEXT,
        analogues_json TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        chat_id BIGINT PRIMARY KEY,
        authenticated BOOLEAN DEFAULT FALSE,
        authenticated_at TIMESTAMP
      )
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS catalog_documents (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(500),
        file_id VARCHAR(500),
        uploaded_by BIGINT,
        content_summary TEXT,
        processed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS extra_knowledge (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        source VARCHAR(500),
        added_by BIGINT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    for (const product of KTRON_CATALOG) {
      await p.query(
        `INSERT INTO ktron_products (
          id, name, category, subcategory, description,
          compressive_strength, compressive_strength_time,
          waterproofing, frost_resistance,
          bond_strength, bond_strength_time,
          flexural_strength, flexural_strength_time,
          application_temperature, workability_grade, aggregate_fraction,
          notes, analogues_json, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,NOW())
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          subcategory = EXCLUDED.subcategory,
          description = EXCLUDED.description,
          compressive_strength = EXCLUDED.compressive_strength,
          compressive_strength_time = EXCLUDED.compressive_strength_time,
          waterproofing = EXCLUDED.waterproofing,
          frost_resistance = EXCLUDED.frost_resistance,
          bond_strength = EXCLUDED.bond_strength,
          bond_strength_time = EXCLUDED.bond_strength_time,
          flexural_strength = EXCLUDED.flexural_strength,
          flexural_strength_time = EXCLUDED.flexural_strength_time,
          application_temperature = EXCLUDED.application_temperature,
          workability_grade = EXCLUDED.workability_grade,
          aggregate_fraction = EXCLUDED.aggregate_fraction,
          notes = EXCLUDED.notes,
          analogues_json = EXCLUDED.analogues_json,
          updated_at = NOW()`,
        [
          product.id,
          product.name,
          product.category,
          product.subcategory,
          product.description,
          product.specs.compressiveStrength ?? null,
          product.specs.compressiveStrengthTime ?? null,
          product.specs.waterproofing ?? null,
          product.specs.frostResistance ?? null,
          product.specs.bondStrength ?? null,
          product.specs.bondStrengthTime ?? null,
          product.specs.flexuralStrength ?? null,
          product.specs.flexuralStrengthTime ?? null,
          product.specs.applicationTemperature ?? null,
          product.specs.workabilityGrade ?? null,
          product.specs.aggregateFraction ?? null,
          product.specs.notes ?? null,
          JSON.stringify(product.analogues),
        ]
      );
    }

    logger.info({ count: KTRON_CATALOG.length }, "Product catalog seeded to database");
  } catch (err) {
    logger.error({ err }, "Failed to seed products to database");
  }
}

export async function getProductById(id: string): Promise<KtronProduct | null> {
  const p = getPool();
  const res = await p.query("SELECT * FROM ktron_products WHERE id = $1", [id]);
  if (res.rows.length === 0) return null;
  return rowToProduct(res.rows[0]);
}

export async function getAllProducts(): Promise<KtronProduct[]> {
  const p = getPool();
  const res = await p.query("SELECT * FROM ktron_products ORDER BY category, subcategory, name");
  return res.rows.map(rowToProduct);
}

function rowToProduct(row: Record<string, unknown>): KtronProduct {
  return {
    id: row["id"] as string,
    name: row["name"] as string,
    category: row["category"] as string,
    subcategory: (row["subcategory"] as string) ?? "",
    description: (row["description"] as string) ?? "",
    specs: {
      compressiveStrength: (row["compressive_strength"] as string) ?? undefined,
      compressiveStrengthTime: (row["compressive_strength_time"] as string) ?? undefined,
      waterproofing: (row["waterproofing"] as string) ?? undefined,
      frostResistance: (row["frost_resistance"] as string) ?? undefined,
      bondStrength: (row["bond_strength"] as string) ?? undefined,
      bondStrengthTime: (row["bond_strength_time"] as string) ?? undefined,
      flexuralStrength: (row["flexural_strength"] as string) ?? undefined,
      flexuralStrengthTime: (row["flexural_strength_time"] as string) ?? undefined,
      applicationTemperature: (row["application_temperature"] as string) ?? undefined,
      workabilityGrade: (row["workability_grade"] as string) ?? undefined,
      aggregateFraction: (row["aggregate_fraction"] as string) ?? undefined,
      notes: (row["notes"] as string) ?? undefined,
    },
    analogues: JSON.parse((row["analogues_json"] as string) ?? "{}"),
  };
}

export async function saveExtraKnowledge(content: string, source: string, addedBy: number): Promise<void> {
  const p = getPool();
  await p.query(
    "INSERT INTO extra_knowledge (content, source, added_by) VALUES ($1, $2, $3)",
    [content, source, addedBy]
  );
}

export async function getExtraKnowledge(): Promise<string> {
  const p = getPool();
  const res = await p.query("SELECT content, source FROM extra_knowledge ORDER BY created_at DESC LIMIT 10");
  if (res.rows.length === 0) return "";
  return res.rows.map((r: Record<string, unknown>) => `[${r["source"] ?? "Без источника"}]: ${r["content"]}`).join("\n\n");
}

export async function saveCatalogDocument(
  filename: string,
  fileId: string,
  uploadedBy: number,
  contentSummary: string
): Promise<void> {
  const p = getPool();
  await p.query(
    "INSERT INTO catalog_documents (filename, file_id, uploaded_by, content_summary, processed) VALUES ($1,$2,$3,$4,true)",
    [filename, fileId, uploadedBy, contentSummary]
  );
}

export async function getSystemPromptFromDb(): Promise<string> {
  const extra = await getExtraKnowledge();
  return buildSystemPrompt(extra || undefined);
}

export async function updateProductSpecs(
  productId: string,
  updates: Partial<Record<string, string>>
): Promise<boolean> {
  const p = getPool();
  const fieldMap: Record<string, string> = {
    compressiveStrength: "compressive_strength",
    compressiveStrengthTime: "compressive_strength_time",
    waterproofing: "waterproofing",
    frostResistance: "frost_resistance",
    bondStrength: "bond_strength",
    bondStrengthTime: "bond_strength_time",
    flexuralStrength: "flexural_strength",
    flexuralStrengthTime: "flexural_strength_time",
    applicationTemperature: "application_temperature",
    workabilityGrade: "workability_grade",
    notes: "notes",
  };

  const setClauses: string[] = [];
  const values: string[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(updates)) {
    const col = fieldMap[key];
    if (col && value) {
      setClauses.push(`${col} = $${idx}`);
      values.push(value);
      idx++;
    }
  }

  if (setClauses.length === 0) return false;
  values.push(productId);

  await p.query(
    `UPDATE ktron_products SET ${setClauses.join(", ")}, updated_at = NOW() WHERE id = $${idx}`,
    values
  );
  return true;
}
