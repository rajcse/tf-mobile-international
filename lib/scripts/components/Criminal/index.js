import React, { Component } from 'react';
import CriminalColumn from './crime';

import _ from 'lodash';
import uuid from 'uuid';

const CriminalRecordsSectionView = (props) => {

	let { crimes } = props;

	let mostLikely 	= [],
		likely		= [],
		leastLikely = [];

	for(var record in crimes){
		if (crimes[record].matching_fields.dob == 'true') {
			mostLikely.push( record );
		} else if (crimes[record].matching_fields.state == 'true') {
			likely.push( crimes[record] );
		} else {
			leastLikely.push( crimes[record] );
		}
	}

	let mostLikelyNode, likelyNode, leastLikelyNode;

	// Most Likely Criminal Records
	if (!_.isEmpty(mostLikely)) {
		mostLikelyNode = mostLikely.map(crime => (
			<CriminalColumn
				key={`most-likely-${uuid.v1()}`}
				crime={_.pick(crime,
					'matching_fields',
					'offender_id',
					'case_number',
					'case_filing_date',
					'name',
					'dob',
					'address',
					'offenses',
					'county_of_origin'
				)}
				indicator='green'
				title='Most Likely'
			/>
		))
	}

	mostLikelyNode = !_.isEmpty(mostLikely) ? <div className='criminal-results most-likely'>
		<h3 className='title'><span>({mostLikely.length})</span> Most Likely</h3>
		{mostLikelyNode}
	</div> : null;

	// Likely Criminal Records
	if (!_.isEmpty(likely)) {
		likelyNode = likely.map(crime => (
			<CriminalColumn
				key={`likely-${uuid.v1()}`}
				crime={_.pick(crime,
					'matching_fields',
					'offender_id',
					'case_number',
					'case_filing_date',
					'name',
					'dob',
					'address',
					'offenses',
					'county_of_origin'
				)}
				indicator='yellow'
				title='Likely'
			/>
		))
	}

	likelyNode = !_.isEmpty(likely) ? <div className='criminal-results likely'>
		<h3 className='title'><span>({likely.length})</span> Likely</h3>
		{likelyNode}
	</div> : null;

	// Least Likely Criminal Records
	if (!_.isEmpty(leastLikely)) {
		leastLikelyNode = leastLikely.map(crime => (
			<CriminalColumn
				key={`least-likely-${uuid.v1()}`}
				crime={_.pick(crime,
					'matching_fields',
					'offender_id',
					'case_number',
					'case_filing_date',
					'name',
					'dob',
					'address',
					'offenses',
					'county_of_origin'
				)}
				indicator='yellow'
				title='Likely'
			/>
		))
	}

	leastLikelyNode = !_.isEmpty(leastLikely) ? <div className='criminal-results least-likely'>
		<h3 className='title'><span>({leastLikely.length})</span> Least Likely</h3>
		{leastLikelyNode}
	</div> : null;

	return (
		<section id='criminal' className='widget'>
			<h2 className='title'>Criminal Records</h2>

			{/*Most Likely Criminal Records*/}
			{mostLikelyNode}

			{/*Likely Criminal Records*/}
			{likelyNode}

			{/*Least Likely Criminal Records*/}
			{leastLikelyNode}
		</section>
	);
}

export default CriminalRecordsSectionView;
