import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("velocimarket");

@Injectable()
export class UploadImageService {
  
  public upload( userId: number, file: Express.Multer.File){
    try {
      return new Promise<string>( (resolve, reject) => {

        const { originalname, buffer } = file;
        const extension = originalname.split('.').pop();
        const imageID = uuidv4();
        const fileName = `${userId}_${imageID}.${extension}`;
        
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream();
        
        blobStream.on("error", (error) => {
          throw new InternalServerErrorException(`Error: ${error}`);
        });
        
        blobStream.on("finish", async (data) => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
          resolve(publicUrl);
        });
  
        blobStream.end(buffer);
      } );

    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

}
