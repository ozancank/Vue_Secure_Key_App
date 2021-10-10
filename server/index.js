import express from 'express';
import router from './router';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ status: false, message: err.message });
});

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connected) => {
        app.listen(PORT, (_) => console.log(`Working on ${PORT}`));
    });
