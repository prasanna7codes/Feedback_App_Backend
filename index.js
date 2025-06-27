import express from 'express'
import ConnectDB from './config/db';

import AuthRoutes from './routes/auth'



ConnectDB();


const app = express();


app.use(express.json());



app.use('/api/auth',AuthRoutes)



app.listen(3000)









