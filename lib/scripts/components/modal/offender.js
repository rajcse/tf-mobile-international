import React, { Component } from 'react';
import _ from 'lodash';
import config from 'config';
import uuid from 'uuid';

import Header from '../shared/Header';
import LocalColumn from '../location/local';
import SimpleInline from '../shared/SimpleInline';
import Svg from '../Svg';

import viewActions from '../../actions/viewActions';

class OffenderModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hiddenImage: false
		};
	}
	getLocationDetails(pointer) {
		return function() {
			viewActions.fetchLocationTeaser(pointer);
		};
	}

	// Remove photos that don't load
	handleError() {
		this.setState({
			hiddenImage: true
		});
	}

	render() {
		let {
			closeOffender,
		  offender
		} = this.props;

		let {
			hiddenImage
		} = this.state;

		return (
			<main>
				<Header title="Sex Offender" buttonHandler={closeOffender} backButton />

				<div key={`${uuid.v4()}`} className="offender-header">
					<div className="offender-thumbnail">
						{ !_.isNull(offender.image_token) && !hiddenImage ?
							<img onError={this.handleError.bind(this)} src={`${config.API_ROOT}/data/image/${offender.image_token}`} />
							: <Svg svg="userAccount" style={{width: 17}} /> }
					</div>

					<h2 className="offender-name">{`${offender.name.first} ${offender.name.middle} ${offender.name.last}`}</h2>
				</div>

				<div key={`${uuid.v4()}`} className="widget">
					<h2 className="title">Offense Report</h2>

					<div className="label">
						<h4>Offense</h4>
					</div>

					{offender.offense_description1}

					<hr />

					<div className="label">
						<h4>Location Details</h4>
					</div>

					<LocalColumn
						location={offender}
					/>

					<hr />
					<SimpleInline
						key={`${uuid.v4()}`}
						title={['Eye Color', 'Hair Color']}
						contents={[offender.eye_color, offender.hair_color]}
						classes="inline-half"
					/>

					<SimpleInline
						key={`${uuid.v4()}`}
						title={['Height', 'Weight']}
						contents={[offender.height, `${offender.weight}lbs`]}
						classes="inline-half"
					/>

					<SimpleInline
						key={`${uuid.v4()}`}
						title={['Race', 'Sex']}
						contents={[offender.race, offender.sex]}
						classes="inline-half"
					/>
				</div>
			</main>
		);
	}
}

OffenderModal.propTypes = {
	closeOffender: React.PropTypes.func.isRequired,
	openLocation: React.PropTypes.func,
	offender: React.PropTypes.object.isRequired,
};

export default OffenderModal;
