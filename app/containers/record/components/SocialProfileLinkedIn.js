import React, { Component, PropTypes } from 'react';
import Svg from 'components/svg/Svg';
import config from 'config';

import _ from 'lodash';

class SocialProfileLinkedIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hiddenImage: false,
			showJobs: {
				limit: 5,
				showAll: false
			},
			showSkills: {
				limit: 5,
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
				limit: 5,
				showAll: false
			}
		});
	}

	render() {
		let { social } = this.props,
			{ hiddenImage, showJobs, showSkills } = this.state,
			jobs = [],
			skills = [],
			jobsDifference,
			skillsDifference;

		/**
		 * -------------------------------------------
		 * Create an array of all the job titles
		 * -------------------------------------------
		 */

		// grab the jobs from the `tags` array
		if(!_.isEmpty(social.tags)) {
			jobs = social.tags.filter(tag => {
				if(tag['@classification'] === 'job') {
					return true;
				}
			}).map(job => {
				if(job.content) return job.content;
			});
		}

		// include the first job from the `jobs` array as well
		if(_.has(social, 'jobs[0].display')) {
			jobs.unshift(social.jobs[0].display);
		}

		// use this for truncating large sets
		jobsDifference = jobs.length - showJobs.limit;

		/**
		 * -------------------------------------------
		 * Create an array of all the skill names
		 * -------------------------------------------
		 */

		if(!_.isEmpty(social.tags)) {
			skills = social.tags.filter(tag => {
				if(tag['@classification'] === 'skill') {
					return true;
				}
			}).map(skill => {
				if(skill.content) return skill.content;
			});
		}

		// use this for truncating large sets
		skillsDifference = skills.length - showSkills.limit;

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
				 * Render their list of past jobs and skills
				 * -------------------------------------------
				 */}

				{ (jobs.length > 0 || skills.length > 0) &&
					<div className="auxiliary-info">
						<div>
							{/* Jobs ------------- */}
							{ jobs.length > 0 &&
								<div>
									<div className="label">
										<h4>Jobs</h4>
									</div>

									<ul className="simple">
										{ jobs.map((job, i) => {
											if(i < showJobs.limit) { return <li key={i}>{job}</li>; }
										}) }
									</ul>

									{ jobsDifference > 0 &&
										<button onClick={this.showMore} id="showJobs" className="btn btn-link">Show More ({jobsDifference})</button>
									}

									{ showJobs.showAll &&
										<button onClick={this.showLess} id="showJobs" className="btn btn-link">Show Less</button>
									}
								</div>
							}

							{/* Skills ------------- */}
							{ skills.length > 0 &&
								<div>
									<div className="label">
										<h4>Skills</h4>
									</div>

									<ul className="simple">
										{ skills.map((skill, i) => {
											if(i < showSkills.limit) { return <li key={i}>{skill}</li>; }
										}) }
									</ul>

									{ skillsDifference > 0 &&
										<button onClick={this.showMore} id="showSkills" className="btn btn-link">Show More ({skillsDifference})</button>
									}

									{ showSkills.showAll &&
										<button onClick={this.showLess} id="showSkills" className="btn btn-link">Show Less</button>
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

SocialProfileLinkedIn.propTypes = {
	social: PropTypes.object.isRequired
};

export default SocialProfileLinkedIn;
