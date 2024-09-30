import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Connections/DBconnection.js';
import userRoute from './routes/user_route.js';
import companyRoute from './routes/company_route.js';
import jobRoute from './routes/job_route.js';
import applicationRoute from './routes/application_route.js';
dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extendedd: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

const PORT = process.env.PORT || 5000;

// Api's
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute)
app.use("/api/application", applicationRoute)

//  "http://localhost:8000/api/user/register"

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);

})