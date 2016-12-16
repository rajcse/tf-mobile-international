import React from 'react';
import Svg from 'components/svg/Svg';
import firebaseClient from 'utils/firebaseClient';

const PremiumUpsellHeader = (props) => {
	const showPremiumUpsell = () => {
		props.showPremiumUpsell();
		firebaseClient.logEvent('premium_upsell_trigger', {trigger_category: 'user', trigger_element: 'PremiumUpsellHeader'});
	};

	return (
		<div className="header-upsell">
			<div onClick={showPremiumUpsell} className="premium-header">
				<p className="pull-left"><Svg className="icon-exclamation" svg="exclamationWhite" /> More Info Available!</p>
				<p className="pull-right">Read More <Svg className="icon-arrow-right" svg="arrowRight" /></p>
			</div>
		</div>
	);
};

PremiumUpsellHeader.propTypes = {
	isPremium: React.PropTypes.bool,
	showPremiumUpsell: React.PropTypes.func
};

export default PremiumUpsellHeader;
