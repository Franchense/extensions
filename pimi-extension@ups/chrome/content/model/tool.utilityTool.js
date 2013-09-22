/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Native objects modifications
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj)
            return true;
    }
    return false;
}
Array.prototype.remove = function(obj) {
    var index = this.indexOf(obj);
	this.splice(index,1);
}
String.prototype.capitalize = function() {
	return (this.substring(0,1).toUpperCase() + this.substring(1).toLowerCase());
}
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}
String.prototype.isEmpty = function() {
	return (this.trim() == '');
}
String.prototype.toBoolean = function() {
	if((this.trim() == 'true') || (this.trim() == '1'))
		return true;
	else
		return false;
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
UtilityTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function UtilityTool() {
	
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
UtilityTool.prototype = {
	/*-----------------------------------------------
		Methods
	-----------------------------------------------*/
	getRandomId: function(int_length) {
		var randomId = '';
		for (var i=0; i<int_length; i++) {
			if((i % 2) == 0)
				randomId += this.getRandomString(1,'lower');
			else
				randomId += this.getRandomInteger(1);
		}
		return randomId;
	},
	getRandomString: function(string_length, string_type) {
		var randomString = '';
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
		for (var i=0; i<string_length; i++) {
			var rNum = Math.floor(Math.random() * chars.length);
			randomString += chars.substring(rNum, rNum+1);
		}
		if(string_type == 'lower')
			randomString = randomString.toLowerCase();
		else if(string_type == 'upper')
			randomString = randomString.toUpperCase();
		return randomString;
	},
	getRandomInteger: function(int_length) {
		var randomStr = '';
		var numbers = '0123456789';
		for (var i=0; i<int_length; i++) {
			var rNum = Math.floor(Math.random() * numbers.length);
			randomStr += numbers.substring(rNum, rNum+1);
		}
		return parseInt(randomStr);
	},
	getRandomIntegerStr: function(int_length) {
		var randomStr = '';
		var numbers = '0123456789';
		for (var i=0; i<int_length; i++) {
			var rNum = Math.floor(Math.random() * numbers.length);
			randomStr += numbers.substring(rNum, rNum+1);
		}
		return randomStr;
	},
	initHttpRequest: function() {
		var httpRequest = false;
		if(window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
			if (httpRequest.overrideMimeType)
				httpRequest.overrideMimeType('text/xml');
		}
		else if(window.ActiveXObject) {
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) {}
			}
		}
		if(!httpRequest) {
			alert('Abandon : Impossible de créer une instance XMLHTTP');
			return false;
		}
		return httpRequest;
	},
	createXmlDoc: function() {
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		else {
			if(window.ActiveXObject) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) {
					return new ActiveXObject("Microsoft.XMLHTTP");
				}
			}
			else {
			   return false; 
			}
		}
	},
	loadXMLDoc: function(dname) {
		var xhttp = null;
		xhttp = this.createXmlDoc();
		xhttp.open("GET",dname,false);
		xhttp.send();
		return xhttp.responseXML;
	},
	XMLToString: function(oXML) {
		if(window.ActiveXObject)
			return oXML.xml;
		else
			return (new XMLSerializer()).serializeToString(oXML);
	},
	replaceAllSpaces: function(stringValue) {
		var newValue = stringValue;
		newValue = newValue.replace(/\s/g,'');
		return newValue;
	},
	replaceAllAccents: function(stringValue) {
		var newValue = stringValue;
		newValue = newValue.replace(/à/g,"a");
		newValue = newValue.replace(/â/g,"a");
		newValue = newValue.replace(/ä/g,"a");
		newValue = newValue.replace(/é/g,"e");
		newValue = newValue.replace(/è/g,"e");
		newValue = newValue.replace(/ê/g,"e");
		newValue = newValue.replace(/ë/g,"e");
		newValue = newValue.replace(/í/g,"i");
		newValue = newValue.replace(/ì/g,"i");
		newValue = newValue.replace(/î/g,"i");
		newValue = newValue.replace(/ï/g,"i");
		newValue = newValue.replace(/ó/g,"o");
		newValue = newValue.replace(/ò/g,"o");
		newValue = newValue.replace(/ô/g,"o");
		newValue = newValue.replace(/ö/g,"o");
		newValue = newValue.replace(/ù/g,"u");
		newValue = newValue.replace(/û/g,"u");
		newValue = newValue.replace(/ü/g,"u");
		newValue = newValue.replace(/ÿ/g,"y");
		newValue = newValue.replace(/ñ/g,"n");
		newValue = newValue.replace(/ç/g,"c");
		return newValue;
	}
}