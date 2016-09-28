import constants from '../../constants/pubRecConstants';
import React from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import TeaserLink from '../TeaserLink';
import SimpleInline from '../shared/SimpleInline';

const PhoneColumn = (props) => {
	let { numbers, title, current } = props;

	return (
		<div className="table simple-column row">
			<div className="label label-full">
				<h4>{title}</h4>
			</div>

			<div className="content content-full">
				<ul>
					{ numbers.map((number) => {
						let prepaid = number.is_prepaid ? 'Yes' : 'No';
						let connected = number.is_connected ? 'Yes' : 'No';

						return (
							<li key={uuid.v4()}>
								<h4>{number.display}</h4>

								<p>{number.carrier}</p>

								{(number.line_type && number.phone_region.state) ?
									<SimpleInline
										key={uuid.v4()}
										title={['Line Type', 'Carrier Location']}
										contents={[number.line_type, `${number.phone_region.city}, ${number.phone_region.state}` ]}
									/> : null }

								<SimpleInline
									key={uuid.v4()}
									title={['Prepaid', 'Connected']}
									contents={[prepaid, connected]}
								/>

								{ _.isUndefined(current) || current !== number.display ?
									<TeaserLink
										key={uuid.v4()}
										teaser={{recordData:{phone:{number: number.number}}}}
										recordType={constants.recordTypes.PHONE}
										classes="btn-link btn"> View Phone Report
									</TeaserLink>
								: null }
								<hr/>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

PhoneColumn.propTypes = {
	numbers: React.PropTypes.array.isRequired,
	title: React.PropTypes.string.isRequired,
	current: React.PropTypes.string
};

export default PhoneColumn;
