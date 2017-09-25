var markers = [];


/* Initialize */
function init() {


	var cebu = new google.maps.LatLng( 10.31337, 123.9005348 );

    map = new google.maps.Map( document.getElementById('map'), {
      	zoom: 20,
      	center: cebu
    });

    textSearch( map, cebu );
}



/* Load Panel */
function loadPanel( map ) {

	var panel = document.getElementById('panel');

	google.maps.event.addListenerOnce( map, 'idle', function() {

	    panel.style.display = 'block';
	});

	selectType( panel );
}



/* Text Search */
function textSearch( map, position ) {



    var service = new google.maps.places.PlacesService( map );

	var circle = new google.maps.Circle({
		map: 			map,
		strokeWeight: 	1,
		fillOpacity: 	0.1,
		strokeOpacity: 	0.5,
		radius: 		2000,
		editable: 		true,
		draggable: 		true,
		fillColor: 		'#ff0000',
		strokeColor: 	'#ff0000',
		center: 		position
	});


	var search = function( map, radius, position ) {


	    service.textSearch({ radius: radius, location: position, query: 'Cebu Restaurants', type: 'restaurant' }, function( results, status, pagination ) {


		    if( status == google.maps.places.PlacesServiceStatus.OK ) {


				createMarkers( map, results );

				if( pagination.hasNextPage ) {

					var more = document.getElementById('more');

					more.disabled = false;


					more.addEventListener('click', function() {

						more.disabled = true;

						pagination.nextPage();

					});

				}
		    }
		});

	};


	google.maps.event.addListener( circle,'dragend', function( event ) {

	    search( map, this.radius, this.center );
	});

	search( map, circle.radius, circle.center );


	loadPanel( map );
}




/* Add Marker */
function addMarker( map, location ) {

    var marker = new google.maps.Marker({
		map: map,
		position: location,
		icon: new google.maps.MarkerImage( 'assets/images/icon.png', new google.maps.Size(32, 32) ),
    });

    markers.push( marker );

    return marker;
}




/* Create Markers */
function createMarkers( map, places ) {


	var info = getDummyInfo();
	var infobox = new google.maps.InfoWindow();
	var bounds  = new google.maps.LatLngBounds();

	var items = document.getElementById('items');



	for( var i = 0, place; place = places[i]; i++ ) {

		place['info'] = info[i];


		marker = addMarker( map, place.geometry.location );


		items.innerHTML += getItem( place );


		windowBox( marker, infobox, item, place);
	
		bounds.extend( place.geometry.location );
	}

	document.getElementById('counter').innerHTML = markers.length;


	map.fitBounds( bounds );
}




/* Get Item */
function getItem( place ) {


	if( place.name ) {

		item = '<h3><i class="color"></i>' + place.name + '</h3>'
				+'<div class="meta">'
				+'<i class="rate star-'+ 	 place.info['star'] +'"></i>'
				+'<p><b>Visits: </b> '+ 	 place.info['visits'] +'/day</p>'
				+'<p><b>Patrons: </b> '+ 	 place.info['patrons'] +'</p>'
				+'<p><b>Reserved: </b> '+ 	 place.info['reserved'] +'</p>'
				+'<p><b>Transactions: </b>'+ place.info['transactions'] +'</p>'
				+'<p><b>Revenue: </b> PHP '+ place.info['revenue'].toLocaleString('en') +'/mo</p>'
				+'<p><b>Specialty: </b> '+ 	 place.info['specialty'] +'</p>'
				+'</div>';

		return '<div class="item type-'+ place.info['type'] +'">'+ item +'</div>';
	}
}





/* Info Box */
function windowBox( marker, infobox, item, place ) {


	google.maps.event.addListener( marker, 'click', function() {


		infobox.setContent( '<div class="tip">'+ item + '<button id="getlocation">Get Direction</button></div>' );

		infobox.open( map, marker );

		getDirection( place );
	});

}





