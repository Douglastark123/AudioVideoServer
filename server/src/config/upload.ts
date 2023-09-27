import multer from 'multer'
import path from 'path'
import { v4 } from 'uuid'

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'tmp', 'files'),
    filename: (request, file, cb) => {
      const fileExtension = file.originalname.slice(
        file.originalname.lastIndexOf('.'),
      )

      const filename = `${v4()}${fileExtension}`

      cb(null, filename)
    },
  }),
}
