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
				this.connectPimiAccount();
				break;
			default: break;
		}
	},
	keyPressCreate: function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			//Enter
			case 13:
				this.createPimiAccount();
				break;
			default: break;
		}
	},
	connectPimiAccount: function() {
		var userNameInput = this.pluginContext.getElementById(ACCOUNT_SIGNIN_USERNAME_FIELD_ID);
		var userNameStr = userNameInput.value;
		var userPasswordInput = this.pluginContext.getElementById(ACCOUNT_SIGNIN_PASSWORD_FIELD_ID);
		var userPasswordStr = userPasswordInput.value;
		var verif = /^\s*$/.exec(userNameStr);
		if(verif != null) {
			alert(userAccountConnexionMissingUserNameWarningMessage);
			userNameInput.value = "";
			userNameInput.focus();
			return;
		}
		verif = /^\s*$/.exec(userPasswordStr);
		if(verif != null) {
			alert(userAccountConnexionMissingPasswordWarningMessage);
			userPasswordInput.value = "";
			userPasswordInput.focus();
			return;
		}
		this.enableDisableAccountPanelButtons(false);
		this.sendAccountConnexionRequest(userNameStr, userPasswordStr);
	},
	createPimiAccount: function() {
		var userEmailAddressInput = this.pluginContext.getElementById('account_creation_email');
		var userEmailAddressStr = userEmailAddressInput.value;
		var userNameInput = this.pluginContext.getElementById('account_creation_user_name');
		var userNameStr = userNameInput.value;
		var userPasswordInput = this.pluginContext.getElementById('account_creation_password');
		var userPasswordStr = userPasswordInput.value;
		var userPasswordRepeatedInput = this.pluginContext.getElementById('account_creation_repeat_password');
		var userPasswordRepeatedStr = userPasswordRepeatedInput.value;
		var verif = /^\s*$/.exec(userEmailAddressStr);
		if(verif != null) {
			alert(userAccountCreationMissingEmailAddressWarningMessage);
			userEmailAddressInput.value = '';
			userEmailAddressInput.focus();
			return;
		}
		verif = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.exec(userEmailAddressStr);
		if(verif == null) {
			alert(userAccountCreationInvalidEmailAddressWarningMessage);
			userEmailAddressInput.focus();
			return;
		}
		verif = /^\s*$/.exec(userNameStr);
		if(verif != null) {
			alert(userAccountCreationMissingUserNameWarningMessage);
			userNameInput.value = '';
			userNameInput.focus();
			return;
		}
		if(userNameStr.length < 6) {
			alert(userAccountCreationInvalidUserNameWarningMessage);
			userNameInput.focus();
			return;
		}
		verif = /^\s*$/.exec(userPasswordStr);
		if(verif != null) {
			alert(userAccountCreationMissingPasswordWarningMessage);
			userPasswordInput.value = '';
			userPasswordInput.focus();
			return;
		}
		if(userPasswordStr.length < 6) {
			alert(userAccountCreationInvalidPasswordWarningMessage);
			userPasswordInput.focus();
			return;
		}
		verif = /^\s*$/.exec(userPasswordRepeatedStr);
		if(verif != null) {
			alert(userAccountCreationMissingRepeatedPasswordWarningMessage);
			userPasswordRepeatedInput.value = '';
			userPasswordRepeatedInput.focus();
			return;
		}
		if(userPasswordStr != userPasswordRepeatedStr) {
			alert(userAccountCreationInvalidRepeatedPasswordWarningMessage);
			userPasswordRepeatedInput.value = '';
			userPasswordRepeatedInput.focus();
			return;
		}
		this.enableDisableAccountPanelButtons(false);
		userEmailAddressStr = userEmailAddressStr.replace(/&/g, '');
		userNameStr = userNameStr.replace(/&/g, '');
		userPasswordStr = userPasswordStr.replace(/&/g, '');
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
		this.showHideAccountPanel(false);
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
							obj.showHideAccountPanel(true);
							obj.setUserConnected(false);
							obj.setPersonalSpace(null);
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
	showHideAccountPanel: function(show){
		this.interfaceTool.showHideAccountPanel(show);
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