/* Select Type */
function selectType( panel ) {


	for( input = 0; input < 6; input++ ) {

		panel.firstElementChild.lastElementChild[input].onchange = function() {


			var list = document.getElementsByClassName( 'type-' + this.id );


			for( i = 0; i < list.length; i++ ) {

				if( this.checked ) {

					list[i].style.display = 'block';

				} else {

					list[i].style.display = 'none';
				}
			}

		};
	}
}





/* Get Markers */
function getMarkers( data, types ) {

	var markers = [];

	var isTypes = function( types, type ) {

	    for( i = 0; i < types.length; i++ ) {

	        if( types[i] == type ) {
	        	
	        	return true;
	        }
	    }

	    return false;
	};



    for( r = 0; r < data.length; r++ ) {

        if( isTypes( types, data[r]['type'] ) ) {

        	markers.push( data[r] );
        }
    }


	return markers;
}





/* Get Direction */
function getDirection( place ) {

	var place = place.geometry.location
	

	document.getElementById('getlocation').onclick = function() {


	    if( navigator.geolocation ) {

	    	var destination = new google.maps.LatLng( place.lat(), place.lng() );


	        navigator.geolocation.getCurrentPosition( function( position ) {


				var display = new google.maps.DirectionsRenderer;
				var service = new google.maps.DirectionsService;


				var map = new google.maps.Map( document.getElementById('map'), { 
					zoom: 10, 
					center: destination
				});

				display.setMap( map );

				textSearch( map, destination );



		    	service.route({

		    		destination: destination,
		    		travelMode: google.maps.DirectionsTravelMode.DRIVING,
					origin: { lat: position.coords.latitude, lng: position.coords.longitude }

				}, function( response, status ) {

					if( status == 'OK') {

						display.setDirections( response );

					} else {

						window.alert('Directions request failed due to ' + status );
					}

				});

	        });

	    } else {

	        window.alert('Geo location is not supported by this browser.');
	    }



	}
}






function getDummyInfo() {

	return [
	    {
	        "specialty": "Lamb Salad with Fregola",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 70,
	        "visits": 90,
	        "type": 1,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Smoked Pork Jowl with Pickles",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 99,
	        "visits": 128,
	        "type": 2,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Scallop Sashimi with Meyer Lemon Confit",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 20,
	        "visits": 70,
	        "type": 5,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Vegan Charcuterie",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 40,
	        "visits": 98,
	        "type": 3,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Pappardelle with Sea Urchin and Cauliflower",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 30,
	        "visits": 80,
	        "type": 4,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Pork Rillette Hand Pies",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 60,
	        "visits": 60,
	        "type": 1,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Malted Custard French Toast",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 115,
	        "visits": 160,
	        "type": 0,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Pizza Puff",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 125,
	        "visits": 140,
	        "type": 5,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Island Duck with Mulberry Mustard",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 110,
	        "visits": 130,
	        "type": 2,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Pasta with Lamb Ragù",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 58,
	        "visits": 80,
	        "type": 4,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Cheeseburger",
	        "revenue": 634202,
	        "star": 2,
	        "patrons": 21,
	        "visits": 50,
	        "type": 3,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Chorizo-stuffed Medjool Dates",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 96,
	        "visits": 112,
	        "type": 1,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Smoked Salmon",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 101,
	        "visits": 120,
	        "type": 5,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Atomica",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 78,
	        "visits": 87,
	        "type": 2,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Seoul Sassy Fried Chicken",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 67,
	        "visits": 80,
	        "type": 5,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Cheesecake",
	        "revenue": 634202,
	        "star": 1,
	        "patrons": 10,
	        "visits": 120,
	        "type": 0,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Garrett Mix",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 60,
	        "visits": 100,
	        "type": 4,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Broiled T-Bone Steak",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 40,
	        "visits": 90,
	        "type": 2,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Depression Dog",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 80,
	        "visits": 123,
	        "type": 0,
	        "reserved": 32,
	        "transactions": 2346
	    },
	    {
	        "specialty": "Roasted Pig Face",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 100,
	        "visits": 145,
	        "type": 3,
	        "reserved": 32,
	        "transactions": 2346
	    }
	];

}