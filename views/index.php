<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
<!doctype html>
<html>
<head>
	<title>The Space Venger Game</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	<script type="text/javascript" src="helperMethods.js"></script>
	<?php
		//Add some queries to images to prevent caching
		$code = file_get_contents("1.js");
		$fileTypes = ['.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.tga', 'gif'];
		foreach($fileTypes as $type){
			$code = str_ireplace($type, $type . "?" . time(), $code);
		}
	?>
	<script type="text/javascript">
		<?php echo $code; ?>
	</script>
		<style type="text/css">
	html, body{
		margin : 0;
		padding : 0;
	}
	#main{
		margin : auto;
		padding : 0;
		overflow : hidden;
		position : relative !important;
		margin : auto;
		text-align : center;
	}
	*{
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor : default;
	}
	</style>
</head>
<body>
	<div id="main">
	</div>
</body>
</html>
