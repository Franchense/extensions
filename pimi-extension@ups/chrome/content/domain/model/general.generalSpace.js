/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
GeneralSpace
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function GeneralSpace(id,name,pluginContext,webPageDomContext,webPageJsContext,interfaceTool) {
	this.id = id;
    this.name = name;
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.interfaceTool = interfaceTool;
    this.utilityTool = new UtilityTool();
    this.userConnected = false;
    this.personalSpace = null;
    this.objectsIdArray = new Array();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
GeneralSpace.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	init: function() {
		this.createView();
		/*************************************************************************************
								AUTOLOG --> TO DELETE
		*************************************************************************************/
		//this.enableDisableAccountPanelButtons(false);
    	/************** TO WORK ONLINE **************/
		//this.sendAccountConnexionRequest('Jean', 'jean');
		//this.sendAccountConnexionRequest('Vincent', 'vins');
    	/************** TO WORK IN LOCAL **************/
		//this.connectPimiUser('Jean','16cdf1v6f5d4vdf', regularUserTypeName);
		/*************************************************************************************
		*************************************************************************************/
	},
	exit: function() {
		//disablePimsCompletion();
		//disableInputsSemanticDetection();
		//disableFormGroupsSave();
		this.disconnectPimiUser();
	},
	getUniqueRandomId: function(intLength) {
		var newId = this.utilityTool.getRandomId(intLength);
		while(this.objectsIdArray.contains(newId))
			newId = this.utilityTool.getRandomId(intLength);
		this.objectsIdArray.push(newId);
		return newId;
	},
	clearObjectsIdArray: function() {
		this.objectsIdArray = new Array();
	},
    showPimiHome: function() {
        this.webPageJsContext.location = serverAddress + piaffHomeUrl;
    },
    showMicroformatsFiles: function() {
        this.webPageJsContext.location = serverAddress + microformatsGetUrl;
    },
    showAnnotationsFiles: function() {
        this.webPageJsContext.location = serverAddress + annotationsGetUrl;
    },
	/*-----------------------------------------------
		Account methods
	-----------------------------------------------*/
	keyPressConnect: function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			//Enter
			case 13:
				this.interfaceTool.connectPimiAccount(this);
				break;
			default: break;
		}
	},
	keyPressCreate: function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			//Enter
			case 13:
				this.interfaceTool.createPimiAccount(this);
				break;
			default: break;
		}
	},
	connectPimiAccount: function(userName,userPassword) {
		var verif = /^\s*$/.exec(userName);
		if(verif != null) {
			alert(userAccountConnexionMissingUserNameWarningMessage);
			this.interfaceTool.connexionUserNameFieldFocus(true);
			return;
		}
		verif = /^\s*$/.exec(userPassword);
		if(verif != null) {
			alert(userAccountConnexionMissingPasswordWarningMessage);
			this.interfaceTool.connexionPasswordFieldFocus(true);
			return;
		}
		this.enableDisableAccountPanelButtons(false);
		this.sendAccountConnexionRequest(userName, userPassword);
	},
	createPimiAccount: function(userEmailAddress,userName,userPassword,userRepeatedPassword) {
		var verif = /^\s*$/.exec(userEmailAddress);
		if(verif != null) {
			alert(userAccountCreationMissingEmailAddressWarningMessage);
			this.interfaceTool.creationEmailAddressFieldFocus(true);
			return;
		}
		verif = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.exec(userEmailAddress);
		if(verif == null) {
			alert(userAccountCreationInvalidEmailAddressWarningMessage);
			this.interfaceTool.creationEmailAddressFieldFocus(false);
			return;
		}
		verif = /^\s*$/.exec(userName);
		if(verif != null) {
			alert(userAccountCreationMissingUserNameWarningMessage);
			this.interfaceTool.creationUserNameFieldFocus(true);
			return;
		}
		if(userName.length < 6) {
			alert(userAccountCreationInvalidUserNameWarningMessage);
			this.interfaceTool.creationUserNameFieldFocus(false);
			return;
		}
		verif = /^\s*$/.exec(userPassword);
		if(verif != null) {
			alert(userAccountCreationMissingPasswordWarningMessage);
			this.interfaceTool.creationPasswordFieldFocus(true);
			return;
		}
		if(userPassword.length < 6) {
			alert(userAccountCreationInvalidPasswordWarningMessage);
			this.interfaceTool.creationPasswordFieldFocus(false);
			return;
		}
		verif = /^\s*$/.exec(userRepeatedPassword);
		if(verif != null) {
			alert(userAccountCreationMissingRepeatedPasswordWarningMessage);
			this.interfaceTool.creationRepeatPasswordFieldFocus(true);
			return;
		}
		if(userPassword != userRepeatedPassword) {
			alert(userAccountCreationInvalidRepeatedPasswordWarningMessage);
			this.interfaceTool.creationRepeatPasswordFieldFocus(true);
			return;
		}
		this.enableDisableAccountPanelButtons(false);
		var userEmailAddressStr = userEmailAddress.replace(/&/g, '');
		var userNameStr = userName.replace(/&/g, '');
		var userPasswordStr = userPassword.replace(/&/g, '');
		this.sendAccountCreationRequest(userEmailAddressStr, userNameStr, userPasswordStr);
	},
	sendAccountConnexionRequest: function(userName, password) {
		var obj = this;
		var url = serverAddress + usersConnectUrl;
		var params = 'userName=' + userName +
					 '&password=' + password;
		var httpRequest = this.utilityTool.createPostHttpRequest(url,params);
		var response = 'aucune';
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) {
					response = httpRequest.responseText;
					var serverAccept = parseInt(response.substring((response.indexOf('[') + 1), response.indexOf(']')));
					var serverResponse = response.substring(response.indexOf(']') + 1);
					if(serverAccept == 0) {
						var userData = response.substring((response.indexOf('{') + 1), response.indexOf('}'));
						var separatorIndex = userData.indexOf('//');
						var sessionToken = userData.substring(0, separatorIndex);
						var annotator = userData.substring(separatorIndex + 2);
						if(annotator == '0')
							userType = regularUserTypeName;
						else
							userType = annotatorUserTypeName;
						obj.connectPimiUser(userName, sessionToken, userType);
					}
					else {
						alert(serverResponse);
						this.enableDisableAccountPanelButtons(true);
					}
				}
				else {
					alert(userAccountConnexionErrorMessage);
					this.enableDisableAccountPanelButtons(true);
				}
			}
		};
		httpRequest.send(params);
	},
	sendAccountCreationRequest: function(emailAddress, name, password) {
		var obj = this;
		var url = serverAddress + usersCreateUrl;
		var params = 'emailAddress=' + emailAddress +
					 '&userName=' + name +
					 '&password=' + password;
		var httpRequest = this.utilityTool.createPostHttpRequest(url,params);
		var response = 'aucune';
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) {
					response = httpRequest.responseText;
					var serverAccept = parseInt(response.substring((response.indexOf('[') + 1),
																	response.indexOf(']')));
					var serverResponse = response.substring(response.indexOf(']') + 1);
					if(serverAccept == 0) {
						alert(serverResponse);
						obj.switchAccountPanels();
						obj.pluginContext.getElementById('account_connexion_user_name').value = name;
						obj.pluginContext.getElementById('account_connexion_password').value = password;
						alert(userAccountCreationResultMessage);
					}
					else {
						alert(serverResponse);
						obj.pluginContext.getElementById('account_creation_create_button').setAttribute('disabled', 'false');
					}
				}
				else {
					alert(userAccountCreationErrorMessage);
					obj.pluginContext.getElementById('account_creation_create_button').setAttribute('disabled', 'false');
				}
			}
		};
		httpRequest.send(params);
	},
	connectPimiUser: function(userName, sessionToken, userType) {
		var user = new User(this.getUniqueRandomId(20),
							userType,
							userName,
							sessionToken);
		var personalSpace = new PersonalSpace(this.getUniqueRandomId(20),
											  'My personal space',
											  user,
											  this);
		this.deleteAccountPanel();
		this.setUserConnected(true);
		this.setPersonalSpace(personalSpace);
		personalSpace.init();
	},
	disconnectPimiUser: function() {
		var obj = this;
		var logOut = true;
		if(this.personalSpace.isDirty())
			logOut = confirm(userAccountDeconnexionPimsUnsavedWarningMessage);
		if(logOut) {
			var params = 'userName=' + this.personalSpace.getUser().getUserName() +
					 	 '&sessionToken=' + this.personalSpace.getUser().getSessionToken();
			var url = serverAddress + usersDisconnectUrl;
			var response = 'aucune';
			var httpRequest = this.utilityTool.initHttpRequest();
			httpRequest.open('POST', url, true);
			httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			httpRequest.setRequestHeader("Content-length", params.length);
			httpRequest.setRequestHeader("Connection", "close");
			httpRequest.onreadystatechange = function() {
				if (httpRequest.readyState == 4) {
					if (httpRequest.status == 200) {
						response = httpRequest.responseText;
						var serverAccept = parseInt(response.substring((response.indexOf('[') + 1), response.indexOf(']')));
						var serverResponse = response.substring(response.indexOf(']') + 1);
						if(serverAccept == 0) {
							obj.clearObjectsIdArray();
							obj.personalSpace.deletePanelsView();
							obj.setUserConnected(false);
							obj.setPersonalSpace(null);
							obj.createView();
							obj.enableDisableAccountPanelButtons(true);
						}
						else {
							alert(serverResponse);
						}
					}
					else {
						alert(userAccountConnexionErrorMessage);
					}
				}
			};
			httpRequest.send(params);
		}
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	createView: function() {
		this.createAccountPanelsView();
	},
	createAccountPanelsView: function() {
		this.interfaceTool.createAccountPanelsView(this);
	},
    deleteAccountPanel: function(){
        this.interfaceTool.deleteAccountPanel();
    },
	switchAccountPanels: function() {
		this.interfaceTool.switchAccountPanels(this);
	},
	enableDisableAccountPanelButtons: function(enable){
		this.interfaceTool.enableDisableAccountPanelButtons(enable);
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
	getUserConnected: function() {
		return this.userConnected;
	},
	setUserConnected: function(userConnected) {
		this.userConnected = userConnected;
	},
	getPersonalSpace: function() {
		return this.personalSpace;
	},
	setPersonalSpace: function(personalSpace) {
		this.personalSpace = personalSpace;
	},
	getObjectsIdArray: function() {
		return this.objectsIdArray;
	},
	setObjectsIdArray: function(objectsIdArray) {
		this.objectsIdArray = objectsIdArray;
	}
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
GeneralXulSpace extends GeneralSpace
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function GeneralXulSpace(id,name) {
	this.id = id;
    this.name = name;
    this.pluginContext = document;
    this.webPageDomContext = content.document;
    this.webPageJsContext = content.wrappedJSObject;
    this.interfaceTool = new XulInterfaceTool(document,content.document,content.wrappedJSObject);
    this.utilityTool = new UtilityTool();
    this.userConnected = false;
    this.personalSpace = null;
    this.objectsIdArray = new Array();
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
GeneralXulSpace.prototype = Object.create(GeneralSpace.prototype);

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
GeneralHtmlSpace extends GeneralSpace
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function GeneralHtmlSpace(id,name) {
	this.id = id;
    this.name = name;
    this.pluginContext = document;
    this.webPageDomContext = document;
    this.webPageJsContext = document;
    this.interfaceTool = new HtmlInterfaceTool(document,document,document);
    this.utilityTool = new UtilityTool();
    this.userConnected = false;
    this.personalSpace = null;
    this.objectsIdArray = new Array();
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
GeneralHtmlSpace.prototype = Object.create(GeneralSpace.prototype);