import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";

import Header from "./Components/Common/Header";
import Sidebar from "./Components/Common/Sidebar";
import MainRoute from "./Components/Route/MainRoute";

function App() {
  const { token } = useSelector((state) => state.adminAuth);

  return (
    <>
      <div className="App">
        {token && <Header />}
        {token && <Sidebar />}

        <MainRoute />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        transition={Zoom}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="colored"
      />
    </>
  );
}

export default App;
