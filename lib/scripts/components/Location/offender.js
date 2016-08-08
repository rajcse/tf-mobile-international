import React, { Component } from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import config from 'config';

import constants from '../../constants/pubRecConstants';
import SearchLink from '../SearchLink';
import SimpleRow from '../Shared/SimpleRow';
import SimpleColumn from '../Shared/SimpleColumn';

class OffenderLocation extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    document.querySelector('body').className='modal-open';
  }

  componentWillUnmount() {
    document.querySelector('body').className='';
  }

  render() {
    let {
      address,
      name,
      image_token,
      offender_status,
      offense_code,
      offense_description1,
      aka1,
      case_number,
      recordData,
      eye_color,
      hair_color,
      height,
      race,
      scars_marks,
      sex,
      weight
    } = this.props;

    const fullName = `${name.first} ${name.middle} ${name.last}`;

    // Mugshots
		let mugshot = '//placehold.it/300x300';

		if (!_.isNull(image_token)) {
			mugshot = `${config.API_ROOT}/data/image/${image_token}`;
		}

    return (
      <div className='location-info widget'>
        <h2 className='title'>{fullName}</h2>

        <div className='details'>
          <div className='photo thumbnail'>
            <img src={ mugshot } />
          </div>

          <div className='actions'>
            <SearchLink
              criteria={{
                type: constants.reportTypes.PERSON,
                query: {
                  firstName: name.first,
                  lastName: name.last,
                  state: address.state_code
                },
                text: `${name.first} ${name.last}`
              }}
              classes='btn-link btn'> Person Report
            </SearchLink>
          </div>
        </div>

        { offense_description1 ?
          <SimpleColumn
            key={`description-${uuid.v1()}`}
            title='Offender Description'
            content={offense_description1}
          /> : null }

        { offender_status ?
          <SimpleColumn
            key={`status-${uuid.v1()}`}
            title='Offender Status'
            content={offender_status}
          /> : null }

        { offense_code ?
          <SimpleColumn
            key={`code-${uuid.v1()}`}
            title='Offender Code'
            content={offense_code}
          /> : null }

        { aka1 ?
          <SimpleColumn
            key={`alias-${uuid.v1()}`}
            title='Alias'
            content={aka1}
          /> : null }

        { eye_color ?
          <SimpleColumn
            key={`eyecolor-${uuid.v1()}`}
            title='Eye Color'
            content={eye_color}
          /> : null }

        { hair_color ?
          <SimpleColumn
            key={`haircolor-${uuid.v1()}`}
            title='Hair Color'
            content={hair_color}
          /> : null }

        { race ?
          <SimpleColumn
            key={`race-${uuid.v1()}`}
            title='Race'
            content={race}
          /> : null }

        { scars_marks ?
          <SimpleColumn
            key={`scars_marks-${uuid.v1()}`}
            title='Scars Marks'
            content={scars_marks}
          /> : null }

        { sex ?
          <SimpleColumn
            key={`sex-${uuid.v1()}`}
            title='Sex'
            content={sex}
          /> : null }

        { weight ?
          <SimpleColumn
            key={`weight-${uuid.v1()}`}
            title='Weight'
            content={`${weight} lbs`}
          /> : null }

        <SimpleColumn
          key={`details-${uuid.v1()}`}
          title='Location'
          content={`${address.city}, ${address.state_code}`}
        />
      </div>
    );
  }
}

export default OffenderLocation;
