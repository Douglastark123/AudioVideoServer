import { NextFunction, Request, Response } from 'express'
import path from 'path'

import db from '../../utils/db'
import CustomError from '../../errors/CustomError'

const getFile = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { fileId } = request.params

  const file = await db.files.findUnique({
    where: {
      id: fileId,
    },
  })

  if (!file) {
    return next(
      new CustomError(400, "Sorry, but there's no file with such id."),
    )
  }

  const { id, filename } = file

  const fileName = `${id}${filename.slice(filename.lastIndexOf('.'))}`

  return response.sendFile(
    fileName,
    {
      root: path.join(__dirname, '..', '..', '..', 'tmp', 'uploads', 'files'),
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
}

export default getFile
