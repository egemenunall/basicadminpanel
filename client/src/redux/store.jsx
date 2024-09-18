import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import modalReducer from './reducers/modal';
import postReducer from './reducers/post';



const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    posts : postReducer
    // Diğer reducer'ları buraya ekleyin
  }
  
});

export default store;