import React, { Component } from 'react';
import MultipleDivView from './MultipleDivView';

const LocationSectionView = (props) => {

	return(
		<section id="location"> <h2>Locations:</h2>  
			{ props.data.map(content => <MultipleDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content.address, "display", "is_deliverable", "usage", "is_receiving_mail")} />) }
		</section>
	);
}

export default LocationSectionView;