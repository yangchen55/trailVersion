import express from "express";
import { createNewCategory, deleteCategory, getCategory, updateCategory } from "../models/category/CategoryModel.js";
import slugify from "slugify";

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const cats = await getCategory()
        res.json({
            status: "success",
            message: "Here is the cat lists",
            cats,
        });
    } catch (error) {
        next(error)

    }

}
)

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

router.delete("/:_id", async (req, res, next) => {
    const { _id } = req.params
    console.log(_id)

    const result = await deleteCategory(_id)
    if (result?._id) {
        return res.json({
            status: "success",
            message: "The category has been deleted successfully",
        });
    }
    try {
        res.json({
            status: "error",
            message: "Unable to delete the category, try again later",
        });


    } catch (error) {
        next(error)

    }
})



router.put("/", async (req, res, next) => {
    try {
        const result = await updateCategory(req.body);

        if (result?._id) {
            return res.json({
                status: "success",
                message: "The Category has been updated!",
                result,
            });
        }
        res.json({
            status: "error",
            message: "Unanble to upda the category, please try gain later",
        });
    } catch (error) {
        next(error);
    }
});
export default router