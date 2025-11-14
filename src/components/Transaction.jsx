import React from "react";

function Transaction({transaction}) {
  return (
    <tr data-testid="transaction">
      <td>{transaction.date}</td>
      <td data-testid="tDescription">{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
