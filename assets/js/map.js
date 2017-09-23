
function init() {

	var http  = new XMLHttpRequest();


	http.onreadystatechange = function() {

	    if( this.readyState == 4 && this.status == 200 ) {

			var marker, item, res = JSON.parse( this.responseText );

			var infobox  = new google.maps.InfoWindow();
	        var location = new google.maps.LatLng( res[0]['lat'], res[0]['lng'] );


			var map = new google.maps.Map( document.getElementById('map'), {
				zoom: 16,
				center: location,
				mapTypeId: google.maps.MapTypeId.terrain
			});


			var circle = new google.maps.Circle({
				map: 			map,
				strokeWeight: 	1,
				fillOpacity: 	0.1,
				strokeOpacity: 	0.5,
				radius: 		1000,
				fillColor: 		'#ff0000',
				strokeColor: 	'#ff0000',
				center: 		location,
			});





	    	var items = '';

			for( i = 0; i < res.length; i++ ) {


				if( res[i]['lat'] && res[i]['lng'] ) {

					marker = new google.maps.Marker({

						map: map,
						icon: new google.maps.MarkerImage( 'assets/images/icon.png', new google.maps.Size(32, 32) ),
						position: new google.maps.LatLng( res[i]['lat'], res[i]['lng'] )

					});
				}


				if( res[i]['name'] ) {


					item = '<h3>' + res[i]['name'] + '</h3>'
							+'<div class="meta">'
							+'<i class="rate star-'+ res[i]['star'] +'"></i>'
							+'<p><b>Visits: </b> '+ res[i]['visits'] +'/day</p>'
							+'<p><b>Patrons: </b> '+ res[i]['patrons'] +'</p>'
							+'<p><b>Specialty: </b> '+ res[i]['specialty'] +'</p>'
							+'</div>';


					google.maps.event.addListener( marker, 'click', ( function( marker, item, pos ) {


						return function() {

							var tip = '<div class="tip">'+ item + '<button id="getlocation">Get Direction</button></div>';


							infobox.setContent( tip );
							infobox.open( map, marker );

							getLocation( pos );
						};


					})( marker, item, [res[i]['lat'], res[i]['lng']] ));


					items += '<div class="item" data-type="'+ res[i]['type'] +'">'+ item +'</div>';
				}
			}

			loadPanel( map, items );
		}

	};


	http.open( 'GET', 'restaurants.json', true );

	http.send();
}




function loadPanel( map, items ) {


	google.maps.event.addListenerOnce( map, 'idle', function() {
		
		var panel = document.getElementById('panel');


	    document.getElementById('items').innerHTML = items;


	    panel.style.display = 'block';

		map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push( panel );
	});



	document.getElementById('selecttype').onchange = function() {


		var items = document.getElementById('items').children;

		for( i = 0; i < items.length; i++ ) {

			if( this.value == items[i].dataset['type'] ) {

				items[i].style.display = 'block';
			
			} else {

				items[i].style.display = 'none';
			}
		}
	};
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