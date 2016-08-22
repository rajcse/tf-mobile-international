import React, { Component, PropTypes } from 'react';
import CriminalRecordsList from './list';

import _ from 'lodash';
import uuid from 'uuid';

class CriminalRecordsSection extends Component {
	render() {
		let { crimes, openCrime } = this.props;

		return (
			<section id="criminal" className="widget">
				<h2 className="title">Criminal Records</h2>

				{ !_.isEmpty(crimes) ?
					<CriminalRecordsList
						key={`records-${uuid.v1()}`}
						crimes={crimes}
						openCrime={openCrime}
					/>
				: null }
			</section>
		);
	}
}

CriminalRecordsSection.propTypes = {
	crimes: PropTypes.array.isRequired,
	openCrime: PropTypes.func.isRequired
};

export default CriminalRecordsSection;
