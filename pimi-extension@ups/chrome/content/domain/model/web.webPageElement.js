/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
WebPageElement
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function WebPageElement(id,type,classTag,relTag,typeTag,valueTag,style,innerHtml) {
	this.id = id;
	this.type = type;
    this.classTag = classTag;
    this.relTag = relTag;
    this.typeTag = typeTag;
    this.valueTag = valueTag;
    this.style = style;
    this.innerHtml = innerHtml;
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
WebPageElement.prototype = {
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
    getClassTag: function() {
		return this.classTag;
	},
	setClassTag: function(classTag) {
		this.classTag = classTag;
	},
	getRelTag: function() {
		return this.relTag;
	},
	setRelTag: function(relTag) {
		this.relTag = relTag;
	},
	getTypeTag: function() {
		return this.typeTag;
	},
	setTypeTag: function(typeTag) {
		this.typeTag = typeTag;
	},
	getValueTag: function() {
		return this.valueTag;
	},
	setValueTag: function(valueTag) {
		this.valueTag = valueTag;
	},
	getStyle: function() {
		return this.style;
	},
	setStyle: function(style) {
		this.style = style;
	},
	getInnerHtml: function() {
		return this.innerHtml;
	},
	setInnerHtml: function(innerHtml) {
		this.innerHtml = innerHtml;
	}
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
WebPageField extends WebPageElement
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function WebPageField(id,classTag,relTag,typeTag,valueTag,style,innerHtml) {
	this.id = id;
	this.type = "field";
    this.classTag = classTag;
    this.relTag = relTag;
    this.typeTag = typeTag;
    this.valueTag = valueTag;
    this.style = style;
    this.innerHtml = innerHtml;
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
WebPageField.prototype = Object.create(WebPageElement.prototype);

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
WebPageTextField extends WebPageField
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function WebPageTextField(id,classTag,relTag,typeTag,valueTag,style,innerHtml) {
	this.id = id;
	this.type = "textField";
    this.classTag = classTag;
    this.relTag = relTag;
    this.typeTag = typeTag;
    this.valueTag = valueTag;
    this.style = style;
    this.innerHtml = innerHtml;
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
WebPageTextField.prototype = Object.create(WebPageField.prototype);