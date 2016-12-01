import React from 'react';
import Svg from 'components/svg/Svg';

const NotificationPrompt = (props) => {
	return (
		<div id="notification-prompt">
			{ props.notifications.map((notice, index) => (
				<div className="notice" key={index} style={{'bottom': `${65 * (index + 1)}px`}}>
					<div className="notice-level">
						<Svg svg="noticeInfo" />
					</div>
					<div className="notice-text">
						<h3>Title</h3>
						<p>Content</p>
					</div>
				</div>
			))}
		</div>
	);
};

NotificationPrompt.propTypes = {
	notifications: React.PropTypes.array.isRequired
};

export default NotificationPrompt;
