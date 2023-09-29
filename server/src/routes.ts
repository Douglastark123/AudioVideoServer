import { Request, Response, Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import AudioVideoController from './controllers/AudioVideo.controller'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'hello world!' })
})
routes.get('/fileList', AudioVideoController.fileList)
routes.get('/file/:fileId', AudioVideoController.getFile)

routes.post('/file', upload.single('file'), AudioVideoController.save)

export default routes
