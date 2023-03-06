import CategorySchema from "./CategorySchema.js"

export const createNewCategory = (obj) => {
    return CategorySchema(obj).save()
}

export const getCategory = () => {
    return CategorySchema.find()
}

export const deleteCategory = (_id) => {
    return CategorySchema.findByIdAndDelete(_id)
}