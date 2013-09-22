/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
WebPagesManager
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function WebPagesManager(personalSpace) {
    this.personalSpace = personalSpace;
    this.webPages = [];
	this.pluginContext = personalSpace.getPluginContext();
    this.webPageDomContext = personalSpace.getWebPageDomContext();
    this.webPageJsContext = personalSpace.getWebPageJsContext();
    this.interfaceTool = personalSpace.getInterfaceTool();
	this.utilityTool = personalSpace.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
WebPagesManager.prototype = {
	/*-----------------------------------------------
		Getters & Setters
	-----------------------------------------------*/
	getPersonalSpace: function() {
		return this.personalSpace;
	},
	setPersonalSpace: function(personalSpace) {
		this.personalSpace = personalSpace;
	},
	getWebPages: function() {
		return this.webPages;
	},
	setWebPages: function(webPages) {
		this.webPages = webPages;
	},
	getPluginContext: function() {
		return this.pluginContext;
	},
	setPluginContext: function(pluginContext) {
		this.pluginContext = pluginContext;
	},
	getWebPageDomContext: function() {
		return this.webPageDomContext;
	},
	setWebPageDomContext: function(webPageDomContext) {
		this.webPageDomContext = webPageDomContext;
	},
	getWebPageJsContext: function() {
		return this.webPageJsContext;
	},
	setWebPageJsContext: function(webPageJsContext) {
		this.webPageJsContext = webPageJsContext;
	},
	getInterfaceTool: function() {
		return this.interfaceTool;
	},
	setInterfaceTool: function(interfaceTool) {
		this.interfaceTool = interfaceTool;
	},
	getUtilityTool: function() {
		return this.utilityTool;
	},
	setUtilityTool: function(utilityTool) {
		this.utilityTool = utilityTool;
	}
}