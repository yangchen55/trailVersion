import { toast } from "react-toastify";
import { deleteCategory, getCategory, postCategory, updateCategory } from "../../helper/axios";
import { setCats } from "./categorySlice";


export const fetchCategory = () => async (dispatch) => {
  const { status, cats } = await getCategory()
  console.log(cats)
  status === "success" && dispatch(setCats(cats));


}


export const postNewCategory = (data) => async (dispatch) => {

  const resultPending = postCategory(data);
  console.log(resultPending)

  toast.promise(resultPending, {
    pending: "please wait ....",
  });

  const { status, message } = await resultPending;

  toast[status](message);
  status === "success" && dispatch(fetchCategory());
};

export const deleteCat = (data) => async (dispatch) => {
  const { status, message } = await deleteCategory(data)
  toast[status](message);
  status === "success" && dispatch(fetchCategory());
}

export const updateCat = (data) => async (dispatch) => {
  const resultPending = updateCategory(data);

  toast.promise(resultPending, {
    pending: "please wait ....",
  });

  const { status, message } = await resultPending;

  toast[status](message);

  status === "success" && dispatch(fetchCategory());

}