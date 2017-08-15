var showHide = new function() {
	this.operation = function(elements, op) {
		for(var i = 0; i < elements.length; i++) {
			var item = elements.item(i);
			if (op === 'show') {
				item.classList.remove('hidden');
			}
			else if (op === 'hide') {
				item.classList.add('hidden');
			}
		}
	};
}();

document.addEventListener("DOMContentLoaded", function(event) { 

	var searchInput = document.getElementById('search-input');
	var searchButton = document.getElementById('search-button');
	var urlTemplate = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrlimit=8&origin=*&gsrsearch=";
	var cards = document.getElementsByClassName('card');
	var cardTitles = document.getElementsByClassName('card-title');
	var cardTexts = document.getElementsByClassName('card-text');
	var cardLinks = document.getElementsByClassName('card-link');

	function setUi(response) {
		var i = 0;
		for (page in response.query.pages) {
			var article = response.query.pages[page];
			cardTitles[i].innerText = article.title;
			cardTexts[i].innerHTML = article.extract;
			cardLinks[i].href = "https://en.wikipedia.org/?curid=" + article.pageid;
			i++;
		}

		showHide.operation(cards, 'show');
	}

	function doSearch() {
		showHide.operation(cards, 'hide');

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
