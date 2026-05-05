import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { findKtronProduct, processAdminMessage, ChatMessage } from "./handler.js";
import { seedProducts, saveExtraKnowledge, saveCatalogDocument } from "./db.js";
import { logger } from "../lib/logger.js";

const MAX_HISTORY = 20;
const ADMIN_PASSWORD = "171770";

type AdminState = "none" | "awaiting_password" | "admin" | "admin_training";

const sessions = new Map<number, ChatMessage[]>();
const adminSessions = new Map<number, AdminState>();
const adminHistory = new Map<number, ChatMessage[]>();

const WELCOME_MESSAGE = `👋 Добро пожаловать в Батекс Ассистент!

Я помогу вам подобрать подходящий продукт компании **КТтрон** по вашему запросу.

📝 **Как использовать:**
Просто опишите, что вам нужно. Например:
• "Нужна проникающая гидроизоляция для фундамента"
• "Состав для ликвидации активной течи"
• "Ремонтный состав для вертикальных поверхностей"
• "Аналог пенетрона"
• "КТтрон-7"

Я помню весь контекст нашего разговора. Нажмите **🔄 Начать сначала**, чтобы сбросить историю. 🏗️`;

const MAIN_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: "🔄 Начать сначала" }, { text: "🔐 Админ панель" }],
    ],
    resize_keyboard: true,
    persistent: true,
  },
};

const ADMIN_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: "📤 Загрузить документ" }, { text: "💬 Режим обучения" }],
      [{ text: "📋 Список продуктов" }, { text: "🔙 Выйти из Admin" }],
    ],
    resize_keyboard: true,
    persistent: true,
  },
};

const TRAINING_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: "💾 Сохранить в базу" }, { text: "🔙 Назад в Admin" }],
    ],
    resize_keyboard: true,
    persistent: true,
  },
};

const HELP_MESSAGE = `ℹ️ **Помощь**

Введите запрос одним из способов:
• Характеристику продукта ("быстротвердеющий", "тиксотропный")
• Назначение ("гидроизоляция кровли", "ремонт бетона")
• Аналог другого производителя ("аналог Пенетрона")
• Конкретное наименование ("КТтрон-5")
• Сценарий ("ремонт с оголённой арматурой")

Команды:
/start — начало работы
/help — эта справка
/reset — сбросить историю диалога`;

