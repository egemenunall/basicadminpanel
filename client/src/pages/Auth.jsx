import React, { useState } from 'react'
import { loginAction, registerAction } from '../redux/actions/auth';
import {useDispatch} from "react-redux"

const Auth = () => {
    const [signUp, setSignUp] = useState(true);
    const [authData, setAuthData] = useState({username:"", password:""});

    const dispatch = useDispatch();

    const authFunc = ()=>{
        if(signUp){
            dispatch(registerAction(authData))
        }else{
            dispatch(loginAction(authData))
        }
    }

    const onChangeFunch = (e) =>{
        setAuthData({...authData, [e.target.name] : e.target.value})
    }
    console.log("authdata", authData)
  return (
    <div className='w-full h-screen bg-gray-200 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50'>
        <div className='w-1/3 bg-white p-3'>
            <h1 className='text-2xl text-gray-700 text-center font-bold my-5'>{signUp ? "REGISTER" : "LOGIN" }</h1>
            <div className='flex flex-col space-y-3 mb-5'>
                <input value={authData.username} name='username' onChange={onChangeFunch} type="text" placeholder='username' className='border p-2 rounded-md outline-none' />
                <input value={authData.password} name='password' onChange={onChangeFunch} type="text" placeholder='password' className='border p-2 rounded-md outline-none' />
            </div>
            <div className='text-red-500 text-xs cursor-pointer mb-4'>
                {
                    signUp ? <span onClick={()=>setSignUp(false)}>Daha önce giriş yaptınız mı?</span> : <span onClick={()=>setSignUp(true)}>Kayıt Olmak için tıklayınız</span>
                }
            </div>
            <div onClick={authFunc} className='w-full p-2 text-center bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-800'>{signUp ? "Kayıt Ol" : "Giriş Yap"}</div>
        </div>
    </div>
  )
}

export default Auth