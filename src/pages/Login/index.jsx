import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import img1 from "../../assets/img/account.png";
import img2 from "../../assets/img/google.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import img3 from "../../assets/img/eye.png";
import img4 from "../../assets/img/hide.png";
import swal from "sweetalert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const bodyPayload = {
      email: email,
      password: password,
    };
    axios
      .post("https://reqres.in/api/login", bodyPayload)
      .then((respon) => {
        console.log(respon.data.success);
        const token = respon.data.token;
        localStorage.setItem("accessToken", token);
        setSuccess(respon.data.message);
        setLoading(false);
        swal({
          title: "Login Success",
          text: "This alert will disappear after 3 seconds.",
          position: "center",
          icon: "success",
          timer: 3000,
          button: false,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.error);
        setLoading(false);
      });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="border rounded-5 p-3 bg-white shadow box-area">
        <Col
          md={6}
          className="left-box d-flex rounded-4 justify-content-center align-items-center flex-column"
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
        >
          <div className="feature-image mb-3">
            <img
              src={img1}
              alt=""
              className="img-fluid"
              style={{ width: "250px" }}
            />
            <p
              className="text-white fs-2 text-center"
              style={{ fontWeight: "600" }}
            >
              Be Verified
            </p>
            <small
              className="text-center text-white text-wrap "
              style={{ width: "17rem" }}
            >
              Join experienced Designers on this platform.
            </small>
          </div>
        </Col>
        <Col md={6} className="right-box">
          <Row className="align-items-center">
            <div className="header-text mb-4">
              <h2 style={{ fontWeight: "700" }}>Hello, Again</h2>
              <p>we are happy to see you back.</p>
            </div>
            <div className="error-message">
              {error.length ? <p>{error}</p> : null}
            </div>
            <div className="error-message">
              {success.length ? <p>{success}</p> : null}
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Email address"
                onChange={onChangeEmail}
              />
            </div>
            <div className="input-group mb-1">
              <input
                onChange={onChangePassword}
                type={passwordVisibility ? "text" : "password"}
                id="pass"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
              />
              <div className="input-group-append">
                <span
                  id="mybutton"
                  onClick={togglePasswordVisibility}
                  className="input-group-text"
                >
                  {passwordVisibility ? (
                    <img height={30} src={img3} alt="" />
                  ) : (
                    <img height={30} src={img4} alt="" />
                  )}
                </span>
              </div>
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="formCheck"
                />
                <label
                  htmlFor="formCheck"
                  className="form-check-label text-secondary"
                >
                  <small>Remember me</small>
                </label>
              </div>
              <div className="forgot">
                <small>
                  <a href="">Forgot Password?</a>
                </small>
              </div>
            </div>
            <div className="input-group mb-3">
              <button
                disabled={loading ? true : false}
                onClick={onSubmit}
                type="button"
                className="btn-login btn-primary btn-lg w-100"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
            <div>
              <button className=" custom-google-btn btn-lg w-100 fs-6">
                <img
                  src={img2}
                  style={{ width: "20px" }}
                  className="me-2"
                  alt=""
                />
                Sign In with Google
              </button>
            </div>
            <Row>
              <div className=" mt-3">
                Dont have account?
                <Link to="/register">
                  <button className="btn-signup mb-2">Sign Up</button>
                </Link>
              </div>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
