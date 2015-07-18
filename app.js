var http = require('http');
var data = require('./data');

var server = http.createServer(function(req, res){ 

	//get countries | example: 'localhost:8000/country'
	if(req.url === '/country' && req.method === 'GET'){
		var countries = data.getCountries();
		res.end(countries);
	}

	//get hotels in country | example: 'localhost:8000/country/Ukraine/hotel'
	if(req.url.substr(0, 8) === '/country' && req.url.slice(-6) === '/hotel' && req.method === 'GET'){
		var parsedUrl = req.url.substr(8).split("/");
		var hotels = data.getHotelsInCountry(parsedUrl[1]);
		res.end(hotels);
	}

	//add country | example: 'localhost:8000/country' with raw data { "country": "USA" }
	if(req.url === '/country' && req.method === 'POST'){
		var params = "";

		req.on('data', function(param){
			params += param.toString();
			if (params.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
		});

		req.on('end', function(){
			var country = JSON.parse(params).country;
			data.addCountry(country);
			console.log(data.getCountries());
			res.end('ok');		
		});
	}

	//add hotel to country | example: 'localhost:8000/country/Ukraine/hotel' with raw data { "hotel": "hilton", "description": "description" }
	if (req.url.substr(0,8) == '/country' && req.url.slice(-6) == '/hotel'  && req.method == 'POST' ) {
		var parsedUrl = req.url.substr(8).split("/");
		
		country = parsedUrl[1];

		var params = "";
		req.on('data', function(param){
			params += param.toString();
			if (params.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
		});

		req.on('end', function (){
			var hotel = JSON.parse(params).hotel;
			var desc = JSON.parse(params).description;
			data.addHotel(country, hotel, desc);
			console.log(data.getHotelsInCountry(country));
			res.end('ok');
		})
	}

	//remove hotel by id | example: 'localhost:8000/hotel/1'
	if (req.url.substr(0,7) == '/hotel/' && req.method == 'DELETE' ) {
		var id = req.url.substr(7);
		data.removeHotel(parseInt(id));
		console.log(data.getHotelsInCountry('Ukraine'));
		res.end('ok');
	}

	//get hotel description | example: 'localhost:8000/hotel/1'
	if (req.url.substr(0,7) == '/hotel/' && req.method == 'GET' ) {
		var id = req.url.substr(7);
		var desc = data.getHotelDescription(parseInt(id));
		res.end(desc);
	}

	//update hotel description | example: 'localhost:8000/hotel/1' with raw data { "description": "description" }
	if (req.url.substr(0,7) == '/hotel/' && req.method == 'PUT' ) {
		var id = parseInt(req.url.substr(7));
		
		var params = "";
		req.on('data', function(param){
			params += param.toString();
			if (params.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                req.connection.destroy();
            }
		});
		req.on('end', function (){
			var desc = JSON.parse(params).description;
			data.updateHotelDescription(id, desc);
			console.log(data.getHotelDescription(id))
			res.end('ok');
		})
	}	


});

server.listen(8000);
console.log('Listening on port 8000')