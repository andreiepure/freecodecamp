showHide = function() {
	this.css = new function() {
		this.HIDDEN = 'hidden';
	}();

	// show and hide for an HTML element
	this.showElement = function(element) {
		if (element) {
			element.classList.remove(css.HIDDEN);
		}
	}();

	this.hideElement = function(element) {
		if (element) {
			element.classList.add(css.HIDDEN);
		}
	}();

	this.hideElements = function(elements) {
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
	}();
}();

$(document).ready(function() {

	var searchInput = document.getElementById('search-input');
	var searchButton = document.getElementById('search-button');
	var urlTemplate = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrlimit=8&gsrsearch=";
	var cardTitles = document.getElementsByClassName('card-title');
	var cardTexts = document.getElementsByClassName('card-text');

	function setUi(response) {
		hideElements(listItems);

		for (var i = 0; i < 8; i++) {
			var article = response.query.search[i];
			cardTitles[i].innerText = article.title;
			cardTexts[i].innerHTML = article.extract;
		}
	}

	function doSearch() {
		var searchText = encodeURIComponent(searchInput.value);
		var url = urlTemplate + searchText;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				if (xmlHttp.responseType === 'json') {
					setUi(xmlHttp.response);
				}
				else {
					setUi(JSON.parse(xmlHttp.response));
				}
			}
		};
		xmlHttp.open('GET', url, true);
		xmlHttp.send(null);
	}

	searchButton.addEventListener('click', doSearch);
});
