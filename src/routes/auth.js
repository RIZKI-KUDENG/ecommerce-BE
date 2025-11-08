import express from 'express';
const authRoute = express.Router();
import { register, login } from '../controllers/authControllers.js';

authRoute.post('/register', register);
authRoute.post('/login', login);

export default authRoute;