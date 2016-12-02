import React from 'react';
import Svg from 'components/svg/Svg';
import Notification from 'components/Notification';
import viewActions from 'actions/viewActions';

class NotificationPrompt extends React.Component {
	constructor(props) {
		super(props);

		this.clearAllNotifications = this.clearAllNotifications.bind(this);
	}

	clearAllNotifications() {
		this.props.notifications.map(notice => {
			viewActions.clearNotification(notice.id);
		});
	}

	render() {
		let {
			notifications
		} = this.props;

		return (
			<div id="notification-prompt">
				{ notifications.length >= 2 ?
					<span className="clear-notifications" onClick={() => this.clearAllNotifications()}>
						<Svg svg="closeGreyCircle" /> Clear All
					</span>
				: null }

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
