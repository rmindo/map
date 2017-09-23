<?php


class Pages extends Controller {



	public function index() {


		$this->view( 'Header' );

		$this->view( 'Home' );

		$this->view( 'Footer' );
		
	}



	public function notfound() {

		$this->view( '404' );
	}



	public function notallowed() {

		$this->view( '405' );
	}




	public function restaurants() {
	
		header( 'Content-Type: application/json; charset=utf-8' );


		if( isset( $_GET['address'] ) ) {

			$restaurants = [
				['name' => 'Casa Verde', 'specialty' => 'Lamb Salad with Fregola', 'lat' => 10.3282959, 'lng' => 123.9058465, 'revenue' => 634202, 'star' => 4, 'patrons' => 70, 'visits' => 90, 'type' => 1],
				['name' => 'Mooon Cafe', 'specialty' => 'Smoked Pork Jowl with Pickles', 'lat' => 10.3285367, 'lng' => 123.9059765, 'revenue' => 634202, 'star' => 5, 'patrons' => 99, 'visits' => 128, 'type' => 2],
				['name' => 'Milk Cow', 'specialty' => 'Scallop Sashimi with Meyer Lemon Confit', 'lat' => 10.3295643, 'lng' => 123.9053994, 'revenue' => 634202, 'star' => 3, 'patrons' => 20, 'visits' => 70, 'type' => 5],
				['name' => 'Golden Cowrie', 'specialty' => 'Vegan Charcuterie', 'lat' => 10.3288044, 'lng' => 123.9025348, 'revenue' => 634202, 'star' => 4, 'patrons' => 40, 'visits' => 98, 'type' => 3],
				['name' => 'Maya Mexican', 'specialty' => 'Pappardelle with Sea Urchin and Cauliflower', 'lat' => 10.3279705, 'lng' => 123.9101737, 'revenue' => 634202, 'star' => 3, 'patrons' => 30, 'visits' => 80, 'type' => 4],
				['name' => 'The Tinder Box', 'specialty' => 'Pork Rillette Hand Pies', 'lat' => 10.3288782, 'lng' => 123.9092564, 'revenue' => 634202, 'star' => 3, 'patrons' => 60, 'visits' => 60, 'type' => 1],
				['name' => 'Bucket Shrimps', 'specialty' => 'Malted Custard French Toast', 'lat' => 10.3274322, 'lng' => 123.9038115, 'revenue' => 634202, 'star' => 4, 'patrons' => 115, 'visits' => 160, 'type' => 0],
				['name' => 'Pizza Republic', 'specialty' => 'Pizza Puff', 'lat' => 10.3291052, 'lng' => 123.9027494, 'revenue' => 634202, 'star' => 5, 'patrons' => 125, 'visits' => 140, 'type' => 5],
				['name' => 'The Pyramid', 'specialty' => 'Island Duck with Mulberry Mustard', 'lat' => 10.3314273, 'lng' => 123.9051848, 'revenue' => 634202, 'star' => 5, 'patrons' => 110, 'visits' => 130, 'type' => 2],
				['name' => 'Shaka Hawaiian', 'specialty' => 'Pasta with Lamb Ragù', 'lat' => 10.3317028, 'lng' => 123.9065461, 'revenue' => 634202, 'star' => 3, 'patrons' => 58, 'visits' => 80, 'type' => 4],
				['name' => 'Q Bay Restaurant', 'specialty' => 'Cheeseburger', 'lat' => 10.3300047, 'lng' => 123.9064284, 'revenue' => 634202, 'star' => 2, 'patrons' => 21, 'visits' => 50, 'type' => 3],
				['name' => 'Hwang Kung', 'specialty' => 'Chorizo-stuffed Medjool Dates', 'lat' => 10.3274082, 'lng' => 123.9043715, 'revenue' => 634202, 'star' => 4, 'patrons' => 96, 'visits' => 112, 'type' => 1],
				['name' => 'ilaputi', 'specialty' => 'Smoked Salmon', 'lat' => 10.3289122, 'lng' => 123.9074453, 'revenue' => 634202, 'star' => 5, 'patrons' => 101, 'visits' => 120, 'type' => 5],
				['name' => 'Circa 1900', 'specialty' => 'Atomica', 'lat' => 10.3268044, 'lng' => 123.899908, 'revenue' => 634202, 'star' => 3, 'patrons' => 78, 'visits' => 87, 'type' => 2],
				['name' => 'Burrow', 'specialty' => 'Seoul Sassy Fried Chicken', 'lat' => 10.3314174, 'lng' => 123.8998939, 'revenue' => 634202, 'star' => 3, 'patrons' => 67, 'visits' => 80, 'type' => 5],
				['name' => 'The Ching Palace', 'specialty' => 'Cheesecake', 'lat' => 10.331297, 'lng' => 123.8983626, 'revenue' => 634202, 'star' => 1, 'patrons' => 10, 'visits' => 120, 'type' => 0],
				['name' => 'La Vie Parisienne', 'specialty' => 'Garrett Mix', 'lat' => 10.3261774, 'lng' => 123.8981632, 'revenue' => 634202, 'star' => 4, 'patrons' => 60, 'visits' => 100, 'type' => 4],
				['name' => 'PINO Filipino Cuisine', 'specialty' => 'Broiled T-Bone Steak', 'lat' => 10.3318627, 'lng' => 123.8997598, 'revenue' => 634202, 'star' => 3, 'patrons' => 40, 'visits' => 90, 'type' => 2],
				['name' => 'Persian Kebab Tandoori', 'specialty' => 'Depression Dog', 'lat' => 10.3317321, 'lng' => 123.907517, 'revenue' => 634202, 'star' => 4, 'patrons' => 80, 'visits' => 123, 'type' => 0],
				['name' => 'Manggahan Bar and Grilling', 'specialty' => 'Roasted Pig Face', 'lat' => 10.333399, 'lng' => 123.9008869, 'revenue' => 634202, 'star' => 5, 'patrons' => 100, 'visits' => 145, 'type' => 3]
			];

		} else {

			$restaurants = ['status' => 'NO_RESULTS'];
		}


		echo json_encode( $restaurants, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	}






    public function getAPIResults( $url ) {
 
		// Initialize
		$ch = curl_init( $url );

		// Set options
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_HEADER, 0 );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0 );
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );


		// Execute and Fetch the Results
		$results = curl_exec( $ch );

		// Close Curl
		curl_close( $ch );



		return json_decode( $results, true );
    }

}