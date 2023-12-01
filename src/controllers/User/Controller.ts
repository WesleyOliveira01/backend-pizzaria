import { Request,Response } from "express";
import { httpStatus } from "../../routes";
import { UserService } from "../../services/User/Service";

export class UserController{
    static async handler(req:Request,res:Response){
        try {
            const newUser = await UserService.execute({...req.body})
            res.status(httpStatus.Sucess).json(newUser)
        } catch (e) {
            res.status(httpStatus.ServerError).json({error:e.message})
        }
    }
}