/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Microformat
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function Microformat(id,name,type,microformatsManager) {
	this.id = id;
	this.name = name;
	this.type = type;
    this.microformatGroups = [];
	this.microformatsManager = microformatsManager;
	this.pluginContext = microformatsManager.getPluginContext();
    this.webPageDomContext = microformatsManager.getWebPageDomContext();
    this.webPageJsContext = microformatsManager.getWebPageJsContext();
    this.interfaceTool = microformatsManager.getInterfaceTool();
	this.utilityTool = microformatsManager.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
Microformat.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	addMicroformatGroup: function(microformatGroupName,mandatory) {
		var newMicroformatGroup = new MicroformatGroup(this.microformatsManager.getUniqueRandomId(20),
							 						   microformatGroupName,
							 						   mandatory,
							 						   this);
		this.microformatGroups.push(newMicroformatGroup);
		return newMicroformatGroup;
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		this.getTreeView();
	},
	getTreeView: function() {
		return this.interfaceTool.getMicroformatTreeView(this);
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
	getType: function() {
		return this.type;
	},
	setType: function(type) {
		this.type = type;
	},
	getMicroformatGroups: function() {
		return this.microformatGroups;
	},
	setMicroformatGroups: function(microformatGroups) {
		this.microformatGroups = microformatGroups;
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

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AdoptedMicroformat extends Microformat
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AdoptedMicroformat(id,name,microformatsManager) {
	this.id = id;
	this.name = name;
	this.type = 'adopted';
    this.microformatGroups = [];
	this.microformatsManager = microformatsManager;
	this.pluginContext = microformatsManager.getPluginContext();
    this.webPageDomContext = microformatsManager.getWebPageDomContext();
    this.webPageJsContext = microformatsManager.getWebPageJsContext();
    this.interfaceTool = microformatsManager.getInterfaceTool();
	this.utilityTool = microformatsManager.getUtilityTool();
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
AdoptedMicroformat.prototype = Object.create(Microformat.prototype);

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
ProposedMicroformat extends Microformat
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function ProposedMicroformat(id,name,microformatsManager) {
	this.id = id;
	this.name = name;
	this.type = 'proposed';
    this.microformatGroups = [];
	this.microformatsManager = microformatsManager;
	this.pluginContext = microformatsManager.getPluginContext();
    this.webPageDomContext = microformatsManager.getWebPageDomContext();
    this.webPageJsContext = microformatsManager.getWebPageJsContext();
    this.interfaceTool = microformatsManager.getInterfaceTool();
	this.utilityTool = microformatsManager.getUtilityTool();
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
ProposedMicroformat.prototype = Object.create(Microformat.prototype);