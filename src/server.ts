import express from 'express'
import cors from 'cors'
import path from 'path'
import { routes } from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(
  '/files',
  express.static(path.resolve(__dirname,'..','tmp'))
)

const port = 3000

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})