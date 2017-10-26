const express = require('express');
const app = express();

const jsonData = [
	{
		"title": "First Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Second Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Third Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Fourth Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Fifth Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Sixth Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Seventh Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Eighth Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Nineth Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	},
	{
		"title": "Tenth Block",
		"images": ["/img/1.png", "/img/2.png", "/img/3.png", "/img/4.png", "/img/5.png"]
	}
];

app.use(express.static('public'));

app.get('/blocks', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(jsonData));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});