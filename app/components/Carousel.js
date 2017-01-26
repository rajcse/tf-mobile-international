import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Swipeable from 'react-swipeable';
import Svg from 'components/svg/Svg';

class Carousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			items: this.props.items
		};

		this.carouselItems = this.carouselItems.bind(this);
		this.carouselSlider = this.carouselSlider.bind(this);
		this.swipedLeft = this.swipedLeft.bind(this);
		this.swipedRight = this.swipedRight.bind(this);
	}

	swipedLeft() {
		let items = this.state.items;
		let index = this.state.index + 1;

		if ( index >= 0 && index !== items.length ) {
			this.setState({
				index: index
			});
		}
	}

	swipedRight() {
		let index = this.state.index - 1;

		if ( index >= 0 ) {
			this.setState({
				index: index
			});
		}
	}

	carouselSlider() {
		return _.map(this.state.items, (slider, key) => {
			return (<li
				key={key}
				className={this.state.index === key ? 'active' : ''}
				onClick={() => {}}>
				{key}
			</li>);
		});
	}

	carouselItems() {
		return _.map(this.state.items, (item, key) => {
			let classNames = this.state.index === key ? 'carousel-item active' : 'carousel-item';

			return (<div key={key} className={classNames}>
				{ item.svg ? <Svg svg={item.svg} /> : null }
				<h2 className="h2">{item.title}</h2>
				<p>{item.content}</p>
			</div>);
		});
	}

	render() {
		return (
			<div id="carousel">
				<Swipeable
					onSwipedLeft={this.swipedLeft}
					onSwipedRight={this.swipedRight} >

					{ this.carouselItems() }

					<ul className="carousel-slider">
						{ this.carouselSlider() }
					</ul>
				</Swipeable>
			</div>
		);
	}
}

Carousel.propTypes = {
	items: PropTypes.array.isRequired
};

export default Carousel;
