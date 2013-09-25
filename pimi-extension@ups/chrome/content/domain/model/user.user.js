/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
User
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function User(id,type,userName,sessionToken) {
	this.id = id;
	this.type = type;
    this.userName = userName;
	this.sessionToken = sessionToken;
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
User.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	isUser: function() {
		return (this.type == regularUserTypeName);
	},
	isAnnotator: function() {
		return (this.type == annotatorUserTypeName);
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
	getType: function() {
		return this.type;
	},
	setType: function(type) {
		this.type = type;
	},
    getUserName: function() {
		return this.userName;
	},
	setUserName: function(userName) {
		this.userName = userName;
	},
	getSessionToken: function() {
		return this.sessionToken;
	},
	setSessionToken: function(sessionToken) {
		this.sessionToken = sessionToken;
	}
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Annotator extends User
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function Annotator(id,userName,sessionToken) {
	this.id = id;
	this.type = "annotator";
    this.userName = userName;
	this.sessionToken = sessionToken;
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
Annotator.prototype = Object.create(User.prototype);