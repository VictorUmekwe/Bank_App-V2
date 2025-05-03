import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { authRoute } from "./routes/authRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { transactionsRoute } from "./routes/transactionsRoute.js";
import { chatRoute } from "./routes/chatRoute.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;


app.get("/", (req, res) => {
    res.send("Hello from the server!");
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/chat', chatRoute)
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(notFound)
app.use(errorHandler)



const startServer = async() => {
    try {
        await connectDB()
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
      console.log(error);
         
    }
}

startServer();