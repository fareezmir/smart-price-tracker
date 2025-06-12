import express from 'express'
import fs from 'fs/promises'

const PORT = 8000

const app = express()

app.get('/', (req, res) => {
    res.json({message: "Hello World"})
})

app.get('/api/scrape', async (req, res) => {
    const data = await fs.readFile(('../mock-product.json'), 'utf-8')
    res.json(JSON.parse(data))

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))