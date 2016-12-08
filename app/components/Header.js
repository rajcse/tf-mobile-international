import React from 'react';
import _ from 'lodash';
import SearchInput from 'react-search-input';
import {hashHistory} from 'react-router';
import Svg from 'components/svg/Svg';

class Header extends React.Component {
	render() {
		const limitLength = (str, length) => `${str.substring(0, length)}...`;

		let {
			title,
			buttonHandler,
			backButton,
			archiveStatus,
			archiveStatusToggle,
			searchFilter,
			searchTerm,
			toggleSearch,
			isSearching
		} = this.props;

		title = title ? <h1>{title.length > 20 ? limitLength(title, 20) : title}</h1>
			: <Svg className="logo" svg="tfLogo" />;

		return (
			<header>
				{ backButton ?
					<span className="header-btn" onClick={buttonHandler ? buttonHandler : () => hashHistory.goBack()} />
				: null }

				{ _.isUndefined(searchFilter) ? null
					: <div id="searchFilter">
						<span className="header-search" onClick={() => toggleSearch()}>
							<Svg svg="search" className="header-search-icon" />
						</span>

						<SearchInput
							className={`search-input ${isSearching ? '' : 'hidden'}`}
							fuzzy={true}
							value={searchTerm}
							onChange={searchFilter}
						/>
					</div>
				}

				{title}

				{ _.isUndefined(searchFilter) || !isSearching ? null
					: <span className="header-done" onClick={() => toggleSearch()}>Done</span>
				}

				{ _.isUndefined(archiveStatus) && _.isUndefined(archiveStatusToggle) || isSearching ? null :
					archiveStatus ? <span className="header-done" onClick={() => archiveStatusToggle()}>Done</span>
					: <span className="header-edit" onClick={() => archiveStatusToggle()}>Edit</span>
				}
			</header>
		);
	}
}

Header.propTypes = {
	title: React.PropTypes.string,
	searchTerm: React.PropTypes.string,
	backButton: React.PropTypes.bool,
	archiveStatus: React.PropTypes.bool,
	isSearching: React.PropTypes.bool,
	toggleSearch: React.PropTypes.func,
	archiveStatusToggle: React.PropTypes.func,
	buttonHandler: React.PropTypes.func,
	searchFilter: React.PropTypes.func
};

export default Header;
