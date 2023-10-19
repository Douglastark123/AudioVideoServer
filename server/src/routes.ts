import { Request, Response, Router } from 'express'

import ErrorHandler from './errors/Handler'
import AudioVideoController from './controllers/AudioVideo.controller'

const routes = Router()

routes.get('/test', (request: Request, response: Response) => {
  response.json({ msg: 'hello' })
})

routes.post('/file', AudioVideoController.saveFile)
routes.get('/files', AudioVideoController.listFiles)
routes.get('/file/:fileId', AudioVideoController.getFile)

routes.use(ErrorHandler)

export default routes
