const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Click the button below to open the web app.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Web App', url: process.env.FRONTEND_URL }]
            ]
        }
    });
});

bot.command('referral', (ctx) => {
    const referralLink = `${process.env.FRONTEND_URL}/register?ref=${ctx.from.username}`;
    ctx.reply(`Share this link to invite friends: ${referralLink}`);
});

bot.launch();