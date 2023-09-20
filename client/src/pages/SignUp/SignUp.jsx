import SignUPComponent from "../../components/SignUpForm/SignUPComponent";
import Welcome from "../../components/WelcomeMessage/Welcome";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignUp = () => {
  return (
    <>
      <Container fluid>
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6}>
            <Welcome />
          </Col>
          <Col xs={12} md={6}>
            <SignUPComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
