require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require("./DBConnection/DBConnect")

//Testing
const TestRoute = require("./routes/TestRoute")
//Routes
const ProductRoute = require("./routes/ProductRoute")
const CatagoryRoute = require("./routes/CatagoryRoute")
const HomeBannerRoute = require("./routes/HomeBannerRoute")
const QueryRoute = require("./routes/QueryRoute")

const app = express();

ConnectDB()

app.use(cors());
app.use(express.json());

//Testing
app.use('/TestTask', TestRoute)
//Routes
app.use('/product', ProductRoute)
app.use('/catagory', CatagoryRoute)
app.use('/homeBanner', HomeBannerRoute)
app.use('/Query', QueryRoute)




const Port = 5000;
app.listen(Port, () => {
    console.log("The server is running at port "+Port)
})