export function startBot(): void {
  const token = process.env["TELEGRAM_BOT_TOKEN"];

  if (!token) {
    logger.warn("TELEGRAM_BOT_TOKEN is not set — Telegram bot will not start");
    return;
  }

  seedProducts().catch((err) => logger.error({ err }, "Seed failed"));

  const bot = new Telegraf(token);

  const resetSession = (chatId: number) => {
    sessions.delete(chatId);
    adminSessions.delete(chatId);
    adminHistory.delete(chatId);
  };

  const sendWelcome = async (ctx: Parameters<Parameters<typeof bot.command>[1]>[0]) => {
    resetSession(ctx.chat.id);
    await ctx.replyWithMarkdown(WELCOME_MESSAGE, MAIN_KEYBOARD);
  };

  bot.command("start", sendWelcome);
  bot.command("reset", sendWelcome);

  bot.command("help", async (ctx) => {
    await ctx.replyWithMarkdown(HELP_MESSAGE, MAIN_KEYBOARD);
  });

  bot.on(message("document"), async (ctx) => {
    const chatId = ctx.chat.id;
    const state = adminSessions.get(chatId) ?? "none";

    if (state !== "admin" && state !== "admin_training") {
      await ctx.reply("📁 Загрузка файлов доступна только в режиме администратора.", MAIN_KEYBOARD);
      return;
    }

    const doc = ctx.message.document;
    const filename = doc.file_name ?? "файл";
    const fileId = doc.file_id;
    const mimeType = doc.mime_type ?? "";

    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"];

    if (!allowedTypes.some(t => mimeType.includes(t.split("/")[1] ?? ""))) {
      await ctx.reply(`⚠️ Неподдерживаемый тип файла: ${mimeType}\nПоддерживаются: PDF, Excel, Word, TXT`, ADMIN_KEYBOARD);
      return;
    }

    const processingMsg = await ctx.reply(`📥 Получен файл: ${filename}\n🔄 Обрабатываю...`, ADMIN_KEYBOARD);

    try {
      const fileLink = await ctx.telegram.getFileLink(fileId);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      const fileResp = await fetch(fileLink.href, { signal: controller.signal });
      clearTimeout(timeoutId);

      let summary = `Файл "${filename}" (${mimeType}) получен и зарегистрирован в базе.`;

      if (mimeType === "text/plain" || filename.endsWith(".txt")) {
        const text = await fileResp.text();
        const truncated = text.slice(0, 8000);

        const aiSummary = await processAdminMessage([{
          role: "user",
          content: `Проанализируй следующий текст из файла "${filename}" и извлеки всю информацию о продуктах КТтрон (характеристики, описания, применение). Структурируй результат:\n\n${truncated}`,
        }]);

        summary = aiSummary;
        await saveExtraKnowledge(aiSummary, filename, chatId);
      } else {
        summary = `Файл "${filename}" зарегистрирован. Для PDF/Excel/Word загрузите текстовую версию (.txt) для автоматического извлечения данных.`;
      }

      await saveCatalogDocument(filename, fileId, chatId, summary);
      await ctx.telegram.deleteMessage(chatId, processingMsg.message_id);
      await ctx.reply(
        `✅ **Файл обработан:** ${filename}\n\n📝 **Результат:**\n${summary.slice(0, 1000)}${summary.length > 1000 ? "..." : ""}`,
        { parse_mode: "Markdown", ...ADMIN_KEYBOARD }
      );
    } catch (err) {
      logger.error({ err }, "Error processing uploaded document");
      await ctx.telegram.deleteMessage(chatId, processingMsg.message_id);
      await ctx.reply("❌ Ошибка при обработке файла. Попробуйте ещё раз.", ADMIN_KEYBOARD);
    }
  });

  bot.on(message("text"), async (ctx) => {
    const userText = ctx.message.text.trim();
    const chatId = ctx.chat.id;
    const state = adminSessions.get(chatId) ?? "none";

    if (userText === "🔄 Начать сначала") {
      await sendWelcome(ctx);
      return;
    }

    if (userText === "🔐 Админ панель") {
      adminSessions.set(chatId, "awaiting_password");
      await ctx.reply("🔐 Введите пароль для доступа к панели администратора:", {
        reply_markup: { keyboard: [[{ text: "❌ Отмена" }]], resize_keyboard: true, persistent: true },
      });
      return;
    }

    if (userText === "❌ Отмена" && state === "awaiting_password") {
      adminSessions.set(chatId, "none");
      await ctx.reply("Вход отменён.", MAIN_KEYBOARD);
      return;
    }

    if (state === "awaiting_password") {
      if (userText === ADMIN_PASSWORD) {
        adminSessions.set(chatId, "admin");
        await ctx.reply(
          `✅ **Добро пожаловать в Панель Администратора!**

🛠️ Доступные функции:
• **📤 Загрузить документ** — загрузите PDF/TXT каталог или прайс для обучения
• **💬 Режим обучения** — чат с ИИ для передачи новых знаний о продуктах
• **📋 Список продуктов** — просмотр текущего каталога в базе данных
• **🔙 Выйти из Admin** — вернуться в обычный режим

Вы также можете напрямую отправить файл (PDF, Excel, Word, TXT) для обработки.`,
          { parse_mode: "Markdown", ...ADMIN_KEYBOARD }
        );
      } else {
        await ctx.reply("❌ Неверный пароль. Попробуйте ещё раз или нажмите ❌ Отмена.", {
          reply_markup: { keyboard: [[{ text: "❌ Отмена" }]], resize_keyboard: true, persistent: true },
        });
      }
      return;
    }

    if (state === "admin" || state === "admin_training") {
      if (userText === "🔙 Выйти из Admin" || userText === "🔙 Назад в Admin" && state === "admin_training") {
        if (userText === "🔙 Выйти из Admin") {
          adminSessions.set(chatId, "none");
          adminHistory.delete(chatId);
          await ctx.reply("👋 Вышли из Admin панели.", MAIN_KEYBOARD);
        } else {
          adminSessions.set(chatId, "admin");
          adminHistory.delete(chatId);
          await ctx.reply("↩️ Вернулись в Admin панель.", ADMIN_KEYBOARD);
        }
        return;
      }

      if (userText === "📤 Загрузить документ") {
        await ctx.reply(
          "📤 **Загрузка документа**\n\nОтправьте файл в один из форматов:\n• TXT — автоматическое извлечение данных об продуктах\n• PDF, Excel, Word — регистрация в базе (для TXT-конвертации используйте текстовый экспорт)\n\nФайл будет проанализирован ИИ и данные добавятся в базу знаний.",
          { parse_mode: "Markdown", ...ADMIN_KEYBOARD }
        );
        return;
      }

      if (userText === "📋 Список продуктов") {
        const { getAllProducts } = await import("./db.js");
        const products = await getAllProducts();
        const byCategory: Record<string, string[]> = {};
        for (const p of products) {
          if (!byCategory[p.category]) byCategory[p.category] = [];
          byCategory[p.category].push(p.name);
        }
        let msg = `📋 **Каталог продуктов КТтрон** (${products.length} позиций):\n\n`;
        for (const [cat, names] of Object.entries(byCategory)) {
          msg += `**${cat}:**\n`;
          for (const name of names) msg += `  • ${name}\n`;
          msg += "\n";
        }
        if (msg.length > 4000) msg = msg.slice(0, 3900) + "\n...(список обрезан)";
        await ctx.reply(msg, { parse_mode: "Markdown", ...ADMIN_KEYBOARD });
        return;
      }

      if (userText === "💬 Режим обучения") {
        adminSessions.set(chatId, "admin_training");
        adminHistory.delete(chatId);
        await ctx.reply(
          `🎓 **Режим обучения ИИ**

Теперь вы можете передавать боту новые знания о продуктах КТтрон:
• Уточнять технические характеристики
• Добавлять описания новых продуктов
• Сообщать об изменениях в каталоге
• Вставлять текст из технических листов

После диалога нажмите **💾 Сохранить в базу**, чтобы добавить информацию в базу знаний.
Нажмите **🔙 Назад в Admin** для выхода без сохранения.`,
          { parse_mode: "Markdown", ...TRAINING_KEYBOARD }
        );
        return;
      }

      if (state === "admin_training") {
        if (userText === "💾 Сохранить в базу") {
          const history = adminHistory.get(chatId) ?? [];
          if (history.length === 0) {
            await ctx.reply("ℹ️ Нет данных для сохранения. Сначала введите информацию о продуктах.", TRAINING_KEYBOARD);
            return;
          }

          const savingMsg = await ctx.reply("💾 Сохраняю данные в базу знаний...");

          const summaryRequest: ChatMessage[] = [
            ...history,
            { role: "user", content: "Обобщи всю информацию о продуктах КТтрон из нашего разговора в структурированном виде для сохранения в базу знаний." },
          ];

          const summary = await processAdminMessage(summaryRequest);
          await saveExtraKnowledge(summary, "Режим обучения (Telegram)", chatId);

          await ctx.telegram.deleteMessage(chatId, savingMsg.message_id);
          adminHistory.delete(chatId);
          adminSessions.set(chatId, "admin");
          await ctx.reply(
            `✅ **Данные сохранены в базу знаний!**\n\n📝 Сохранено:\n${summary.slice(0, 800)}${summary.length > 800 ? "..." : ""}`,
            { parse_mode: "Markdown", ...ADMIN_KEYBOARD }
          );
          return;
        }

        if (!adminHistory.has(chatId)) adminHistory.set(chatId, []);
        const history = adminHistory.get(chatId)!;
        history.push({ role: "user", content: userText });
        if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);

        const thinkingMsg = await ctx.reply("🤔 Анализирую...");

        try {
          const answer = await processAdminMessage(history);
          history.push({ role: "assistant", content: answer });
          if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);

          await ctx.telegram.deleteMessage(chatId, thinkingMsg.message_id);
          await ctx.reply(answer, { parse_mode: "Markdown", ...TRAINING_KEYBOARD });
        } catch (err) {
          logger.error({ err }, "Admin training error");
          history.pop();
          await ctx.telegram.deleteMessage(chatId, thinkingMsg.message_id);
          await ctx.reply("❌ Ошибка. Попробуйте ещё раз.", TRAINING_KEYBOARD);
        }
        return;
      }

      await ctx.reply(
        "ℹ️ Используйте кнопки меню или отправьте файл для обновления базы знаний.",
        ADMIN_KEYBOARD
      );
      return;
    }

    if (!sessions.has(chatId)) sessions.set(chatId, []);
    const history = sessions.get(chatId)!;

    history.push({ role: "user", content: userText });
    if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);

    const thinking = await ctx.reply("🔍 Подбираю продукт...");

    try {
      const answer = await findKtronProduct(history);
      history.push({ role: "assistant", content: answer });
      if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);

      await ctx.telegram.deleteMessage(chatId, thinking.message_id);
      await ctx.replyWithMarkdown(answer, MAIN_KEYBOARD);
    } catch (err) {
      logger.error({ err }, "Error processing bot message");
      history.pop();
      await ctx.telegram.deleteMessage(chatId, thinking.message_id);
      await ctx.reply("❌ Произошла ошибка при обработке запроса. Попробуйте ещё раз.", MAIN_KEYBOARD);
    }
  });

  bot.launch().then(() => {
    logger.info("Telegram bot started successfully");
  }).catch((err) => {
    logger.error({ err }, "Failed to start Telegram bot");
  });

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
