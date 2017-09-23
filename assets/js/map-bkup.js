
function init() {

	var http  = new XMLHttpRequest();


	http.onreadystatechange = function() {

	    if( this.readyState == 4 && this.status == 200 ) {

			var marker, item, resto = JSON.parse( this.responseText )['results'];

			var center   = resto[0]['geometry']['location'];
			var infobox  = new google.maps.InfoWindow();
	        var location = new google.maps.LatLng( center['lat'], center['lng'] );


			var map = new google.maps.Map( document.getElementById('map'), {
				zoom: 12,
				center: location,
				mapTypeId: google.maps.MapTypeId.terrain
			});


			var circle = new google.maps.Circle({
				map: 			map,
				strokeWeight: 	1,
				fillOpacity: 	0.1,
				strokeOpacity: 	0.5,
				radius: 		7000,
				editable: 		true,
				draggable: 		true,
				fillColor: 		'#ff0000',
				strokeColor: 	'#ff0000',
				center: 		location,
			});



	    	var items = '';

			for( i = 0; i < resto.length; i++ ) {

				var res = resto[i];
				var geo = res['geometry']['location'];



				var markerLocation = new google.maps.LatLng( geo['lat'], geo['lng'] );


				marker = new google.maps.Marker({

					map: map,
					icon: new google.maps.MarkerImage( 'assets/images/icon.png', new google.maps.Size(32, 32) ),
					position: new google.maps.LatLng( geo['lat'], geo['lng'] )

				});



				if( res['name'] ) {


					item = '<h3>' + res['name'] + '</h3>'
							+'<div class="meta">'
							+'<i class="rate star-'+ Math.round( res['rating'] ) +'"></i>'
							// +'<p><b>Visits: </b> '+ res[i]['visits'] +'/day</p>'
							// +'<p><b>Patrons: </b> '+ res[i]['patrons'] +'</p>'
							// +'<p><b>Specialty: </b> '+ res[i]['specialty'] +'</p>'
							+'</div>';


					google.maps.event.addListener( marker, 'click', ( function( marker, item, pos ) {


						return function() {

							var tip = '<div class="tip">'+ item + '<button id="getlocation">Get Direction</button></div>';


							infobox.setContent( tip );
							infobox.open( map, marker );

							getLocation( pos );
						};


					})( marker, item, [geo['lat'], geo['lng']] ));







					google.maps.event.addListener( circle, 'dragend', (function( restaurant ) {



						return function() {

							var markers = [];
							var diff = google.maps.geometry.spherical.computeDistanceBetween( this.getCenter(), markerLocation );


							if( this.getBounds().contains( markerLocation ) && diff <= this.getRadius() ) {

							    markers.push( restaurant );
							}

							console.log( markers );
						};



					})( res['name'] )); 





					items += '<div class="item clear type-'+ res['types'].length +'">'+ item +'</div>';
				}
			}




			loadPanel( map, items );
		}

	};


	http.open( 'GET', 'http://www/navagis/api/restaurants?address=Cebu', true );

	http.send();
}




function loadPanel( map, items ) {

	var lists = document.getElementById('items');


	google.maps.event.addListenerOnce( map, 'idle', function() {
		
		var panel = document.getElementById('panel');


	    lists.innerHTML = items;


	    panel.style.display = 'block';

		map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push( panel );
	});



	
	for( var input in document.getElementsByTagName('input') ) {

		document.getElementsByTagName('input')[input].onchange = function() {


			var list = document.getElementsByClassName( 'type-' + this.value );


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






function getLocation( pos ) {


	document.getElementById('getlocation').onclick = function() {


	    if( navigator.geolocation ) {

	        navigator.geolocation.getCurrentPosition( function( position ) {

				var directionsDisplay = new google.maps.DirectionsRenderer;
				var directionsService = new google.maps.DirectionsService;


				var mapdirection = new google.maps.Map( document.getElementById('map'), { 
					zoom: 10, 
					center: {lat: position.coords.latitude, lng: position.coords.longitude },
					mapTypeId: google.maps.MapTypeId.terrain 
				});

				directionsDisplay.setMap( mapdirection );


	        	directionsService.route({

	        		destination: { lat: pos[0], lng: pos[1] },
	        		travelMode: google.maps.DirectionsTravelMode.DRIVING,
					origin: { lat: position.coords.latitude, lng: position.coords.longitude }

				}, function( response, status ) {

					if( status == 'OK') {

						directionsDisplay.setDirections( response );

					} else {

						window.alert('Directions request failed due to ' + status );
					}

				});


	        });

	    } else { 

	        window.alert('Geolocation is not supported by this browser.');
	    }

	}


}