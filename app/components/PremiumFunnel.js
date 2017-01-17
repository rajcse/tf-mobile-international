import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import _ from 'lodash';

class PremiumFunnel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			funnels: this.props.funnels,
			key: 0
		};

		this.renderList = this.renderList.bind(this);
		this.renderNavigation = this.renderNavigation.bind(this);
		this.renderCard = this.renderCard.bind(this);
	}

	renderList(list) {
		return _.map(list, (item) => {
			return <li key={item.key}><Svg svg="premiumStar"/> {item}</li>;
		});
	}

	renderNavigation() {
		const navArray = this.state.funnels;

		return _.map(navArray, (nav) => {
			return <span className={this.state.key === nav.key ? 'active' : ''} key={nav.key}/>;
		});
	}

	renderCard() {
		return _.map(this.props.funnels, (funnel, index) => {
			return (<div className="funnel-card" key={index}>
				<div className="funnel-title">
					<h3>{funnel.title}</h3>
				</div>
				<p>{funnel.content}</p>

				{/* Render Cards */}
				<ul className={funnel.split ? 'split' : 'default'}>
					{this.renderList(funnel.list)}
				</ul>

				{/* Render Unclickable Navigation Dots with active state by index */}
				<div className="funnel-nav">
					{this.renderNavigation()}
				</div>
			</div>);
		});
	}

	render() {
		return <div id="premium-funnel">{this.renderCard()}</div>;
	}
}

PremiumFunnel.propTypes = {
	funnels: PropTypes.array.isRequired
};

export default PremiumFunnel;
