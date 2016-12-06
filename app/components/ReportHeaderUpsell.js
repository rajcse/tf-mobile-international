import React from 'react';
import Svg from 'components/svg/Svg';

const ReportHeaderUpsell = (props) => {
	return (
		<div className="header-upsell">
			<div onClick={props.showPremiumUpsell} className="premium-header">
				<p className="pull-left"><Svg className="icon-exclamation" svg="exclamationWhite" /> More Info Available!</p>
				<p className="pull-right">Read More <Svg className="icon-arrow-right" svg="arrowRight" /></p>
			</div>
		</div>
	);
};

ReportHeaderUpsell.propTypes = {
	isPremium: React.PropTypes.bool,
	showPremiumUpsell: React.PropTypes.func
};

export default ReportHeaderUpsell;
