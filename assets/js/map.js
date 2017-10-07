var getRestaurants = function() {

	// Factory
	var factory = {};


	factory.markers = [];

	factory.default = {
		query: 		'Cebu',
		latitude: 	10.31337,
		longitude: 	123.9005348
	};


	factory.xhttp = function( url, callback ) {

	    var http = new XMLHttpRequest();

	    http.onreadystatechange = function() {

	        if( this.readyState == 4 && this.status == 200 ) {

	            callback( this.responseText );
	        }
	    };

	    http.open( 'GET', url, true );

	    http.send();
	};



	/* Search */
	factory.search = function( map ) {

		var restaurants = this;

		var circle = new google.maps.Circle({
			map: 			map,
			strokeWeight: 	1,
			fillOpacity: 	0.1,
			strokeOpacity: 	0.5,
			editable: 		true,
			draggable: 		true,
			radius: 		2000,
			fillColor: 		'#ff0000',
			strokeColor: 	'#ff0000',
			center: 		map.center
		});

		this.textSearch( map, circle.radius, circle.center );


		google.maps.event.addListener( circle, 'dragend', function( event ) {

		    restaurants.textSearch( map, this.radius, new google.maps.LatLng( event.latLng.lat(), event.latLng.lng() ) );
		});


		this.loadPanel( map );
	},



	/* Add Marker */
	factory.addMarker = function( map, location ) {

	    var marker = new google.maps.Marker({
			map: map,
			position: location,
			icon: new google.maps.MarkerImage( 'assets/images/icon.png', new google.maps.Size(32, 32) ),
	    });

	    this.markers.push( marker );

	    return marker;
	},




	/* Load Panel */
	factory.loadPanel = function( map ) {

		var panel = document.getElementById('panel');

		google.maps.event.addListenerOnce( map, 'idle', function() {

		    panel.style.display = 'block';
		});

		this.selectType( panel );
	},





	/* Text Search */
	factory.textSearch = function( map, radius, position ) {

		var restaurants = this;


		this.xhttp('info.json', function( data ) {



	    	var service = new google.maps.places.PlacesService( map );

		    service.textSearch({ location: position, query: restaurants.default.query, type: 'restaurant' }, function( results, status, pagination ) {


			    if( status !== google.maps.places.PlacesServiceStatus.OK ) {

			    	return;
			    }

				restaurants.makeMarkers( map, radius, results, JSON.parse(data) );
			

				if( pagination.hasNextPage ) {

					restaurants.setPagination( pagination );
				}

			});

		});

	},




	/* Make Markers */
	factory.makeMarkers = function( map, radius, places, info ) {


		var marker;

		var infobox = new google.maps.InfoWindow();
		var bounds  = new google.maps.LatLngBounds();


		for( var i = 0, place; place = places[i]; i++ ) {

			place['info'] = info[i];

			marker = this.addMarker( map, place.geometry.location );

			document.getElementById('items').innerHTML += this.getPlaceInfo( place );


			this.windowBox( marker, infobox, item, place );
		
			bounds.extend( place.geometry.location );
		}

		document.getElementById('counter').innerHTML = this.markers.length;


		map.fitBounds( bounds );

	},




	/* Info Box */
	factory.windowBox = function( marker, infobox, item, place ) {


		google.maps.event.addListener( marker, 'click', function() {


			infobox.setContent( '<div class="tip">'+ item + '<button id="getlocation">Get Direction</button></div>' );

			infobox.open( map, marker );

			this.getDirection( place );
		});

	},





	/* Select Type */
	factory.selectType = function( panel ) {


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
	},




	factory.setPagination = function( pagination ) {

		var more = document.getElementById('more');

		more.disabled = false;


		more.addEventListener('click', function() {

			more.disabled = true;

			pagination.nextPage();

		});
	},





	/* Get Item */
	factory.getPlaceInfo = function( place ) {


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
	},




	/* Get Direction */
	factory.getDirection = function( place ) {

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


					this.search( map );


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
	};


	return factory;
};





/* Initialize */
function init() {

	var search = getRestaurants();

    search.search( new google.maps.Map( document.getElementById('map'), { center: new google.maps.LatLng( search.default.latitude, search.default.longitude ) }));
}



