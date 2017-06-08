import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import config from 'config';

import _ from 'lodash';

class SocialProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hiddenImage: false,
			expanded: false
		};

		this.handleError = this.handleError.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	// remove photos that don't load
	handleError() {
		this.setState({
			hiddenImage: true
		});
	}

	// toggle the expanded state for the profile
	handleClick() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render() {
		let { social } = this.props,
			{ hiddenImage, expanded } = this.state,
			hasAuxiliaryInfo = social['@origin_url'] || !_.isEmpty(social.tags); // check if we have URLs or tags

		return (
			<div className={['outer row', expanded ? 'expanded' : ''].join(' ')}>
				<div className="profile-header simple-inline row" onClick={this.handleClick}>
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
					 * Render a username if we have one
					 * -------------------------------------------
					 */}

					<div className="inline">
						<p><strong>{social.name}</strong>
							{ social['@origin_url'] && _.has(social, 'usernames[0].content') &&
								<span><br />/<span>{social.usernames[0].content}</span></span>
							}
						</p>
					</div>

					{hasAuxiliaryInfo && <Svg svg="caretRight" className="caret" />}
				</div>

				{/**
				 * -------------------------------------------
				 * Render auxiliary information like
				 * tags and links
				 * -------------------------------------------
				 */}

				{ hasAuxiliaryInfo &&
					<div className="auxiliary-info">
						{/* Tags ------------- */}
						{ !_.isEmpty(social.tags) &&
							<div>
								<div className="label">
									<h4>Tags</h4>
								</div>

								<ul className="tags">
									{ social.tags.map((tag, i) => {
										if(tag.content) return <li key={i}>{_.truncate(tag.content, { length: 40 })}</li>;
									}) }
								</ul>
							</div>
						}

						{/* Links ------------- */}
						{ social['@origin_url'] &&
							<div>
								<div className="label">
									<h4>Link</h4>
								</div>

								<a href={social['@origin_url']}>
									{ _.has(social, 'usernames[0].content') ?
										<span>{social.usernames[0].content}</span>
										: <span>{social.name}</span>
									}
								</a>
							</div>
						}
					</div>
				}
			</div>
		);
	}
}

SocialProfile.propTypes = {
	social: PropTypes.object.isRequired
};

export default SocialProfile;
