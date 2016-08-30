import constants from '../../constants/pubRecConstants';
import React from 'react';
import SearchLink from '../SearchLink';
import SimpleInline from '../shared/SimpleInline';

const PhoneColumn = (props) => {
	let { numbers, title } = props;

	return (
		<div className="table simple-column row">
			<div className="label label-full">
				<h4>{title}</h4>
			</div>

			<div className="content content-full">
				<ul>
					{ numbers.map((number, i) => {
						let prepaid = number.is_prepaid ? 'Yes' : 'No';
						let connected = number.is_connected ? 'Yes' : 'No';

						return (
							<li key={i}>
								<h4>{number.display}</h4>

								<p>{number.carrier}</p>

								<SimpleInline
									title={['Line Type', 'Carrier Location']}
									contents={[number.line_type, `${number.phone_region.city}, ${number.phone_region.state}` ]}
								/>

								<SimpleInline
									title={['Prepaid', 'Connected']}
									contents={[prepaid, connected]}
								/>

								<SearchLink
									criteria={{
										type: constants.recordTypes.PHONE,
										query: {
											phone: number.number
										},
										text: number.number
									}}
								classes="btn-link btn"> View Phone Report
								</SearchLink>
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
	title: React.PropTypes.string.isRequired
};

export default PhoneColumn;
