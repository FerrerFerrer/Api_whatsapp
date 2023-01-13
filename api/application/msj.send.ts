import { Request, Response } from "express";
import LeadExternal from "../domain/lead-external.repository";

export class createMsj {
  private leadExternal: LeadExternal;

  constructor(respositories: [LeadExternal]) {
    const [leadExternal] = respositories;
    this.leadExternal = leadExternal;
  }
  
  public async sendMessageAndSave({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }) {
    const responseExSave = await this.leadExternal.sendMsg({ message, phone }); //TODO enviar a ws
    return { responseExSave };
  }

  public async sendImage({ message, phone }: { message: string; phone: string }) {
    const responseExSave = await this.leadExternal.sendFile({ message, phone }); //TODO enviar a ws
    return { responseExSave };
  }
}
