import { loginAdmin } from "../../helper/axios";
import { requestPending, requestSuccess } from "./authSlice";
import { toast } from "react-toastify";

export const loginAction = (formData) => async (dispatch) => {
    try {
        dispatch(requestPending());

        // call axios - helper / api
        const pendingResp = loginAdmin(formData);

        toast.promise(pendingResp, { pending: "Please wait ...." });

        const { status, message, user } = await pendingResp;
        toast[status](message);

        status === "success"
            ? dispatch(requestSuccess(user))
            : dispatch(requestSuccess({}));
    } catch (error) {
        return {
            status: "error",
            message: error.messsage,
        }
    }
};