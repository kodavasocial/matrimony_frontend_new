import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/bootstrap.css"
import "../src/assets/css/style.css"
import "../src/assets/css/newcss.css"
import "../src/assets/css/mynewstyle.css"
import "../src/assets/css/tooltip.css"
import "../src/assets/css/mystyle.css"
import "../src/assets/css/owl.css"
import "../src/assets/css/AIChat.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { getLocalStorage } from "./Utils/LocalStorage";
import AppRoutes from "./Utils/AppRoutes";
import io from 'socket.io-client';


function App() {
  const [auth, setAuth] = useState(!!getLocalStorage("access_token"))
  return (
    <div className="App">
      <ToastContainer />
      <AppRoutes auth={auth} />
    </div>
  );
}

export default App;
