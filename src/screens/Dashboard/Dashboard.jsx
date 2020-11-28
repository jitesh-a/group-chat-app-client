import { useState } from 'react';

import Groups from '../../components/Group/Groups';
import ChatWindow from '../../components/ChatWindow/ChatWindow';

const DashboardScreen = () => {

  const [group, setGroup] = useState(null);

  const onSelectGroup = (group) => {
    // console.log(groupId)
    setGroup(group);
  }

  return (
    <>
      {/* <h3>Welcome to Group Chat Application!</h3> */}
      {/* <hr/> */}
      {group && group._id ?
        <ChatWindow {...group} /> :
        <Groups onSelectGroup={onSelectGroup} />}
    </>

  )
}

export default DashboardScreen;