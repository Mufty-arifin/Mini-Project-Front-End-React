import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import img1 from "../../assets/img/add-user.png";
import img2 from "../../assets/img/google.png";
import img3 from "../../assets/img/eye.png";
import img4 from "../../assets/img/hide.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Use navigate hook for programmatic navigation
  const navigate = useNavigate();

  // Event handler for changing username
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setError("");
    setSuccess("");
  };

  // Event handler for changing password
  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setError("");
    setSuccess("");
  };

  // Event handler for form submission
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const bodyPayload = {
      username: username,
      password: password,
    };

    axios
      .post("https://reqres.in/api/register", bodyPayload)
      .then((response) => {
        console.log(response.data);
        setSuccess(response.data.message);
        setLoading(false);
        swal({
          title: "Sign Up Success",
          text: "This alert will disappear after 3 seconds.",
          position: "center",
          icon: "success",
          timer: 3000,
          button: false,
          
        });
        navigate("/login");
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
              <h2 style={{ fontWeight: "700" }}>Create an Account</h2>
              <p>Welcome! Lets get you started.</p>
            </div>
            <div
              className={`error-message ${error.length ? "visible" : "hidden"}`}
            >
              {error}
            </div>
            <div
              className={`success-message ${
                success.length ? "visible" : "hidden"
              }`}
            >
              {success}
            </div>
            <div className="input-group mb-3">
              <input
                onChange={onChangeUsername}
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Email address"
              />
            </div>
            <div className="input-group mb-3">
              <input
                onChange={onChangePassword}
                id="pass"
                type={passwordVisibility ? "text" : "password"}
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
              />
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

            <div className="input-group mb-3">
              <button
                disabled={loading ? true : false}
                onClick={onSubmit}
                type="button"
                className="btn-login btn-lg w-100"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
            <div>
              <button className="custom-google-btn btn-lg w-100 fs-6">
                <img
                  src={img2}
                  style={{ width: "20px" }}
                  className="me-2"
                  alt=""
                />
                Sign Up with Google
              </button>
            </div>
            <Row>
              <small>
                Already have an account?
                <Link to="/login">
                  <button className="btn-sigin mb-2">Sign In</button>
                </Link>
              </small>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
