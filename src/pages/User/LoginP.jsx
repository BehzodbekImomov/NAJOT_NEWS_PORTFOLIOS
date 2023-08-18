import { Fragment, useState } from "react";
import Cookies from "js-cookie";

import "../../components/Form/Form.scss";
import { request } from "../../server/Request";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContex";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LoginP = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    document.querySelector("head title").textContent = "Login";
  });

  const { setIsAuthenticated ,setRole,setTokens,} = useContext(AuthContex);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setUser({ username: "", password: "" });
      let {
        data: { token, role, expire, },
      } = await request.post("auth/login", user);
      setIsAuthenticated(true);
      setRole(role)
      setTokens(token)
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/my-posts");
      }
      Cookies.set(TOKEN, token);
      Cookies.set(EXPIRE_DATE, expire);
      Cookies.set(ROLE, role);
    } catch (err) {
      toast.error("User not found");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h2>Login</h2>
          <form className="needs-validation"  onSubmit={submit}  >
            <div className="input-group   m-auto mb-5 mt-5">
              <input
                onChange={handleChange}
                value={user.username}
                name="username"
                placeholder="Username"
                type="text"
                className="form-control"
                required
              />

              <div className="valid-feedback">Looks good!</div>

              <div className="invalid-feedback ">
                Please provide a valid city.
              </div>
            </div>

            <div className="input-group   m-auto mb-5 mt-5">
              <label className="form-label"></label>
              <input
                onChange={handleChange}
                value={user.password}
                name="password"
                placeholder="Password"
                type="password"
                className="form-control"
                required
              />

<div className="valid-feedback">Looks good!</div>

<div className="invalid-feedback ">
  Please provide a valid city.
</div>
            </div>

            <button className=" btn btn-warning form-control" type="submit">
              Register
            </button>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default LoginP;
