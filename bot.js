const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Click the button below to open the web app.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Web App', url: 'https://fastidious-zuccutto-1ef5e6.netlify.app/' }]
            ]
        }
    });
});

bot.command('referral', (ctx) => {
    const referralLink = `https://fastidious-zuccutto-1ef5e6.netlify.app/register?ref=${ctx.from.username}`;
    ctx.reply(`Share this link to invite friends: ${referralLink}`);
});

bot.launch();