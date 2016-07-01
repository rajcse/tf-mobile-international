import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { PropTypes, Component } from 'react';

export default class PillSelector extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.defaultValue
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {		
		this.setState({value: e.target.value});
		if(this.props.onChange) this.props.onChange(e.target.value);
	}

	render() {
		let pillWidth = 100/this.props.items.length,
			pills = this.props.items.map(item => (
				<li key={this.props.name + '-' + item.value} style={{width: pillWidth + '%'}}>
					<input 
						checked={this.state.value === item.value}
						type="radio"
						id={this.props.name + '-' + item.value}
						name={this.props.name}
						value={item.value}
						onChange={this.handleChange}
					/>
					<label htmlFor={this.props.name + '-' + item.value}>{item.label}</label>
				</li>
			));
		
		return (
			<ul className="pill-selector">
    			{pills}
		    </ul>
		);
	}	
};

PillSelector.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	})).isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string.isRequired,
	onChange: PropTypes.func
};