import React, { Component } from 'react';
import CarouselCard from 'components/CarouselCard';

class Onboarding extends Component {
	constructor(props) {
		super(props);

		// This is default content and should be changed!
		this.state = {
			cards: [{
				title: 'Congratulations',
				sub_title: null,
				content: 'Lorem Ipsum',
				icon: 'premiumIcon',
				image: null
			}, {
				title: null,
				sub_title: null,
				content: 'Lorem Ipsum',
				icon: 'premiumIcon',
				image: null
			}, {
				title: null,
				sub_title: 'Report Types',
				content: 'Lorem Ipsum',
				icon: 'premiumIcon',
				image: 'searchBoarding'
			}, {
				title: 'Lorem Ipsum',
				sub_title: null,
				content: 'Lorem Ipsum',
				icon: 'premiumIcon',
				image: null
			}]
		};
	}

	render() {
		return (
			<div id="onboarding">
				<div className="wrapper">
					<CarouselCard
						cards={this.state.cards}
						carouselType="board"
						classNames="carousel-board"
						onComplete={this.continueToReview}
						onCompleteText="Take Me To Search"
						enableTouch={true}
					/>
				</div>
			</div>
		);
	}
}

export default Onboarding;
