import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction, updatePostAction } from '../redux/actions/post';
import { toast } from 'react-toastify';
import axios from 'axios';

const Modal = () => {
    const { modal } = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ user: "", title: "", description: "" });
    const [image, setImage] = useState(null); // Yeni resim dosyası için
    const [currentImage, setCurrentImage] = useState(null); // Mevcut resim URL'si için

    // Eğer modal güncelleme modundaysa mevcut post verilerini al
    useEffect(() => {
        const fetchPost = async () => {
            if (modal?.updateId) {
                try {
                    const response = await axios.get(`http://localhost:5000/posts/${modal.updateId}`);
                    const currentPost = response.data;
                    
                    // Gelen verileri set et
                    setPostData({
                        user: currentPost.user || '',
                        title: currentPost.title || '',
                        description: currentPost.description || ''
                    });
                    setCurrentImage(currentPost.image); // Mevcut resmi set et
                } catch (error) {
                    console.error("Post verisi alınırken hata oluştu:", error);
                }
            }
        };

        fetchPost();
    }, [modal?.updateId]);

    const onChangeFunc = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        setImage(e.target.files[0]); // Yeni resim dosyasını state'e al
    };

    const postCreate = () => {
        const formData = new FormData();
        formData.append('user', postData.user);
        formData.append('title', postData.title);
        formData.append('description', postData.description);
    
        // Yeni resim varsa formData'ya ekle, yoksa mevcut resmi ekle
        if (image) {
            formData.append('image', image);
        } else if (currentImage) {
            formData.append('existingImage', currentImage); // Mevcut resim adı
        }
    
        if (modal?.updateId) {
            dispatch(updatePostAction(modal.updateId, formData));
            dispatch({ type: "MODAL", payload: false });
            toast("Güncelleme başarılı", {
                position: "top-right",
                autoClose: 5000,
            });
        } else {
            dispatch(createPostAction(formData));
            dispatch({ type: "MODAL", payload: false });
            toast("Ekleme başarılı", {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
            <div className='bg-white w-1/3 p-2 rounded-md modal-container'>
                <div onClick={() => dispatch({ type: "MODAL", payload: false })} className='flex items-center justify-between cursor-pointer'>
                    <h1 className='font-bold text-2xl'>{modal?.updateId ? "Ürün Güncelle" : "Ürün Ekle"}</h1>
                    <AiOutlineClose size={25} />
                </div>

                <div className='my-4 flex flex-col space-y-3'>
                    <input name='user' onChange={onChangeFunc} value={postData.user} className='border p-2 rounded-md outline-none' type="text" placeholder='user' />
                    <input name='title' onChange={onChangeFunc} value={postData.title} className='border p-2 rounded-md outline-none' type="text" placeholder='title' />
                    <input name='description' onChange={onChangeFunc} value={postData.description} className='border p-2 rounded-md outline-none' type="text" placeholder='description' />
                    
                    {/* Resim Dosyası Yükleme */}
                    <input type="file" onChange={onImageChange} className='border p-2 rounded-md outline-none' />
                    
                    {/* Mevcut Resmi Göster */}
                    {currentImage && (
                        <div className='mt-4'>
                            <img src={`http://localhost:5000/uploads/${currentImage}`} alt="Mevcut Resim" className='modal-content' />
                        </div>
                    )}
                </div>
                <div onClick={postCreate} className='w-full p-2 text-center bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800'>
                    {modal?.updateId ? "Güncelle" : "Ekle"}
                </div>
            </div>
        </div>
    );
}

export default Modal;
