import 'dotenv/config'
import express from 'express';
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'
import {authMiddleware} from './middleware/auth.middleware.js'
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

app.get('/', (req,res)=>{
    return res.json({message : 'server is goody'})
})

app.use('/auth', userRouter)
app.use('/todo', todoRouter)

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))