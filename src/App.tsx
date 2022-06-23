import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import RequirePublic from "./components/RequirePublic";
import Login from "./pages/login/Login";
import Page404 from "./pages/page404/Page404";
import Posts from "./pages/posts/Posts";
import Public from "./pages/public/Public";
import SignIn from "./pages/signin/Signin";
import User from "./pages/user/User";
import Users from "./pages/users/Users";
import Welcome from "./pages/welcome/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequirePublic />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="users" element={<Users />} />
          <Route path="user/:id" element={<User />} />
          <Route path="posts" element={<Posts />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
