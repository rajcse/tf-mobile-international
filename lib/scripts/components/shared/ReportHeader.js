import React, { Component } from 'react';
import config from 'config';
import classNames from 'classnames';
import _ from 'lodash';

class ReportHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hidden: '',
			photos: this.props.photos || []
		};
	}

	// Remove Photos that do no load
	handleError(key) {
		let hidden = [key, ...this.state.hidden];

		this.setState({
			errored: true,
			hidden: hidden
		});
	}

	render() {
		let {
			name,
			age,
			location,
			deathdate,
			isPremium,
			type
		} = this.props;

		let { photos } = this.state;

		let reportClass = isPremium ? 'premium' : 'standard';

		return (
			<div className={classNames('report-header', reportClass)}>
				<div className="report-container">
					{ photos.length > 0 ?
						<div className="report-thumbnail">
							{ _.map(photos, (photo, key) => {
								return _.has(photo,'thumbnail_token') && !_.includes(this.state.hidden, key) ?
									<img onError={this.handleError.bind(this, key)} src={ `${config.API_ROOT}/data/image/${photo.thumbnail_token}` } />
								: null;
							}) }
						</div>
					: null }
					<div className="report-brief">
						<h1>{!_.isUndefined(type) && type === 'email' ? <span>Possible Owner: <br /></span> : null}{name}</h1>
						<p>{ age ? <span>{age} -</span> : null } { location }</p>
						<p>{ deathdate ? <span>(Deceased {deathdate.year})</span> : null }</p>
					</div>
				</div>
			</div>
		);
	}
}

ReportHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	deathdate: React.PropTypes.object,
	isPremium: React.PropTypes.bool.isRequired,
	age: React.PropTypes.number,
	location: React.PropTypes.string,
	type: React.PropTypes.string,
	photos: React.PropTypes.array
};

export default ReportHeader;
