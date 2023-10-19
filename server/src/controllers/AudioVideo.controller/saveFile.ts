import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 } from 'uuid'

import isValidFileType from '../../shared'
import CustomError from '../../errors/CustomError'
import db from '../../utils/db'

const storage = multer.diskStorage({
  destination: path.join(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'uploads',
    'files',
  ),
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

const saveFile = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  uploadSingleFile(request, response, async (err) => {
    if (err) {
      return next(err)
    }

    const { file } = request

    if (!file) {
      return next(new CustomError(400, 'No file uploaded.'))
    }

    const { filename, originalname, mimetype, size } = file

    const [id, ext] = filename.split('.')

    await db.files.create({
      data: {
        id,
        filename: originalname,
        extension: `.${ext}`,
        mimetype,
        size,
      },
    })

    return response.status(200).json({
      file,
    })
  })
}

export default saveFile
