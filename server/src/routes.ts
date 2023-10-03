import { Router } from 'express'
import ErrorHandler from './errors/Handler'
import AudioVideoController from './controllers/AudioVideo.controller'

const routes = Router()

routes.post('/file', AudioVideoController.save)
routes.get('/file', AudioVideoController.listFiles)
routes.get('/file/:fileId', AudioVideoController.getFile)

routes.use(ErrorHandler)

export default routes
