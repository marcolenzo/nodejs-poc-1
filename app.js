/*
 *  Module dependencies
 */

var express = 	require('express'),
		swig = require('ejs'),
		routes = require('./routes/'), 
		customers = require('./routes/customers');

var app = express();

/*
 * Configuration
 */
app.configure(function() {
	app.set('view engine', 'ejs');
	app.set('view cache', false);
	app.set('views', __dirname + '/views');
	app.set('view options', {layout:false, root: __dirname + '/templates'}); 

	app.use(express.urlencoded());
	app.use(express.json());
  	app.use(express.static(__dirname + '/public'));
  	app.use(app.router);
	app.use(express.errorHandler());
	
	
});

/*
 *  Routes
 */

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

/*
 *  JSON API
 */

app.get('/customer', customers.getAll);
app.get('/customer/:id', customers.getById);
app.get('/customer/name/:name', customers.getByName);
app.post('/customer', customers.addCustomer);
app.put('/customer/:id', customers.updateCustomer);
app.delete('/customer/:id', customers.deleteCustomer);

app.listen(80);
console.log('Server started. Listening on port 80...');
