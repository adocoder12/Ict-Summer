//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

//css
import style from "./style.module.css";
import logo_main from "@assets/form_img.png";
//react hooks
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../../service/authAction";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, userInfo, error, token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  console.log("err: " + error);
  console.log("lding " + loading);
  console.log("token " + token);
  console.log("user" + userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = {
        username: username,
        password: password,
      };
      console.log("resUser" + user);
      dispatch(loginUser(user));
      // navigate("/");
    } catch (err) {
      console.log("Error login form" + err.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit} className={`${style.form} `}>
          <div className={`${style.titleWrapper}`}>
            <img
              className={style.img}
              style={{ width: "80px" }}
              src={logo_main}
              alt=""
            />
            <h3 className={style.title}>Login</h3>
          </div>
          <Form.Group className=" row-md-12 mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className={`${style.btn} align-self-start w-100`}
            variant="primary"
            type="submit"
          >
            {!loading ? "Login" : "Loading..."}
          </Button>
          <p className="small mt-3 align-self-end">
            <Link to="/register" className={`${style.links} `}>
              Dont you have an account ?
            </Link>
          </p>
        </Form>
        {error && (
          <Alert variant="danger" className="mt-1">
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default LoginComponent;
