import React, { Component } from 'react';
import config from 'config';
import classNames from 'classnames';
import _ from 'lodash';

class ReportHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errored: false
		};
	}

	handleError() {
		this.setState({
			errored: true
		});
	}

	render() {
		let {
			name,
			age,
			location,
			photo,
			isPremium
		} = this.props;

		let reportClass = isPremium ? 'premium' : 'standard';

		return (
			<div className={classNames('report-header', reportClass)}>
				<div className="report-container">
					<div className="report-thumbnail">
						{ _.has(photo,'thumbnail_token') && !this.state.errored ?
							<img onError={this.handleError.bind(this)} src={ config.API_ROOT + '/data/image/' + photo.thumbnail_token} />
							: null
						}
					</div>
					<div className="report-brief">
						<h1>{name}</h1>
						<p>{ age ? <span>{age} -</span> : null } { location }</p>
					</div>
				</div>
			</div>
		);
	}
}

ReportHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	isPremium: React.PropTypes.bool.isRequired,
	age: React.PropTypes.number,
	location: React.PropTypes.string,
	photo: React.PropTypes.object
};

export default ReportHeader;
