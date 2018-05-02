// External Depedencies
import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types'
import Animated from 'react-animated-transitions';
import { connect } from "react-redux";
import { Portal } from 'react-portal';

// Our Depedencies
import { getNotifications } from "../../selectors/notificationSelectors"
import actions from "../../actions";
import NotificationItem from './NotificationItem'

// Styles
import 'animate.css';

const WrapperNotifications = styled.div`
position: fixed;
right: 16px;
bottom: 16px;
z-index: 1000;
width: 80%;
max-width: 450px;
margin: auto;
`

export class NotificationManager extends Component {
    render() {
        let {notifications} = this.props;

        const renderedNotifications = notifications.map(notification => (
            <Animated key={notification.id}  enter="slideInUp" exit="fadeOut" timeout={750}  item>
                <NotificationItem
                    onCloseClick={this.props.dismissNotification}
                    {...notification}
                />
            </Animated>
        ))

        return (
            <Portal isOpened={true}>
                <WrapperNotifications>
                    <Animated items >
                        {renderedNotifications}
                    </Animated>
                </WrapperNotifications>
            </Portal>
        )
    }
}

// DefaultProps
NotificationManager.defaultProps = {
    notifications: []
}

// PropTypes
NotificationManager.propTypes = {
    notifications: PropTypes.array
}

const mapState = (state) => ({
    notifications : getNotifications(state),
});

const mapDispatch = (dispatch) => {
    return {
        dismissNotification: (id) => dispatch(actions.notifications.dismissNotification(id))
    }
}

export default connect(mapState, mapDispatch)(NotificationManager);