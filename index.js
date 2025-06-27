import express from 'express'
import ConnectDB from './config/db';



ConnectDB();


const app = express();


app.use(express.json());








