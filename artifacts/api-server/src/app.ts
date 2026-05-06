import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN || 'NO_TOKEN');

// 🔥 ВСТАВЬТЕ РЕАЛЬНЫЕ ЗНАЧЕНИЯ!
const FOLDER_ID = 'b1g60jr5dkftsqdct7nd';  // Ваш folder!
const API_KEY = 'YCCa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'; // Ваш API ключ!

console.log('FOLDER:', FOLDER_ID);
console.log('KEY:', API_KEY.slice(0, 8));

bot.start(ctx => ctx.reply(`🤖 LIVE!\nFOLDER: ${FOLDER_ID}\nKEY: ${API_KEY.slice(0, 8)}...`));

bot.on('text', async ctx => {
  const text = ctx.message.text;
  const modelUri = `gpt://${FOLDER_ID}/y
