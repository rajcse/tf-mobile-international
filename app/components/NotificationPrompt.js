import React from 'react';
import Notification from 'components/Notification';

class NotificationPrompt extends React.Component {
	render() {
		let {
			notifications
		} = this.props;

		return (
			<div id="notification-prompt">
				{ notifications.map((notice, index) => (
					<Notification
						key={index}
						notice={notice}
					/>
				))}
			</div>
		);
	}
}

NotificationPrompt.propTypes = {
	notifications: React.PropTypes.array.isRequired
};

export default NotificationPrompt;
