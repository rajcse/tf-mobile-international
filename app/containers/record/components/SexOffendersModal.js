import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { RouteTransition } from 'react-router-transition';
import uuid from 'uuid';
import config from 'config';

import Header from 'components/Header';
import Location from './Location';
import SimpleInline from 'components/SimpleInline';
import Svg from 'components/svg/Svg';
import constants from 'constants/pubRecConstants';
import SearchLink from 'components/SearchLink';

class SexOffendersModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hiddenImage: false
		};

		this._handleError = this._handleError.bind(this);
		this._checkOffenderExist = this._checkOffenderExist.bind(this);
	}

	componentWillMount() {
		this._checkOffenderExist();
	}

	_checkOffenderExist() {
		// Check if offender is being loaded on enter or coming from link
		if(!_.has(this.props.offender, 'image_token')) {
			hashHistory.go(-2);
		}
	}

	// Remove photos that don't load
	_handleError() {
		this.setState({
			hiddenImage: true
		});
	}

	render() {
		let {
		  offender
		} = this.props;

		let {
			hiddenImage
		} = this.state;

		return (
			<main>
				<Header title="Sex Offender" backButton />

				{/* Prevent broken pages caught by redirect*/}
				{ _.has(offender, 'name') ?
					<RouteTransition
						component="div"
						runOnMount={true}
						pathname={this.props.location.pathname}
						className="transition-wrapper"
						atEnter={{ translateX: 100 }}
						atLeave={{ translateX: -100 }}
						atActive={{ translateX: 0 }}
						mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
					>
						<div key={`${uuid.v4()}`} className="offender-header">
							<div className="offender-thumbnail">
								{ !_.isNull(offender.image_token) && !hiddenImage ?
									<img onError={this._handleError} src={`${config.API_ROOT}/data/image/${offender.image_token}`} />
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

							<Location
								location={offender}
							/>

							<SearchLink
								criteria={{
									type: constants.recordTypes.PERSON,
									query: {
										firstName: offender.name.first,
										lastName: offender.name.last,
										state: offender.address.state_code
									},
									text: offender.name.display
								}}
								classes="btn btn-link">View Person Report
							</SearchLink>

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
					</RouteTransition>
				: null }
			</main>
		);
	}
}

SexOffendersModal.propTypes = {
	openLocation: React.PropTypes.func,
	offender: React.PropTypes.object,
	location: React.PropTypes.object
};

export default SexOffendersModal;
