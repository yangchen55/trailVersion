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



export const updateCategory = ({ _id, ...rest }) => {
    return CategorySchema.findByIdAndUpdate(_id, rest, { new: true });
};