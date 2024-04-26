import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import cors from 'cors';


const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
