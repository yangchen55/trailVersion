import dotenv from "dotenv";
// to connect environment variable
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./src/config/dbconfig.js";
const app = express();
// port is environment variable PORT if exist or 8000 . 
const PORT = process.env.PORT || 8000;

dbConnect();

// let the express is app so it allowed to use cors, express..json or moragn 
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


import adminRouter from "./src/routers/adminRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", categoryRouter)


// root url request
app.use("/", (req, res, next) => {
    const error = {
        message: "you dont have permission here: you are stopped by server.js "
    }
    next(error)
})

app.use((error, req, res, next) => {
    console.log(error)
    const statusCode = error.errorCode || 404;
    res.status(statusCode).json({
        status: "error",
        message: error.message,
    });

})

app.listen(PORT, (error) => {
    error
        ? console.log(error)
        : console.log(`Server running at http://localhost:${PORT}`);
});


