import React, { Component } from 'react';
import LabelValue from '../Shared/LabelValue';
import TableView from '../Shared/TableView';
import SingleColumnRow from '../Shared/SingleColumnRow';
import PhotoView from '../Shared/PhotoView';
import SimpleRow from '../Shared/SimpleRow';

// Container Specific Component
import JobsColumn from './jobs';

import uuid from 'uuid';

const PersonalSectionView = (props) => {
  let content = [];

  content.push(
    <SimpleRow
      key={'personal-' + uuid.v1()}
      rowLabel='Name'
      rowContent={props.name}
    />
  );

  if(props.aliases){
    content.push(
      <SingleColumnRow
        key={'aliases-' + uuid.v1()}
        rowLabel='Aliases'
        rowContent={props.aliases}
      />
    );
  }

  if(props.birthInfo){
    content.push(
      <TableView
        key={'age-' + uuid.v1()}
        tableLabel='Birth Information'
        tableHeaders={['Age', 'Birthday', 'Astrological Sign']}
        tableRows={props.birthInfo}
      />
    );
  }

  if(props.photos){
    content.push(
      <PhotoView
        key={'photo-' + uuid.v1()}
        rowLabel='Possible Photos'
        rowContent={props.photos}
      />
    );
  }

  if(props.jobs){
    content.push(
      <JobsColumn
        key={'jobs-' + uuid.v1()}
        rowLabel='Jobs'
        rowContent={props.jobs}
        className='jobs'
      />
    );
  }

  if(props.education){
    content.push(
      <TableView
        key={'education-' + uuid.v1()}
        tableLabel='Education'
        tableHeaders={['School', 'Degree']}
        tableRows={props.education}
      />
    );
  }

  if(props.relatedLinks){
    content.push(
      <TableView
        key={'urls-' + uuid.v1()}
        tableLabel='Relatives'
        tableHeaders={['Name', 'Url']}
        tableRows={props.relatedLinks}
      />
    );
  }

  return(
    <section id='personal' className='widget'>
      <h2>Contact Information</h2>
      {content}
    </section>
  );
}

export default PersonalSectionView;
