import LoginComponent from "../../components/LoginForm/LoginComponent";
import Welcome from "../../components/WelcomeMessage/Welcome";
//css
// import style from "./style.module.css";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  return (
    <>
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6}>
            <Welcome />
          </Col>
          <Col xs={12} md={6}>
            <LoginComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
