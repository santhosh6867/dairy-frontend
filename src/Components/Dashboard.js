import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [entriesByDate, setEntriesByDate] = useState([]);
  const [tenDayTotal, setTenDayTotal] = useState(0);

  const accountNo = localStorage.getItem("accountNo");

  useEffect(() => {
    const fetchData = async () => {
      if (!accountNo) return;
      try {
        const res = await axios.get(`${API_URL}/milk-summary/${accountNo}`);
        
        const grouped = {};
        let total10Days = 0;

        res.data.forEach((row) => {
          const date = row.date;
          if (!grouped[date]) grouped[date] = { sessions: [], dailyTotal: 0 };

          grouped[date].sessions.push({
            session: row.session,
            quantity: parseFloat(row.total_quantity),
            fat: parseFloat(row.avg_fat),
            snf: parseFloat(row.avg_snf),
            amount: parseFloat(row.total_amount),
          });

          grouped[date].dailyTotal += parseFloat(row.total_amount);
          total10Days += parseFloat(row.total_amount);
        });

        const orderedDates = Object.keys(grouped)
          .sort((a, b) => new Date(a) - new Date(b)) 
          .map((date) => ({ date, ...grouped[date] }));

        setEntriesByDate(orderedDates);
        setTenDayTotal(total10Days);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [accountNo]);

  return (
    <div>
      <h2>Milk Entries (From 07-08-2025 to 16-08-2025)</h2>
      <table 
        border="1" 
        cellPadding="5" 
        style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Session</th>
            <th>Quantity</th>
            <th>Fat</th>
            <th>SNF</th>
            <th>Amount</th>
            <th>Daily Total</th>
          </tr>
        </thead>
        <tbody>
          {entriesByDate.length > 0 ? (
            entriesByDate.map((day) =>
              day.sessions.map((s, idx) => (
                <tr key={`${day.date}-${s.session}`}>
                  {idx === 0 && (
                    <td rowSpan={day.sessions.length}>
                      {new Date(day.date).toLocaleDateString("en-GB")}
                    </td>
                  )}
                  <td>{s.session}</td>
                  <td>{s.quantity.toFixed(2)}</td>
                  <td>{s.fat.toFixed(2)}</td>
                  <td>{s.snf.toFixed(2)}</td>
                  <td>{s.amount.toFixed(2)}</td>
                  {idx === 0 && (
                    <td rowSpan={day.sessions.length}>
                      {day.dailyTotal.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="7">No entries found</td>
            </tr>
          )}
          <tr>
            <td colSpan="6" style={{ fontWeight: "bold", textAlign: "right" }}>
              10 Days Total
            </td>
            <td style={{ fontWeight: "bold" }}>{tenDayTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
