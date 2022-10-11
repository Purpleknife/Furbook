import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chat.scss';
import SideNav from './SideNav';

const Chat = (props) => {
	return (
    <div>
      <SideNav user={props.user} setUser={props.setUser} pendingCounter={props.pendingCounter} />
      <ChatEngine
        offset={-7}
        height='95vh'
        projectID='8d68967f-e10d-4bbb-8e1b-d14f5592c345'
        userName='Cindy'
        userSecret='cindyclawford'
      />
    </div>
	);
};

export default Chat;