import React from "react";
import AddResto from "../components/Restaurant/AddResto";
import EditResto from "../components/Restaurant/EditResto";
import ViewResto from "../components/Restaurant/ViewResto";
import ForgetPassword from "../Pages/ForgetPassword";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import RestoList from "../components/Restaurant/RestoList";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../Pages/NotFound";
import Header from "../components/Header";
const RoutesComponent = () => {
  const authUser = useSelector((state) => state.user.userObj);
  const userData = localStorage.getItem("data");
  console.log("Local data", userData);
  return (
    <div>
      {userData ? <Header /> : null}

      <Routes>
        {/* {userData == "" || authUser == undefined ? (
          <>
            {" "}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : null} */}
        {!userData ? (
          <>
            {" "}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : null}
        {userData ? (
          <>
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="/restoList" element={<RestoList />} />
            <Route path="/viewResto" element={<ViewResto />} />
            <Route path="/addResto" element={<AddResto />} />
            <Route path="/editResto" element={<EditResto />} />
          </>
        ) : (
          <Route path="*" element={<NotFound authUser={authUser} />} />
        )}
      </Routes>
    </div>
  );
};

export default RoutesComponent;
