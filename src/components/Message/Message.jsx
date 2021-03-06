import { Col, Row } from 'react-bootstrap';

const MessageComponent = (props) => {
  const { message, email, createdAt } = props;

  const renderMessageHeader = () => {
    // eslint-disable-next-line
    const messageDate = new Date(new Number(createdAt)).toDateString();
    return (
      <h6>On {messageDate} - {email}  said:</h6>
    )
  }

  const renderMessageBody = () => {
    return (
      <p> --- {message}</p>
    )
  }

  return (
    <Row>
      <Col>
        {renderMessageHeader()}
        {renderMessageBody()}
        <hr />
      </Col>
    </Row>
  )
}

export default MessageComponent