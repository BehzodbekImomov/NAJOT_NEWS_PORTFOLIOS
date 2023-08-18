import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../components/Form/Form.scss";
import Loading from "../../components/Loading";
import { request } from "../../server/Request";

const RegistrP = () => {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    info:"",
    phoneNumber:"",
    address:"",
    email:"",

  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.querySelector("head title").textContent = "Register";
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await request.post("auth/register", user);
      setLoading(true);
      loading ? <Loading /> : navigate("/login");
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div className="input-group  m-auto mb-5 mt-5">
          <input
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            placeholder="Firstname"
            type="text"
            className="form-control "
          />
        </div>
        <div className="input-group   m-auto mb-5 mt-5">
          <input
            onChange={handleChange}
            name="last_name"
            value={user.last_name}
            placeholder="Lastname"
            type="text"
            className="form-control"
          />
        </div>
        <div className="input-group   m-auto mb-5 mt-5">
          <input
            onChange={handleChange}
            name="username"
            value={user.username}
            placeholder="Username"
            type="text"
            className="form-control"
          />
        </div>

        <div className="input-group   m-auto mb-5 mt-5">
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            placeholder="Email"
            type="email"
            className="form-control"
          />
        </div>

        <div className="input-group   m-auto mb-5 mt-5">
          <input
            onChange={handleChange}
            name="password"
            value={user.password}
            placeholder="Password"
            type="password"
            className="form-control"
          />
        </div>
        
        <div className="input-group   m-auto mb-5 mt-5">
          <input
            onChange={handleChange}
            name="phoneNumber"
            value={user.phoneNumber}
            placeholder="Phone number"
            type="tel"
            className="form-control"
          />
        </div>
        
        <div className="input-group   m-auto mb-5 mt-5">
          <input
            onChange={handleChange}
            name="address"
            value={user.address}
            placeholder="Address"
            type="text"
            className="form-control"
          />
        </div>
        <div className="input-group   m-auto mb-5 mt-5">
          <textarea
            onChange={handleChange}
            name="info"
            value={user.info}
            placeholder="Information"
            type="text"
            className="form-control"
          />
        </div>
        
        <button type="submit" className="btn btn-warning form-control">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrP;
