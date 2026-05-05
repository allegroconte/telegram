export interface TechSpecs {
  compressiveStrength?: string;
  compressiveStrengthTime?: string;
  waterproofing?: string;
  frostResistance?: string;
  bondStrength?: string;
  bondStrengthTime?: string;
  flexuralStrength?: string;
  flexuralStrengthTime?: string;
  applicationTemperature?: string;
  workabilityGrade?: string;
  aggregateFraction?: string;
  notes?: string;
}

export interface KtronProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  specs: TechSpecs;
  analogues: {
    basf?: string[];
    sika?: string[];
    mapei?: string[];
    penetron?: string[];
  };
}

export const KTRON_CATALOG: KtronProduct[] = [
  // ─── РЕМОНТ БЕТОНА — Конструкционный ремонт — Тиксотропные ───────────────
  {
    id: "ktron-3-t400",
    name: "КТтрон-3, КТтрон-3 Т400",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Тиксотропные материалы",
    description: "Тиксотропный ремонтный состав класса R3. Нанесение вручную на горизонтальные, вертикальные и потолочные поверхности. Конструкционный ремонт бетона при толщине слоя 5–60 мм.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W10",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥3.5 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco S 5300", "MasterEmaco N 5200", "MasterEmaco S110 TIX", "MasterEmaco N 310"],
      mapei: ["Mapegrout 430"],
    },
  },
  {
    id: "ktron-3-t500",
    name: "КТтрон-3 Т500",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Тиксотропные материалы",
    description: "Высокопрочный тиксотропный ремонтный состав класса R4. Конструкционный ремонт нагруженных железобетонных конструкций при толщине слоя 5–60 мм.",
    specs: {
      compressiveStrength: "≥60 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W12",
      frostResistance: "F300",
      bondStrength: "≥2.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥5.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco S 5400", "MasterEmaco S 488"],
      sika: ["Sika MonoTop-312N"],
      mapei: ["Mapegrout Thixotropic", "MAPEGROUT T40"],
      penetron: ["Скрепа М500"],
    },
  },
  {
    id: "ktron-4-t600",
    name: "КТтрон-4 Т600",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Тиксотропные материалы",
    description: "Высокопрочный тиксотропный ремонтный состав класса R4. Ремонт мостов, опор, промышленных конструкций с высокими требованиями к прочности.",
    specs: {
      compressiveStrength: "≥65 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥2.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥6.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      sika: ["Sika MonoTop-412N"],
      penetron: ["Скрепа М700"],
    },
  },
  {
    id: "ktron-9-t700",
    name: "КТтрон-9 Т700",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Тиксотропные материалы",
    description: "Особо высокопрочный тиксотропный ремонтный состав класса R4.",
    specs: {
      compressiveStrength: "≥70 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥2.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥7.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–2.5 мм",
    },
    analogues: {},
  },
  // ─── РЕМОНТ БЕТОНА — Конструкционный ремонт — Литьевые ───────────────────
  {
    id: "ktron-3-l400",
    name: "КТтрон-3 Л400",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Литьевые материалы",
    description: "Литьевой ремонтный состав класса R3 для заливки в опалубку. Ремонт горизонтальных поверхностей, балок, перекрытий толщиной 10–100 мм.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W10",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥3.5 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco S105 PG"],
      sika: ["Sika MonoTop-336 N"],
    },
  },
  {
    id: "ktron-3-l505",
    name: "КТтрон-3 Л505",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Литьевые материалы",
    description: "Сульфатостойкий литьевой ремонтный состав класса R3 для эксплуатации в агрессивных средах. Ремонт конструкций, подверженных воздействию сульфатов.",
    specs: {
      compressiveStrength: "≥50 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥4.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–4 мм",
      notes: "Сульфатостойкий; агрессивные среды",
    },
    analogues: {
      sika: ["Sika MonoTop-336 S"],
    },
  },
  {
    id: "ktron-3-l600",
    name: "КТтрон-3 Л600",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Литьевые материалы",
    description: "Высокопрочный литьевой ремонтный состав класса R3. Ремонт горизонтальных поверхностей, балок, фундаментов толщиной 10–100 мм.",
    specs: {
      compressiveStrength: "≥50 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥2.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥5.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco S 488 PG"],
      sika: ["Sika Monotop 332N"],
      mapei: ["Mapegrout Hi-Flow"],
      penetron: ["Скрепа Самонивелир"],
    },
  },
  {
    id: "ktron-4-l600",
    name: "КТтрон-4 Л600",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Литьевые материалы",
    description: "Высокопрочный литьевой ремонтный состав класса R4. Конструкционный ремонт особо нагруженных конструкций мостов, путепроводов, промышленных объектов.",
    specs: {
      compressiveStrength: "≥80 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥3.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥7.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco S 488 PG"],
      penetron: ["Скрепа Самонивелир"],
    },
  },
  // ─── РЕМОНТ БЕТОНА — Зимние составы ──────────────────────────────────────
  {
    id: "ktron-tx60",
    name: "КТтрон-ТХ60",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Ускоренный набор прочности при отрицательных температурах",
    description: "Быстротвердеющий тиксотропный ремонтный состав класса R4 для работы при отрицательных температурах до −10 °C. Зимний ремонт вертикальных и потолочных конструкций.",
    specs: {
      compressiveStrength: "≥60 МПа",
      compressiveStrengthTime: "28 суток; ≥25 МПа через 24 ч",
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥2.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥5.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "−10°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco T 1100 TIX"],
      sika: ["Sika MonoTop-312 Winter"],
      mapei: ["Mapegrout Fast-Set R4"],
      penetron: ["Скрепа Зимняя"],
    },
  },
  {
    id: "ktron-nx60",
    name: "КТтрон-НХ60, КТтрон-НХ60 М",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Ускоренный набор прочности при отрицательных температурах",
    description: "Быстротвердеющий литьевой ремонтный состав класса R4 для работы при отрицательных температурах до −10 °C. Зимний ремонт горизонтальных поверхностей.",
    specs: {
      compressiveStrength: "≥60 МПа",
      compressiveStrengthTime: "28 суток; ≥25 МПа через 24 ч",
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥2.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥5.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "−10°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–4 мм",
    },
    analogues: {
      basf: ["MasterEmaco T 1200 PG"],
      sika: ["Sika MonoTop-336 Winter", "Sika FastFix-136 TT"],
    },
  },
  // ─── РЕМОНТ БЕТОНА — Металлическая фибра ─────────────────────────────────
  {
    id: "ktron-4-mf",
    name: "КТтрон-4 МФ",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Составы с металлической фиброй",
    description: "Тиксотропный ремонтный состав класса R4 с металлической фиброй. Повышенная ударная вязкость и стойкость к динамическим нагрузкам. Промышленные полы, пирсы, доки.",
    specs: {
      compressiveStrength: "≥60 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥2.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥7.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм + металлическая фибра",
    },
    analogues: {
      basf: ["MasterEmaco S 540 FR", "MasterEmaco S 550 FR"],
      mapei: ["Mapegrout SF"],
    },
  },
  {
    id: "ktron-mx80",
    name: "КТтрон-МХ80",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Составы с металлической фиброй",
    description: "Особо высокопрочный ремонтный состав с металлической фиброй. Ремонт высоконагруженных конструкций, подверженных ударам и вибрации.",
    specs: {
      compressiveStrength: "≥80 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W18",
      frostResistance: "F300",
      bondStrength: "≥3.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥9.0 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм + металлическая фибра",
    },
    analogues: {
      basf: ["MasterEmaco T 1400 PG"],
      mapei: ["Mapegrout SV-R Fiber"],
    },
  },
  // ─── РЕМОНТ БЕТОНА — Специальные ─────────────────────────────────────────
  {
    id: "ktron-3-t505",
    name: "КТтрон-3 Т505",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Сульфатостойкость",
    description: "Сульфатостойкий тиксотропный ремонтный состав для агрессивных сред. Очистные сооружения, морские сооружения, химические предприятия.",
    specs: {
      compressiveStrength: "≥50 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥2.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥4.5 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–4 мм",
      notes: "Сульфатостойкий",
    },
    analogues: {
      sika: ["Sika Repair-13F"],
    },
  },
  {
    id: "ktron-wx-30t",
    name: "КТтрон-WX-30T",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Гидроизолирующие ремонтные составы",
    description: "Тиксотропный гидроизолирующий ремонтный состав. Ремонт вертикальных и потолочных поверхностей с одновременной гидроизоляцией. Резервуары, подвалы, тоннели.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W10",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥3.5 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–2.5 мм",
      notes: "Тиксотропный; гидроизолирующий",
    },
    analogues: {
      basf: ["MasterSeal 550"],
      sika: ["SikaTop-122 FA"],
    },
  },
  {
    id: "ktron-wx-32t",
    name: "КТтрон-WX-32T шовный",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Гидроизолирующие ремонтные составы",
    description: "Тиксотропный гидроизолирующий состав для ремонта и гидроизоляции швов и трещин. Рабочие швы бетонирования, деформационные швы, трещины в резервуарах.",
    specs: {
      compressiveStrength: "≥32 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W12",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–1.25 мм",
      notes: "Для швов и трещин; тиксотропный",
    },
    analogues: {
      basf: ["MasterSeal 560"],
      sika: ["SikaTop Seal-107"],
    },
  },
  {
    id: "ktron-wx-30n",
    name: "КТтрон-WX-30N",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Для подводного нанесения",
    description: "Ремонтный состав для нанесения под водой. Ремонт гидротехнических сооружений, причалов, водозаборов без осушения конструкции.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W8",
      frostResistance: "F150",
      bondStrength: "≥1.0 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–2.5 мм",
      notes: "Нанесение под водой",
    },
    analogues: {
      sika: ["Sika UW Compound-100"],
    },
  },
  {
    id: "ktron-primer",
    name: "КТтрон-праймер",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Для защиты арматуры",
    description: "Антикоррозионный цементно-полимерный состав для защиты стальной арматуры перед нанесением ремонтных смесей. Обязателен при ремонте с оголением арматуры.",
    specs: {
      bondStrength: "≥1.0 МПа",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Антикоррозионный праймер для арматуры; прочностные характеристики не нормируются",
    },
    analogues: {
      basf: ["MasterEmaco 5000 AP"],
      sika: ["Sika MonoTop-910 N"],
      mapei: ["Mapefer 1K"],
    },
  },
  {
    id: "ktron-torkret-s",
    name: "КТтрон-торкрет С",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Торкретирование",
    description: "Сухая смесь для торкрет-нанесения при ремонте бетонных конструкций. Большие площади, труднодоступные поверхности, тоннели.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W8",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–5 мм",
      notes: "Торкрет-нанесение (сухой способ)",
    },
    analogues: {
      basf: ["MasterRoc STS 115", "MasterEmaco S 315 SP"],
      sika: ["Sikacrete-02 Gunit", "Sika Gunit-03 Normal", "Sikacrete-04 Gunit"],
      mapei: ["Mapegrout Gunite 300 AF"],
    },
  },
  {
    id: "ktron-torkret-s-sulf",
    name: "КТтрон-торкрет С сульфатостойкий",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Торкретирование",
    description: "Сульфатостойкая смесь для торкрет-нанесения в агрессивных средах. Очистные сооружения, морские объекты, тоннели в агрессивных грунтах.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W10",
      frostResistance: "F300",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–5 мм",
      notes: "Торкрет-нанесение; сульфатостойкий",
    },
    analogues: {
      sika: ["Sikacrete-02 Gunit SR"],
    },
  },
  {
    id: "ktron-torkret-m",
    name: "КТтрон-торкрет М",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Торкретирование",
    description: "Мелкозернистая смесь для торкрет-нанесения. Тонкостенные конструкции, ремонт с густым армированием.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W8",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–2.5 мм",
      notes: "Торкрет-нанесение; мелкозернистый",
    },
    analogues: {
      sika: ["Sikacrete-08 Gunit"],
    },
  },
  {
    id: "ktron-torkret-ssh",
    name: "КТтрон-торкрет СШ",
    category: "Ремонт бетона",
    subcategory: "Конструкционный ремонт — Торкретирование",
    description: "Шовный торкретный состав с ускоренным схватыванием. Срочный ремонт, остановка водопритоков при торкретировании.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W8",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–2.5 мм",
      notes: "Ускоренное схватывание; торкрет",
    },
    analogues: {},
  },
  // ─── РЕМОНТ БЕТОНА — Неконструкционный ───────────────────────────────────
  {
    id: "ktron-6-base",
    name: "КТтрон-6",
    category: "Ремонт бетона",
    subcategory: "Неконструкционный ремонт",
    description: "Ремонтный состав класса R2 для выравнивания поверхностей бетона. Заполнение раковин, пустот, косметический ремонт. Толщина слоя 3–30 мм.",
    specs: {
      compressiveStrength: "≥20 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W10",
      frostResistance: "F100",
      bondStrength: "≥1.0 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–2.5 мм",
    },
    analogues: {
      basf: ["MasterEmaco N 400"],
      mapei: ["Planitop Rapid 300"],
    },
  },
  {
    id: "ktron-6-finish",
    name: "КТтрон-6 финишный",
    category: "Ремонт бетона",
    subcategory: "Неконструкционный ремонт",
    description: "Финишный ремонтный состав класса R2 для выравнивания и косметического ремонта. Тонкий слой 1–10 мм, высокое качество поверхности.",
    specs: {
      compressiveStrength: "≥40 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W12",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–1.25 мм",
    },
    analogues: {
      basf: ["MasterEmaco N 900", "MasterEmaco N 310"],
      mapei: ["Planitop Ремонт & Финиш"],
    },
  },
  {
    id: "ktron-rx61",
    name: "КТтрон-РХ61",
    category: "Ремонт бетона",
    subcategory: "Неконструкционный ремонт",
    description: "Ремонтный состав класса R2 для косметического ремонта поверхности бетона. Тонкослойное выравнивание, шпатлёвка по бетону. Слой 1–10 мм.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W6",
      frostResistance: "F100",
      bondStrength: "≥1.0 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–1.25 мм",
    },
    analogues: {
      basf: ["MasterEmaco N 5100"],
      sika: ["Sika MonoTop-723 N"],
      mapei: ["Monofinish"],
      penetron: ["Скрепа Финишная"],
    },
  },
  {
    id: "ktron-rx62",
    name: "КТтрон-РХ62",
    category: "Ремонт бетона",
    subcategory: "Неконструкционный ремонт",
    description: "Ремонтный состав класса R2 для косметического ремонта и защитного выравнивания бетонных поверхностей. Улучшенные характеристики адгезии и атмосферостойкости.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W8",
      frostResistance: "F150",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П3",
      aggregateFraction: "0–1.25 мм",
      notes: "Повышенная адгезия; атмосферостойкий",
    },
    analogues: {
      basf: ["MasterEmaco N 5200 R"],
      mapei: ["Monofinish Extra"],
    },
  },
  // ─── ГИДРОИЗОЛЯЦИЯ ────────────────────────────────────────────────────────
  {
    id: "ktron-1",
    name: "КТтрон-1",
    category: "Гидроизоляция",
    subcategory: "Проникающая гидроизоляция",
    description: "Проникающая (кристаллизующаяся) гидроизоляция для бетона. Наносится на влажный бетон, кристаллы заполняют капилляры и трещины изнутри. Фундаменты, подвалы, тоннели, резервуары, бассейны.",
    specs: {
      waterproofing: "W20 (обработанного бетона)",
      frostResistance: "F300 (обработанного бетона)",
      bondStrength: "≥1.5 МПа",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "дисперсный порошок",
      notes: "Проникает в бетон на глубину до 400 мм",
    },
    analogues: {
      basf: ["MasterSeal 501"],
      sika: ["SikaSeal-210"],
      penetron: ["Пенетрон"],
    },
  },
  {
    id: "ktron-11",
    name: "КТтрон-11",
    category: "Гидроизоляция",
    subcategory: "Проникающая гидроизоляция",
    description: "Проникающая (кристаллизующаяся) гидроизоляция для обработки швов, трещин и примыканий. Применяется совместно с КТтрон-1 для заполнения трещин и стыков до 0,4 мм шириной.",
    specs: {
      waterproofing: "W16 (обработанного бетона)",
      frostResistance: "F300 (обработанного бетона)",
      bondStrength: "≥1.5 МПа",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.63 мм",
      notes: "Для швов и трещин; кристаллизующийся",
    },
    analogues: {
      basf: ["MasterSeal 581"],
      penetron: ["Пенекрит"],
    },
  },
  {
    id: "ktron-7",
    name: "КТтрон-7",
    category: "Гидроизоляция",
    subcategory: "Обмазочная гидроизоляция",
    description: "Цементная обмазочная гидроизоляция для бетонных и кирпичных конструкций. Фундаменты, подвалы, резервуары, бассейны.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W12",
      frostResistance: "F200",
      bondStrength: "≥1.0 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.63 мм",
    },
    analogues: {
      basf: ["MasterSeal 531"],
      sika: ["Sika 101A", "Sika Seal-172"],
    },
  },
  {
    id: "ktron-71",
    name: "КТтрон-71",
    category: "Гидроизоляция",
    subcategory: "Обмазочная гидроизоляция",
    description: "Полимерцементная обмазочная гидроизоляция повышенной водостойкости. Бассейны, резервуары для питьевой воды, влажные помещения. Может контактировать с питьевой водой.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥1.0 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.63 мм",
      notes: "Контакт с питьевой водой — разрешён",
    },
    analogues: {
      basf: ["MasterSeal 550"],
      sika: ["SikaTop-209 N", "SikaTop-107 Seal"],
      penetron: ["Пенетрон Адмикс (поверхностно)"],
    },
  },
  {
    id: "ktron-10-1k",
    name: "КТтрон-10 1К",
    category: "Гидроизоляция",
    subcategory: "Эластичная гидроизоляция",
    description: "Однокомпонентная эластичная полимерцементная гидроизоляция. Кровля, балконы, террасы, влажные помещения. Перекрывает динамические трещины до 0.3 мм.",
    specs: {
      waterproofing: "W12",
      frostResistance: "F200",
      bondStrength: "≥0.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.315 мм",
      notes: "Относительное удлинение ≥50%",
    },
    analogues: {
      basf: ["MasterSeal 6100 FX"],
    },
  },
  {
    id: "ktron-10-2k",
    name: "КТтрон-10 2К",
    category: "Гидроизоляция",
    subcategory: "Эластичная гидроизоляция",
    description: "Двухкомпонентная эластичная полимерцементная гидроизоляция. Кровля, балконы, бассейны, подземные конструкции. Перекрывает трещины до 0.5 мм.",
    specs: {
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥0.8 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.315 мм",
      notes: "Относительное удлинение ≥100%",
    },
    analogues: {
      basf: ["MasterSeal 525", "MasterSeal 588"],
      sika: ["Sikalastic-152"],
      mapei: ["Mapelastic"],
    },
  },
  {
    id: "ktron-122-flex",
    name: "КТтрон-122 флекс",
    category: "Гидроизоляция",
    subcategory: "Эластичная гидроизоляция",
    description: "Высокоэластичная однокомпонентная гидроизоляционная мастика. Кровельные поверхности, сложные узлы примыканий, деформационные швы. Относительное удлинение до 200%.",
    specs: {
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥0.8 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Относительное удлинение ≥200%; кровельная гидроизоляция",
    },
    analogues: {
      sika: ["Sikalastic-560"],
      mapei: ["Mapelastic Foundation"],
    },
  },
  // ─── ГИДРОИЗОЛЯЦИЯ — Быстротвердеющие / гидропломбы ─────────────────────
  {
    id: "ktron-2",
    name: "КТтрон-2",
    category: "Гидроизоляция",
    subcategory: "Быстротвердеющие составы — Гидропломбы",
    description: "Быстротвердеющий состав — «гидропломба» для моментальной остановки активных водопритоков под напором. Схватывание 30–120 секунд. Тоннели, подвалы, смотровые колодцы.",
    specs: {
      compressiveStrength: "≥20 МПа",
      compressiveStrengthTime: "24 часа",
      waterproofing: "W12",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Схватывание 30–120 сек; остановка активного водопритока под напором",
    },
    analogues: {
      basf: ["MasterPlug 40"],
      sika: ["SikaPlug-20"],
      penetron: ["Пенеплаг"],
    },
  },
  {
    id: "ktron-8",
    name: "КТтрон-8",
    category: "Гидроизоляция",
    subcategory: "Быстротвердеющие составы — Заделка трещин и швов",
    description: "Быстротвердеющий состав для заделки трещин, стыков и швов в условиях высокой влажности. Подготовительный этап перед нанесением проникающей гидроизоляции.",
    specs: {
      compressiveStrength: "≥25 МПа",
      compressiveStrengthTime: "24 часа",
      waterproofing: "W10",
      frostResistance: "F200",
      bondStrength: "≥1.5 МПа",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.63 мм",
      notes: "Ускоренное схватывание; высокая влажность",
    },
    analogues: {
      basf: ["MasterSeal 631"],
      penetron: ["Пенекрит"],
    },
  },
  // ─── ИНЪЕКЦИОННЫЕ МАТЕРИАЛЫ ───────────────────────────────────────────────
  {
    id: "kt-inject-ep095",
    name: "КТинжект ЭП-095",
    category: "Инъекционные материалы",
    subcategory: "Эпоксидные инъекционные составы",
    description: "Двухкомпонентный эпоксидный инъекционный состав для силового склеивания бетона. Восстановление несущей способности конструкций с сухими трещинами шириной 0.1–3 мм.",
    specs: {
      compressiveStrength: "≥60 МПа",
      compressiveStrengthTime: "7 суток",
      bondStrength: "≥3.5 МПа",
      bondStrengthTime: "7 суток",
      flexuralStrength: "≥35 МПа",
      flexuralStrengthTime: "7 суток",
      applicationTemperature: "+10°C ... +35°C",
      notes: "Эпоксидный; сухие трещины 0.1–3 мм; силовое склеивание",
    },
    analogues: {
      basf: ["MasterInject 1315"],
      sika: ["SikaDur-52 InjectAR"],
      mapei: ["Epojet"],
    },
  },
  {
    id: "kt-inject-ppg-200",
    name: "КТинжект ППГ-200",
    category: "Инъекционные материалы",
    subcategory: "Полиуретановые инъекционные составы",
    description: "Однокомпонентный полиуретановый пеноинъекционный состав. Остановка водопритоков, уплотнение влажных и активно протекающих трещин и швов. Расширение при контакте с водой до 300%.",
    specs: {
      applicationTemperature: "+5°C ... +40°C",
      notes: "Расширение ≥300%; влажные/активные трещины; однокомпонентный полиуретан",
    },
    analogues: {
      basf: ["MasterRoc MP 368"],
      sika: ["SikaFix-01 AT"],
    },
  },
  {
    id: "kt-inject-ppg-2k",
    name: "КТинжект ППГ-2К",
    category: "Инъекционные материалы",
    subcategory: "Полиуретановые инъекционные составы",
    description: "Двухкомпонентный полиуретановый пеноинъекционный состав. Жёсткая пена для полостей, каверн, уплотнения грунта.",
    specs: {
      applicationTemperature: "+5°C ... +40°C",
      notes: "Двухкомпонентный; жёсткая пена; заполнение полостей",
    },
    analogues: {
      basf: ["MasterRoc MP 324"],
      sika: ["SikaFix-04 HH"],
    },
  },
  {
    id: "kt-inject-pgs-108",
    name: "КТинжект ПГС-108",
    category: "Инъекционные материалы",
    subcategory: "Гелевые инъекционные составы",
    description: "Полиуретановый акрилатный инъекционный гель для заполнения тонких трещин 0.05–0.5 мм. Эластичный; не разрушается при повторном раскрытии трещины.",
    specs: {
      applicationTemperature: "+5°C ... +35°C",
      notes: "Гелевый; тонкие трещины 0.05–0.5 мм; эластичный",
    },
    analogues: {
      basf: ["MasterInject 835"],
      sika: ["SikaFix HH"],
    },
  },
  {
    id: "kt-inject-agp-105",
    name: "КТинжект АГП-105",
    category: "Инъекционные материалы",
    subcategory: "Гелевые инъекционные составы",
    description: "Акрилатный инъекционный гель низкой вязкости. Уплотнение грунта, завеса грунтовых вод, тонкие трещины <0.2 мм.",
    specs: {
      applicationTemperature: "+5°C ... +35°C",
      notes: "Акрилатный гель; уплотнение грунта; трещины <0.2 мм",
    },
    analogues: {
      basf: ["MasterRoc MP 388"],
      sika: ["SikaFix-01 AT"],
    },
  },
  {
    id: "kt-inject-mikrolit",
    name: "Микролит GL-02",
    category: "Инъекционные материалы",
    subcategory: "Цементные инъекционные составы",
    description: "Тонкодисперсный цементный инъекционный состав (микроцемент) для заполнения трещин ≥0.2 мм и кавернозных участков. Восстановление сцепления арматуры с бетоном.",
    specs: {
      compressiveStrength: "≥30 МПа",
      compressiveStrengthTime: "28 суток",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Микроцемент; трещины ≥0.2 мм; инъекционная вязкость",
    },
    analogues: {
      basf: ["MasterRoc MP 315"],
      sika: ["SikaGrout-314 N"],
    },
  },
  // ─── ГЕРМЕТИКИ И ЛЕНТЫ ────────────────────────────────────────────────────
  {
    id: "kt-giperflex",
    name: "КТгиперфлекс",
    category: "Герметики и гидроизоляционные ленты",
    subcategory: "Полиуретановые герметики",
    description: "Однокомпонентный полиуретановый герметик для деформационных и рабочих швов. Высокоэластичный; диапазон деформации ±25%.",
    specs: {
      bondStrength: "≥0.5 МПа",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Относительное удлинение ≥600%; деформационные швы; ±25% перемещения",
    },
    analogues: {
      sika: ["SikaSeal-250 W&G"],
      mapei: ["Mapeflex PU 45"],
    },
  },
  {
    id: "kt-hydrolenta-dsl",
    name: "КТтрон-Гидролента DSL/PWP",
    category: "Герметики и гидроизоляционные ленты",
    subcategory: "Гидроизоляционные ленты",
    description: "Набухающие в воде гидроизоляционные ленты для гидроизоляции рабочих и деформационных швов. Закладывается в шов при бетонировании.",
    specs: {
      applicationTemperature: "+5°C ... +35°C",
      notes: "Набухающий при контакте с водой в 5–10 раз; рабочие/деформационные швы",
    },
    analogues: {
      basf: ["MasterSeal SW 100"],
      sika: ["SikaSwell-P"],
    },
  },
  {
    id: "kt-hydrolenta-tpe",
    name: "КТтрон-Гидролента TPE",
    category: "Герметики и гидроизоляционные ленты",
    subcategory: "Гидроизоляционные ленты",
    description: "Термопластичная гидроизоляционная лента на основе ТПЭ для гидроизоляции рабочих швов бетонирования. Механическая фиксация в шве.",
    specs: {
      applicationTemperature: "+5°C ... +35°C",
      notes: "ТПЭ-лента; рабочие швы бетонирования; механическая фиксация",
    },
    analogues: {
      sika: ["SikaFuko-400 VA"],
    },
  },
  // ─── ЗАЩИТНЫЕ ПОКРЫТИЯ ────────────────────────────────────────────────────
  {
    id: "kt-protect-e01",
    name: "КТпротект Э-01",
    category: "Защитные покрытия",
    subcategory: "Эпоксидные покрытия",
    description: "Двухкомпонентное эпоксидное защитное покрытие для бетонных полов. Защита от химической агрессии, масел, нефтепродуктов. Промышленные полы.",
    specs: {
      compressiveStrength: "≥70 МПа",
      compressiveStrengthTime: "7 суток",
      bondStrength: "≥2.5 МПа",
      bondStrengthTime: "7 суток",
      applicationTemperature: "+10°C ... +30°C",
      notes: "Эпоксидное; химстойкость; промышленные полы",
    },
    analogues: {
      basf: ["MasterTop 1220"],
      sika: ["Sikafloor-2530W"],
    },
  },
  {
    id: "kt-protect-e02",
    name: "КТпротект Э-02",
    category: "Защитные покрытия",
    subcategory: "Эпоксидные покрытия",
    description: "Двухкомпонентное эпоксидное покрытие для защиты бетона от кислот, щелочей, солей. Резервуары, очистные сооружения, химические предприятия.",
    specs: {
      bondStrength: "≥2.0 МПа",
      bondStrengthTime: "7 суток",
      applicationTemperature: "+10°C ... +30°C",
      notes: "Химстойкость к кислотам и щелочам; резервуары",
    },
    analogues: {
      basf: ["MasterProtect 1500 CR"],
      sika: ["Sikafloor-360N"],
    },
  },
  {
    id: "kt-protect-e08",
    name: "КТпротект Э-08",
    category: "Защитные покрытия",
    subcategory: "Эпоксидные покрытия",
    description: "Тонкослойное эпоксидное защитное покрытие. Защита конструкций от карбонизации, хлоридов, атмосферных воздействий. Мосты, паркинги, фасады.",
    specs: {
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "7 суток",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Защита от карбонизации, хлоридов; паропроницаемый",
    },
    analogues: {
      basf: ["MasterProtect 8000 CI"],
      sika: ["SikaGard-675 W"],
    },
  },
  {
    id: "kt-protect-u15",
    name: "КТпротект У-15",
    category: "Защитные покрытия",
    subcategory: "Полиуретановые покрытия",
    description: "Двухкомпонентное полиуретановое эластичное покрытие. Паркинги, кровли, открытые площадки. Высокая эластичность, устойчивость к истиранию и УФ-излучению.",
    specs: {
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "7 суток",
      applicationTemperature: "+5°C ... +35°C",
      notes: "Полиуретановое; УФ-стойкое; эластичное; паркинги/кровли",
    },
    analogues: {
      basf: ["MasterSeal M 688"],
      sika: ["Sikalastic-625"],
    },
  },
  // ─── ГРУНТОВКИ ────────────────────────────────────────────────────────────
  {
    id: "kt-grunt-e20",
    name: "КТгрунт Э-20",
    category: "Грунтовки",
    subcategory: "Эпоксидные грунтовки",
    description: "Двухкомпонентная эпоксидная грунтовка глубокого проникновения. Подготовка бетонных поверхностей перед нанесением защитных покрытий КТпротект.",
    specs: {
      bondStrength: "≥1.5 МПа",
      applicationTemperature: "+10°C ... +30°C",
      notes: "Эпоксидная грунтовка; совместима с КТпротект Э-01/02/08",
    },
    analogues: {
      basf: ["MasterProtect P 3310"],
      sika: ["Sikafloor-156"],
    },
  },
  {
    id: "kt-grunt-e21",
    name: "КТгрунт Э-21",
    category: "Грунтовки",
    subcategory: "Эпоксидные грунтовки",
    description: "Двухкомпонентная эпоксидная грунтовка для слабых и пылящих бетонных оснований. Укрепление, обеспыливание, улучшение адгезии к покрытиям.",
    specs: {
      bondStrength: "≥1.0 МПа",
      applicationTemperature: "+10°C ... +30°C",
      notes: "Укрепление слабых оснований; обеспыливание",
    },
    analogues: {
      basf: ["MasterTop P 607"],
      sika: ["Sikafloor-161"],
    },
  },
  // ─── МОНТАЖ ОБОРУДОВАНИЯ ──────────────────────────────────────────────────
  {
    id: "ktron-9-l800",
    name: "КТтрон-9 Л800 подливочный",
    category: "Монтаж оборудования",
    subcategory: "Подливочные материалы",
    description: "Безусадочный подливочный состав класса прочности C50/60 для монтажа оборудования и опорных плит. Станы, прессы, компрессоры, мосты.",
    specs: {
      compressiveStrength: "≥80 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥3.0 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–4 мм",
      notes: "Безусадочный; литьевая консистенция",
    },
    analogues: {
      basf: ["MasterFlow 928"],
      sika: ["SikaGrout 212", "SikaGrout-311"],
      mapei: ["MapeFill"],
    },
  },
  {
    id: "ktron-9-zr50",
    name: "КТтрон-9 ЗР5.0",
    category: "Монтаж оборудования",
    subcategory: "Подливочные материалы",
    description: "Безусадочный подливочный состав для монтажа ответственного оборудования. Крупная фракция для слоёв до 200 мм.",
    specs: {
      compressiveStrength: "≥60 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W14",
      frostResistance: "F300",
      bondStrength: "≥2.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–5 мм",
      notes: "Безусадочный; толщина слоя 10–200 мм",
    },
    analogues: {
      basf: ["MasterFlow 980"],
      sika: ["SikaGrout 316", "Sika MonoTop-436 N"],
      mapei: ["MapeFill 10"],
    },
  },
  {
    id: "ktron-nx75",
    name: "КТтрон-НХ75",
    category: "Монтаж оборудования",
    subcategory: "Подливочные материалы — Для работы при отрицательных температурах",
    description: "Безусадочный быстротвердеющий литьевой состав с металлической фиброй для высокоточной цементации промышленного оборудования, подверженного динамическим и ударным нагрузкам. Работа при отрицательных температурах.",
    specs: {
      compressiveStrength: "≥100 МПа",
      compressiveStrengthTime: "28 суток; ≥40 МПа через 24 ч",
      waterproofing: "W16",
      frostResistance: "F300",
      bondStrength: "≥4.0 МПа",
      bondStrengthTime: "28 суток",
      flexuralStrength: "≥10 МПа",
      flexuralStrengthTime: "28 суток",
      applicationTemperature: "−10°C ... +35°C",
      workabilityGrade: "П5",
      aggregateFraction: "0–2.5 мм + металлическая и полимерная фибра",
    },
    analogues: {
      basf: ["MasterFlow 4800"],
    },
  },
  // ─── ДОБАВКИ В БЕТОН ──────────────────────────────────────────────────────
  {
    id: "ktron-5",
    name: "КТтрон-5",
    category: "Добавки в бетон",
    subcategory: "Комплексная добавка",
    description: "Комплексная добавка в бетон для повышения водонепроницаемости, морозостойкости, прочности и пластичности. Применяется в любых типах бетонов. Дозировка 1–12% от массы цемента.",
    specs: {
      waterproofing: "повышение на 4 ступени (до W20)",
      frostResistance: "повышение до F300 и выше",
      applicationTemperature: "+5°C ... +35°C (при укладке бетона)",
      notes: "Прирост прочности до 25%; снижение В/Ц на 20%; допускается контакт с питьевой водой",
    },
    analogues: {
      basf: ["MasterLife SF 100", "MasterGlenium 51"],
      sika: ["Sika Fume", "SikaControl-260"],
      penetron: ["Пенетрон Адмикс"],
    },
  },
  {
    id: "ktron-51",
    name: "КТтрон-51",
    category: "Добавки в бетон",
    subcategory: "Гидроизолирующая добавка",
    description: "Гидроизолирующая добавка в бетон для существенного повышения водонепроницаемости. Малый расход 1–5% от массы цемента.",
    specs: {
      waterproofing: "повышение на 4 ступени (до W20)",
      frostResistance: "повышение до F300 и выше",
      applicationTemperature: "+5°C ... +35°C (при укладке бетона)",
      notes: "Прирост прочности до 30%; расход 1–5% от массы цемента; допускается контакт с питьевой водой",
    },
    analogues: {
      basf: ["MasterLife WP 3760"],
      sika: ["SikaControl-260 WT"],
      penetron: ["Пенетрон Адмикс"],
    },
  },
  // ─── КЛЕЙ ДЛЯ ПЛИТКИ ─────────────────────────────────────────────────────
  {
    id: "ktron-101",
    name: "КТтрон-101",
    category: "Клей для плитки и мозаики",
    subcategory: "Клей для плитки и мозаики",
    description: "Высокоэластичный клей для укладки керамической плитки, керамогранита и мозаики. Стены, полы, бассейны, фасады. Белый цвет — идеально для мозаики.",
    specs: {
      compressiveStrength: "≥20 МПа",
      compressiveStrengthTime: "28 суток",
      waterproofing: "W10",
      frostResistance: "F300",
      bondStrength: "≥1.5 МПа",
      bondStrengthTime: "28 суток",
      applicationTemperature: "+5°C ... +35°C",
      aggregateFraction: "0–0.63 мм",
      notes: "Эластичный клей; белый цвет; бассейны/фасады",
    },
    analogues: {
      basf: ["MasterTile FLX 24"],
      sika: ["SikaCeram Pro"],
      mapei: ["Adesilex P4"],
    },
  },
];

