import React, { Component } from 'react';

const TableRow = (props) => {
	return (
		<tr>
			{props.columns.map(tableColumn => <td style={styles.td}>{JSON.stringify(tableColumn)}</td>)}
		</tr>
	);
}

export default TableRow;

var styles = {
	td: {
		   border: '1px solid black'
	}
};