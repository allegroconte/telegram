import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN || 'ERROR_TOKEN');

// 🔥 HARDCODE - ВСТАВЬТЕ ВАШ API КЛЮЧ!
const FOLDER_ID = 'b1g60jr5dkftsqdct7nd';
const API_KEY = 'YCCa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'; // ← ЗДЕСЬ!

console.log('🚀 HARDCODE START');
console.log('📁 FOLDER_ID:', FOLDER_ID);
console.log('🔑 API_KEY preview:', API_KEY.slice(0, 8) + '...');

bot.start((ctx) => ctx.reply(
  `🤖 YandexGPT LIVE!\n\n` +
  `📁 Folder: ${FOLDER_ID}\n` +
  `🔑 Key: ${API_KEY.slice(0, 8)}...\n\n` +
  `💬 Напишите что угодно!`
));

bot.on('text', async (ctx) => {
  const text = ctx.message!.text!;
  await ctx.reply('🧠 Думаю...');
  
  const modelUri = `gpt://${FOLDER_ID}/yandexgpt-lite`;
  
  try {
    const res = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Authorization': `Api-Key ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelUri,
        completionOptions: { 
          temperature: 0.6, 
          maxTokens: 1000,
          stream: false 
        },
        messages: [{ role: 'user', text: text }]
      })
    });
    
    const data = await res.json();
    console.log('RESPONSE:', res.status, data);
    
    if (res.ok && data.result) {
      ctx.reply(data.result.alternatives[0].message.text.slice(0, 4000));
    } else {
      ctx.reply(`❌ Ошибка ${res.status}: ${JSON.stringify(data.error)}`);
    }
  } catch (e: any) {
    console.error('ERROR:', e);
    ctx.reply(`💥 ${e.message}`);
  }
});

bot.launch().then(() => {
  console.log('✅ Bot LIVE!');
});
