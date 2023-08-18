import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContex } from "./context/AuthContex";
import UserLayout from "../src/components/Layout/UserLayout"
import AdminLayout from "./components/Layout/AdminLayout";

import HomeP from "./pages/User/HomeP";
import Aboutp from "./pages/User/Aboutp";
import LoginP from "./pages/User/LoginP";
import RegistrP from "./pages/User/RegisterP";
import PostP from "./pages/User/PostP";
import MyPostsP from "./pages/User/MyPostsP";
import AccountP from "./pages/User/AccountP";
import DashboardP from "./pages/Admin/DashboardP";
import UsersP from "./pages/Admin/UsersP";
import CategoryP from "./pages/Admin/CategoryP";
import NotFoundP from "./pages/NotFoundP";
import CategoriyesP from "./pages/User/CategoriyesP";
import AllPost from "./pages/User/AllPost";
import AdminAccountP from "./pages/Admin/AdminAccountP";

function App() {
  let { isAuthenticated ,role } = useContext(AuthContex);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomeP />} />
          <Route path="about" element={<Aboutp />} />
          <Route path="login" element={<LoginP />} />
          <Route path="register" element={<RegistrP />} />
          <Route path="all-posts" element={<AllPost />} />
          <Route path="category" element={<CategoriyesP />} />
          <Route path="post/:id" element={<PostP />} />
          {isAuthenticated && role==="user" && (
            <Fragment>
              <Route path="my-posts" element={<MyPostsP />} />
              <Route path="account" element={<AccountP />} />
            </Fragment>
          )}
        </Route>
        {isAuthenticated && role==="admin" && (
          <Fragment>
            <Route path="/" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardP />} />
              <Route path="users" element={<UsersP />} />
              <Route path="categories" element={<CategoryP />} />
              <Route path="admin-account" element={<AdminAccountP />} />
            </Route>
          </Fragment>
        )}
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
