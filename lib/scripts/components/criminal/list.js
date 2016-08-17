import React, { Component } from 'react';
import classNames from 'classnames';
import OwlCarousel from 'react-owl-carousel';
import CriminalColumn from './crime';
import moment from 'moment';

import _ from 'lodash';
import uuid from 'uuid';

class CriminalRecordsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [`${this.props.type}Results`]: 9
    };

    this.showMoreRecords = this.showMoreRecords.bind(this);
  }

  showMoreRecords(type) {
    this.setState({
      [`${type}Results`]: this.state[`${type}Results`] + 10
    });
  }

  render() {
    let { records, title, classes, type } = this.props;

    let count = records.length;

    let results = this.state[`${type}Results`];

    return (
      <div className={classNames('criminal-results simple-column row', classes)}>
        <div className='label'>
          <h4>{title}</h4>
        </div>

        <OwlCarousel slideSpeed={300} itemsCustom={[[0,1.25], [375, 1.5]]} navigation={false} autoHeight singleItem={false} autoPlay={false} >
          { records.map((crime, index) => {
            if (index <= results) {
              return <div key={index} className="criminal-card">
                <h2 className="h4">{`${crime.name.first} ${crime.name.last}`}</h2>

                { _.has(crime, 'address.city') && _.has(crime, 'address.state_code') ?
                  <p>{`${crime.address.city}, ${crime.address.state_code}`}</p>
                : null }

                { _.has(crime.offenses[0], 'arrest.date') && !_.isNull(crime.offenses[0].arrest.date)?
                  <p>{moment(`${crime.offenses[0].arrest.date.month}/${crime.offenses[0].arrest.date.day}/${crime.offenses[0].arrest.date.year}`, 'MM/DD/YYYY').format('ll')}</p>
                : null }

                <button className="btn btn-link">Case Details</button>
              </div>
              
              // return <CriminalColumn
              //   key={`records-${uuid.v1()}`}
              //   crime={_.pick(crime,
              //     'matching_fields',
              //     'offender_id',
              //     'case_number',
              //     'case_filing_date',
              //     'name',
              //     'dob',
              //     'address',
              //     'offenses',
              //     'county_of_origin',
              //     'mugshots',
              //     'eyes',
              //     'hair',
              //     'height',
              //     'weight',
              //     'race',
              //     'sex'
              //   )}
              // />
            }
          }) }
        </OwlCarousel>
      </div>
    );
  }
}

CriminalRecordsList.propTypes = {
  records: React.PropTypes.array.isRequired,
  classes: React.PropTypes.string,
  title: React.PropTypes.string,
  type: React.PropTypes.string
}

export default CriminalRecordsList;
