import React, { Component } from 'react';

const TableRow = (props) => {
  return (
    <tr>
      {props.columns.map((tableColumn, i) =>
        <td key={i}>{tableColumn}</td>
      )}
    </tr>
  );
}

export default TableRow;
