import config from './config';
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import tfActions from './actions/tfActions';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Search from './components/Search';

import resultsStore from './stores/resultsStore';

var styles = {
	app: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: config.themeStyles.brandBlue
	}
};

class TfApp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchResults: {
				results: null,
				loaded: false,
				searching: false,
				criteria: {
					firstName: '',
					lastName: '',
					state: 'ALL'
				}
			},
			user: null
		};

		this.onResultsChange = () => {
			this.setState({
				searchResults: {
					results: resultsStore.getAllResults(),
					loaded: resultsStore.isLoaded(),
					searching: resultsStore.isSearching(),
					criteria: resultsStore.getCriteria()
				}
			});
		};
	}

	componentDidMount() {
		resultsStore.addChangeListener(this.onResultsChange);
	}

	componentWillUnmount() {
		resultsStore.removeChangeListener(this.onResultsChange);
	}

	render() {
		return (
			<div>
				<Header />
				<Search {...this.state.searchResults} />
				<Navigation />
			</div>
		);
	}
};

window.initializeApp = function() {
	ReactDOM.render(
		<TfApp />,
		document.querySelector('#app')
	);
};
