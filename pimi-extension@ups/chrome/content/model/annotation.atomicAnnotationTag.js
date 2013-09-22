/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AtomicAnnotationTag
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AtomicAnnotationTag(id,value,description,semanticType,annotationType) {
	this.id = id;
    this.value = value;
    this.description = description;
    this.semanticType = semanticType;
    this.annotationType = annotationType;
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
AtomicAnnotationTag.prototype = {
	/*-----------------------------------------------
		View
	-----------------------------------------------*/
	getView: function() {
		
	},
	/*-----------------------------------------------
		Export
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
    getValue: function() {
		return this.value;
	},
	setValue: function(value) {
		this.value = value;
	},
	getDescription: function() {
		return this.description;
	},
	setDescription: function(description) {
		this.description = description;
	},
	getSemanticType: function() {
		return this.semanticType;
	},
	getAnnotationType: function() {
		return this.annotationType;
	}
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AtomicPersonalTag extends AtomicAnnotationTag
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AtomicPersonalTag(id,value,description,annotationType) {
	this.id = id;
    this.value = value;
    this.description = description;
    this.semanticType = "personal";
    this.annotationType =annotationType;
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
AtomicPersonalTag.prototype = Object.create(AtomicAnnotationTag.prototype);
/*-----------------------------------------------
	Setter
-----------------------------------------------*/
AtomicPersonalTag.prototype.setAnnotationType = function(annotationType) {
	this.annotationType = annotationType;
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AtomicMicroformatTag extends AtomicAnnotationTag
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AtomicMicroformatTag(id,value,description,atomicMicroformat) {
	this.id = id;
    this.value = value;
    this.description = description;
    this.atomicMicroformat = atomicMicroformat;
    this.semanticType = "microformat";
    this.annotationType = atomicMicroformat.getSubClassAttributeValue();
}
/*-----------------------------------------------
	Inheritance
-----------------------------------------------*/
AtomicMicroformatTag.prototype = Object.create(AtomicAnnotationTag.prototype);
/*-----------------------------------------------
	Getter & Setter
-----------------------------------------------*/
AtomicMicroformatTag.prototype.getAtomicMicroformat = function() {
	return this.atomicMicroformat;
}
AtomicMicroformatTag.prototype.setAtomicMicroformat = function(atomicMicroformat) {
	this.atomicMicroformat = atomicMicroformat;
}