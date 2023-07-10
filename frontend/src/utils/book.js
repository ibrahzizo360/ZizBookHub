import Axios from "./Axios";
import { toast } from "react-toastify"

export const REGISTERBOOK = async (bookData, callback) => {
    try {
        const { data } = await Axios({
            url: "books/",
            method: "POST",
            data: bookData,
            headers: {
                "Content-Type": "multipart/form-data",
              }
        });
        
        callback(data.details);

    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "signupToast",
            }
        );
    }
}
