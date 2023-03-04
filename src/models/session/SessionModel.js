import SessionSchema from "./SessionSchema.js"

export const createNewSession = (obj) => {
    return SessionSchema(obj).save()

}
export const DestroyToken = (filter) => {
    return SessionSchema.findOneAndDelete(filter)
}