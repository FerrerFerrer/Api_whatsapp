import "dotenv/config"
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import routes from "./structure/routes"

const port = process.env.PORT || 3001;
const app = express();


app.use(cors());
app.use(express.json());
app.use('/', routes)

app.listen(port, () =>   console.log('Puerto '+ port +' listo, espera un momento...'));