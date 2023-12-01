import { db } from "../prisma/DbConnect";
import {hash} from 'bcryptjs'

type newUser = {
    name:string,
    email:string,
    password:string
}

export class UserService{
    static async execute({name,email,password}:newUser){
        const hasUser = await db.user.findFirst({where:{email}})
        if(hasUser) throw new Error("User already exist");
        if(!name)throw new Error("Name is required");
        if(!email)throw new Error("E-mail is required");
        if(!password)throw new Error("Password is required");

        const hashedPassword = await hash(password,8)

        const user = await db.user.create({data:{name,email,password:hashedPassword},select:{name:true,email:true}})

        return user 
    }
}