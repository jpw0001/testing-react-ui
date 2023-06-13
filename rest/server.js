
const express = require('express');
const app = express();



function generateStockData() {
  const data = [];
  const startDate = new Date(2023, 0, 1); // January 1, 2023
  const endDate = new Date(2023, 5, 30); // June 30, 2023
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const price = Math.random() * (200 - 100) + 100; // Random price between 100 and 200
    data.push({ date: currentDate.toISOString(), price: price.toFixed(2) });
  }

  return data;
}



app.get('/api/chart', (req, res) => {
  const chartData = generateStockData(); // Implement this function to fetch/generate chart data
  res.json(chartData);
});


const port = 8081; // You can change this to any port you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

