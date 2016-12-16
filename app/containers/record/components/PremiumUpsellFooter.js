import React from 'react';
import Svg from 'components/svg/Svg';
import firebaseClient from 'utils/firebaseClient';

const PremiumUpsellFooter = (props) => {
	const showPremiumUpsell = () => {
		props.showPremiumUpsell();
		firebaseClient.logEvent('premium_upsell_trigger', {trigger_category: 'user', trigger_element: 'PremiumUpsellFooter.button'});
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
			<ul>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Bankruptcy Filings</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Properties Owned</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Civil Judgments</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Tax Liens</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Foreclosures</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Corporate Affiliations</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Water Craft Owned</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Voter Registration</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Education Information</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Professional Licenses</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Hunting/Fishing Permits</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Weapons Permits</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Prior Addresses</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Auto Accident Information</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Information on Neighbors</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Business Associates</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Additional Phone Numbers</li>
				<li><Svg svg="premiumStarIcon" style={{width: 10}}/>And More!!</li>
			</ul>
			<button onClick={showPremiumUpsell} className="btn btn-upgrade">View More Information</button>
		</section>
	);
};

PremiumUpsellFooter.propTypes = {
	showPremiumUpsell: React.PropTypes.func.isRequired,
	record: React.PropTypes.object.isRequired
};

export default PremiumUpsellFooter;
