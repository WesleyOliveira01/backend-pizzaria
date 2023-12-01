import { Request,Response } from "express";
import { httpStatus } from "../../routes";
import { ItemDetailsService, ItemService, RemoveItemService } from "../../services/Item/Service";

type id = string

class ItemController{
    static async handler(req:Request,res:Response){
        try {
            const newItem = await ItemService.execute({...req.body})
            res.status(httpStatus.Sucess).json(newItem)
        } catch (error) {
            res.status(httpStatus.ServerError).json({error:error.message})
        }
    }
}

class ItemDetailsController{
    static async handler(req:Request,res:Response){
        try {
            const id:string = req.params.id 
            const itemDetails = await ItemDetailsService.execute(id)
            res.status(httpStatus.Sucess).json(itemDetails)
        } catch (error) {
            res.status(httpStatus.ServerError).json({error:error.message})
        }
    }
}

class RemoveItemController{
    static async handler(req:Request,res:Response){
        try {
            const id = req.params.id
            const removedItem = await RemoveItemService.execute(id)
            res.status(httpStatus.Sucess).json(removedItem)
        } catch (error) {
            res.status(httpStatus.ServerError).json({error:error.message})
        }
    }
}

export {ItemController,ItemDetailsController,RemoveItemController}