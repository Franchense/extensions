/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AtomicMicroformat
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AtomicMicroformat(id,name,description,mandatory,classValue,subClassValue,subClassAttributeValue,microformatGroup) {
	this.id = id;
	this.name = name;
	this.description = description;
	this.mandatory = mandatory;
	this.classValue = classValue;
	this.subClassValue = subClassValue;
	this.subClassAttributeValue = subClassAttributeValue;
    this.microformatGroup = microformatGroup;
	this.microformatsManager = microformatGroup.getMicroformatsManager();
	this.pluginContext = microformatGroup.getMicroformatsManager().getPluginContext();
    this.webPageDomContext = microformatGroup.getMicroformatsManager().getWebPageDomContext();
    this.webPageJsContext = microformatGroup.getMicroformatsManager().getWebPageJsContext();
    this.interfaceTool = microformatGroup.getMicroformatsManager().getInterfaceTool();
	this.utilityTool = microformatGroup.getMicroformatsManager().getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
AtomicMicroformat.prototype = {
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		this.getTreeView();
	},
	getTreeView: function() {
		return this.interfaceTool.getAtomicMicroformatTreeView(this);
	},
	updateView: function() {
		this.deleteView();
		this.getView();
	},
	deleteView: function() {
		this.deleteTreeView();
	},
	deleteTreeView: function() {
		
	},
	/*-----------------------------------------------
		Export methods
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
	getName: function() {
		return this.name;
	},
	setName: function(name) {
		this.name = name;
	},
	getDescription: function() {
		return this.description;
	},
	setDescription: function(description) {
		this.description = description;
	},
	getMandatory: function() {
		return this.mandatory;
	},
	setMandatory: function(mandatory) {
		this.mandatory = mandatory;
	},
	getClassValue: function() {
		return this.classValue;
	},
	setClassValue: function(classValue) {
		this.classValue = classValue;
	},
	getSubClassValue: function() {
		return this.subClassValue;
	},
	setSubClassValue: function(subClassValue) {
		this.subClassValue = subClassValue;
	},
	getSubClassAttributeValue: function() {
		return this.subClassAttributeValue;
	},
	setSubClassAttributeValue: function(subClassAttributeValue) {
		this.subClassAttributeValue = subClassAttributeValue;
	},
	getMicroformatGroup: function() {
		return this.microformatGroup;
	},
	setMicroformatGroup: function(microformatGroup) {
		this.microformatGroup = microformatGroup;
	},
	getMicroformatsManager: function() {
		return this.microformatsManager;
	},
	setMicroformatsManager: function(microformatsManager) {
		this.microformatsManager = microformatsManager;
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