
function init() {


	var cebu = new google.maps.LatLng( 10.31337, 123.9005348 );

    map = new google.maps.Map( document.getElementById('map'), {
      	zoom: 2,
      	center: cebu
    });

    nearbySearch( map, cebu );
}



/* Load Panel */
function loadPanel( map ) {

	var panel = document.getElementById('panel');

	google.maps.event.addListenerOnce( map, 'idle', function() {

	    panel.style.display = 'block';
	});

	selectType( panel );
}




function nearbySearch( map, position ) {



    var service = new google.maps.places.PlacesService( map );

	var circle = new google.maps.Circle({
		map: 			map,
		strokeWeight: 	1,
		fillOpacity: 	0.1,
		strokeOpacity: 	0.5,
		radius: 		4000,
		editable: 		true,
		draggable: 		true,
		fillColor: 		'#ff0000',
		strokeColor: 	'#ff0000',
		center: 		position
	});



    service.nearbySearch({ radius: 4000, location: circle.getCenter(), type: ['restaurant'] }, function( results, status, pagination ) {


	    if( status == google.maps.places.PlacesServiceStatus.OK ) {


			createMarkers( results );

			if( pagination.hasNextPage ) {

				var more = document.getElementById('more');

				more.disabled = false;


				more.addEventListener('click', function() {

					more.disabled = true;

					pagination.nextPage();

				});
			}

	    } else {

	    	console.log('No Results');
	    }

	});


	loadPanel( map );
}






function createMarkers( places ) {

	var info = getRestaurantsInfo();
	var infobox = new google.maps.InfoWindow();
	var bounds  = new google.maps.LatLngBounds();

	var items = document.getElementById('items');

	
	for( var i = 0, place; place = places[i]; i++ ) {

		place['info'] = info[i];

		var marker = new google.maps.Marker({
			map: map,
			icon: new google.maps.MarkerImage( 'assets/images/icon.png', new google.maps.Size(32, 32) ),
			position: place.geometry.location
		});

		item = getItem( place );

		items.innerHTML += item;


		windowBox( marker, infobox, item, place);
	
		bounds.extend( place.geometry.location );
	}


	map.fitBounds(bounds);
}




/* Item */
function getItem( place ) {


	if( place.name ) {

		item = '<h3><i class="color"></i>' + place.name + '</h3>'
				+'<div class="meta">'
				+'<i class="rate star-'+ 	 place.info['star'] +'"></i>'
				+'<p><b>Visits: </b> '+ 	 place.info['visits'] +'/day</p>'
				+'<p><b>Patrons: </b> '+ 	 place.info['patrons'] +'</p>'
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

	    	var destination = { lat: place.lat(), lng: place.lng() };



	        navigator.geolocation.getCurrentPosition( function( position ) {


				var display = new google.maps.DirectionsRenderer;
				var service = new google.maps.DirectionsService;


				var map = new google.maps.Map( document.getElementById('map'), { 
					zoom: 5, 
					center: {lat: 10.31337, lng: 123.9005348}
				});

				display.setMap( map );

				nearbySearch( map, {lat: 10.31337, lng: 123.9005348} );



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






function getRestaurantsInfo() {

	return [

	    {
	        "specialty": "Lamb Salad with Fregola",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 70,
	        "visits": 90,
	        "type": 1
	    },
	    {
	        "specialty": "Smoked Pork Jowl with Pickles",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 99,
	        "visits": 128,
	        "type": 2
	    },
	    {
	        "specialty": "Scallop Sashimi with Meyer Lemon Confit",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 20,
	        "visits": 70,
	        "type": 5
	    },
	    {
	        "specialty": "Vegan Charcuterie",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 40,
	        "visits": 98,
	        "type": 3
	    },
	    {
	        "specialty": "Pappardelle with Sea Urchin and Cauliflower",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 30,
	        "visits": 80,
	        "type": 4
	    },
	    {
	        "specialty": "Pork Rillette Hand Pies",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 60,
	        "visits": 60,
	        "type": 1
	    },
	    {
	        "specialty": "Malted Custard French Toast",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 115,
	        "visits": 160,
	        "type": 0
	    },
	    {
	        "specialty": "Pizza Puff",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 125,
	        "visits": 140,
	        "type": 5
	    },
	    {
	        "specialty": "Island Duck with Mulberry Mustard",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 110,
	        "visits": 130,
	        "type": 2
	    },
	    {
	        "specialty": "Pasta with Lamb Ragù",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 58,
	        "visits": 80,
	        "type": 4
	    },
	    {
	        "specialty": "Cheeseburger",
	        "revenue": 634202,
	        "star": 2,
	        "patrons": 21,
	        "visits": 50,
	        "type": 3
	    },
	    {
	        "specialty": "Chorizo-stuffed Medjool Dates",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 96,
	        "visits": 112,
	        "type": 1
	    },
		{
	        "specialty": "Smoked Salmon",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 101,
	        "visits": 120,
	        "type": 5
	    },
	    {
	        "specialty": "Atomica",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 78,
	        "visits": 87,
	        "type": 2
	    },
	    {
	        "specialty": "Seoul Sassy Fried Chicken",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 67,
	        "visits": 80,
	        "type": 5
	    },
	    {
	        "specialty": "Cheesecake",
	        "revenue": 634202,
	        "star": 1,
	        "patrons": 10,
	        "visits": 120,
	        "type": 0
	    },
	    {
	        "specialty": "Garrett Mix",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 60,
	        "visits": 100,
	        "type": 4
	    },
	    {
	        "specialty": "Broiled T-Bone Steak",
	        "revenue": 634202,
	        "star": 3,
	        "patrons": 40,
	        "visits": 90,
	        "type": 2
	    },
	    {
	        "specialty": "Depression Dog",
	        "revenue": 634202,
	        "star": 4,
	        "patrons": 80,
	        "visits": 123,
	        "type": 0
	    },
	    {
	        "specialty": "Roasted Pig Face",
	        "revenue": 634202,
	        "star": 5,
	        "patrons": 100,
	        "visits": 145,
	        "type": 3
	    }
	];

}