import { NextFunction, Request, Response } from 'express'
import CustomError from './CustomError'

const ErrorHandler = (
  err: CustomError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err) {
    return response.status(err.status).json({ message: err.message })
  }
}

export default ErrorHandler
