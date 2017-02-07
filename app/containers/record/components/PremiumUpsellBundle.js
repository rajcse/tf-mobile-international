import React from 'react';
// import Svg from 'components/svg/Svg';
// import firebaseClient from 'utils/firebaseClient';

const PremiumUpsellBundle = (props) => {
	const showPremiumUpsell = () => {
		props.showPremiumUpsell();
		//firebaseClient.logEvent('premium_upsell_trigger', {trigger_category: 'user', trigger_element: 'PremiumUpsellFooter.button'});
	};

	return (
		<section id="premiumUpsell" className="widget premium">
			<h2 className="title" >
				PREMIUM DATA
			</h2>
			<p className="intro">
				Premium Data may be available and could include additional <span>potentially sensitive information </span>
				about {props.record.reportData.names[0].first}. In order to view Premium Data, you must first authorize this access.
			</p>
			<p className="includes">Premium Data May Include:</p>
			
			<button onClick={showPremiumUpsell} className="btn btn-upgrade">View More Information</button>
		</section>
	);
};

PremiumUpsellBundle.propTypes = {
	showPremiumUpsell: React.PropTypes.func.isRequired,
	record: React.PropTypes.object.isRequired
};

export default PremiumUpsellBundle;
