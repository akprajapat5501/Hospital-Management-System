config({path: './config/config.env'});
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import {dbConnection} from './database/dbConnection.js';
import messageRoute from './routes/messageRoute.js';
import userRoute from './routes/userRoute.js';
import {errorMiddleware} from './middlewares/errorMiddleware.js';
import appointmentRoute from './routes/appointmentRoute.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://hospital-management-system-nu-three.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// VERY IMPORTANT
app.options("*", cors());



app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.use('/api/v1/message', messageRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/appointment', appointmentRoute);

dbConnection();

app.use(errorMiddleware);
export default app;
