import { Request,Response,NextFunction } from "express";
import { httpStatus } from "../routes";
import jwt from 'jsonwebtoken'

type payload = {
  sub:string
}

export const authValidate = async (req:Request,res:Response,next:NextFunction) => {
  const authToken = req.headers.authorization  
  try {
    const [,token] = authToken.split(' ')
    const {sub} = jwt.verify(token,process.env.JWT_SECRET) as payload
    req.userId = sub
    next()
  } catch (error) {
    res.status(httpStatus.unauthorized).end()
  }
}