$(document).ready(function() {
	
	var css = new function() {
		this.HIDDEN = 'hidden';
		this.ACTIVE = 'active';
	}();

    var temperatureIcons = new function() {
        this.hot = document.getElementById('hot');
        this.warm = document.getElementById('warm');
        this.cool = document.getElementById('cool');
        this.cold = document.getElementById('cold');
        this.freezing = document.getElementById('freezing');
    }();

    var skyIcons = new function() {
        this.sun = document.getElementById('sun');
        this.cloud = document.getElementById('cloud');
        this.rain = document.getElementById('rain');
        this.storm = document.getElementById('storm');
        this.snow = document.getElementById('snow');
    }();

	// show and hide for an HTML element
	var showElement = function(element) {
		if (element) {
			element.classList.remove(css.HIDDEN);
		}
	};

	var hideElement = function(element) {
		if (element) {
			element.classList.add(css.HIDDEN);
		}
	};

	var hideElements = function(elements) {
		try {
			for (var element in elements) {
				if (elements.hasOwnProperty(element)) {
					hideElement(elements[element]);
				}
			}
		}
		catch (e) {
			console.log('hideElements was given incorrect input');
		}
	};

    case 'drizzle':
	case 'rain':
	case 'clouds':
	case 'snow':
	case 'thunderstom':

	function chooseTemperatureIcon(number) {
		hideElements(temperatureIcons);

		if (number < 0 ) {
			showElement(temperatureIcons.freezing);
		}
		else if (number < 10) {
			showElement(temperatureIcons.cold);
		}
		else if (number < 20) {
			showElement(temperatureIcons.cool);
		}
		else if (number < 30) {
			showElement(temperatureIcons.warm);
		}
		else {
			showElement(temperatureIcons.hot);
		}
	}

	function chooseSkyIcon(status) {
		hideElements(skyIcons);
	}


	function setUi(response) {
		var locality = response.name + ", " + response.sys.country; 

		var metric = "C";
		var temperature = response.main.temp;
		var minTemp = response.main.temp_min;
		var maxTemp = response.main.temp_max;

		var sky = weather[0].main;
		var skyVerbose = weather[0].main.description;

        document.getElementById('locality').innerText = locality;

        document.getElementById('number').innerText = temperature;
        document.getElementById('metric').innerText = metric;

		chooseTemperatureIcon(temperature);
		chooseSkyIcon(sky);
	}

	if ("geolocation" in navigator) {

		navigator.geolocation.getCurrentPosition(function(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;

			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					setUi(xmlHttp.response);
				}
			};
			xmlHttp.open("GET", theUrl, true);
			xmlHttp.send(null);
		}
	}
	else {
		
	}

});
