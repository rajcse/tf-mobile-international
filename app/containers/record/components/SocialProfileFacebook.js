import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import config from 'config';

import _ from 'lodash';

class SocialProfileFacebook extends Component {
	constructor(props) {
		super(props);

		this.defaultLimit = 5;

		this.state = {
			hiddenImage: false,
			showFriends: {
				limit: this.defaultLimit,
				showAll: false
			},
			showNetworks: {
				limit: this.defaultLimit,
				showAll: false
			}
		};

		this.handleError = this.handleError.bind(this);
		this.showMore = this.showMore.bind(this);
		this.showLess = this.showLess.bind(this);
	}

	// remove photos that don't load
	handleError() {
		this.setState({
			hiddenImage: true
		});
	}

	// show all of the tags
	showMore(e) {
		this.setState({
			[e.target.id]: {
				limit: Infinity,
				showAll: true
			}
		});
	}

	// truncate the number of tags by `initialCounter`
	showLess(e) {
		this.setState({
			[e.target.id]: {
				limit: this.defaultLimit,
				showAll: false
			}
		});
	}

	render() {
		let { social } = this.props,
			{ hiddenImage, showFriends, showNetworks } = this.state,
			friends = [],
			networks = [],
			friendsDifference,
			networksDifference;

		/**
		 * -------------------------------------------
		 * Create an array of all the friends names
		 * -------------------------------------------
		 */

		if(!_.isEmpty(social.relationships)) {
			friends = social.relationships.map(friend => {
				if(_.has(friend, 'names[0].display')) return friend.names[0].display;
			});
		}

		// use this for truncating large sets
		friendsDifference = friends.length - showFriends.limit;

		/**
		 * -------------------------------------------
		 * Create an array of all the network names
		 * -------------------------------------------
		 */

		if(!_.isEmpty(social.tags)) {
			networks = social.tags.filter(tag => {
				if(tag['@classification'] === 'networks') {
					return true;
				}
			}).map(network => {
				if(network.content) return network.content;
			});
		}

		// use this for truncating large sets
		networksDifference = networks.length - showNetworks.limit;

		return (
			<div className="outer row fancy expanded">
				<div className="profile-header simple-inline row">
					{/**
					 * -------------------------------------------
					 * Render a profile picture if we have one
					 * -------------------------------------------
					 */}

					<div className="inline social-thumbnail">
						{ social.images && !hiddenImage ?
							<img onError={this.handleError} src={`${config.API_ROOT}/data/image/${social.images[0].thumbnail_token}`} />
							: <Svg svg="userAccount" className="generic-user-icon" /> }
					</div>

					{/**
					 * -------------------------------------------
					 * Render the title & username if we have one
					 * -------------------------------------------
					 */}

					<div className="inline">
						<p><strong>{social.name}</strong>
							{ social['@origin_url'] && _.has(social, 'usernames[0].content') &&
								<span><br />/<span>{social.usernames[0].content}</span></span>
							}
						</p>
					</div>

					{/**
					 * -------------------------------------------
					 * External link to their profile
					 * -------------------------------------------
					 */}

					{ social['@origin_url'] &&
						<a href={social['@origin_url']}><Svg svg="externalLink" className="external-link" /></a>
					}
				</div>

				{/**
				 * -------------------------------------------
				 * Render the lists of friends and networks
				 * -------------------------------------------
				 */}

				{ (friends.length > 0 || networks.length > 0) &&
					<div className="auxiliary-info">
						<div>
							{/* Friends ------------- */}
							{ friends.length > 0 &&
								<div>
									<div className="label">
										<h4>Friends</h4>
									</div>

									<ul className="simple">
										{ friends.map((friend, i) => {
											if(i < showFriends.limit) { return <li key={i}>{friend}</li>; }
										}) }
									</ul>

									{ friendsDifference > 0 &&
										<button onClick={this.showMore} id="showFriends" className="btn btn-link">Show More ({friendsDifference})</button>
									}

									{ showFriends.showAll &&
										<button onClick={this.showLess} id="showFriends" className="btn btn-link">Show Less</button>
									}
								</div>
							}

							{/* Networks ------------- */}
							{ networks.length > 0 &&
								<div>
									<div className="label">
										<h4>Networks</h4>
									</div>

									<ul className="simple">
										{ networks.map((network, i) => {
											if(i < showNetworks.limit) { return <li key={i}>{network}</li>; }
										}) }
									</ul>

									{ networksDifference > 0 &&
										<button onClick={this.showMore} id="showNetworks" className="btn btn-link">Show More ({networksDifference})</button>
									}

									{ showNetworks.showAll &&
										<button onClick={this.showLess} id="showNetworks" className="btn btn-link">Show Less</button>
									}
								</div>
							}
						</div>
					</div>
				}
			</div>
		);
	}
}

SocialProfileFacebook.propTypes = {
	social: PropTypes.object.isRequired
};

export default SocialProfileFacebook;
