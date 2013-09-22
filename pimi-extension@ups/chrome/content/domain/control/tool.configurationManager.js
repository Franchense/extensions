/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
ConfigurationManager
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function ConfigurationManager(personalSpace) {
	this.autoSave = false;
	this.configXmlDoc = null;
    this.personalSpace = personalSpace;
	this.pluginContext = personalSpace.getPluginContext();
    this.webPageDomContext = personalSpace.getWebPageDomContext();
    this.webPageJsContext = personalSpace.getWebPageJsContext();
    this.interfaceTool = personalSpace.getInterfaceTool();
	this.utilityTool = personalSpace.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
ConfigurationManager.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
    init: function() {
    	this.load();
    	this.configure();
	},
	load: function() {
		this.loadXml();
	},
	loadXml: function() {
		var configXmlDoc = this.utilityTool.loadXMLDoc(configXmlFilePath);
    	this.importXml(configXmlDoc);
	},
	save: function() {
		
	},
	setDefault: function() {
		this.autoSave = false;
	},
	configure: function() {
		this.personalSpace.setAutoSave(this.autoSave);
	},
	/*-----------------------------------------------
		Import & export methods
	-----------------------------------------------*/
	import: function(configDoc) {
		this.importXml(configDoc);
	},
	importXml: function(configXmlDoc) {
		if(configXmlDoc != null) {
			this.setConfigXmlDoc(configXmlDoc);
			var save = configXmlDoc.getElementsByTagName('autosave')[0];
			this.autoSave = save.getAttribute('enabled').toBoolean();
		}
	},
	export: function() {
		return this.exportXml();
	},
	exportXml: function() {
		
	},
	getXml: function() {
		
	},
	getJson: function() {
		
	},
	/*-----------------------------------------------
		Getters & Setters
	-----------------------------------------------*/
	getAutoSave: function() {
		return this.autoSave;
	},
	setAutoSave: function(autoSave) {
		this.autoSave = autoSave;
	},
	getConfigXmlDoc: function() {
		return this.configXmlDoc;
	},
	setConfigXmlDoc: function(configXmlDoc) {
		this.configXmlDoc = configXmlDoc;
	},
	getPersonalSpace: function() {
		return this.personalSpace;
	},
	setPersonalSpace: function(personalSpace) {
		this.personalSpace = personalSpace;
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