import express, { request } from "express";
import { createNewAdmin, findUser, updateAdmin } from "../models/admin/AdminModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { emailOtp, emailVerifiedNotification, newAccountEmailVerificationEmail, passwordUpdateNotification } from "../utils/nodemailer.js";
import { emailVerificationValidation, loginValidation, newAdminValidation } from "../middlewares/joimiddleware.js";
import { createNewSession, DestroyToken } from "../models/session/SessionModel.js";

const router = express.Router();


//admin user loging
router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // find user by email
        const user = await findUser({ email });
        console.log(user)

        if (user?._id) {
            if (!user?.isEmailVerified) {
                return res.json({
                    status: "error",
                    message:
                        "You email is not veirfied. Check your email and follow the instruction and verify your account.",
                    user,
                });
            }


            //     // check if plain password and hashed password match
            const isPassMatch = comparePassword(password, user.password);

            //login successfull or invalid login details
            if (isPassMatch) {
                user.password = undefined;
                user.__v = undefined;
                res.json({
                    status: "success",
                    message: "Login success fully",
                    user,
                });

                return;
            }

        }
        res.json({
            status: "error",
            message: "Invalid Login Details",
        });
    } catch (error) {
        next(error);
    }
});
router.post("/verify", emailVerificationValidation, async (req, res, next) => {
    try {
        // chek if the combination of email and code exist in db if so set the status active and code to "" in the db, also update is email verified to true

        const obj = {
            status: "active",
            isEmailVerified: true,
            emailVerificationCode: "",
        };

        const user = await updateAdmin(req.body, obj);
        console.log(user)

        if (user?._id) {
            //send email notification
            // emailVerifiedNotification(user);
            emailVerifiedNotification(user)

            res.json({
                status: "success",
                message: "Your account has been verified. You may login now",
            });

            return;
        }

        res.json({
            status: "error",
            message: "The link is invalid or expired.",
        });
    } catch (error) {
        next(error);
    }
});


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
const numString = (lenght) => {
    let num = "";

    for (let i = 0; i < lenght; i++) {
        num += Math.floor(Math.random() * 10);
    }

    return num;
};

router.post("/request-otp", async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.json({
                status: "error",
                message: "invalid email"
            })
        }
        const user = await findUser({ email })

        if (user?._id) {

            const token = numString(6)
            const obj = {
                token,
                associate: email
            };


            const result = await createNewSession(obj)
            if (result?._id) {
                emailOtp({ email, token });
                return res.json({
                    status: "success",
                    message:
                        "We have sent you an OTP to your email, chek your email and fill up the form below.",
                });

            }
        }
        return res.json({
            status: "error",
            message: "invalid email"
        });

    } catch (error) {
        next(error)

    }
})

router.patch("/reset-password", async (req, res, next) => {
    try {
        const { otp, email, password } = req.body;
        const token = otp
        const result = await DestroyToken({ email, token })
        if (result?._id) {
            const user = await updateAdmin(
                { email },
                { password: hashPassword(password) }
            )
            if (user?.id) {
                passwordUpdateNotification(user)

                return res.json({
                    status: "success",
                    message: "You password has been updated successfully",
                });

            }

        }

        res.json({
            status: "error",
            message: "Unable to update your password. Invalid or expired token",
        });

    } catch (error) {
        next(error)

    }

}
)

export default router;
