import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import { login } from "../redux/Actions/UserAction";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);  // Cuộn lên đầu trang khi gắn thành phần
  //Biến trạng thái cho email và mật khẩu bằng hook useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   //Truy cập chức năng điều phối từ cửa hàng Redux
  const dispatch = useDispatch();
  // Trích xuất đường dẫn chuyển hướng từ location.search (nếu có, mặc định là "/")
  const redirect = location.search ? location.search.split("=")[1] : "/";
  // Truy cập trạng thái đăng nhập của người dùng từ cửa hàng Redux bằng hook useSelector
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  //useEffect hook để chuyển hướng sau khi đăng nhập thành công
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);
  // Gửi chức năng xử lý cho biểu mẫu đăng nhập
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
