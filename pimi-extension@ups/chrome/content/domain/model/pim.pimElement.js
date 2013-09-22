/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PimElement
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PimElement(id,name,value,description,annotationType,annotationValue,annotationGroup,annotationSubGroup,pim) {
	this.id = id;
    this.name = name;
    this.value = value;
	this.description = description;
	this.annotationType = annotationType;
	this.annotationValue = annotationValue;
	this.annotationGroup = annotationGroup;
	this.annotationSubGroup = annotationSubGroup;
    this.nameEdited = false;
    this.valueEdited = false;
    this.annotationValueEdited = false;
	this.pim = pim;
    this.pimsManager = pim.getPimsManager();
	this.pluginContext = pim.getPimsManager().getPluginContext();
    this.webPageDomContext = pim.getPimsManager().getWebPageDomContext();
    this.webPageJsContext = pim.getPimsManager().getWebPageJsContext();
    this.interfaceTool = pim.getPimsManager().getInterfaceTool();
	this.utilityTool = pim.getPimsManager().getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
PimElement.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	changeAnnotationValue: function(newAnnotationValue) {
		if(this.annotationValue != newAnnotationValue) {
			this.annotationValue = newAnnotationValue;
			this.pimsManager.setDirty();
		}
		this.setAnnotationValueEdited(false);
		this.updateView();
	},
	changeValue: function(newValue) {
		if(this.value != newValue) {
			this.value = newValue;
			this.pimsManager.setDirty();
		}
		this.setValueEdited(false);
		this.updateView();
	},
	isNameEdited: function() {
		return this.nameEdited;
	},
	isAnnotationValueEdited: function() {
		return this.annotationValueEdited;
	},
	isValueEdited: function() {
		return this.valueEdited;
	},
	isEdited: function() {
		return (this.isNameEdited() || this.isAnnotationValueEdited()
									|| this.isValueEdited());
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		return this.interfaceTool.getPimElementView(this);
	},
	updateView: function() {
		this.interfaceTool.updatePimElementView(this);
	},
	/*-----------------------------------------------
		Events methods
	-----------------------------------------------*/
	editAnnotationValue: function(event) {
		event = event || window.event;
		this.setAnnotationValueEdited(true);
		this.updateView();
		this.interfaceTool.getPimElementEditedAnnotationValueDom(this).select();
	},
	keyPressEditAnnotationValue: function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			//Enter
			case 13:
				var sourceElement = event.target || event.srcElement;
				this.changeAnnotationValue(sourceElement.value);
				break;
			default: break;
		}
	},
	editValue: function(event) {
		event = event || window.event;
		this.setValueEdited(true);
		this.updateView();
		this.interfaceTool.getPimElementEditedValueDom(this).select();
	},
	keyPressEditValue: function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			//Enter
			case 13:
				var sourceElement = event.target || event.srcElement;
				this.changeValue(sourceElement.value);
				break;
			default: break;
		}
	},
	/*doDragStart: function(event) {
		event = event || window.event;
		event.dataTransfer.setData('text/plain', this.getValue());
		this.pimsManager.setDraggedPimElement(this);
		event.dataTransfer.setDragImage(event.currentTarget, (event.clientX - event.offsetX), (event.clientY - event.offsetY));
	},
	doDragEnd: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		this.pimsManager.setDraggedPimElement(null);
	},*/
	/*-----------------------------------------------
		TO CHANGE
	-----------------------------------------------*/
	saveNewAnnotationValue: function() {
		var sourceElement = this.pimsManager.getCurrentValueChangeTextbox();
		var newAnnotationValue = sourceElement.value;
		if((newAnnotationValue != '') && (newAnnotationValue != ' ')) {
			this.setAnnotationValue(newAnnotationValue);
			sourceElement.parentNode.parentNode.parentNode.setAttribute('id', newAnnotationValue);

			var newLabel = this.pluginContext.createElement('label');
			newLabel.setAttribute('value', newAnnotationValue);
			newLabel.setAttribute('id', sourceElement.getAttribute('id'));
			newLabel.setAttribute('class', sourceElement.getAttribute('class'));
			newLabel.setAttribute('rel', sourceElement.getAttribute('rel'));
			sourceElement.parentNode.replaceChild(newLabel, sourceElement);

			var obj = this;
			newLabel.ondblclick = function(event) { obj.editAnnotationValue(event); };

			newLabel.setAttribute('tooltiptext', pimsInformationTypeChangeTootltipText);
			this.pimsManager.setDirty();
		}
	},
	saveNewValue: function() {
		var sourceElement =  this.pimsManager.getCurrentValueChangeTextbox();
		var newValue = sourceElement.value;
		if(newValue == pimsInformationEmptyDefaultValue)
			newValue = '';
		this.setValue(newValue);
		var newLabel = this.pluginContext.createElement('label');
		if(newValue.isEmpty())
			newValue = pimsInformationEmptyDefaultValue;
		newLabel.setAttribute('value', newValue);
		newLabel.setAttribute('id', sourceElement.getAttribute('id'));
		newLabel.setAttribute('class', sourceElement.getAttribute('class'));
		newLabel.setAttribute('rel', sourceElement.getAttribute('rel'));
		sourceElement.parentNode.replaceChild(newLabel, sourceElement);

		var obj = this;
		newLabel.ondblclick = function(event) { obj.editValue(event); };

		newLabel.setAttribute('tooltiptext', pimsInformationValueChangeTootltipText);
		this.pimsManager.setDirty();
	},
	/*-----------------------------------------------
		Export methods
	-----------------------------------------------*/
	export: function(pimsXmlDoc) {
		return this.exportXml(pimsXmlDoc);
	},
	exportXml: function(pimsXmlDoc) {
		var pimElementXml = pimsXmlDoc.createElement(PIM_ELEMENT_XML_TAG);
		pimElementXml.setAttribute(PIM_ELEMENT_NAME_XML_TAG,this.name);
		pimElementXml.setAttribute(PIM_ELEMENT_VALUE_XML_TAG,this.value);
		pimElementXml.setAttribute(PIM_ELEMENT_DESCRIPTION_XML_TAG,this.description);
		pimElementXml.setAttribute(PIM_ELEMENT_ANNOTATION_TYPE_XML_TAG,this.annotationType);
		pimElementXml.setAttribute(PIM_ELEMENT_MICROFORMAT_SUBCLASS_ATTRIBUTE_XML_TAG,this.annotationValue);
		pimElementXml.setAttribute(PIM_ELEMENT_MICROFORMAT_CLASS_XML_TAG,this.annotationGroup);
		pimElementXml.setAttribute(PIM_ELEMENT_MICROFORMAT_SUBCLASS_XML_TAG,this.annotationSubGroup);
		return pimElementXml;
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
    getName: function() {
		return this.name;
	},
	setName: function(name) {
		this.name = name;
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
	getAnnotationType: function() {
		return this.annotationType;
	},
	setAnnotationType: function(annotationType) {
		this.annotationType = annotationType;
	},
	getAnnotationValue: function() {
		return this.annotationValue;
	},
	setAnnotationValue: function(annotationValue) {
		this.annotationValue = annotationValue;
	},
	getAnnotationGroup: function() {
		return this.annotationGroup;
	},
	setAnnotationGroup: function(annotationGroup) {
		this.annotationGroup = annotationGroup;
	},
	getAnnotationSubGroup: function() {
		return this.annotationSubGroup;
	},
	setAnnotationSubGroup: function(annotationSubGroup) {
		this.annotationSubGroup = annotationSubGroup;
	},
	getNameEdited: function() {
		return this.nameEdited;
	},
	setNameEdited: function(nameEdited) {
		this.nameEdited = nameEdited;
	},
	getValueEdited: function() {
		return this.valueEdited;
	},
	setValueEdited: function(valueEdited) {
		this.valueEdited = valueEdited;
	},
	getAnnotationValueEdited: function() {
		return this.annotationValueEdited;
	},
	setAnnotationValueEdited: function(annotationValueEdited) {
		this.annotationValueEdited = annotationValueEdited;
	},
	getPim: function() {
		return this.pim;
	},
	setPim: function(pim) {
		this.pim = pim;
	},
	getPimsManager: function() {
		return this.pimsManager;
	},
	setPimsManager: function(pimsManager) {
		this.pimsManager = pimsManager;
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