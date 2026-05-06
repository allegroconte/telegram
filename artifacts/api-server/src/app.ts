import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

// 🚀 HARDCODE ТЕСТ - замените ваш API ключ!
const FOLDER_ID = 'b1g60jr5dkftsqdct7nd';
const API_KEY = 'YCCa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'; // ← ВСТАВЬТЕ СЮДА!

bot.start((ctx) => {
  ctx.reply(
    `🤖 *GitHub Actions YandexGPT Bot LIVE!*\n\n` +
    `📁 Folder: \`${FOLDER_ID}\`\n` +
    `🔑 API Key: \`${API_KEY.slice(0, 8)}...\`\n` +
    `📡 Model: \`gpt://${FOLDER_ID}/yandexgpt-lite\`\n\n` +
    `*Отправьте любой текст для ИИ!*`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('test', (ctx) => {
  ctx.reply('🧠 Тестирую YandexGPT...');
  
  const modelUri = `gpt://${FOLDER_ID}/yandexgpt-lite`;
  
  fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Authorization': `Api-Key ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      modelUri,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: 500,
      },
      messages: [
        { role: 'system', text: 'Ты Telegram бот с YandexGPT. Отвечай кратко.' },
        { role: 'user', text: 'Привет! Сделай тест.' }
      ]
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('TEST RESULT:', data);
    if (data.result) {
      ctx.reply(data.result.alternatives[0].message.text);
    } else {
      ctx.reply(`❌ ${JSON.stringify(data.error)}`);
    }
  })
  .catch(e => ctx.reply(`❌ ${e}`));
});

bot.on('text', async (ctx) => {
  const query = ctx.message.text!;
  if (query.startsWith('/')) return;
  
  const loading = await ctx.reply('🧠 *YandexGPT генерирует...*', { parse_mode: 'Markdown' });
  const modelUri = `gpt://${FOLDER_ID}/yandexgpt-lite`;
  
  try {
    console.log('🤖 Запрос:', query);
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelUri,
        completionOptions: {
          stream: false,
          temperature: 0.7,
          maxTokens: 1000,
        },
        messages: [
          { role: 'system', text: 'Ты полезный Telegram бот. Отвечай естественно.' },
          { role: 'user', text: query }
        ]
      })
    });
    
    const data = await response.json();
    console.log('📥 Ответ статус:', response.status, data);
    
    if (response.ok) {
      const answer = data.result?.alternatives?.[0]?.message?.text || '✅ Пустой ответ от ИИ';
      await ctx.telegram.editMessageText(ctx.chat.id, loading.message_id, undefined, answer);
    } else {
      const errorMsg = data.error?.message || `HTTP ${response.status}`;
      await ctx.telegram.editMessageText(
        ctx.chat.id, 
        loading.message_id, 
        undefined, 
        `❌ *Ошибка:*\n\`${errorMsg}\`\n\nModel: \`${modelUri}\``,
        { parse_mode: 'Markdown' }
      );
    }
  } catch (error: any) {
    console.error('💥 Ошибка:', error);
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      loading.message_id,
      undefined,
      `❌ *Критическая ошибка:*\n\`${error.message}\``,
      { parse_mode: 'Markdown' }
    );
  }
});

console.log('🚀 HARDCODE YandexGPT bot starting...');
console.log('📁 Folder:', FOLDER_ID);
console.log('🔑 Key preview:', API_KEY.slice(0, 8) + '...');
console.log('📡 Model:', `gpt://${FOLDER_ID}/yandexgpt-lite`);
bot.launch();
console.log('✅ Bot LIVE! /test для проверки.');
console.log('🚀 Starting YandexGPT bot...');
bot.launch();
console.log('✅ Bot live! Secrets OK.');
