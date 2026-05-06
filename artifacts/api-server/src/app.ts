import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

bot.start((ctx) => {
  ctx.reply(
    `🤖 *Bot LIVE на GitHub Actions!*\n\n` +
    `🔑 YANDEX_API_KEY: ${process.env.YANDEX_API_KEY ? '✅' : '❌'}\n` +
    `📁 YANDEX_FOLDER_ID: ${process.env.YANDEX_FOLDER_ID ? '✅' : '❌'}\n\n` +
    `Отправьте текст для YandexGPT!`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('text', async (ctx) => {
  const query = ctx.message.text!;
  const loading = await ctx.reply('🧠 *YandexGPT думает...*', { parse_mode: 'Markdown' });
  
  // Проверка секретов
  if (!process.env.YANDEX_API_KEY || !process.env.YANDEX_FOLDER_ID) {
    return ctx.telegram.editMessageText(
      ctx.chat.id,
      loading.message_id,
      undefined,
      '❌ Отсутствуют секреты YANDEX_API_KEY или YANDEX_FOLDER_ID!\nНастройте в GitHub Secrets.'
    );
  }
  
  const modelUri = `gpt://${process.env.YANDEX_FOLDER_ID}/yandexgpt-lite`;
  
  try {
    console.log('🤖 Запрос:', query);
    console.log('📡 Model:', modelUri);
    
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelUri,
        completionOptions: {
          stream: false,
          temperature: 0.7,
          maxTokens: 1000,
        },
        messages: [{ role: 'user', text: query }]
      })
    });
    
    const data = await response.json();
    console.log('📥 Ответ:', data);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.error?.message || 'Unknown'}`);
    }
    
    const answer = data.result?.alternatives[0]?.message?.text || '❌ Пустой ответ';
    await ctx.telegram.editMessageText(ctx.chat.id, loading.message_id, undefined, answer);
    
  } catch (error: any) {
    const errorMsg = error.message || 'Unknown error';
    const debugInfo = `Model: \`${modelUri}\`\nKey preview: \`${process.env.YANDEX_API_KEY?.slice(0, 8)}...\``;
    
    console.error('💥 YandexGPT:', errorMsg);
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      loading.message_id,
      undefined,
      `❌ *Ошибка YandexGPT:*\n\`${errorMsg}\`\n\n${debugInfo}`,
      { parse_mode: 'Markdown' }
    );
  }
});

console.log('🚀 Starting YandexGPT bot...');
bot.launch();
console.log('✅ Bot live! Secrets OK.');
