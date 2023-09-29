import express from 'express'
import routes from './routes'
import cors from 'cors'
// import cors from 'cors'

const PORT = 3000

const app = express()

app.use(cors())
// app.use(express.json())
app.use(routes)

app.listen(PORT)
