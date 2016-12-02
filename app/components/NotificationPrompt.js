import React from 'react';
import Svg from 'components/svg/Svg';

const NotificationPrompt = (props) => {
	return (
		<div id="notification-prompt">
			{ props.notifications.map((notice, index) => (
				<div className="notice" key={index} style={{'bottom': `${65 * index}px`}}>
					<div className={`notice-level ${notice.level}`}>
						{ notice.level === 'error' ?
							<Svg svg="noticeExclamation" />
						: null }

						{ notice.level === 'success' ?
							<Svg svg="noticeCheck" />
						: null }

						{ notice.level === 'info' ?
							<Svg svg="noticeInfo" />
						: null }
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
