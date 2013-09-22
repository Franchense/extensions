/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
WebPage
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function WebPage(url,onScreen) {
	this.url = url;
    this.onScreen = onScreen;
    this.webPageElements = [];
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
WebPage.prototype = {
	/*-----------------------------------------------
		Getters & Setters
	-----------------------------------------------*/
	getUrl: function() {
		return this.url;
	},
	setUrl: function(url) {
		this.url = url;
	},
    getOnScreen: function() {
		return this.onScreen;
	},
	setOnScreen: function(onScreen) {
		this.onScreen = onScreen;
	},
	getWebPageElements: function() {
		return this.webPageElements;
	},
	setWebPageElements: function(webPageElements) {
		this.webPageElements = webPageElements;
	}
}