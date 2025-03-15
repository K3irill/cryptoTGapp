const sendMessageFromBot = async (message: string, userId: string) => {
	const token = process.env.NEXT_PUBLIC_BOT_TOKEN
	const url = `https://api.telegram.org/bot${token}/sendMessage`

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: userId,
			text: `${message}`,
		}),
	})

	const data = await response.json()

	if (data.ok) {
		console.log('Команда успешно отправлена')
	} else {
		console.error('Ошибка отправки команды:', data.description)
	}
}
