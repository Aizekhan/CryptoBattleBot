const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
    try {
        const response = await axios.post(`${process.env.BACKEND_URL}/api/auth/telegram`, {
            telegramId: ctx.from.id,
            username: ctx.from.username,
            displayName: ctx.from.first_name + ' ' + ctx.from.last_name
        });

        const token = response.data.token;
        ctx.reply('Welcome! Click the button below to open the web app.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Open Web App', web_app: { url: `${process.env.FRONTEND_URL}?token=${token}` } }]
                ]
            }
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        ctx.reply('An error occurred during authentication.');
    }
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