import React from 'react';
import uuid from 'uuid';
import Sticky from 'react-stickynode';
import Svg from '../Svg';

const ReportHeaderUpsell = (props) => {
	return (
		<div className="header-upsell">
			<Sticky>
				<div onClick={() => props.showPremiumUpsell(props.recordID)} className="premium-header">
					<p className="pull-left"><Svg key={uuid.v4()} className="icon-exclamation" svg="exclamationWhite" /> More Info Available!</p>
					<p className="pull-right">Read More <Svg key={uuid.v4()} className="icon-arrow-right" svg="arrowRight" /></p>
				</div>
			</Sticky>
		</div>
	);
};

ReportHeaderUpsell.propTypes = {
	isPremium: React.PropTypes.bool,
	showPremiumUpsell: React.PropTypes.func,
	recordID: React.PropTypes.string
};

export default ReportHeaderUpsell;
