<?php


class Router {


	protected $routes = [];


	public function __construct() {

		/* Controller */
		$controller = new Controller;



		$this->file( 'Routes' );
	}



	public function __call( $method, $path ) {

		$this->routes[] = [ 'method' => strtoupper( $method ), 'path' => $path[0] ];
	}



	public function file( $path ) {


		if( file_exists( $file = APP . $path . '.php' ) ) {

			require $file;
		}
	}





	public function run() {


		foreach( $this->routes as $value ) {
		

			if( isset( $value['method'] ) && $value['method'] === $_SERVER['REQUEST_METHOD'] ) {
				

				if( $this->getURI() === $value['path'] ) {

					$this->controller->{$this->getFunction( $value['path'] )}();

					exit;
				}


			} else {

				$this->controller->notallowed();

				exit;
			}
		}


		$this->controller->notfound();
	}





	private function getURI() {

		return '/' . str_replace( '/' . basename( MAIN ) . '/', '', explode( '?', $_SERVER['REQUEST_URI'] )[0] );
	}




	public function route( $name, $callable ) {


		$this->file( 'Controllers/' . $name );


		if( is_callable( $callable ) ) {

			$this->controller = new $name;


			$callable( $this );
		}
	}




	private function getFunction( $path ) {


		if( $path === '/' ) {

			return 'index';
		}


		if( $path === $this->getURI() ) {

			return str_replace( '-', '', basename( $path ) );
		}
	}
}