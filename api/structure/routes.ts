import { readdirSync } from "fs";
import { Router } from "express";
import textCtrl from "../controller/msjCtrl";
import container from "./ioc";

class ListaRutas{
    
    router: Router = Router();

    constructor(){
        this.config();
    }
    

    config(){
    const textCtrl: textCtrl = container.get("lead.ctrl")
        this.router.post('/msjText', textCtrl.sendCtrl);

        this.router.post('/msjImg', textCtrl.sendImgCtrl);
    }


}

export default new ListaRutas().router;