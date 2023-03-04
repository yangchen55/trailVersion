import CategorySchema from "./CategorySchema.js"

export const createNewCategory = (obj) => {
    return CategorySchema(obj).save()
}