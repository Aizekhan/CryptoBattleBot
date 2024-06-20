const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Click the button below to open the web app.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open Web App', web_app: { url: process.env.FRONTEND_URL } }]
            ]
        }
    });
});

bot.command('referral', async (ctx) => {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/users/referral`, {
            telegramId: ctx.from.id,
            username: ctx.from.username
        });

        const referralLink = `${process.env.FRONTEND_URL}/register?ref=${response.data.referralCode}`;
        ctx.reply(`Share this link to invite friends: ${referralLink}`);
    } catch (error) {
        console.error('Error creating referral link:', error);
        ctx.reply('An error occurred while creating the referral link.');
    }
});

bot.launch();