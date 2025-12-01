const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const routeApi = require("./routers/index.route");
const sequelize = require('./config/database');
sequelize;

const app = express();  
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

routeApi.index(app);


// Test API link to fetch users
app.get("/api/test/post", async (req, res) => {
  try {
    const posts = await require("./models/index.model").Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi hệ thống");
  }
});



app.get("/", (req, res) => {
  res.send("Project Qairline Backend");
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

