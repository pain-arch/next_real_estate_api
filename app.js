import express from 'express';
import authRoute from './routes/auth.route.js';


const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
