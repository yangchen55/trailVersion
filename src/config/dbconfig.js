import mongoose from "mongoose"
export const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", true);

        const conn = await mongoose.connect(process.env.MONGO_CLIENT)

        conn?.connections
            ? console.log("db connected")
            : console.log("unable to connect mongo db")


    } catch (error) {
        console.log(error)

    }

}