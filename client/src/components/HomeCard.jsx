import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineUpdate } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction } from '../redux/actions/post';
import { toast } from 'react-toastify';

const HomeCard = ({ post }) => {
    const dispatch = useDispatch();
    const { modal } = useSelector(state => state.modal);

    const deletePost = (id) => {
        dispatch(deletePostAction(id));
        toast("Silme başarılı", {
            position: "top-right",
            autoClose: 5000,
        });
    };

    const updatePost = (id) => {
        dispatch({ type: "MODAL", payload: { open: true, updateId: id } });
    };

    return (
        <div className='relative w-1/4 border p-3 rounded-md bg-gray-50'>
            {post?.image && (
                <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                    className='w-full h-32 object-cover rounded-md'
                />
            )}
            <div className='font-bold text-xl mt-2'>{post?.title}</div>
            <div className='text-sm text-gray-700'>{post?.description}</div>
            <div className='absolute -top-3 -right-3 flex items-center space-x-3'>
                <MdDeleteOutline
                    onClick={() => deletePost(post._id)}
                    size={22}
                    className='bg-red-500 rounded-full text-white p-1 cursor-pointer'
                />
                <MdOutlineUpdate
                    onClick={() => updatePost(post._id)}
                    size={22}
                    className='bg-blue-500 rounded-full text-white p-1 cursor-pointer'
                />
            </div>
        </div>
    );
};

export default HomeCard;
