import React, { Component } from 'react';
import Link from 'components/Link';
import Svg from 'components/svg/Svg';

export default class Navigation extends Component {

	render() {
		return (
			<nav id="main-navigation">
				<ul>
					<li>
						<Link to="/" activeClassName="active-nav" onlyActiveOnIndex={true}>
							<Svg svg="navAccount" style={{width: 17}} />
							<span>Reports</span>
						</Link>
					</li>
					<li>
						<Link to="/search" activeClassName="active-nav">
							<Svg svg="navSearch" style={{width: 25}} />
							<span>Search</span>
						</Link>
					</li>
					<li>
						<Link to="/support" activeClassName="active-nav">
							<Svg svg="navHelp" style={{width: 18}} />
							<span>Help</span>
						</Link>
					</li>
					<li>
						<Link to="/account" activeClassName="active-nav">
							<Svg svg="settingsBlue" style={{width: 17}} />
							<span>Settings</span>
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
}
