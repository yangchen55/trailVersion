import { toast } from "react-toastify";
import { deletePayment, getPM, postPM, updatePayment } from "../../helper/axios"
import { setShowModal } from "../../system/systemSlice"
import { setPaymentMethods } from "./PaymentSlice";

export const getPayment = () => async (dispatch) => {
    const { status, payments } = await getPM()
    if (status === "success") {
        dispatch(setPaymentMethods(payments))

    }
    console.log(payments)

}


export const postPayment = (data) => async (dispatch) => {
    const { status, message } = await postPM(data)
    console.log(status, message)
    toast[status](message);
    if (status === 'success') {
        dispatch(setShowModal(false))
        dispatch(getPayment())
    }

}

export const deletePaymentMethod = (_id) => async (dispatch) => {
    console.log(_id, " i am from deletePayment action")
    const { status, message } = await deletePayment(_id)
    toast[status](message)
    if (status === 'success') {
        dispatch(getPayment())
    }
}

export const updatePaymentMethod = (data) => async (dispatch) => {
    const { status, message } = await updatePayment(data)
    toast[status](message)
    if (status === 'success') {
        dispatch(getPayment())
        dispatch(setShowModal(false))
    }


}