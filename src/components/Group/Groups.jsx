import { useQuery } from '@apollo/client';

import { GET_GROUPS } from '../../graphql/queries';
import { renderErrorMessage, renderLoading } from '../../utils/helper';
import { Col, Card, Row } from 'react-bootstrap';

const GroupsComponent = (props) => {

  const { loading, error, data } = useQuery(GET_GROUPS);
  const { onSelectGroup } = props;

  const renderGroups = () => {
    if (data && data.groups) {
      return (
        data.groups.map(group =>
          <Col key={group._id}>
            <Card key={group._id} onClick={e => onSelectGroup(group)}>
              <Card.Body>
                <Card.Text>
                  {group.name}
                </Card.Text>
                <Card.Link onClick={e => onSelectGroup(group)}>Enter Chat room</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        )
      )
    }
  }
  return (
    <>
      <h6>Available groups</h6>
      {/* <hr /> */}
      <Row>
        {renderLoading(loading)}
        {renderErrorMessage(error)}
        {renderGroups()}
      </Row>
    </>
  )
}

export default GroupsComponent;