export function specsToText(specs: TechSpecs): string {
  const lines: string[] = [];
  if (specs.compressiveStrength) {
    const timeStr = specs.compressiveStrengthTime ? ` (${specs.compressiveStrengthTime})` : "";
    lines.push(`Прочность при сжатии: ${specs.compressiveStrength}${timeStr}`);
  }
  if (specs.waterproofing) lines.push(`Водонепроницаемость: ${specs.waterproofing}`);
  if (specs.frostResistance) lines.push(`Морозостойкость: ${specs.frostResistance}`);
  if (specs.bondStrength) {
    const timeStr = specs.bondStrengthTime ? ` (${specs.bondStrengthTime})` : "";
    lines.push(`Прочность сцепления (адгезия): ${specs.bondStrength}${timeStr}`);
  }
  if (specs.flexuralStrength) {
    const timeStr = specs.flexuralStrengthTime ? ` (${specs.flexuralStrengthTime})` : "";
    lines.push(`Прочность при изгибе: ${specs.flexuralStrength}${timeStr}`);
  }
  if (specs.applicationTemperature) lines.push(`Температура применения: ${specs.applicationTemperature}`);
  if (specs.workabilityGrade) lines.push(`Марка по подвижности: ${specs.workabilityGrade}`);
  if (specs.aggregateFraction) lines.push(`Фракция заполнителя: ${specs.aggregateFraction}`);
  if (specs.notes) lines.push(`Особенности: ${specs.notes}`);
  return lines.length ? lines.join("; ") : "нет данных";
}

