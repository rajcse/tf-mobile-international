import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Svg from '../Svg';
import config from 'config';

import _ from 'lodash';

class ProfileColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showTags: false,
			initialCount: 5,
			hiddenImage: false
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

	// Remove photos that don't load
	handleError() {
		this.setState({
			hiddenImage: true
		});
	}

	render() {
		let {
			social
		} = this.props;

		let {
			initialCount,
			showTags,
			hiddenImage
		} = this.state;

		let initialTags = _.slice(social.tags, 0, initialCount);
		let difference = (!_.isNull(social.tags) ? social.tags.length : 0) - initialCount;

		return (
			<div className="simple-inline row">
				<div className="inline social-thumbnail">
					{ social.images && !hiddenImage ?
						<img onError={this.handleError.bind(this)} src={`${config.API_ROOT}/data/image/${social.images[0].thumbnail_token}`} />
						: <Svg svg="userAccount" style={{width: 17}} /> }
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
							<button onClick={this.showMore} className="btn btn-link">Show More ({difference})</button>
						: null }

						{ showTags ?
							<button onClick={this.showLess} className="btn btn-link">Show Less</button>
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
