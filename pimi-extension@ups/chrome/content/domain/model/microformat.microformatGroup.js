/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
MicroformatGroup
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function MicroformatGroup(id,name,mandatory,microformat) {
	this.id = id;
	this.name = name;
	this.mandatory = mandatory;
    this.atomicMicroformats = [];
    this.microformat = microformat;
	this.microformatsManager = microformat.getMicroformatsManager();
	this.pluginContext = microformat.getMicroformatsManager().getPluginContext();
    this.webPageDomContext = microformat.getMicroformatsManager().getWebPageDomContext();
    this.webPageJsContext = microformat.getMicroformatsManager().getWebPageJsContext();
    this.interfaceTool = microformat.getMicroformatsManager().getInterfaceTool();
	this.utilityTool = microformat.getMicroformatsManager().getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
MicroformatGroup.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	addAtomicMicroformat: function(atomicMicroformatName,description,mandatory,classValue,subClassValue,subClassAttributeValue) {
		var newAtomicMicroformat = new AtomicMicroformat(this.microformatsManager.getUniqueRandomId(20),
							 						     atomicMicroformatName,
							 						     description,
							 						     mandatory,
							 						     classValue,
							 						     subClassValue,
							 						     subClassAttributeValue,
							 						     this);
		this.atomicMicroformats.push(newAtomicMicroformat);
		return newAtomicMicroformat;
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		this.getTreeView();
	},
	getTreeView: function() {
		return this.interfaceTool.getMicroformatGroupTreeView(this);
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
	getMandatory: function() {
		return this.mandatory;
	},
	setMandatory: function(mandatory) {
		this.mandatory = mandatory;
	},
	getAtomicMicroformats: function() {
		return this.atomicMicroformats;
	},
	setAtomicMicroformats: function(atomicMicroformats) {
		this.atomicMicroformats = atomicMicroformats;
	},
	getMicroformat: function() {
		return this.microformat;
	},
	setMicroformat: function(microformat) {
		this.microformat = microformat;
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