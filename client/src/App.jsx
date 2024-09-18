import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useToken from "./hooks/useToken";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";


function App() {
  const [token] = useToken();
  const {modal} = useSelector(state => state.modal);
  console.log("modal:",modal)
  return (
    <>
      <BrowserRouter>
          {token && <Navbar />}  
          {modal && <Modal/>}
          <Routes>
            <Route path="/" element={!token ?<Navigate to="/auth" />  : <Home /> } />
            <Route path="/auth" element={<Auth />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
