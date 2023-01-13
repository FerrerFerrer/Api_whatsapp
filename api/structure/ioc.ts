import { ContainerBuilder } from "node-dependency-injection";
import { createMsj } from "../application/msj.send";
import textCtrl from "../controller/msjCtrl";
import WsTransporter from "../repositories/ws.ecternal";


const container = new ContainerBuilder();

container.register("ws.transporter", WsTransporter);
const wsTransporter = container.get("ws.transporter");

container
  .register("msj.creator", createMsj)
  .addArgument([wsTransporter]);

const msjCreator = container.get("msj.creator");

container.register("lead.ctrl", textCtrl).addArgument(msjCreator);

export default container;
