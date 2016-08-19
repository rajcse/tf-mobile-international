import React, { Component } from 'react';
import _ from 'lodash';

export default class PossiblePhoneOwner extends Component {
  render() {
    let { name, age, birthday, location } = this.props;

    return (
      <div className="report-header">
        <div className="report-container">
          <div className="report-thumbnail">
            <img src="//placehold.it/70x70" />
          </div>
          <div className="report-brief">
            <h1>Possible Owner: {name}</h1>
            <p>{ age ? <span>{age} -</span> : null } { location }</p>
          </div>
        </div>
      </div>
    );
  }
}
