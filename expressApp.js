var express = require('express'),
	bodyParser = require('body-parser'),
	data = require('./data'),
	app = express(),
	router = express.Router();
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({                           
  extended: true
}));
app.use('/', router);

router.route('/country')
	.get(function (req,res){
		var countries = data.getCountries();
		res.send(countries);
	})
	.post(function (req,res){
		var country = req.body.country;
		data.addCountry(country);
		res.send('ok');
	});

router.route('/country/:country/hotel')
	.get( function (req,res) {
		var hotels = data.getHotelsInCountry(req.params.country)
		res.send(hotels);
	})
	.post( function (req,res){
		var hotel = req.body.hotel;
		var country = req.params.country;
		var desc = req.body.description;
		data.addHotel(country, hotel, desc);
		res.send('ok');
	});

router.route('/hotel/:hotelId')
	.delete( function (req, res) {
		var id = parseInt(req.params.hotelId);
		data.removeHotel(id);
		res.send('ok');
	})
	.get( function (req, res) {
		var id = parseInt(req.params.hotelId);
		var desc = data.getHotelDescription(id);
		res.send(desc);
	})
	.put( function (req, res) {
		var id = parseInt(req.params.hotelId);
		data.updateHotelDescription(id, req.body.description);
		console.log(data.getHotelDescription(id));
		res.send('ok');
	})

app.listen(8000);
console.log('Listening on port 8000')