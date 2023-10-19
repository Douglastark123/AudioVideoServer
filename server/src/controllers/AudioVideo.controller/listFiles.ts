import { Request, Response } from 'express'

import db from '../../utils/db'

const listFiles = async (request: Request, response: Response) => {
  const files = await db.files.findMany()
  const result = files.map((file) => ({
    ...file,
    size: Number(file.size),
  }))

  return response.json({ files: result })
}

export default listFiles
