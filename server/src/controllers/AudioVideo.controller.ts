import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 } from 'uuid'
import isValidFileType from '../shared'
import CustomError from '../errors/CustomError'
import db from '../utils/db'

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'tmp', 'uploads', 'files'),
  filename: (request, file, cb) => {
    const fileExtension = file.originalname.slice(
      file.originalname.lastIndexOf('.'),
    )

    const filename = `${v4()}${fileExtension}`

    cb(null, filename)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const { mimetype } = file

    if (isValidFileType(mimetype)) {
      cb(null, true)
    } else {
      cb(new CustomError(400, 'Invalid file format'))
    }
  },
})

const uploadSingleFile = upload.single('file')

export default {
  async save(request: Request, response: Response, next: NextFunction) {
    uploadSingleFile(request, response, async (err) => {
      if (err) {
        return next(err)
      }

      const { file } = request

      if (!file) {
        return next(new CustomError(400, 'No file uploaded.'))
      }

      await db.files.create({
        data: {
          id: file.filename.slice(0, file.filename.indexOf('.')),
          fileName: file.originalname,
        },
      })

      return response.status(200).json({
        filename: file?.filename,
        mimetype: file?.mimetype,
        originalname: file?.originalname,
        size: file?.size,
        fieldname: file?.fieldname,
      })
    })
  },

  async listFiles(request: Request, response: Response) {
    const files = await db.files.findMany()
    return response.json({ files })
  },

  async getFile(request: Request, response: Response, next: NextFunction) {
    const { fileId } = request.params

    const files = await db.files.findUnique({
      where: {
        id: fileId,
      },
    })

    if (!files) {
      return response
        .status(400)
        .json({ message: "Sorry, but there's no file with such id." })
    }

    const fileName = path.join(
      __dirname,
      '..',
      '..',
      'tmp',
      'uploads',
      'files',
      `${files.id}${files.fileName.slice(files.fileName.lastIndexOf('.'))}`,
    )

    return response.sendFile(
      fileName,
      {
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
        },
      },
      (err) => {
        if (err) {
          return next(new CustomError(500, 'Server Error'))
        } else {
          console.log('Sent: ', fileName)
        }
      },
    )
  },
}
