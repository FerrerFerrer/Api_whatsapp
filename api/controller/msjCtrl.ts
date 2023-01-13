import { Request, Response } from "express";
import { createMsj } from "../application/msj.send";

class textCtrl{
 
    constructor(private readonly leadCreator: createMsj){}

    public sendCtrl = async ({ body }: Request, res: Response) => {
        const { message, phone } = body;
        const response = await this.leadCreator.sendMessageAndSave({ message, phone })
        res.send(response);
    };

    public sendImgCtrl = async ({ body }: Request, res: Response) => {
      const { message, phone } = body;
      const response = await this.leadCreator.sendImage({ message, phone })
      res.send(response);
  };

}

export default textCtrl;