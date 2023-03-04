import express from "express";
import { createNewCategory } from "../models/category/CategoryModel.js";
import slugify from "slugify";
const router = express.Router()

router.post("/", async (req, res, next) => {
    try {

        const { name } = req.body;
        if (name.length && typeof name === "string") {
            const obj = {
                name,
                slug: slugify(name, {
                    lower: true,
                    trim: true,
                }),
            };

            const result = await createNewCategory(obj)
            if (result?._id) {
                return res.json({
                    status: " success",
                    message: "succes at router",
                    result
                })
            }
        }
        res.json({
            status: "error",
            message: "Unable to create the category, Please try again later.",
        });

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.errorCode = 200;
            error.message =
                "This category has been alredy created, change the name and try again later";
        }
        next(error)

    }

})

export default router