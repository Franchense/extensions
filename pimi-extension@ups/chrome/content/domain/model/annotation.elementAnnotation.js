/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
ElementAnnotation
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function ElementAnnotation(id,type,atomicAnnotationTag,webPageElement) {
	this.id = id;
	this.type = type;
	this.atomicAnnotationTag = atomicAnnotationTag;
	this.webPageElement = webPageElement;
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
ElementAnnotation.prototype = {
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
	getAtomicAnnotationTag: function() {
		return this.atomicAnnotationTag;
	},
	setAtomicAnnotationTag: function(atomicAnnotationTag) {
		this.atomicAnnotationTag = atomicAnnotationTag;
	},
	getWebPageElement: function() {
		return this.webPageElement;
	},
	setWebPageElement: function(webPageElement) {
		this.webPageElement = webPageElement;
	}
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
FieldAnnotation extends ElementAnnotation
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function FieldAnnotation(id,atomicAnnotationTag,fieldElement) {
	this.id = id;
	this.type = "field";
	this.atomicAnnotationTag = atomicAnnotationTag;
	this.webPageElement = fieldElement;
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
FieldAnnotation.prototype = Object.create(ElementAnnotation.prototype);

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
TextFieldAnnotation extends FieldAnnotation
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function TextFieldAnnotation(id,atomicAnnotationTag,textFieldElement) {
	this.id = id;
	this.type = "textField";
	this.atomicAnnotationTag = atomicAnnotationTag;
	this.webPageElement = textFieldElement;
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
TextFieldAnnotation.prototype = Object.create(FieldAnnotation.prototype);