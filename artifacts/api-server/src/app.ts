import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

bot.start(ctx => ctx.reply(
  `🤖 Bot LIVE!\n\n` +
  `TELEGRAM_TOKEN: ${process.env.TELEGRAM_TOKEN ? 'OK' : '❌'}\n` +
  `YANDEX_API_KEY: ${process.env.YANDEX_API_KEY ? 'OK' : '❌'}\n` +
  `YANDEX_FOLDER_ID: ${process.env.YANDEX_FOLDER_ID ? 'OK' : '❌'}`
));

bot.on('text', async (ctx) => {
  const query = ctx.message.text!;
  
  if (!process.env.YANDEX_API_KEY || !process.env.YANDEX_FOLDER_ID) {
    return ctx.reply('❌ Yandex секреты не настроены!\nНастройте YANDEX_API_KEY/FOLDER_ID');
  }
  
  const msg = await ctx.reply('🧠 Тестирую YandexGPT...');
  
  try {
    const modelUri = `gpt://${process.env.YANDEX_FOLDER_ID}/yandexgpt-lite`;
    console.log('Model URI:', modelUri); // Actions logs!
    
    const res = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelUri,
        completionOptions: { 
          temperature: 0.6, 
          maxTokens: 500,
          stream: false 
        },
        messages: [{ role: 'user', text: query }]
      })
    });
    
    const data = await res.json();
    console.log('Yandex response:', data); // Actions logs!
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${data.message || 'Unknown'}`);
    }
    
    const answer = data.result?.alternatives?.[0]?.message?.text || '❌ Нет ответа';
    ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, answer);
    
  } catch (error: any) {
    console.error('YandexGPT error:', error);
    ctx.telegram.editMessageText(
      ctx.chat.id, 
      msg.message_id, 
      undefined, 
      `❌ YandexGPT:\n${error.message}\n\nModel: \`${modelUri}\``
    );
  }
});

console.log('🚀 Starting bot...');
bot.launch();
console.log('✅ Bot live! Проверьте секреты.');
