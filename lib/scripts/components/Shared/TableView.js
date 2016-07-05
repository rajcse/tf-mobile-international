import React, { Component } from 'react';
import TableRow from './TableRow';

const TableView = (props) => {
	return (
		<div>
			<table style={styles.table}>
				<thead>
					<tr>
						{props.tableHeaders.map(tableHeader => <th key={'tableHeader-' + Math.ceil(Math.random()*100000)} style={styles.th}> {tableHeader} </th>)}
					</tr>
				</thead>
				<tbody>
					{props.tableRows.map(tableRow => <TableRow key={'tableRow-' + Math.ceil(Math.random()*100000)} columns={_.values(tableRow)} />)}
				</tbody>
			</table>
		</div>
	);
}

var styles = {
	table: {
		   border: '1px solid black'
	}
	,
	td: {
		   border: '1px solid black'
	}
	,
	th: {
		   border: '1px solid black'
	}
};

export default TableView;