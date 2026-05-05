import OpenAI from "openai";
import { getSystemPromptFromDb } from "./db.js";

const llmResponse = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
  method: 'POST',
  headers: {
    'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
    'x-folder-id': process.env.YANDEX_FOLDER_ID!,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    modelUri: `gpt://${process.env.YANDEX_FOLDER_ID}/yandexgpt-lite`,
    messages: [{role: 'user', text: message.text}],
    completionOptions: {temperature: 0.6, maxTokens: 1000}
  })
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function searchWeb(query: string): Promise<string> {
  try {
    const searchQuery = `${query} КТтрон технические характеристики`;
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}&kl=ru-ru`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return "Поиск в интернете недоступен.";

    const html = await response.text();

    const titleMatches = [...html.matchAll(/class="result__a"[^>]*>([\s\S]*?)<\/a>/g)];
    const snippetMatches = [...html.matchAll(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g)];
    const urlMatches = [...html.matchAll(/class="result__url"[^>]*>([\s\S]*?)<\/span>/g)];

    const results: string[] = [];
    for (let i = 0; i < Math.min(titleMatches.length, 5); i++) {
      const title = (titleMatches[i]?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
      const snippet = (snippetMatches[i]?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
      const urlText = (urlMatches[i]?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
      if (title || snippet) {
        const parts = [title && `Заголовок: ${title}`, urlText && `Источник: ${urlText}`, snippet].filter(Boolean);
        results.push(parts.join("\n"));
      }
    }

    if (results.length === 0) return "Поиск не дал результатов.";
    return `Результаты поиска по запросу "${query}":\n\n${results.join("\n\n---\n\n")}`;
  } catch {
    return "Поиск в интернете временно недоступен.";
  }
}

const WEB_SEARCH_TOOL: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "search_web",
    description: "Поиск информации о продуктах КТтрон в интернете. Используй ТОЛЬКО если продукт точно не найден в каталоге выше.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Поисковый запрос на русском языке. Например: 'КТтрон-122 флекс характеристики'",
        },
      },
      required: ["query"],
    },
  },
};

export async function findKtronProduct(history: ChatMessage[]): Promise<string> {
  const systemPrompt = await getSystemPromptFromDb();

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-5.4",
    max_completion_tokens: 8192,
    messages,
    tools: [WEB_SEARCH_TOOL],
    tool_choice: "auto",
  });

  const assistantMessage = response.choices[0]?.message;
  if (!assistantMessage) return "Не удалось получить ответ. Попробуйте ещё раз.";

  if (assistantMessage.tool_calls?.length) {
    const toolMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      ...messages,
      assistantMessage,
    ];

    for (const toolCall of assistantMessage.tool_calls) {
      if (toolCall.function.name === "search_web") {
        const args = JSON.parse(toolCall.function.arguments) as { query: string };
        const searchResult = await searchWeb(args.query);
        toolMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: searchResult,
        });
      }
    }

    const finalResponse = await openai.chat.completions.create({
      model: "gpt-5.4",
      max_completion_tokens: 8192,
      messages: toolMessages,
    });

    return finalResponse.choices[0]?.message?.content ?? "Не удалось получить ответ.";
  }

  return assistantMessage.content ?? "Не удалось получить ответ.";
}

const ADMIN_SYSTEM_PROMPT = `Ты — ИИ-агент для обслуживания базы знаний КТтрон. Администратор может:
1. Сообщать тебе новые технические характеристики продуктов для сохранения
2. Загружать каталоги и прайсы в виде текста и файлов PDF — ты извлекаешь структурированную информацию
3. Задавать вопросы о текущем каталоге
4. Уточнять или дополнять описания продуктов

При получении информации о продуктах — структурируй её в виде:
ПРОДУКТ: [название]
ХАРАКТЕРИСТИКА: [параметр]: [значение]


Отвечай на русском языке, кратко и конкретно.`;

export async function processAdminMessage(history: ChatMessage[]): Promise<string> {
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: ADMIN_SYSTEM_PROMPT },
    ...history,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-5.4",
    max_completion_tokens: 4096,
    messages,
  });

  return response.choices[0]?.message?.content ?? "Не удалось получить ответ.";
}
