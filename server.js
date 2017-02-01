const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')


var db

MongoClient.connect('mongodb://winelogusr:winelogpswd@ds161028.mlab.com:61028/winelog', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', function(req, res) {

 	
	db.collection('wine').find().toArray((err, result) => {
    	if (err) return console.log(err)
    	// renders index.ejs
    	res.render('index.ejs', {wines: result})
  	})
})

app.post('/addwine', (req, res) => {
	console.log(req.body);

	db.collection('wine').save(req.body, (err, result) => {
    	if (err) return console.log(err);

    	console.log('saved to database')
    	res.redirect('/');
  	})
})