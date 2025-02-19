require('dotenv').config()
const express = require('express')
const cors = require('cors')
const CONTENT = require('./content')

const app = express()
app.use(cors())

app.get('/api/content', (req, res) => {
	res.json(CONTENT)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
