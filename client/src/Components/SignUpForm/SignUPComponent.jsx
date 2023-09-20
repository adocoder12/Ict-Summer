import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
//css
import style from "./style.module.css";

//redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUSer } from "../../service/authAction";

const SignUPComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");

  const { loading, error, success, message } = useSelector(
    (state) => state.auth
  );

  console.log("e: " + error);
  console.log("s " + success);
  const userDispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== Confirmpassword) {
      alert("Password mismatch");
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    userDispatch(registerUSer(newUser));

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmpassword("");
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit} className={`${style.form} `}>
          <h2 className={style.title}>Register</h2>
          <Form.Group className=" row-md-12 mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
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
          <Form.Group className="mb-3" controlId="ConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              onChange={(e) => setConfirmpassword(e.target.value)}
              value={Confirmpassword}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>
          <Button
            className={`${style.btn} align-self-start w-100`}
            variant="primary"
            type="submit"
          >
            {!loading ? "submit" : "Loading..."}
          </Button>
          <p className="small mt-3 align-self-end">
            <Link to="/login" className={`${style.links} `}>
              Do you have an account ?
            </Link>
          </p>
        </Form>
        {error && (
          <Alert variant="danger" className="mt-1">
            {error}
          </Alert>
        )}
        {message && (
          <Alert variant="success" className="mt-1">
            {message}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default SignUPComponent;
