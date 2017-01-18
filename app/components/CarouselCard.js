import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import _ from 'lodash';

class CarouselCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cards: this.props.cards,
			current: 0,
			end: this.props.cards.length - 1
		};

		this.renderList = this.renderList.bind(this);
		this.renderNavigation = this.renderNavigation.bind(this);
		this.renderCard = this.renderCard.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
	}

	/**
	 * Handle Button Click without triggering submit
	 */
	handleClick(e) {
		e.preventDefault();

		if (this.state.current !== this.state.end) {
			this.nextSlide();
		} else {
			this.props.onComplete();
		}
	}

	nextSlide() {
		if (this.state.current !== this.state.end) {
			this.setState({
				current: this.state.current + 1
			});
		}
	}

	renderList(list) {
		return _.map(list, (item, key) => {
			return (<li className={key === this.state.current ? 'active' : ''} key={key}>
				<Svg svg="premiumStar"/> {item}
			</li>);
		});
	}

	renderNavigation() {
		const navArray = this.state.cards;

		return _.map(navArray, (nav, key) => {
			return <span className={key === this.state.current ? 'active' : ''} key={key}/>;
		});
	}

	renderCard() {
		return _.map(this.props.cards, (card, key) => {
			return (<div className={ key === this.state.current ? 'active card' : 'card' } key={key}>
				<div className="card-title">
					<h3>{card.title}</h3> <Svg svg="premiumIcon"/>
				</div>
				<p>{card.content}</p>

				<ul className={card.split ? 'split' : 'default'}>
					{this.renderList(card.list)}
				</ul>
			</div>);
		});
	}

	render() {
		return (
			<div id="card-wrapper">
				{/* Render Cards */}
				<div className="card-holder">
					{this.renderCard()}
				</div>

				{/* Render Unclickable Navigation Dots with active state by index */}
				<div className="card-nav">
					{this.renderNavigation()}
				</div>

				{/* Next Slide Button */}
				<div className="card-continue">
					<button className="btn btn-link" onClick={(e) => this.handleClick(e)}>Continue <Svg svg="arrowContinue"/></button>
				</div>
			</div>
		);
	}
}

CarouselCard.propTypes = {
	cards: PropTypes.array.isRequired,
	onComplete: PropTypes.func
};

export default CarouselCard;
