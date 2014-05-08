<?php
$lat = (float)$_GET['lat'];
$lon = (float)$_GET['lon'];

//creates a connection to mongoDB server
$mongo = new Mongo();

$collection = $mongo -> selectDB('geolocation') -> selectCollection('hortons');

//query the collection with the given latitude and longitude
$query = array('location'=> array('$near' => array($lat, $lon)));

$cursor = $collection->find($query);
$response = array();
while ($doc = $cursor->getNext()) {
	$obj = array(
	'address'=> $doc['address'],
	'latitude'=> $doc['location'] [0],
	'longitude' => $doc['location'] [1]
	);
	array_push($response, $obj);
}
//convert the array in JSON and send back to client
echo json_encode($response);
?>