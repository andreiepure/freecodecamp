$(document).ready(function() {
	
	var css = new function() {
		this.HIDDEN = 'hidden';
	}();

	var metricType = new function() {
		this.Celsius = '&deg;C';
		this.Fahrenheit = 'F';
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

	var metricButton = document.getElementById('metric');
	var metricNumber = document.getElementById('number');

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

		var lowStatus = status.toLowerCase();

		switch (lowStatus) {
		case 'clear': showElement(skyIcons.sun); break;
		case 'drizzle': showElement(skyIcons.rain); break;
		case 'rain': showElement(skyIcons.rain); break;
		case 'clouds': showElement(skyIcons.cloud); break;
		case 'snow': showElement(skyIcons.snow); break;
		case 'thunderstom': showElement(skyIcons.storm); break;
		}
	}

	function twoDecimal(input) {
		return parseFloat(input).toFixed(2);
	}

	function changeMetric() {
		var temperature = metricNumber.innerText;
		// weird things happen if I try to compare with the Celsius, because of encoded/decoded symbol
		if (metric.innerHTML === metricType.Fahrenheit) {
			metricButton.innerHTML = metricType.Celsius;
			metricNumber.innerText = twoDecimal((temperature - 32) * 5 / 9);
		}
		else {
			metricButton.innerHTML = metricType.Fahrenheit;
			metricNumber.innerText = twoDecimal((temperature * 9)/5 + 32);
		}
	}

	function setUi(response) {
		var locality = response.name + ', ' + response.sys.country; 

		var temperature = response.main.temp;
		var minTemp = response.main.temp_min;
		var maxTemp = response.main.temp_max;

		var sky = response.weather[0].main;
		var skyVerbose = response.weather[0].description;

        document.getElementById('locality').innerText = locality;
        document.getElementById('detailed-sky').innerText = skyVerbose;

		chooseTemperatureIcon(temperature);
		chooseSkyIcon(sky);

        metricNumber.innerText = twoDecimal(temperature);
        metricButton.innerHTML = metricType.Celsius;
		metricButton.addEventListener('click', changeMetric);

		showElement(metricButton);
	}

	if ('geolocation' in navigator) {

		navigator.geolocation.getCurrentPosition(function(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;

			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					setUi(JSON.parse(xmlHttp.response));
				}
			};
			xmlHttp.open('GET', url, true);
			xmlHttp.send(null);
		});
	}
	else {
		showElement(document.getElementById('error'));	
	}

});
