import React, { Component } from 'react';
import TableRow from './TableRow';

const TableView = (props) => {
  return (
	<div className='table row'>
        <div className='label'>
            <h4>{ props.tableLabel ? props.tableLabel : null }</h4>
        </div>

        <div className='content content-full'>
            <table>
                <thead>
                    <tr>
                        { props.tableHeaders.map((tableHeader, i) =>
                            <th key={i}>
                                {tableHeader}
                            </th>
                        ) }
                    </tr>
                </thead>

                <tbody>
                    { props.tableRows.map((tableRow, i) =>
                        <TableRow key={i} columns={_.values(tableRow)} />
                    ) }
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default TableView;