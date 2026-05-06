import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

bot.start((ctx) => ctx.reply('🤖 YandexGPT Bot готов!'));

bot.on('message', async (ctx) => {
  // YandexGPT логика здесь
  ctx.reply('Ваш запрос: ' + ctx.message.text);
});

console.log('🚀 Starting bot...');
bot.launch();
console.log('✅ Bot live!');
