var id = 1;
function nextId(){
	return id++;
}

var data = {
	"Ukraine": {
		"description": "Ukraine description",
		"hotels": [
			{
				"id": nextId(),
				"name": "Ukraina hotel",
				"description": "Ukraina hotel description"
			},
			{
				"id": nextId(),
				"name": "Swiss",
				"description": "Swiss description"
			}
		]
	},
	"France": {
		"description": "France description",
		"hotels": [
			{
				"id": nextId(),
				"name": "Hilton",
				"description": "Hilton description"
			},
			{
				"id": nextId(),
				"name": "Swiss",
				"description": "Swiss description"
			}
		]
	}	
}



function getCountries(){
	return JSON.stringify(Object.keys(data));
}

function getHotelsInCountry(country){
	return JSON.stringify(data[country].hotels);
}

function addCountry(country){
	data[country] = { 'description': '', 'hotels': [] };
}

function addHotel(country, hotel, description){
	data[country].hotels.push({ 'id': nextId(), 
								'hotel': hotel, 
								'description': description });
}

function removeHotel(id){
	for(var country in data){
		data[country].hotels.forEach(function(hotel, i, array){
			if(hotel.id === id){
				array.splice(i, 1);
			}
		})
	}
}

function getHotelDescription(id){
	var result = "";

	for(var country in data){
		data[country].hotels.forEach(function(hotel, i, arr){
			if(hotel.id === id){
				result = hotel.description;
			}
		})
	}

	return result;
}

function updateHotelDescription(id, desc){
	for(var country in data){
		data[country].hotels.forEach(function(hotel, i, arr){
			if(hotel.id === id){
				hotel.description = desc;
			}
		})
	}	
}

module.exports = {
	getCountries: getCountries,
	getHotelsInCountry: getHotelsInCountry,
	addCountry: addCountry,
	addHotel: addHotel,
	removeHotel: removeHotel,
	getHotelDescription: getHotelDescription,
	updateHotelDescription: updateHotelDescription
}