export function catalogToText(): string {
  const lines: string[] = [];
  for (const p of KTRON_CATALOG) {
    lines.push(
      `• ${p.name}\n` +
      `  Раздел: ${p.category} / ${p.subcategory}\n` +
      `  Описание: ${p.description}\n` +
      `  Технические характеристики: ${specsToText(p.specs)}\n` +
      `  Аналоги BASF: ${p.analogues.basf?.join(", ") ?? "—"}\n` +
      `  Аналоги SIKA: ${p.analogues.sika?.join(", ") ?? "—"}\n` +
      `  Аналоги Mapei: ${p.analogues.mapei?.join(", ") ?? "—"}\n` +
      `  Аналоги Penetron: ${p.analogues.penetron?.join(", ") ?? "—"}`
    );
  }
  return lines.join("\n\n");
}

export function buildSystemPrompt(extraKnowledge?: string): string {
  const extra = extraKnowledge ? `\n\nДОПОЛНИТЕЛЬНАЯ БАЗА ЗНАНИЙ (загружена администратором):\n${extraKnowledge}\n` : "";

  return `Ты — ИИ-ассистент компании КТтрон, производителя строительных ремонтных смесей, гидроизоляционных и инъекционных материалов.

Твоя задача — подобрать ТОЛЬКО продукт КТтрон по запросу менеджера.

СТРОГИЕ ПРАВИЛА:
- В ответе НИКОГДА не упоминай продукты конкурентов (BASF, Sika, Mapei, Пенетрон и любые другие) — даже как аналоги или для сравнения.
- Предлагай ИСКЛЮЧИТЕЛЬНО продукты из каталога КТтрон.
- Таблица аналогов нужна тебе только для внутреннего поиска: если пользователь называет чужой продукт — найди соответствующий КТтрон и назови только его.
- Если подходящего продукта КТтрон нет — честно скажи об этом и предложи ближайшее по применению.

ПОЛНЫЙ КАТАЛОГ ПРОДУКЦИИ КТтрон (с техническими характеристиками и аналогами):

${catalogToText()}
${extra}
ПРАВИЛА ПОДБОРА:
1. Пользователь называет продукт конкурента → найди все аналоги по таблице → выведи только продукты КТтрон.
2. Пользователь описывает назначение или условия → найди ВСЕ подходящие продукты КТтрон и выведи их все.
3. Пользователь указывает технические требования (прочность, морозостойкость, водонепроницаемость, фракцию) → подбери по характеристикам из каталога.
4. Если запрос содержит конкретные цифры ("прочность ≥50 МПа", "F300", "W14") — ищи точное совпадение, затем ближайшее превышение.
5. Если подходит несколько продуктов — ОБЯЗАТЕЛЬНО выведи все варианты пронумерованными блоками.
6. Если запрос описывает сценарий ремонта — применяй СЦЕНАРНЫЕ ПРАВИЛА (см. ниже).
7. Если запрос неполный — попроси уточнить.
8. КОНТЕКСТ ДИАЛОГА: учитывай историю разговора — если пользователь уточняет, отвечай с учётом предыдущего обсуждения.
9. ВЕБ-ПОИСК: Если продукт КТтрон НЕ найден в каталоге — используй инструмент search_web. Никогда не упоминай конкурентов в ответе.

═══════════════════════════════════════════════════════════
СЦЕНАРНЫЕ ПРАВИЛА — КОМПЛЕКТНЫЕ РЕКОМЕНДАЦИИ
═══════════════════════════════════════════════════════════

СЦЕНАРИЙ 1: Ремонт железобетонных конструкций с повреждением до арматуры
→ Этап 1 (обязателен): КТтрон-праймер — антикоррозионная обработка арматуры
→ Этап 2: Ремонтный состав КТтрон (по требуемой прочности и типу поверхности)

СЦЕНАРИЙ 2: Ремонт бетона с активными течами и фильтрацией воды
→ Этап 1: КТтрон-2 (гидропломба) — остановка активной течи
→ Этап 2: КТтрон-1 (проникающая гидроизоляция) — общая гидроизоляция
→ Этап 3: Ремонтный состав (при необходимости восстановить форму)

СЦЕНАРИЙ 3: Гидроизоляция подвала / фундамента / резервуара с трещинами и швами
→ Этап 1: КТтрон-2 или КТтрон-8 — заделка трещин и швов
→ Этап 2: КТтрон-1 (проникающая) или КТтрон-7 (обмазочная) — общая гидроизоляция

СЦЕНАРИЙ 4: Ремонт деформационных швов
→ Этап 1: КТтрон-Гидролента DSL/PWP или ТПЕ — гидроизоляционная лента
→ Этап 2: КТгиперфлекс — герметизация шва

СЦЕНАРИЙ 5: Монтаж оборудования / анкеров
→ КТтрон-9 Л800 или КТтрон-9 ЗР5.0, или КТтрон-НХ75 при отрицательных температурах

СЦЕНАРИЙ 6: Ремонт горизонтальных поверхностей (полы, перекрытия) без арматуры
→ Литьевой ремонтный состав по требуемой прочности

СЦЕНАРИЙ 7: Ремонт вертикальных конструкций без арматуры
→ Тиксотропный ремонтный состав (не стекает при нанесении)

СЦЕНАРИЙ 8: Инъецирование трещин
→ Сухие трещины (усиление): КТинжект ЭП-095 или Микролит GL-02
→ Влажные/активные: КТинжект ППГ-200 или КТинжект ППГ-2К
→ Тонкие трещины (<0.2 мм): КТинжект ПГС-108 или КТинжект АГП-105

СЦЕНАРИЙ 9: Защита бетона от химической агрессии
→ Этап 1: КТгрунт Э-20 или КТгрунт Э-21
→ Этап 2: КТпротект Э-01 / Э-02 / Э-08 или КТпротект У-15

СЦЕНАРИЙ 10: Повышение водонепроницаемости нового бетона (добавка)
→ КТтрон-5 или КТтрон-51

═══════════════════════════════════════════════════════════

ФОРМАТ ОТВЕТА — одиночная рекомендация:
📦 **Рекомендация:** [Название продукта КТтрон]
📋 **Раздел:** [Категория / Подкатегория]
📝 **Описание:** [Краткое описание]
🔬 **Технические характеристики:**
  • Прочность при сжатии: [значение (время) или «не нормируется»]
  • Водонепроницаемость: [значение или «—»]
  • Морозостойкость: [значение или «—»]
  • Прочность сцепления (адгезия): [значение (время) или «—»]
  • Прочность при изгибе: [значение (время) или «—»]
  • Температура применения: [значение]
  • Марка по подвижности: [значение или «—»]
✅ **Почему подходит:** [Объяснение]

ФОРМАТ ОТВЕТА — несколько вариантов:
**Найдено несколько подходящих продуктов КТтрон:**

**Вариант 1**
📦 **Рекомендация:** ...
🔬 **Технические характеристики:** ...
✅ **Почему подходит:** ...

**Вариант 2** ...и т.д.

ФОРМАТ ОТВЕТА — сценарий (комплект):
🏗️ **Комплект продуктов КТтрон для [описание задачи]:**

**Этап 1 — [название этапа]**
📦 **Продукт:** [Название КТтрон]
📝 **Описание:** [Краткое описание]
🔬 **Технические характеристики:**
  • Прочность при сжатии: [значение (время)]
  • Водонепроницаемость: [значение]
  • Морозостойкость: [значение]
  • Прочность сцепления: [значение (время)]
  • Прочность при изгибе: [значение (время)]
  • Температура применения: [значение]
  • Марка по подвижности: [значение]
🔧 **Применение на этом этапе:** [Что именно делать]

⚠️ **Важно:** [Ключевые замечания по технологии, если есть]

Отвечай на русском языке, профессионально и конкретно. Никаких упоминаний конкурентов.`;
}

export const SYSTEM_PROMPT = buildSystemPrompt();
