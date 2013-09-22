/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
WebPageAnnotation
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function WebPageAnnotation(id,webPage) {
	this.id = id;
	this.webPage = webPage;
    this.elementAnnotations = [];
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
WebPageAnnotation.prototype = {
	/*-----------------------------------------------
		Export
	-----------------------------------------------*/
	export: function() {
		
	},
	getXml: function() {
		
	},
	getJson: function() {
		
	},
	/*-----------------------------------------------
		Getters & Setters
	-----------------------------------------------*/
	getId: function() {
		return this.id;
	},
	setId: function(id) {
		this.id = id;
	},
	getWebPage: function() {
		return this.webPage;
	},
	setWebPage: function(webPage) {
		this.webPage = webPage;
	},
	getElementAnnotations: function() {
		return this.elementAnnotations;
	},
	setElementAnnotations: function(elementAnnotations) {
		this.elementAnnotations = elementAnnotations;
	}
}