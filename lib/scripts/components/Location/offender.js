import React, { Component } from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import config from 'config';

import SimpleRow from '../Shared/SimpleRow';

class OffenderLocation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      address,
      name,
      image_token
    } = this.props;

    const fullName = `${name.first} ${name.middle} ${name.last}`;

    // Mugshots
		let mugshot = '//placehold.it/300x300';

		if (!_.isNull(image_token)) {
			mugshot = `${config.API_ROOT}/data/image/${image_token}`;
		}

    return (
      <div className='location-info widget'>
        <h3 className='title'>{fullName}</h3>

        <div className='details'>
          <div className='photo thumbnail'>
            <img src={ mugshot } />
          </div>

          <div className='actions'>
            <button className='btn-link'>Open Report</button>
          </div>
        </div>

        <SimpleRow
          key={`details-${uuid.v1()}`}
          title='Address'
          content={address.display}
        />
      </div>
    );
  }
}

export default OffenderLocation;
