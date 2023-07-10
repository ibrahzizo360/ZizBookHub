import Axios from "./Axios";
import { toast } from "react-toastify"

export const SIGNUP = async (info, callback) => {
    try {
        const { data } = await Axios({
            url: "auth/signup",
            method: "POST",
            data:info
        });
        console.log(data);
        callback(data.userInfo);

    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "signupToast",
            }
        );
    }
}
export const SIGNIN = async (credentials, callback) => {
    try {
        const { data } = await Axios({
            url: "auth/login",
            method: "POST",
            data:credentials
        });
        callback(data.result.access_token);

    } catch (e) {
        toast.error(
            e?.response?.data?.detail || e?.message || "Check console for error",
            {
                toastId: "signupToast",
            }
        );
    }
}