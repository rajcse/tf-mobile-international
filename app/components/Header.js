import React from 'react';
import SearchInput from 'react-search-input';
import { hashHistory } from 'react-router';
import Svg from 'components/svg/Svg';

const Header = (props) => {
	const limitLength = (str, length) => `${str.substring(0, length)}...`;

	let {
		title,
		buttonHandler,
		backButton,
		isArchived,
		archiveStatusToggle,
		searchFilter,
		searchTerm,
		toggleSearch,
		isSearching
	} = props;

	title = title ? <h1>{title.length > 20 ? limitLength(title, 20) : title}</h1>
		: <Svg className="logo" svg="tfLogo" />;

	// Set the toggle action and text
	let toggleAction = isSearching ? toggleSearch : archiveStatusToggle,
		toggleText = isSearching || isArchived ? 'Done' : 'Edit';

	return (
		<header>
			{ backButton &&
				<span className="header-btn" onClick={buttonHandler ? buttonHandler : () => hashHistory.goBack()} />
			}

			{ searchFilter &&
				<div id="searchFilter">
					<span className="header-search" onClick={toggleSearch}>
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

			{ (archiveStatusToggle || toggleSearch) &&
				<span className="header-toggle" onClick={toggleAction}>{toggleText}</span>
			}
		</header>
	);
};

Header.propTypes = {
	title: React.PropTypes.string,
	searchTerm: React.PropTypes.string,
	backButton: React.PropTypes.bool,
	isArchived: React.PropTypes.bool,
	isSearching: React.PropTypes.bool,
	toggleSearch: React.PropTypes.func,
	archiveStatusToggle: React.PropTypes.func,
	buttonHandler: React.PropTypes.func,
	searchFilter: React.PropTypes.func
};

export default Header;
