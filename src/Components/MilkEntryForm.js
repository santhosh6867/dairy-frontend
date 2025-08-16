import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

function MilkEntryForm() {
  const [session, setSession] = useState("mrg");
  const [quantity, setQuantity] = useState("");
  const [fat, setFat] = useState("");
  const [snf, setSnf] = useState("");
  const [amount, setAmount] = useState("");
  const [entryDate, setEntryDate] = useState("");

  const accountNo = localStorage.getItem("accountNo");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/milk-entry`, {
        account_no: accountNo,
        session,
        quantity,
        fat,
        snf,
        amount,
        entry_date: entryDate
      });
      alert("Milk entry saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving milk entry");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Milk Entry Form</h2>
      <label>Session</label>
      <select value={session} onChange={e => setSession(e.target.value)}>
        <option value="mrg">Morning</option>
        <option value="eve">Evening</option>
      </select>

      <label>Quantity</label>
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required/>

      <label>Fat</label>
      <input type="number" value={fat} onChange={e => setFat(e.target.value)} required/>

      <label>SNF</label>
      <input type="number" value={snf} onChange={e => setSnf(e.target.value)} required/>

      <label>Amount</label>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required/>

      <label>Date</label>
      <input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)} required/>

      <button type="submit">Submit</button>
    </form>
  );
}

export default MilkEntryForm;
