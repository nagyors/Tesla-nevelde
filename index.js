const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(
    session({
        secret: 'secret'
    })
);

require('./routes/index')(app);

app.use((err, req, res, next) =>{
	res.end('Problem..');
	console.log(err);
});

app.listen(3000, function () {
	console.log("On:3000");
});