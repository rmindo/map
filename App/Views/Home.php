<main>
	<div id="map"></div>

	<div id="panel">
		<header>
			
			<h1>Restaurants</h1>

			<form action="" method="POST">
				<div class="field">
					<label>Type</label>
					<select name="type" id="selecttype">
						<option value="1">Casual dining</option>
						<option value="2">Family style</option>
						<option value="3">Ethnic</option>
						<option value="4">Fast food</option>
						<option value="5">Fast casual</option>
						<option value="6">Fine dining</option>
					</select>
				</div>
			</form>
		</header>

		<div id="items"></div>

	</div>

    <script type="text/javascript">


	    function init() {

			var http  = new XMLHttpRequest();
			var mapID = document.getElementById('map');
			var panel = document.getElementById('panel');



			http.onreadystatechange = function() {

			    if( this.readyState == 4 && this.status == 200 ) {

			    	var items = '';

					var marker, item;

					var res = JSON.parse( this.responseText );

					var infowindow  = new google.maps.InfoWindow();
			        var location 	= new google.maps.LatLng( res[0]['lat'], res[0]['lng'] );



					var map = new google.maps.Map( mapID, { zoom: 16, center: location, mapTypeId: google.maps.MapTypeId.terrain });


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


							google.maps.event.addListener( marker, 'click', ( function( marker, i, item ) {


								return function() {

									infowindow.setContent( '<div class="tip">'+ item + '<button id="getlocation">Get Direction</button></div>' );
									infowindow.open( map, marker );


									document.getElementById('getlocation').onclick = function() {

										var directionsDisplay = new google.maps.DirectionsRenderer;
										var directionsService = new google.maps.DirectionsService;



									    if( navigator.geolocation ) {

									        navigator.geolocation.getCurrentPosition(function(){

									        	
									        	directionsService.route({

													origin: { lat: position.coords.latitude, lng: position.coords.longitude },
													destination: {lat: res[i]['lat'], lng: res[i]['lng']},

												}, function( response, status) {

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

								};



							})( marker, i, item ));


							items += '<div class="item" data-type="'+ res[i]['type'] +'">'+ item +'</div>';
						}
					}


					google.maps.event.addListenerOnce( map, 'idle', function() {


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
					}



				}

			};


			http.open( 'GET', 'http://www/navagis/api/restaurants?address=Cebu+City', true );

			http.send();








	    }



    </script>


    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzymXsPqLMjVS3E5QYCr7ejvYNjXog6ZE&callback=init"></script>


</main>