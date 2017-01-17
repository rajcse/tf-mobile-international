import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import _ from 'lodash';

class PremiumFunnel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: this.props.slide
    };

    this.renderList = this.renderList.bind(this);
  }

  renderList(list) {
    return _.map(list, (item, key) => {
      return <li key={key}><Svg svg="premiumStar"/> {item}</li>;
    });
  }

  render() {
    let {
      slide
    } = this.state;

    return (
      <div className="slide-card">
        <div className="slide-title">
          <h3>{slide.title}</h3>
				</div>
				<p>{slide.content}</p>
				<ul>
					{this.renderList(slide.list)}
				</ul>
			</div>
    );
  }
}

PremiumFunnel.propTypes = {
	slide: PropTypes.object
};

export default PremiumFunnel;
