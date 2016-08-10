import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Liens = (props) => {
	let { liens } = props;

  return (
    <div className='multi-container'>
      <section id='liens' className='widget multi-widget'>
        <h2 className='title'>Liens</h2>
        { liens.map((lien, index) => (
          <div className='lien widget' key={index}>
            <h3 className='title'>
              Lien Filed on {`${constants.months[lien.origin_filing_date.month]} ${lien.origin_filing_date.day}, ${lien.origin_filing_date.year}`}
            </h3>

            { lien.origin_filing_number ?
              <h4 className='sub-title'>
                Filing # {lien.origin_filing_number}
              </h4>
            : null }

            {(_.has(lien, 'multiple_defendant')) ?
              <SimpleRow
                key={`defendant-${uuid.v1()}`}
                content={lien.multiple_defendant ? 'Yes' : 'No'}
                title="Multiple Defendant"
              /> : null
            }

            {(_.has(lien, 'release_date')) && !_.isNull(lien.release_date) ?
              <SimpleRow
                key={`release-${uuid.v1()}`}
                content={`${constants.months[lien.release_date.month]} ${lien.release_date.day}, ${lien.release_date.year}`}
                title="Release Date"
              /> : null
            }

            {(_.has(lien, 'tms_id')) ?
              <SimpleRow
                key={`tms-${uuid.v1()}`}
                content={lien.tms_id}
                title="TMS ID"
              /> : null
            }

            {_.isEmpty(lien.filings) ? null :
              <div id="filing">
                <h3>Filing Information</h3>
                { lien.filings.map((filing) => (
                  <SimpleRow
                    key={`filing-${uuid.v4()}`}
                    content={filing.number}
                    title="Filing Number"
                  />
                )) }
              </div>
            }
          </div>
        )) }
      </section>
    </div>
  );
}

Liens.propTypes = {
	liens: React.PropTypes.array.isRequired
}

export default Liens;
