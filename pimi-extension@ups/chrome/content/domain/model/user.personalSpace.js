/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PersonalSpace
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PersonalSpace(id,name,user,generalSpace) {
	this.id = id;
    this.name = name;
	this.user = user;
	this.generalSpace = generalSpace;
	this.pluginContext = generalSpace.getPluginContext();
    this.webPageDomContext = generalSpace.getWebPageDomContext();
    this.webPageJsContext = generalSpace.getWebPageJsContext();
    this.interfaceTool = generalSpace.getInterfaceTool();
	this.utilityTool = generalSpace.getUtilityTool();
	this.userManager = new UserManager(this);
	this.pimsManager = new PimsManager(this);
	this.annotationsManager = new AnnotationsManager(this);
	this.microformatsManager = new MicroformatsManager(this);
	this.completionsManager = new CompletionsManager(this);
	this.webPagesManager = new WebPagesManager(this);
	this.configurationManager = new ConfigurationManager(this);
	this.unsavedPims = false;
	this.savingPims = false;
	this.autoSave = false;
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
PersonalSpace.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
    init: function() {
    	this.load();
		//this.enablePimsCompletion();
		//this.enableInputsSemanticDetection();
    	/************** TO WORK IN LOCAL --> TO DELETE !!!! **************/
		/*var pimsXmlDoc = this.utilityTool.loadXMLDoc('data/pims/pimsTestFile.xml');
		this.pimsManager.import(pimsXmlDoc);
    	this.createView();*/
		/*****************************************************************/
	},
    exit: function() {
    	this.generalSpace.exit();
	},
	getUniqueRandomId: function(intLength) {
		return this.generalSpace.getUniqueRandomId(intLength);
	},
	isBusy: function() {
		return this.savingPims;
	},
	isIdle: function() {
		return !this.isBusy();
	},
	isDirty: function() {
		return this.unsavedPims;
	},
	isClean: function() {
		return !this.isDirty();
	},
	setBusy: function() {
		this.savingPims = true;
		this.pimsManager.updateSavedLabelView();
	},
	setIdle: function() {
		this.savingPims = false;
		this.pimsManager.updateSavedLabelView();
	},
	setDirty: function() {
		this.unsavedPims = true;
		this.pimsManager.updateSavedLabelView();
		if(this.autoSave)
			this.save();
	},
	setClean: function() {
		this.unsavedPims = false;
		this.pimsManager.updateSavedLabelView();
	},
	setAutoSaveMode: function(activateAutoSave) {
		this.autoSave = activateAutoSave;
		if(activateAutoSave && this.isDirty())
			this.save();
		this.pimsManager.updateSavedLabelView();
	},
    showPimiHome: function() {
        this.generalSpace.showPimiHome();
    },
    showMicroformatsFiles: function() {
        this.generalSpace.showMicroformatsFiles();
    },
    showAnnotationsFiles: function() {
        this.generalSpace.showAnnotationsFiles();
    },
    showPersonalPims: function() {
        this.webPageJsContext.location = serverAddress + pimisShowUrl +
        								 '?userName=' + this.user.getUserName() +
        								 '&sessionToken=' + this.user.getSessionToken();
    },
	load: function() {
		var obj = this;
		var url = serverAddress + pimisGetUrl;
		var params = 'userName=' + this.user.getUserName() +
					 '&sessionToken=' + this.user.getSessionToken();
		var httpRequest = this.utilityTool.createPostHttpRequest(url,params);
		var response = 'aucune';
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) {
					response = httpRequest.responseText;
					var serverAccept = parseInt(response.substring((response.indexOf('[') + 1), response.indexOf(']')));
					var serverResponse = response.substring(response.indexOf(']') + 1);
					if(serverResponse.indexOf('..') == 0)
						serverResponse = serverResponse.substring(2);
					if(serverAccept == 0) {
						var pimsXmlDoc = null;
						var personalPimsFilePath = serverAddress + serverResponse;
						if(personalPimsFilePath != '')
							pimsXmlDoc = obj.getUtilityTool().loadXMLDoc(personalPimsFilePath);
						if(pimsXmlDoc != null) {
							obj.getPimsManager().import(pimsXmlDoc);
							obj.getMicroformatsManager().init();
							obj.getConfigurationManager().init();
					    	obj.createView();
    						obj.selectSideBarMenu('pims');
							//obj.addLogConsoleMessage(userAccountConnexionWelcomeMessage);
							//obj.addLogConsoleMessage(userAccountConnexionResultMessage);
						}
					}
					else
						alert(serverResponse);
				}
				else
					alert(pimsLoadProblemMessage);
			}
		};
		httpRequest.send(params);
	},
	save: function() {
		//if(confirm(pimsSaveConfirmationMessage)) {
			if(this.isIdle()) {
				this.setBusy();
				var obj = this;
				var pimsXmlDoc = this.export();
				var url = serverAddress + pimisUpdateUrl;
				var params = 'userName=' + this.user.getUserName() +
						 	 '&sessionToken=' + this.user.getSessionToken() +
						 	 '&xmldoc=' + this.utilityTool.XMLToString(pimsXmlDoc);
				var httpRequest = this.utilityTool.createPostHttpRequest(url,params);
				var response = 'aucune';
				httpRequest.onreadystatechange = function() { 
					if (httpRequest.readyState == 4) {
						if (httpRequest.status == 200) {
							response = httpRequest.responseText;
							var serverAccept = parseInt(response.substring((response.indexOf('[') + 1), response.indexOf(']')));
							var serverResponse = response.substring(response.indexOf(']') + 1);
							//obj.addLogConsoleMessage(serverResponse);
							obj.setClean();
							obj.setIdle();
						}
						else
							alert(pimsSaveProblemMessage);
					}
				};
				httpRequest.send(params);
			}
			else
				setTimeout(this.save, 1000);
		//}
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	createView: function() {
		this.createPanelsView();
	},
	createPanelsView: function() {
        this.interfaceTool.createPanelsView(this);
    },
    deletePanelsView: function() {
        this.interfaceTool.deletePanelsView(this);
    },
	selectSideBarMenu: function(panelName){
		this.interfaceTool.selectPanel(panelName);
	},
	addLogConsoleMessage: function(message) {
		
	},
	/*-----------------------------------------------
		Export methods
	-----------------------------------------------*/
	export: function() {
		return this.pimsManager.export();
	},
	getXml: function() {
		return this.pimsManager.getXml();
	},
	getJson: function() {
		return this.pimsManager.getJson();
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
	getUser: function() {
		return this.user;
	},
	setUser: function(user) {
		this.user = user;
	},
	getGeneralSpace: function() {
		return this.generalSpace;
	},
	setGeneralSpace: function(generalSpace) {
		this.generalSpace = generalSpace;
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
	},
	getUserManager: function() {
		return this.userManager;
	},
	setUserManager: function(userManager) {
		this.userManager = userManager;
	},
	getPimsManager: function() {
		return this.pimsManager;
	},
	setPimsManager: function(pimsManager) {
		this.pimsManager = pimsManager;
	},
	getAnnotationsManager: function() {
		return this.annotationsManager;
	},
	setAnnotationsManager: function(annotationsManager) {
		this.annotationsManager = annotationsManager;
	},
	getMicroformatsManager: function() {
		return this.microformatsManager;
	},
	setMicroformatsManager: function(microformatsManager) {
		this.microformatsManager = microformatsManager;
	},
	getCompletionsManager: function() {
		return this.completionsManager;
	},
	setCompletionsManager: function(completionsManager) {
		this.completionsManager = completionsManager;
	},
	getWebPagesManager: function() {
		return this.webPagesManager;
	},
	setWebPagesManager: function(webPagesManager) {
		this.webPagesManager = webPagesManager;
	},
	getConfigurationManager: function() {
		return this.configurationManager;
	},
	setConfigurationManager: function(configurationManager) {
		this.configurationManager = configurationManager;
	},
	getUnsavedPims: function() {
		return this.unsavedPims;
	},
	setUnsavedPims: function(unsavedPims) {
		this.unsavedPims = unsavedPims;
	},
	getSavingPims: function() {
		return this.savingPims;
	},
	setSavingPims: function(savingPims) {
		this.savingPims = savingPims;
	},
	getAutoSave: function() {
		return this.autoSave;
	},
	setAutoSave: function(autoSave) {
		this.autoSave = autoSave;
	}
}