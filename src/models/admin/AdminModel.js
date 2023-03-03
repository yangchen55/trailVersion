import AdminSchema from "./AdminSchema.js"

export const createNewAdmin = (obj) => {
    return AdminSchema(obj).save();
}
export const findUser = (a) => {
    return AdminSchema.findOne(a)
}

export const updateAdmin = (filter, obj) => {
    return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
};