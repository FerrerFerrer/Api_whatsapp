import LeadExternal from "../domain/lead-external.repository";
import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import fs from 'fs';
const { MessageMedia, Buttons } = require('whatsapp-web.js');

const DIR_MEDIA = `${__dirname}/../../img`;

const qrcode = require('qrcode-terminal');

class WsTransporter extends Client implements LeadExternal {
  private status = false;

  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true },
    });

    console.log("Iniciando....");

    this.initialize();

    this.on("ready", () => {
      this.status = true;
      console.log("Listo para mandar mensajes");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("Ocurrio un error en el inicio de sesión");
    });

    this.on("qr", (qr) => {
      console.log('Escanea el codigo QR que esta en la carepta tmp')
      qrcode.generate(qr, { small:true});
      // this.generateImage(qr)
    });
  }

  /**
   * Enviar mensaje de WS
   * @param lead
   * @returns
   */
  async sendMsg(lead: { message: string; phone: string }): Promise<any> {
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const { message, phone } = lead;
      const response = await this.sendMessage(`${phone}@c.us`, message);
      console.log("message: "+ message+ " phone: "+ phone);
      
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  async sendFile(lead: { message: string; phone: string; }): Promise<any> {   
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const { message, phone } = lead;
      let fileDir = `${DIR_MEDIA}/${message}`;

      const media = MessageMedia.fromFilePath(fileDir);
      
      const response = await this.sendMessage(`${phone}@c.us`, media);
      console.log("Imagen " + message + " enviada");
      
      return { lead };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }



  getStatus(): boolean {
    return this.status;
  }

  // private generateImage = (base64: string) => {
  //   const path = `${process.cwd()}/tmp`;
  //   let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
  //   qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
  //   console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
  //   console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
  // };
}

export default WsTransporter;
