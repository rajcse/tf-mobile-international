import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import CriminalColumn from './crime';

import SimpleRow from '../Shared/SimpleRow';

class CriminalDetails extends Component {
  render() {
    let { details } = this.props;

    let caseNumber = details.case_number ?
      <SimpleRow
        title='Case Number'
        content={details.case_number}
      />
    : null;

    let caseFilling = !_.isEmpty(details.case_filing_date) ?
      <SimpleRow
        title='Case Filing Date'
        content={moment(`${details.case_filing_date.month}/${details.case_filing_date.day}/${details.case_filing_date.year}`).format('LL')}
      />
    : null;

    let source = !_.isEmpty(details.data_source) ?
      <SimpleRow
        title='Data Source'
        content={details.data_source}
      />
    : null;

    let sourceState = !_.isEmpty(details.data_source_state) ?
      <SimpleRow
        title='Data Source State'
        content={details.data_source_state}
      />
    : null;

    let offenses = !_.isEmpty(details.offenses) ?
      _.map(details.offenses, (offense, index) => (
        <div className='offenses'>
          <SimpleRow
            title='Description'
            content={offense.description}
          />

          { !_.isEmpty(offense.arrest.date) ?
            <SimpleRow
              title='Arrested On'
              content={moment(`${offense.arrest.date.month}/${offense.arrest.date.day}/${offense.arrest.date.year}`).format('LL')}
            />
          : null }
        </div>
      ))
    : null;

    let address = !_.isEmpty(details.address) ?
      <SimpleRow
        title='Address'
        content={details.address.display}
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

        <h4 className='title'>Appearance: </h4>
        { details.eyes ?
          <SimpleRow
            title='Eyes'
            content={details.eyes}
          />
        : null }

        { details.hair ?
          <SimpleRow
            title='Hair'
            content={details.hair}
          />
        : null }

        { details.height ?
          <SimpleRow
            title='Height'
            content={details.height}
          />
        : null }

        { details.weight ?
          <SimpleRow
            title='Weight'
            content={details.weight}
          />
        : null }

        { details.race ?
          <SimpleRow
            title='Race'
            content={details.race}
          />
        : null }

        { details.sex ?
          <SimpleRow
            title='Sex'
            content={details.sex}
          />
        : null }
      </div>
    );
  }
}

CriminalDetails.propTypes = {
  details: React.PropTypes.object.isRequired
}

export default CriminalDetails;
