import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

bot.start((ctx) => ctx.reply('🤖 YandexGPT Bot готов!\n\nОтправьте запрос!'));

bot.on('message', async (ctx) => {
  const query = ctx.message.text!;
  
  ctx.reply('🧠 Думаю...');
  
  try {
    // YandexGPT API
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelUri: `gpt://<YOUR_FOLDER_ID>/yandexgpt-lite`, // Замените YOUR_FOLDER_ID
        completionOptions: {
          stream: false,
          temperature: 0.6,
          maxTokens: 2000,
        },
        messages: [
          {
            role: 'user',
            text: query
          }
        ]
      })
    });
    
    const data = await response.json();
    const answer = data.result?.alternatives[0]?.message?.text || '❌ Ошибка YandexGPT';
    
    ctx.reply(answer);
  } catch (error) {
    console.error('YandexGPT error:', error);
    ctx.reply('❌ Ошибка ИИ. Проверьте секреты.');
  }
});

console.log('🚀 Starting YandexGPT bot...');
bot.launch();
console.log('✅ YandexGPT Bot live!');
