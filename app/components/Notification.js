import React from 'react';
import Svg from 'components/svg/Svg';
import Swipeable from 'react-swipeable';
import viewActions from 'actions/viewActions';
import pubRecAPI from 'utils/PubRecAPI';

class Notification extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			left: 0,
			swiped: false
		};

		this.swipedLeft = this.swipedLeft.bind(this);
		this.swipingLeft = this.swipingLeft.bind(this);
		this.swipedRight = this.swipedRight.bind(this);
	}

	componentWillMount() {

		if(this.props.notice.action == 'premiumBundle') {
			setTimeout(pubRecAPI.fetchPremiumBundleInfo(), 0);
		} 
	}

	swipedLeft() {
		this.setState({
			left: '0px'
		});

		viewActions.clearNotification(this.props.notice.id);
	}

	swipingLeft(e, left) {
		this.setState({
			left: `-${left}px`
		});
	}

	swipedRight() {
		this.setState({
			left: '0px'
		});
	}

	render() {
		let {
			notice
		} = this.props;

		const style = {
			left: this.state.left
		};

		return (
			!notice.action &&
				<Swipeable
					onSwipingLeft={this.swipingLeft}
					onSwipedLeft={this.swipedLeft}
					onSwipedRight={this.swipedRight} >
					<div className="notice" style={style}>
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
							<h3>{notice.title}</h3>
							<p>{notice.content}</p>
						</div>
					</div>
				</Swipeable>
		);
	}
}

Notification.propTypes = {
	notice: React.PropTypes.object.isRequired
};

export default Notification;
