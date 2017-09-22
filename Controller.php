<?php


class Controller {



	public function file( $path ) {


		if( file_exists( $file = APP . $path . '.php' ) ) {

			require $file;
		}
	}




	public function view( $path ) {

		$this->file( 'Views/' . $path );
	}



	public function model( $name ) {



	}
}