import { useQuery, useMutation, useSubscription } from '@apollo/client';

import { GET_MESSAGES, SEND_MESSAGE, MESSAGES_SUBSCRIPTION } from '../../graphql/queries';
import { renderErrorMessage, getCurrentUser, renderLoading } from '../../utils/helper';
import { Col, Row, Form, Button } from 'react-bootstrap';
import MessageComponent from '../Message/Message';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatWindowComponent = (props) => {
  const { _id, name } = props;
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: {
      groupId: _id
    }
  });

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sendMessage, newMessage] = useMutation(SEND_MESSAGE);

  const onSubscriptionData = ({ subscriptionData }) => {
    // if (!messageSubscription?.loading) {
    const newMessages = [...messages, subscriptionData.data.messageAdded];
    // console.log(newMessages);
    setMessages(newMessages);
    // }
  }

  // eslint-disable-next-line
  const messageSubscription = useSubscription(
    MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: onSubscriptionData
  });

  useEffect(() => {
    // console.log(data);
    if (data && data.messages) {
      setMessages([...data.messages])
    }
  }, [data])

  const onClick = () => {
    sendMessage({
      variables: {
        email: getCurrentUser(),
        message: message,
        groupId: _id
      }
    })
  }

  const renderMessages = () => {
    // if (data && data.messages) {
    return (
      <div>
        {messages.map(message =>
          <MessageComponent key={message._id} {...message} />)}
      </div>

    )
    // }
  }

  const isSendButtonDisabled = () => {
    return (message.length === 0 || newMessage?.loading);
  }

  const renderChatBox = () => {
    return (
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Send your message</Form.Label>
              <Form.Control as="textarea" rows={3} value={message} onChange={e => setMessage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={onClick} disabled={isSendButtonDisabled()}>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    )
  }

  const renderHeading = () => {
    return (
      <>
        <h6>Showing Messages for Group - {name}</h6>
        {/* <hr /> */}
      </>
    )
  }

  return (
    <div>
      {renderHeading()}
      {renderLoading(loading)}
      {renderErrorMessage(error)}
      {renderMessages()}
      {renderChatBox()}
    </div>
  )
}

export default ChatWindowComponent;