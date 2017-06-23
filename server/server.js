const path = require('path');
const publicpath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicpath));

app.listen(3000,(res,req) => {
	console.log(`App is running on ${port}`);
});