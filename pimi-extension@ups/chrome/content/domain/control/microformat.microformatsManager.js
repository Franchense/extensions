/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
MicroformatsManager
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function MicroformatsManager(personalSpace) {
    this.personalSpace = personalSpace;
	this.microformats = [];
	this.adoptedMicroformats = [];
	this.proposedMicroformats = [];
	this.adoptedMicroformatsXmlDoc = null;
	this.proposedMicroformatsXmlDoc = null;
	this.pluginContext = personalSpace.getPluginContext();
    this.webPageDomContext = personalSpace.getWebPageDomContext();
    this.webPageJsContext = personalSpace.getWebPageJsContext();
    this.interfaceTool = personalSpace.getInterfaceTool();
	this.utilityTool = personalSpace.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
MicroformatsManager.prototype = {
	/*-----------------------------------------------
		Super methods
	-----------------------------------------------*/
	getUniqueRandomId: function(intLength) {
		return this.personalSpace.getUniqueRandomId(intLength);
	},
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	init: function() {
		this.load();
	},
	load: function() {
		this.importMicroformatsTypes();
	},
	addAdoptedMicroformat: function(microformatName) {
		var newAdoptedMicroformat = new AdoptedMicroformat(this.getUniqueRandomId(20),
							 							   microformatName,
							 							   this);
		this.microformats.push(newAdoptedMicroformat);
		this.adoptedMicroformats.push(newAdoptedMicroformat);
		return newAdoptedMicroformat;
	},
	addProposedMicroformat: function(microformatName) {
		var newProposedMicroformat = new ProposedMicroformat(this.getUniqueRandomId(20),
							 							   	 microformatName,
							 							     this);
		this.microformats.push(newProposedMicroformat);
		this.proposedMicroformats.push(newProposedMicroformat);
		return newProposedMicroformat;
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		return this.getPanelView();
	},
	getPanelView: function() {
		return this.interfaceTool.getMicroformatsPanelView(this);
	},
	getTreeView: function() {
		return this.interfaceTool.getMicroformatsTreeView(this);
	},
	updateView: function() {
		this.updatePanelView();
	},
	updatePanelView: function() {
		this.interfaceTool.updateMicroformatsPanelView(this);
	},
	updateTreeView: function() {
		this.interfaceTool.updateMicroformatsTreeView(this);
	},
	/*-----------------------------------------------
		Import & Export methods
	-----------------------------------------------*/
	importMicroformatsTypes: function() {
		var adoptedMicroformatsFilePath = serverAddress + adoptedMicroformatsXmlFileLocation;
		var proposedMicroformatsFilePath = serverAddress + proposedMicroformatsXmlFileLocation;
		this.importMicroformatsType('adopted',adoptedMicroformatsFilePath);
		this.importMicroformatsType('proposed',proposedMicroformatsFilePath);
	},
	importMicroformatsType: function(microformatsType,microformatsFilePath) {
		var xmlDoc = this.utilityTool.loadXMLDoc(microformatsFilePath);
		if(microformatsType == 'proposed')
			this.setProposedMicroformatsXmlDoc(xmlDoc);
		else
			this.setAdoptedMicroformatsXmlDoc(xmlDoc);
		if(xmlDoc != null) {
			var microformatsDocElements = xmlDoc.getElementsByTagName('microformat');
			for (var i = 0; i < microformatsDocElements.length; i++) {
				var currentMicroformatDocElement = microformatsDocElements[i];
				var currentMicroformatName = currentMicroformatDocElement.getAttribute('formatname');
				var newMicroformat = null;
				if(microformatsType == 'proposed')
					newMicroformat = this.addProposedMicroformat(currentMicroformatName);
				else
					newMicroformat = this.addAdoptedMicroformat(currentMicroformatName);
				var microformatGroupsDocElements = currentMicroformatDocElement.getElementsByTagName('microformatgroup');
				for (var j = 0; j < microformatGroupsDocElements.length; j++) {
					var currentMicroformatGroupDocElement = microformatGroupsDocElements[j];
					var newMicroformatGroup = newMicroformat.addMicroformatGroup(currentMicroformatGroupDocElement.getAttribute('name'),
																				 currentMicroformatGroupDocElement.getAttribute('mandatory'));
					var atomicMicroformatDocElements = currentMicroformatGroupDocElement.getElementsByTagName('microformatcomponent');
					for (var k = 0; k < atomicMicroformatDocElements.length; k++) {
						var currentAtomicMicroformatDocElement = atomicMicroformatDocElements[k];
						var newAtomicMicroformat = newMicroformatGroup.addAtomicMicroformat(currentAtomicMicroformatDocElement.getAttribute('name'),
																							currentAtomicMicroformatDocElement.getAttribute('description'),
																							currentAtomicMicroformatDocElement.getAttribute('mandatory'),
																							currentAtomicMicroformatDocElement.getAttribute('class'),
																							currentAtomicMicroformatDocElement.getAttribute('subclass'),
																							currentAtomicMicroformatDocElement.getAttribute('subclassattribute'));
						
					}
				}
			}
		}
	},
	export: function() {
		
	},
	getXml: function() {
		
	},
	getJson: function() {
		
	},
	/*-----------------------------------------------
		Getters & Setters
	-----------------------------------------------*/
	getPersonalSpace: function() {
		return this.personalSpace;
	},
	setPersonalSpace: function(personalSpace) {
		this.personalSpace = personalSpace;
	},
	getMicroformats: function() {
		return this.microformats;
	},
	setMicroformats: function(microformats) {
		this.microformats = microformats;
	},
	getAdoptedMicroformats: function() {
		return this.adoptedMicroformats;
	},
	setAdoptedMicroformats: function(adoptedMicroformats) {
		this.adoptedMicroformats = adoptedMicroformats;
	},
	getProposedMicroformats: function() {
		return this.proposedMicroformats;
	},
	setProposedMicroformats: function(proposedMicroformats) {
		this.proposedMicroformats = proposedMicroformats;
	},
	getAdoptedMicroformatsXmlDoc: function() {
		return this.adoptedMicroformatsXmlDoc;
	},
	setAdoptedMicroformatsXmlDoc: function(adoptedMicroformatsXmlDoc) {
		this.adoptedMicroformatsXmlDoc = adoptedMicroformatsXmlDoc;
	},
	getProposedMicroformatsXmlDoc: function() {
		return this.proposedMicroformatsXmlDoc;
	},
	setProposedMicroformatsXmlDoc: function(proposedMicroformatsXmlDoc) {
		this.proposedMicroformatsXmlDoc = proposedMicroformatsXmlDoc;
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