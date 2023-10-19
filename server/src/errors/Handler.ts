import { Request, Response } from 'express'
import CustomError from './CustomError'

const ErrorHandler = (
  err: CustomError,
  request: Request,
  response: Response,
) => {
  if (err) {
    return response.status(err.status).json({ message: err.message })
  }
}

export default ErrorHandler
