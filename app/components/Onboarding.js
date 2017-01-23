import React, { Component } from 'react';
import CarouselCard from 'components/CarouselCard';
import viewActions from 'actions/viewActions';
import firebaseClient from 'utils/firebaseClient';

class Onboarding extends Component {
	constructor(props) {
		super(props);

		// This is default content and should be changed!
		this.state = {
			message2: '',
			cards: [{
				title: 'Congratulations',
				sub_title: null,
				content: 'Your account has been successfully created and you now have acces to one of the most powerful people search apps available.',
				content2: 'There are a few things you should know when using the TruthFinder app. Swipe through the next screens to learn more.',
				icon: 'noticeCheck',
				image: null
			}, {
				title: null,
				sub_title: null,
				content: 'Start by searching for someone--It`s easy! Search by Person, Phone Number, and Email. Then select a Result.',
				icon: 'search',
				image: 'searchPage'
			}, {
				title: null,
				sub_title: null,
				content: 'Your results appear in the Reports tab. We offer three types of person reports: Free, Full & Premium.',
				icon: 'navAccount',
				image: 'reportsPage'
			}, {
				title: null,
				sub_title: 'Report Types',
				content: 'FREE Reports contain as much information as we can possibly give away for free!',
				icon: 'navAccount',
				image: 'freeReport'
			}, {
				title: null,
				sub_title: 'Report Types',
				content: 'FULL Reports contain all of the information we currently have access to for the person.',
				icon: 'navAccount',
				image: 'fullReport'
			}, {
				title: null,
				sub_title: 'Report Types',
				content: 'PREMIUM Reports cost us money to do additional searches on a aperson. We will ask for your confirmation per upgrade.',
				icon: 'navAccount',
				image: 'premiumReport2'
			}, {
				title: 'Go Explore!',
				sub_title: null,
				content2: null,
				content: 'Enjoy searching and discovering potentially shocking information on people in the TruthFinder app.',
				icon: 'search',
				image: null
			}]
		};
	}

	componentWillMount() {
		const message2Promise = firebaseClient.getConfigValue('welcome_message2');

		message2Promise.then(message => {
			this.setState({cards: [...this.state.cards.slice(0, -1), {
				title: 'Go Explore!',
				sub_title: null,
				content2: message,
				content: 'Enjoy searching and discovering potentially shocking information on people in the TruthFinder app.',
				icon: 'search',
				image: null
			}]});
		});
	}

	render() {
		return (
			<div id="onboarding">
				<div className="wrapper">
					<CarouselCard
						cards={this.state.cards}
						carouselType="board"
						classNames="carousel-board"
						onComplete={viewActions.confirmWelcome}
						onCompleteText="Take Me To Search"
						enableTouch={true}
					/>
				</div>
			</div>
		);
	}
}

export default Onboarding;

