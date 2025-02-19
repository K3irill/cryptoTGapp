require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx =>
	ctx.reply('Добро пожаловать в PugoStars! Начни с выполнения задания.')
)

bot.command('task', ctx => {
	ctx.reply('Задания: 1. Подпишись на канал. 2. Пригласи друга.')
})

bot.command('buytokens', ctx => {
	ctx.reply('Для покупки токенов используйте Telegram Stars.')
})

bot.launch()
console.log('погнаааааааааааалиииииииииииы')
