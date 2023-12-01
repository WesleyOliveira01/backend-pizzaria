import crypto from 'crypto'
import multer from 'multer'
import {resolve} from 'path'

export default {
    upload(folder:string){
        return{
            storage:multer.diskStorage({
                destination:resolve(__dirname,'..',folder),
                filename:(req,file,callback) => {
                    const hashname = crypto.randomBytes(16).toString('hex')
                    const name = `${hashname}-${file.originalname}`
                    return callback(null,name)
                }
            })
        }
    }
}