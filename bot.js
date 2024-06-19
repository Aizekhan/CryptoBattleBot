// telegram-bot/bot.js

const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Click the button below to open the web app.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Web App', web_app: { url: 'https://fastidious-zuccutto-1ef5e6.netlify.app/' } }]
            ]
        }
    });
});

bot.launch();