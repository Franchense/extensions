/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Pim
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function Pim(id,name,domId,category,pimsManager) {
	this.id = id;
    this.name = name;
    this.domId = domId;
    this.category = category;
    this.public = false;
    this.opened = false;
    this.nameEdited = false;
    this.pimElements = [];
    this.pimsManager = pimsManager;
	this.pluginContext = pimsManager.getPluginContext();
    this.webPageDomContext = pimsManager.getWebPageDomContext();
    this.webPageJsContext = pimsManager.getWebPageJsContext();
    this.interfaceTool = pimsManager.getInterfaceTool();
	this.utilityTool = pimsManager.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
Pim.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	addPimElement: function(eltName,eltValue,eltDescription,eltAnnotationType,eltAnnotationValue,eltAnnotationGroup,eltAnnotationSubgroup) {
		var newPimElement = new PimElement(this.pimsManager.getUniqueRandomId(20),
										   eltName,
										   eltValue,
										   eltDescription,
										   eltAnnotationType,
										   eltAnnotationValue,
										   eltAnnotationGroup,
										   eltAnnotationSubgroup,
										   this);
		this.pimElements.push(newPimElement);
		return newPimElement;
	},
	createPimElementDialog: function() {
		var newPimElement = this.addPimElement(pimElementDefaultNameValue,'','','personal',pimsNewElementAddPromptMessageValue,pimsNewElementAddPromptMessageValue,pimsNewElementAddPromptMessageValue);
		this.pimsManager.setDirty();
		this.updateView();
		newPimElement.editAnnotationValue();
	},
	getPimElementById: function(pimElementId) {
		for(var i = 0; i < this.pimElements.length; i++) {
			var currentPimElement = this.pimElements[i];
			if (currentPimElement.getId() == pimElementId)
                return currentPimElement;
        }
        return null;
	},
	getPimElementByName: function(pimElementName) {
		for(var i = 0; i < this.pimElements.length; i++) {
			var currentPimElement = this.pimElements[i];
			if (currentPimElement.getName() == pimElementName)
                return currentPimElement;
        }
        return null;
	},
	deletePimElement: function(pimElement) {
		this.pimElements.remove(pimElement);
	},
	deletePimElementDialog: function(pimElement) {
		if(confirm(pimElementDeletionConfirmationMessage)) {
			this.deletePimElement(pimElement);
			this.pimsManager.setDirty();
			this.updateView();
		}
	},
	changeName: function(newName) {
		this.setName(newName);
		this.pimsManager.setDirty();
		this.setNameEdited(false);
		this.updateView();
	},
	isPublic: function() {
		return this.public;
	},
	isOpened: function() {
		return this.opened;
	},
	isNameEdited: function() {
		return this.nameEdited;
	},
	isEdited: function() {
		return this.isNameEdited();
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		return this.interfaceTool.getPimView(this);
	},
	updateView: function() {
		this.interfaceTool.updatePimView(this);
	},
	toggle: function() {
		if(this.isOpened())
			this.close();
		else
			this.open();
	},
	open: function() {
		this.setOpened(true);
		this.updateView();
	},
	close: function() {
		this.setOpened(false);
		this.updateView();
	},
	/*-----------------------------------------------
		Events methods
	-----------------------------------------------*/
	editName: function(event) {
		event = event || window.event;
		this.setNameEdited(true);
		this.updateView();
		this.interfaceTool.getPimEditedNameDom(this).select();
	},
	keyPressEditName: function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			//Enter
			case 13:
				var sourceElement = event.target || event.srcElement;
				this.changeName(sourceElement.value);
				break;
			default: break;
		}
	},
	doDragStart: function(event) {
		event = event || window.event;
		event.dataTransfer.setData('text/plain', this.getName());
		this.pimsManager.setDraggedPim(this);
		event.dataTransfer.setDragImage(event.currentTarget, (event.clientX - event.offsetX), (event.clientY - event.offsetY));
	},
	doDragEnd: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		//var formDoms = this.webPageDomContext.getElementsByClassName(formGroupPrefix);
		//for(var f = 0; f < formDoms.length; f++)
		//	this.interfaceTool.setBackgroundStyle(formDoms[f],'none');
		this.pimsManager.setDraggedPim(null);
	},
	/*-----------------------------------------------
		TO CHANGE
	-----------------------------------------------*/
	saveNewValue: function() {
		// A CHANGER !!!!
		// Sert pour le copier/coller d'annotation par menu contextuel
		alert('Classe Pim (pim.pim.js) --> IMPLEMENTATION A CHANGER !');
		switch(this.pimsManager.getCurrentValueChangeTextbox().getAttribute('class')) {
			case 'pim_title':
				//this.saveNewName();
				break;
			case 'pim_information_type':
				//this.saveNewInfoType();
				break;
			case 'pim_information_value':
				//this.saveNewInfoValue();
				break;
			default: break;
		}
	},
	saveNewName: function() {
		var sourceElement = this.pimsManager.getCurrentValueChangeTextbox();
		var newPimName = sourceElement.value;
		if(newPimName.isEmpty())
			newPimName = pimDefaultNameValue;
		this.setName(newPimName);
		var newLabel = document.createElement('label');
		newLabel.setAttribute('value', newPimName);
		newLabel.setAttribute('id', sourceElement.getAttribute('id'));
		newLabel.setAttribute('class', sourceElement.getAttribute('class'));
		newLabel.setAttribute('rel', sourceElement.getAttribute('rel'));
		sourceElement.parentNode.replaceChild(newLabel, sourceElement);

		var obj = this;
		newLabel.ondblclick = function(event) { obj.editName(event); };

		newLabel.setAttribute('tooltiptext', pimsNameChangeTootltipText);
		this.pimsManager.setDirty();
	},
	/*-----------------------------------------------
		Export methods
	-----------------------------------------------*/
	import: function(pimXml) {
		this.importXml(pimXml);
	},
	importXml: function(pimXml) {
		var pimElements = pimXml.getElementsByTagName(PIM_ELEMENT_XML_TAG);
		for (var j = 0; j < pimElements.length; j++)
			this.importPimElementXml(pimElements[j]);
	},
	importPimElementXml: function(pimElementXml) {
		this.addPimElement(pimElementXml.getAttribute(PIM_ELEMENT_NAME_XML_TAG),pimElementXml.getAttribute(PIM_ELEMENT_VALUE_XML_TAG),
						   pimElementXml.getAttribute(PIM_ELEMENT_DESCRIPTION_XML_TAG),pimElementXml.getAttribute(PIM_ELEMENT_ANNOTATION_TYPE_XML_TAG),
						   pimElementXml.getAttribute(PIM_ELEMENT_MICROFORMAT_SUBCLASS_ATTRIBUTE_XML_TAG),
						   pimElementXml.getAttribute(PIM_ELEMENT_MICROFORMAT_CLASS_XML_TAG),pimElementXml.getAttribute(PIM_ELEMENT_MICROFORMAT_SUBCLASS_XML_TAG));
	},
	export: function(pimsXmlDoc) {
		return this.exportXml(pimsXmlDoc);
	},
	exportXml: function(pimsXmlDoc) {
		var pimXml = pimsXmlDoc.createElement(PIM_XML_TAG);
		pimXml.setAttribute(PIM_NAME_XML_TAG,this.name);
		pimXml.setAttribute(PIM_CATEGORY_XML_TAG,this.category.getName());
		for(var j = 0; j < this.pimElements.length; j++) {
			var currentPimElement = this.pimElements[j];
			var pimElementXml = currentPimElement.export(pimsXmlDoc);
			pimXml.appendChild(pimElementXml);
        }
        return pimXml;
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
	getDomId: function() {
		return this.domId;
	},
	setDomId: function(domId) {
		this.domId = domId;
	},
	getPublic: function() {
		return this.public;
	},
	setPublic: function(public) {
		this.public = public;
	},
	getCategory: function() {
		return this.category;
	},
	setCategory: function(category) {
		this.category = category;
	},
	getOpened: function() {
		return this.opened;
	},
	setOpened: function(opened) {
		this.opened = opened;
	},
	getNameEdited: function() {
		return this.nameEdited;
	},
	setNameEdited: function(nameEdited) {
		this.nameEdited = nameEdited;
	},
	getPimElements: function() {
		return this.pimElements;
	},
	setPimElements: function(pimElements) {
		this.pimElements = pimElements;
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