import { Alert, Spinner } from 'react-bootstrap';

const setToken = (token) => {
  sessionStorage.setItem('token', token);
}

const setCurrentUser = (email) => {
  sessionStorage.setItem('email', email);
}

const getToken = () => {
  return sessionStorage.getItem('token');
}

const getCurrentUser = () => {
  return sessionStorage.getItem('email');
}


const renderErrorMessage = (error) => {
  if (error?.message) {
    return (
      <Alert variant={'danger'}>
        {error.message}
      </Alert>
    )
  }
}

const renderLoading = (loading) => {
  if (loading) {
    return (<Spinner animation="border" variant="secondary" size="lg"/>)
  }
}
export {
  setToken,
  getToken,
  renderErrorMessage,
  setCurrentUser,
  getCurrentUser,
  renderLoading
}