import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid';

import CriminalColumn from './crime';
import SimpleRow from '../Shared/SimpleRow';

class CriminalDetails extends Component {
  render() {
    let { details } = this.props;

    let caseNumber = details.case_number ?
      <SimpleRow
        key={`details-${uuid.v1()}`}
        title='Case Number'
        content={details.case_number}
      />
    : null;

    let caseFilling = !_.isEmpty(details.case_filing_date) ?
      <SimpleRow
        key={`details-${uuid.v1()}`}
        title='Case Filing Date'
        content={moment({
          month: details.case_filing_date.month,
          day: details.case_filing_date.day,
          year: details.case_filing_date.year
        }).format('LL')}
      />
    : null;

    let source = !_.isEmpty(details.data_source) ?
      <SimpleRow
        key={`details-${uuid.v1()}`}
        title='Data Source'
        content={details.data_source}
      />
    : null;

    let sourceState = !_.isEmpty(details.data_source_state) ?
      <SimpleRow
        key={`details-${uuid.v1()}`}
        title='Data Source State'
        content={details.data_source_state}
      />
    : null;

    let offenses = !_.isEmpty(details.offenses) ?
      _.map(details.offenses, (offense, index) => (
        <div key={`offense-${uuid.v1()}`} className='offenses'>
          <SimpleRow
            key={`details-${uuid.v1()}`}
            title='Description'
            content={offense.description}
          />

          { !_.isNull(offense.offense_date) ?
            <SimpleRow
              key={`offense-date-${uuid.v1()}`}
              title='Offense Date'
              content={moment({
                month: offense.offense_date.month,
                day: offense.offense_date.day,
                year: offense.offense_date.year
              }).format('LL')}
            />
          : null }

          { !_.isNull(offense.arrest) && !_.isNull(offense.arrest.date) ?
            <SimpleRow
              key={`details-${uuid.v1()}`}
              title='Arrested On'
              content={moment({
                month: offense.arrest.date.month,
                day: offense.arrest.date.day,
                year: offense.arrest.date.year
              }).format('LL')}
            />
          : null }
        </div>
      ))
    : null;

    let address = !_.isEmpty(details.address) ?
      <SimpleRow
        key={`details-${uuid.v1()}`}
        title='Address'
        content={details.address.display}
      />
    : null;

    // Apperance Data
    let eyes = details.eyes ?
      <SimpleRow
        key={`details-${uuid.v1()}`}
        title='Eyes'
        content={details.eyes}
      />
    : null;

    let hair = details.hair ?
      <SimpleRow
        title='Hair'
        content={details.hair}
      />
    : null;

    let height = details.height ?
      <SimpleRow
        title='Height'
        content={details.height}
      />
    : null;

    let weight = details.weight ?
      <SimpleRow
        title='Weight'
        content={`${details.weight} lbs`}
      />
    : null;

    let race = details.race ?
      <SimpleRow
        title='Race'
        content={details.race}
      />
    : null;

    let sex = details.sex ?
      <SimpleRow
        title='Sex'
        content={details.sex}
      />
    : null;

    return (
      <div className='content content-full'>
        <h3 className='title'>Details: </h3>
        {/*Case Number*/}
        { caseNumber }

        {/*Case Filing Date*/}
        { caseFilling }

        {/*Address*/}
        { address }

        {/*Offenses*/}
        { offenses }

        {/*Sources*/}
        { source }
        { sourceState }

        {/*Appearance Info*/}
        <h4 className='title'>Appearance: </h4>
        { eyes }
        { hair }
        { height }
        { weight }
        { race }
        { sex }
      </div>
    );
  }
}

CriminalDetails.propTypes = {
  details: React.PropTypes.object.isRequired
}

export default CriminalDetails;
