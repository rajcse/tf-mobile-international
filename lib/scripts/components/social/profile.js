import React, { Component, PropTypes } from 'react';
import config from 'config';
import { Link } from 'react-router';

import _ from 'lodash';

class ProfileColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showTags: false,
			initialCount: 5
		};

		this.showMore = this.showMore.bind(this);
		this.showLess = this.showLess.bind(this);
	}

	showMore() {
		this.setState({
			initialCount: this.props.social.tags.length,
			showTags: true
		});
	}

	showLess() {
		this.setState({
			initialCount: 5,
			showTags: false
		});
	}

	render() {
		let {
			social
		} = this.props;

		let {
			initialCount,
			showTags
		} = this.state;

		let initialTags = _.slice(social.tags, 0, initialCount);
		let difference = (!_.isNull(social.tags) ? social.tags.length : 0) - initialCount;

		return (
			<div className="simple-inline row">
				<div className="inline social-thumbnail">
					{ !_.isNull(social.images) ?
						<img src={`${config.API_ROOT}/data/image/${social.images[0].thumbnail_token}`} />
					: null }
				</div>

				<div className="inline">
					<p><strong>{social.name}</strong><br/>/&nbsp;
						{ social['@origin_url'] ?
							<Link to={social['@origin_url']}>
								{_.has(social, 'usernames[0].content') ?
									<span>{social.usernames[0].content}</span>
									: <span>{social.name}</span> }
							</Link>
						: null }
					</p>
				</div>

				{ !_.isEmpty(social.tags) ?
					<ul className="tags">
						{ _.map( initialTags, (tag, key) => {
							return (<li key={key}>
								{ _.truncate(tag.content, (
									'length': 48
								)) }
							</li>);
						}) }

						{ difference > 0 ?
							<button onTouchTap={this.showMore} className="btn btn-link">Show More ({difference})</button>
						: null }

						{ showTags ?
							<button onTouchTap={this.showLess} className="btn btn-link">Show Less</button>
						: null }
					</ul>
				: null }
			</div>
		);
	}
}

ProfileColumn.propTypes = {
	social: PropTypes.object.isRequired
};

export default ProfileColumn;
