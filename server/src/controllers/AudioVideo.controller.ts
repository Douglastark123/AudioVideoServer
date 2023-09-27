import { Request, Response } from 'express'
import db from '../utils/db'

export default {
  async fileList(request: Request, response: Response) {
    const files = await db.files.findMany()
    return response.json(files)
  },

  async getFile(request: Request, response: Response) {
    // const files = await db.files.findMany()
    const { fileId } = request.params
    console.log(typeof fileId)
    return response.json({ msg: 'hi' })
  },

  async save(request: Request, response: Response) {
    const { file } = request

    if (!file) {
      return response.status(400).json({ error: 'No file uploaded' })
    }

    await db.files.create({
      data: {
        id: file.filename.slice(0, file.filename.indexOf('.')),
        fileName: file.originalname,
      },
    })
    // .then(async () => {
    //   await db.$disconnect()
    // })
    // .catch(async (e) => {
    //   console.error(e)
    //   await db.$disconnect()
    //   process.exit(1)
    // })

    console.log(file)

    return response.json({
      msg: 'Upload successful',
    })
  },
}
