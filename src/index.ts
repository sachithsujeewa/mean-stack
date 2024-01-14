import * as dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from 'express'
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";


const app = express()
const port = process.env.PORT || 8080

dotenv.config();

const { ATLAS_URI } = process.env;

const startServer = async () => {
    try {
        await connectToDatabase(ATLAS_URI || "mongodb://localhost:27017");

        app.use(cors()); // Allow requests from any site and for any methods

        app.use("/employees", employeeRouter);
        
        app.get('/', (_req: Request, res: Response) => {
            return res.send('Express Typescript on Vercel')
        })

        app.get('/ping', (_req: Request, res: Response) => {
            return res.send('pong 🏓')
        })

        app.listen(port, () => {
            return console.log(`Server is listening on ${port}`)
        })
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

startServer()
