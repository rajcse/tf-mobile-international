import React, { Component } from 'react';
import MultipleDivView from '../Shared/MultipleDivView';

const SexOffenderSectionView = (props) => {

	return(
		<section id="offender"> <h2>Sex Offenders:</h2>  
			{ /*props.data.map(content => <MultipleDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content.address, "display", "is_deliverable", "usage", "is_receiving_mail")} />) */}
		</section>
	);
}

export default SexOffenderSectionView;