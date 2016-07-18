import React, { Component } from 'react';
import classNames from 'classnames';
import CriminalColumn from './crime';

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
      <div className={classNames('criminal-results', classes)}>
        <h3 className='title'>
          <i className='criminal-icon'></i>
          <span>({count}) </span> {title}
        </h3>

        { count > 9 && count >= results ?
          <div className='sub-title'>
            <p>Displaying <strong>{results + 1}</strong> records</p>
          </div> : null
        }

        { records.map((crime, index) => {
          if (index <= results) {
            return <CriminalColumn
              key={`records-${uuid.v1()}`}
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
          }
        }) }

        { count > 9 && count >= results ?
          <button className='btn btn-link btn-criminal' onTouchTap={() => this.showMoreRecords(type)}>
            Show More Criminal Matches
          </button> : null
        }
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
