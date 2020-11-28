import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { LOGIN } from '../../graphql/queries';
import { setToken, renderErrorMessage, setCurrentUser, renderLoading } from '../../utils/helper';

import './SignIn.css';

const SignInScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, data, error }] = useLazyQuery(LOGIN);

  useEffect(() => {
    const { setIsLoggedIn } = props;
    if (data && data.login && data.login.token) {
      setIsLoggedIn(true);
      setToken(data.login.token);
      setCurrentUser(email);
    }
  })

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onClick = (event) => {
    login({ variables: { email, password } });
  }

  const isSignInButtonDisabled = () => {
    return (email.length === 0 || password.length === 0 || loading)
  }

  const renderButtonText = () => {
    return (email.length > 0 && password.length > 0 && loading) ? renderLoading(true) : 'Sign in'
  }

  const renderLoginForm = () => {
    return (
      <>
        <h6>Please sign in to continue</h6>
        {/* <hr /> */}
        <Form>
          {
            renderErrorMessage(error)
          }
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} type="email" placeholder="Enter email" onChange={onEmailChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
        </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" placeholder="Password" onChange={onPasswordChange} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={onClick} disabled={isSignInButtonDisabled()}>
            {renderButtonText()}
          </Button>
        </Form>
      </>
    )
  }

  return (
    <Row>
      <Col className="login-background-img">

      </Col>
      <Col>
        {renderErrorMessage(error)}
        {renderLoginForm()}
      </Col>
    </Row>
  )
}

export default SignInScreen;