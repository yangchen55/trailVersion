import express from "express";
import { createNewAdmin } from "../models/admin/AdminModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { newAccountEmailVerificationEmail } from "../utils/nodemailer.js";
import { newAdminValidation } from "../middlewares/joimiddleware.js";

const router = express.Router();

router.post("/register", newAdminValidation, async (req, res, next) => {
    try {
        req.body.password = hashPassword(req.body.password)
        req.body.emailVerificationCode = uuidv4();



        const result = await createNewAdmin(req.body);
        if (result?._id) {
            const uniqueLink = `${process.env.FRONTEND_ROOT_URL}/verify?c=${result.emailVerificationCode}&email=${result.email}`;
            newAccountEmailVerificationEmail(uniqueLink, result)

            res.json({
                status: "success",
                message:
                    "We have send a verification email. Please check your email, inclucing junk folder, and follow the instruction to verify your account.",
            });

            return;


        }
        console.log(result, req.body.password)


        res.json({
            status: "error",
            message: "Error, Unable to create a new user has been registered",
        });


    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is already account exist associated with this email";
            error.errorCode = 200;

        }
        next(error)

    }
})

export default router;
