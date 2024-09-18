import axios from "axios";
import { toast } from "react-toastify";

// Postları almak için action
export const getPostAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:5000/getPosts");
        dispatch({ type: "GET_POSTS", payload: data });
    } catch (error) {
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
};

export const createPostAction = (postData) => async (dispatch) => {
    try {
        const { data } = await axios.post("http://localhost:5000/createPost", postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: "CREATE_POST", payload: data });
    } catch (error) {
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
};

export const updatePostAction = (id, postData) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`http://localhost:5000/updatePost/${id}`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: "UPDATE_POST", payload: data });
    } catch (error) {
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
};

// Post silmek için action
export const deletePostAction = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/deletePost/${id}`);
        dispatch({ type: "DELETE_POST", payload: id });
        toast("Silme başarılı", {
            position: "top-right",
            autoClose: 5000,
        });
    } catch (error) {
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
};
