<!DOCTYPE html>
<html>
<head>
	<title>Home Page</title>

    <style>
		#map {
			width: 100%;
			height: 900px;
			background-color: rgb(229, 227, 223);
		}
		#map h1 {
			margin: 0 0 20px;
		}
		#map label {
			font-weight: bold;
			margin-right: 10px;
		}
		#map header {
			margin-bottom: 30px;
		}
		#map header form select {
			width: 150px;
			height: 30px;
			padding: 0 5px;
			border-radius: 4px;
			border: 1px solid #ccc;
		}
		#map .tip {
			min-width: 110px;
			min-height: 165px;
		}
		#map .tip h3 {
			display: block;
			margin: 10px 0;
		}
		#map .tip button {
			border: 0;
			color: #fff;
			width: 100%;
			padding: 10px;
			cursor: pointer;
			font-weight: bold;
			position: absolute;
			border-radius: 4px;
			background-color: #4285F4;
		}
		#map .rate {
			width: 100%;
			height: 15px;
			display: block;
			margin-bottom: 10px;
		}
		#map .star-5 {
			background: url(assets/images/rates.png) 0 0 no-repeat;
		}
		#map .star-4 {
			background: url(assets/images/rates.png) 0 -19px no-repeat;
		}
		#map .star-3 {
			background: url(assets/images/rates.png) 0 -36px no-repeat;
		}
		#map .star-2 {
			background: url(assets/images/rates.png) 0 -54px no-repeat;
		}
		#map .star-1 {
			background: url(assets/images/rates.png) 0 -74px no-repeat;
		}
		#panel {
			width: 250px;
			display: none;
			padding: 20px;
			background: #fff;
			position: absolute;
			left: 10px !important;
			top: 60px !important;
			bottom: auto !important;
			background-clip: padding-box;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			-webkit-background-clip: padding-box;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
		}
		#panel #items {
			height: 500px;
			overflow-y: scroll;
			padding-right: 20px;
		}
		#panel #items .item {
			margin-bottom: 10px;
			padding-bottom: 10px;
			border-bottom: 1px dashed #ddd;
		}
		#panel #items .item h3 {
			margin: 0 0 5px;
		}
    </style>
</head>
<body>

	<header id="header"></header>