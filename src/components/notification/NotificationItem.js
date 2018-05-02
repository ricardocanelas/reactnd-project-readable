// External Depedencies
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Message } from "semantic-ui-react";

// Styles
const WrapperMessage = styled(Message) `&&&{
margin: 0;
border-radius: 0;
}`

const NotificationItem = ({ message, header, type, id, onCloseClick }) => {

    let headerText = header;
    let messageText = message;

    const messageHeader = headerText ? <Message.Header>{headerText}</Message.Header> : null;

    // Turn the type string into a boolean prop with the same name
    const typeProp = type.toLowerCase();
    const typeObj = { [typeProp] : true};

    if(messageText) {
        const messagePieces = messageText.split("\n");
        messageText = messagePieces.map((piece, index) => <div key={index}>{piece}</div>);
    }

    const onDismiss = () => onCloseClick(id);

    return (
        <WrapperMessage {...typeObj} onDismiss={onDismiss} >
            {messageHeader}
            <Message.Content>{messageText}</Message.Content>
        </WrapperMessage>
    );
}

// PropTypes
NotificationItem.propTypes = {
    message: PropTypes.string.isRequired,
    header: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onCloseClick: PropTypes.func,
}

// DefaultProps
NotificationItem.defaultProps = {
    onCloseClick: () => { }
}

export default NotificationItem