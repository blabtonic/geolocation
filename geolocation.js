var mapContainer = document.getElementById('map');
var map;
function init() {
	//Google map settings (zoom level, map type etc.)
	var mapOptions = {
		zoom : 15,
		disableDefaultUI : true,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	//map will be drawn inside the mapContainer
	map = new google.maps.Map(mapContainer, mapOptions);
	detectLocation();
}

function detectLocation() {
	var options = {
		enableHighAccuracy : true,
		maximumAge : 1000,
		timeout : 30000
	};
	//check if the browser supports geolocation
	if (window.navigator.geolocation) {
		//get current position
		window.navigator.geolocation.getCurrentPosition(markMyLocation, handleGeolocateError, options);
	} else {
		alert("Sorry");
	}
};

function markMyLocation(position) {
	//latitude, longitude of current position
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var msg = "You are here";
	var pos = new google.maps.LatLng(lat, lon);
	map.setCenter(pos);
	var infoBox = new google.maps.InfoWindow({
		map : map,
		position : pos,
		content : msg
	});
	//draw a google map marker on current position
	var myMarker = new google.maps.Marker({
		map : map,
		position : pos
	});
	getNearbyTimmys(lat, lon);
	return;
}

function handleGeolocateError() {
	alert("Not able to get your geolocation");
}

function getNearbyTimmys(lat, lon) {
	//sends Ajax request to nearby Tim Hortons
	$.ajax({
		url : 'query.php?lat=' + lat + '&lon=' + lon,
		dataType : 'json',
		success : ajaxSuccess
	});
}

function ajaxSuccess(data) {
	//callback function for Ajax marks each Tim Horton on map
	data.forEach(function(timHorton) {
		var pos = new google.maps.LatLng(timHorton.latitude, timHorton.longitude);
		var marker = new google.maps.Marker({
			map : map,
			position : pos
		});
	});
}

window.onload = init;
