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
		this.enableDisableConnexionButton(true);
    	/************** TO WORK ONLINE **************/
		this.sendAccountConnexionRequest('Jean', 'jean');
    	/************** TO WORK IN LOCAL **************/
		//this.connectPimiUser('Jean','16cdf1v6f5d4vdf');
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
	/*-----------------------------------------------
		Account methods
	-----------------------------------------------*/
	keyPressCreate: function(event) {
		//event = event || window.event;
		/*switch (event.keyCode) {
			//Enter
			case 13:
				this.createPimiAccount();
				break;
			default: break;
		}*/
	},
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
	createPimiAccount: function() {
		/*var userEmailAddressInput = this.pluginContext.getElementById('account_creation_email');
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
		this.pluginContext.getElementById('account_creation_create_button').setAttribute('disabled', 'true');
		userEmailAddressStr = userEmailAddressStr.replace(/&/g, '');
		userNameStr = userNameStr.replace(/&/g, '');
		userPasswordStr = userPasswordStr.replace(/&/g, '');
		sendAccountCreationRequest(userEmailAddressStr, userNameStr, userPasswordStr);*/
	},
	sendAccountCreationRequest: function(emailAddress, name, password) {
		/*var params = 'emailAddress=' + emailAddress + '&userName=' + name + '&password=' + password;
		var url = serverAddress + usersCreateUrl;
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
						alert(serverResponse);
						switchToPimiAccountCreation();
						this.pluginContext.getElementById('account_connexion_user_name').value = name;
						this.pluginContext.getElementById('account_connexion_password').value = password;
						alert(userAccountCreationResultMessage);
					}
					else {
						alert(serverResponse);
						this.pluginContext.getElementById('account_creation_create_button').setAttribute('disabled', 'false');
					}
				}
				else {
					alert(userAccountCreationErrorMessage);
					this.pluginContext.getElementById('account_creation_create_button').setAttribute('disabled', 'false');
				}
			}
		};
		httpRequest.send(params);*/
	},
	switchToPimiAccountCreation: function() {
		var accountConnexionForm = this.pluginContext.getElementById(ACCOUNT_SIGNIN_PANEL_ID);
		var accountCreationForm = this.pluginContext.getElementById(ACCOUNT_SIGNUP_PANEL_ID);
		if(accountConnexionForm.style.display == 'none') {
			accountConnexionForm.style.display = 'block';
			accountCreationForm.style.display = 'none';
		}
		else {
			accountConnexionForm.style.display = 'none';
			accountCreationForm.style.display = 'block';
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
		this.enableDisableConnexionButton(true);
		this.sendAccountConnexionRequest(userNameStr, userPasswordStr);
	},
	sendAccountConnexionRequest: function(userName, password) {
		var obj = this;
		var params = 'userName=' + userName +
					 '&password=' + password;
		var url = serverAddress + usersConnectUrl;
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
						var sessionToken = response.substring((response.indexOf('{') + 1), response.indexOf('}'));
						obj.connectPimiUser(userName, sessionToken);
					}
					else {
						alert(serverResponse);
						this.enableDisableConnexionButton(false);
					}
				}
				else {
					alert(userAccountConnexionErrorMessage);
					this.enableDisableConnexionButton(false);
				}
			}
		};
		httpRequest.send(params);
	},
	connectPimiUser: function(userName, sessionToken) {
		var user = new User(this.getUniqueRandomId(20),
							'user',
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
	enableDisableConnexionButton: function(enable){
		this.interfaceTool.enableDisableConnexionButton(enable);
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