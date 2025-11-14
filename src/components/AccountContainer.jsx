import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }
  
  // Sort function here
  function onSort(value){
    setSortBy(value);
  }

  // Filter using search here and pass new variable down
  const filteredTransactions = transactions.filter((t) => 
    t.description.toLowerCase().includes(search.toLowerCase())
  )

  const sortedTransactions = [...filteredTransactions.sort((a, b) =>{
    if (sortBy === "description"){
      return a.description.localeCompare(b.description)
    } else if (sortBy === "category"){
      return a.category.localeCompare(b.category)
    }
  })]

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={sortedTransactions} />
    </div>
  );
}

export default AccountContainer;
