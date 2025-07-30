import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import entriesRoutes from './routes/entryRoutes.js'
import usersRoutes from './routes/userRoutes.js'


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded forms

app.use('/api/entries', entriesRoutes);
app.use('/api/users', usersRoutes);

const startServer = async() =>{
    try{
        console.log('Attempting to start server')

        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log('MongoDB connected');
            app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        }).catch(err => {
            console.error('MongoDB connection error:', err);
        });
    }catch(error)
    {
        console.error('Failed to start server:', error);
        process.exit(1)
    }
}

startServer()

