const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const uri = "mongodb+srv://expenseadmin:wrongpassword@cluster0.izxxqce.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, family: 4 })
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err.message);
    process.exit(1);
  });
