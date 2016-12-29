import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Swipeable from 'react-swipeable';
import Svg from 'components/svg/Svg';
import constants from 'constants/pubRecConstants';
import Link from 'components/Link';
import Loader from 'components/Loader';
import viewActions from 'actions/viewActions';

// Global Functions File
import * as libs from 'utils/libs';

class DashboardRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			left: 0,
			swiped: false,
			isArchiving: false
		};

		this.swipedLeft = this.swipedLeft.bind(this);
		this.swipingLeft = this.swipingLeft.bind(this);
		this.resetSwipe = this.resetSwipe.bind(this);
		this.archiveAnimation = this.archiveAnimation.bind(this);
	}

	swipedLeft() {
		if (!this.state.isArchiving) {
			this.setState({
				left: '-75px',
				swiped: true
			});
		}
	}

	swipingLeft(e, left) {
		if (!this.state.isArchiving) {
			this.setState({
				left: `-${left}px`,
				swiped: false
			});
		}
	}

	archiveAnimation() {
		this.setState({
			left: '0',
			swiped: true,
			isArchiving: true
		});
	}

	resetSwipe() {
		if (!this.state.isArchiving) {
			this.setState({
				left: '0px',
				swiped: false
			});
		}
	}

	render() {
		let { data, id, archiveStatus } = this.props,
			rowLabel = null,
			age,
			death;

		const style = {
			left: this.state.left
		};

		// If deathdate is valid then send with calc otherwise use birthdate
		// Date of death may contain 2 objects date & date_range.
		// Iterate through bout objects and store the valid date of death to be used later
		_.forEach(data.dods, (value) => {
			if(value) {
				death = data.dods;
			}
		});

		// Calculate age based on information available
		if (_.isUndefined(death)) {
			age = libs.calculateAge(data.dobs);
		} else {
			age = libs.calculateAge(data.dobs, death);
		}

		switch(id[1]) {
			case constants.recordTypes.PERSON:
				if (_.has(data,'name.first')){
					rowLabel = (
						<div>
							<h3><span className="name">{data.name.first} {data.name.middle} {data.name.last}</span>
								<span className="age">{ _.isNull(age.display) ? null : `${age.display} yr` }</span>
							</h3>


							<p className="location">
								{_.get(data,'location.address.city') ? data.location.address.city + ', ': ''} {_.has(data,'location.address.state') ? data.location.address.state : ''}
							</p>
							{ data.isLite &&
								<p className="lite-tag">Free</p>
							}
						</div>
					);
				}
				break;

			case constants.recordTypes.PHONE:
				rowLabel = _.get(data,'phone.number') ? (
					<div>
						<h3>{data.phone.number.replace(/^(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</h3>
						<p className="location">
							{_.get(data,'location.address.city') ? data.location.address.city : ''} {_.has(data,'location.address.state') ? data.location.address.state : '' }
						</p>
						<p className="name">{_.has(data.name, 'first') ? data.name.first : ''} {_.has(data.name, 'last') ? data.name.last : ''}</p>
					</div>
				) : null;
				break;

			case constants.recordTypes.EMAIL:
				rowLabel = (
					<div>
						<h3>{_.has(data.email, 'address') ? data.email.address : ''}</h3>
						<p className="location">
							{_.get(data,'location.address.city') ? data.location.address.city + ', ' : ''} {_.has(data,'location.address.state') ? data.location.address.state : ''}
						</p>
						<p className="name">{_.has(data.name, 'first') ? data.name.first : ''} {_.has(data.name, 'last') ? data.name.last : ''}</p>
					</div>
				);
				break;

			case constants.recordTypes.LOCATION:
			default:
				break;
		}

		return (
			<Swipeable
				onSwipingLeft={this.swipingLeft}
				onSwipedLeft={this.swipedLeft}
				onSwipedRight={this.resetSwipe} >

				{ this.state.isArchiving ?
					<span className="archiving-record">
						<Loader />
					</span>
				: null }

				<li style={style} className={classNames('history-item', id[1], { premium: data.isPremium }, { swiped: this.state.swiped }, { archiving: this.state.isArchiving })}>
					{ (!this.state.isArchiving && archiveStatus) && !this.state.swiped ?
						<span className="archive-record" onClick={() => { this.archiveAnimation(), viewActions.archiveRecord(id[2]); }}>
							<Svg svg="closeGreyCircle" />
						</span>
					: null }

					{ this.state.swiped && !this.state.isArchiving ?
						<p className="archive-text" onClick={() => { this.archiveAnimation(), viewActions.archiveRecord(id[2]); }}>
							<span>Tap To Delete</span>
						</p>
					: null }

					<Link to={'/users/' + id[0] + '/records/' + id[2]}>
						{data.isPremium ? <span className="premium-text">
							<Svg svg="premiumIcon" style={{width: 12}} className="premium-icon" /> Premium Report</span>
						: null }
						{rowLabel}
					</Link>
				</li>
			</Swipeable>
		);
	}
}

DashboardRow.propTypes = {
	id: React.PropTypes.array.isRequired,
	data: React.PropTypes.object.isRequired,
	archiveStatus: React.PropTypes.bool
};

export default DashboardRow;
