import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('text', ctx => {
	ctx.reply(`Ты сказал: ${ctx.message.text}`)
})

export default async function handler(req, res) {
	await bot.handleUpdate(req.body)
	res.status(200).send('ok')
}
