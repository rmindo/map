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
				['specialty' => 'Lamb Salad with Fregola', 'revenue' => 634202, 'star' => 4, 'patrons' => 70, 'visits' => 90, 'type' => 1],
				['specialty' => 'Smoked Pork Jowl with Pickles', 'revenue' => 634202, 'star' => 5, 'patrons' => 99, 'visits' => 128, 'type' => 2],
				['specialty' => 'Scallop Sashimi with Meyer Lemon Confit', 'revenue' => 634202, 'star' => 3, 'patrons' => 20, 'visits' => 70, 'type' => 5],
				['specialty' => 'Vegan Charcuterie', 'revenue' => 634202, 'star' => 4, 'patrons' => 40, 'visits' => 98, 'type' => 3],
				['specialty' => 'Pappardelle with Sea Urchin and Cauliflower', 'revenue' => 634202, 'star' => 3, 'patrons' => 30, 'visits' => 80, 'type' => 4],
				['specialty' => 'Pork Rillette Hand Pies', 'revenue' => 634202, 'star' => 3, 'patrons' => 60, 'visits' => 60, 'type' => 1],
				['specialty' => 'Malted Custard French Toast', 'revenue' => 634202, 'star' => 4, 'patrons' => 115, 'visits' => 160, 'type' => 0],
				['specialty' => 'Pizza Puff', 'revenue' => 634202, 'star' => 5, 'patrons' => 125, 'visits' => 140, 'type' => 5],
				['specialty' => 'Island Duck with Mulberry Mustard', 'revenue' => 634202, 'star' => 5, 'patrons' => 110, 'visits' => 130, 'type' => 2],
				['specialty' => 'Pasta with Lamb Ragù', 'revenue' => 634202, 'star' => 3, 'patrons' => 58, 'visits' => 80, 'type' => 4],
				['specialty' => 'Cheeseburger', 'revenue' => 634202, 'star' => 2, 'patrons' => 21, 'visits' => 50, 'type' => 3],
				['specialty' => 'Chorizo-stuffed Medjool Dates', 'revenue' => 634202, 'star' => 4, 'patrons' => 96, 'visits' => 112, 'type' => 1],
				['specialty' => 'Smoked Salmon', 'revenue' => 634202, 'star' => 5, 'patrons' => 101, 'visits' => 120, 'type' => 5],
				['specialty' => 'Atomica', 'revenue' => 634202, 'star' => 3, 'patrons' => 78, 'visits' => 87, 'type' => 2],
				['specialty' => 'Seoul Sassy Fried Chicken', 'revenue' => 634202, 'star' => 3, 'patrons' => 67, 'visits' => 80, 'type' => 5],
				['specialty' => 'Cheesecake', 'revenue' => 634202, 'star' => 1, 'patrons' => 10, 'visits' => 120, 'type' => 0],
				['specialty' => 'Garrett Mix', 'revenue' => 634202, 'star' => 4, 'patrons' => 60, 'visits' => 100, 'type' => 4],
				['specialty' => 'Broiled T-Bone Steak', 'revenue' => 634202, 'star' => 3, 'patrons' => 40, 'visits' => 90, 'type' => 2],
				['specialty' => 'Depression Dog', 'revenue' => 634202, 'star' => 4, 'patrons' => 80, 'visits' => 123, 'type' => 0],
				['specialty' => 'Roasted Pig Face', 'revenue' => 634202, 'star' => 5, 'patrons' => 100, 'visits' => 145, 'type' => 3]
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