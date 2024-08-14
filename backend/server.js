import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import dataRoutes from "./routes/data.routes.js";
import connectDB from "./db/connectDB.js";
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const __dirname = path.resolve();
dotenv.config();

const PORT = process.env.PORT || 3000;

const CORS = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express();
app.use(cors(CORS));
app.use(express.json())
app.use(cookieParser())

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

app.use(express.static(path.join(__dirname, '/client')));

app.use('/api/auth', authRoutes)
app.use('/api/data', dataRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is up on http://localhost:${PORT}`);
});
