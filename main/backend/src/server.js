import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userController from './controllers/userController.js';
import courtController from './controllers/courtController.js';
import authMiddleware from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();  
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/courtApp';

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);
app.post('/api/users/logout', userController.logout);

app.get('/api/users/profile',  authMiddleware, userController.getProfileInfo);

app.get('/api/courts', courtController.getAllCourts);
app.get('/api/courts/:id/details', courtController.getCourtById);
app.post('/api/courts/create', authMiddleware, courtController.addCourt);
app.put('/api/courts/:id/edit', authMiddleware, courtController.updateCourt);
app.delete('/api/courts/:id/delete', authMiddleware, courtController.deleteCourt);
app.get('/api/courts/search', courtController.searchCourts);

app.post('/api/courts/:id/comments', authMiddleware, courtController.addComment);
app.put('/api/courts/:id/comments/:commentId', authMiddleware, courtController.updateComment);
app.delete('/api/courts/:id/comments/:commentId', authMiddleware, courtController.deleteComment);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
