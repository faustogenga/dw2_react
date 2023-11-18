/*CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import './CSS/ComStyle.css'; // Import the ComponentCSS file
import './CSS/Login.css' //Login CSS 
import "bootstrap-icons/font/bootstrap-icons.css";


/**Routing */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useState } from 'react';


function App() {

  return (
    <>
      <div className='container-fluid'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
