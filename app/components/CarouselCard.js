import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import Swipeable from 'react-swipeable';
import _ from 'lodash';

class CarouselCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			left: 0,
			cards: this.props.cards,
			current: 0,
			end: this.props.cards.length - 1,
			carouselType: this.props.carouselType || 'card', // or board
			enableTouch: this.props.enableTouch || false
		};

		this.renderList = this.renderList.bind(this);
		this.renderNavigation = this.renderNavigation.bind(this);
		this.renderCard = this.renderCard.bind(this);
		this.renderBoard = this.renderBoard.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
		this.swipedLeft = this.swipedLeft.bind(this);
		this.swipedRight = this.swipedRight.bind(this);
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

	/**
	 * Touch Controls
	 */
	swipedLeft() {
		if (this.state.enableTouch) {
			this.nextSlide();
		}
	}

	swipedRight() {
		if (this.state.enableTouch) {
			this.previousSlide();
		}
	}

	/**
	 * Control Active Slide
	 */
	nextSlide() {
		if (this.state.current !== this.state.end) {
			this.setState({
				current: this.state.current + 1
			});
		}
	}

	previousSlide() {
		if (this.state.current !== 0) {
			this.setState({
				current: this.state.current -1
			});
		}
	}

	/**
	 * Dumb Components - features
	 */
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

	/**
	 * Dumb Components - layout
	 */
	renderCard() {
		return _.map(this.props.cards, (card, key) => {
			return (<div className={ key === this.state.current ? 'active card' : 'card' } key={key}>
				<div className="title">
					<h3>{card.title}</h3> <Svg svg="premiumIcon"/>
				</div>
				<p>{card.content}</p>

				<ul className={card.split ? 'split' : 'default'}>
					{this.renderList(card.list)}
				</ul>
			</div>);
		});
	}

	renderBoard() {
		const style = {
			left: this.state.left
		};

		return _.map(this.props.cards, (card, key) => {
			return (<div
				className={ key === this.state.current ? 'active board' : 'board' }
				key={key}
				style={style}>
				<div className="board-title">
					{ card.sub_title ?
						<h3>{card.sub_title}</h3>
					: null }

					{ card.image ?
						<div className="image-container">
							<Svg svg={card.image}/>
						</div>
					: null }

					<Svg svg={card.icon}/>

					{ card.title ?
						<h3>{card.title}</h3>
					: null }
				</div>

				<p>{card.content}</p>

				{ key === this.state.end ?
					<button className="btn btn-upgrade" onClick={this.props.onComplete}>
						{this.props.onCompleteText}
					</button>
				: null }
			</div>);
		});
	}

	render() {
		const id = `${this.state.carouselType}-container`;

		return (
			<div id={id} className={this.props.classNames}>
				{/* Touch Controls */}
				<Swipeable
					onSwipedLeft={this.swipedLeft}
					onSwipedRight={this.swipedRight} >

					{/* Render Cards */}
					{ this.state.carouselType === 'board' ?
						<div className="content">
							<div className="holder">
								{this.renderBoard()}
							</div>
						</div>
					: null }

					{/* Render Full Screen Boards */}
					{ this.state.carouselType === 'card' ?
						<div className="holder">
							{this.renderCard()}
						</div>
					: null }
				</Swipeable>

				{/* Render Navigation Dots with active state by index */}
				<div className="nav">
					{this.renderNavigation()}
				</div>

				{/* Optional: Next Slide Button */}
				{ this.state.enableTouch ? null
					: <div className="continue">
						<button className="btn btn-link" onClick={(e) => this.handleClick(e)}>Continue <Svg svg="arrowContinue"/></button>
					</div>
				}
			</div>
		);
	}
}

CarouselCard.propTypes = {
	cards: PropTypes.array,
	onComplete: PropTypes.func,
	onCompleteText: PropTypes.string,
	classNames: PropTypes.string,
	carouselType: PropTypes.string,
	enableTouch: PropTypes.bool
};

export default CarouselCard;
