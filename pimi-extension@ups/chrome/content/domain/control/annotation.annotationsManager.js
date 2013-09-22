/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AnnotationsManager
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AnnotationsManager(personalSpace) {
    this.personalSpace = personalSpace;
    this.atomicAnnotationTags = [];
    this.webPageAnnotations = [];
	this.pluginContext = personalSpace.getPluginContext();
    this.webPageDomContext = personalSpace.getWebPageDomContext();
    this.webPageJsContext = personalSpace.getWebPageJsContext();
    this.interfaceTool = personalSpace.getInterfaceTool();
	this.utilityTool = personalSpace.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
AnnotationsManager.prototype = {
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
		
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		return this.getPanelView();
	},
	getPanelView: function() {
		return this.interfaceTool.getAnnotationsPanelView(this);
	},
	updateView: function() {
		this.updatePanelView();
	},
	updatePanelView: function() {
		this.interfaceTool.updateAnnotationsPanelView(this);
	},
	/*-----------------------------------------------
		Event methods
	-----------------------------------------------*/
	doFocusPersonalAnnotationTextbox: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		var textbox = this.interfaceTool.getPersonalAnnotationTextboxDom();
		if(textbox.value == annotationPersonalAnnotationTextboxDefaultValue) {
			textbox.style.color = annotationTextboxFocusColor;
			textbox.style.fontStyle = annotationTextboxFocusFontStyle;
			textbox.style.fontSize = annotationTextboxFocusFontSize;
			textbox.value = '';
		}
	},
	doBlurPersonalAnnotationTextbox: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		var textbox = this.interfaceTool.getPersonalAnnotationTextboxDom();
		if(textbox.value.isEmpty()) {
			textbox.style.color = annotationTextboxBlurColor;
			textbox.style.fontStyle = annotationTextboxBlurFontStyle;
			textbox.style.fontSize = annotationTextboxBlurFontSize;
			textbox.value = annotationPersonalAnnotationTextboxDefaultValue;
		}
	},
	doFocusAnnotationDescriptionTextbox: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		var textbox = this.interfaceTool.getAnnotationDescriptionTextboxDom();
		if(textbox.value == annotationDescriptionAnnotationTextboxDefaultValue) {
			textbox.style.color = annotationTextboxFocusColor;
			textbox.style.fontStyle = annotationTextboxFocusFontStyle;
			textbox.style.fontSize = annotationTextboxFocusFontSize;
			textbox.value = '';
		}
	},
	doBlurAnnotationDescriptionTextbox: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		var textbox = this.interfaceTool.getAnnotationDescriptionTextboxDom();
		if(textbox.value.isEmpty()) {
			textbox.style.color = annotationTextboxBlurColor;
			textbox.style.fontStyle = annotationTextboxBlurFontStyle;
			textbox.style.fontSize = annotationTextboxBlurFontSize;
			textbox.value = annotationDescriptionAnnotationTextboxDefaultValue;
		}
	},
	/*-----------------------------------------------
		Import & Export methods
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
	getPersonalSpace: function() {
		return this.personalSpace;
	},
	setPersonalSpace: function(personalSpace) {
		this.personalSpace = personalSpace;
	},
	getAtomicAnnotationTags: function() {
		return this.atomicAnnotationTags;
	},
	setAtomicAnnotationTags: function(atomicAnnotationTags) {
		this.atomicAnnotationTags = atomicAnnotationTags;
	},
	getWebPageAnnotations: function() {
		return this.webPageAnnotations;
	},
	setWebPageAnnotations: function(webPageAnnotations) {
		this.webPageAnnotations = webPageAnnotations;
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