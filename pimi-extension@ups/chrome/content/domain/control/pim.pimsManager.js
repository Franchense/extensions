/** Constants */
var PIM_XML_TAG = 'pim';
var PIM_NAME_XML_TAG = 'name';
var PIM_CATEGORY_XML_TAG = 'category';

var PIM_ELEMENT_XML_TAG = 'pimElement';
var PIM_ELEMENT_NAME_XML_TAG = 'name';
var PIM_ELEMENT_VALUE_XML_TAG = 'value';
var PIM_ELEMENT_DESCRIPTION_XML_TAG = 'description';
var PIM_ELEMENT_ANNOTATION_TYPE_XML_TAG = 'annotationtype';
var PIM_ELEMENT_MICROFORMAT_CLASS_XML_TAG = 'microformatclass';
var PIM_ELEMENT_MICROFORMAT_SUBCLASS_XML_TAG = 'microformatsubclass';
var PIM_ELEMENT_MICROFORMAT_SUBCLASS_ATTRIBUTE_XML_TAG = 'microformatsubclassattribute';

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PimsManager
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PimsManager(personalSpace) {
    this.personalSpace = personalSpace;
    this.pims = [];
    this.deletedPims = [];
	this.categories = [];
	this.generalCategory = null;
	this.personalPimsXmlDoc = null;
	this.selectedPim = null;
	this.selectedPimElement = null;
	this.selectedCategory = null;
	this.draggedPim = null;
	this.draggedPimElement = null;
	this.draggedEmptyPimPicture = null;
	this.draggedMicroformatPicture = null;
	this.showPimsElementsIconicMenus = false;
	this.showToolPicturesBox = false;
	this.pluginContext = personalSpace.getPluginContext();
    this.webPageDomContext = personalSpace.getWebPageDomContext();
    this.webPageJsContext = personalSpace.getWebPageJsContext();
    this.interfaceTool = personalSpace.getInterfaceTool();
	this.utilityTool = personalSpace.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
PimsManager.prototype = {
	/*-----------------------------------------------
		Super methods
	-----------------------------------------------*/
	getUniqueRandomId: function(intLength) {
		return this.personalSpace.getUniqueRandomId(intLength);
	},
	getUser: function() {
		return this.personalSpace.getUser();
	},
	setDirty: function() {
		this.personalSpace.setDirty();
	},
	setClean: function() {
		this.personalSpace.setClean();
	},
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	init: function() {
		
	},
	/** Categories methods */
	addCategoryDialog: function(defaultName) {
		var newCategoryName = prompt(categoryAddPromptMessageTitle, defaultName);
		if((newCategoryName != '') && (newCategoryName != null)
								   && (newCategoryName.length < 9)) {
			newCategoryName = newCategoryName.toLowerCase();
			newCategoryName = this.utilityTool.replaceAllAccents(newCategoryName);
			this.addCategory(newCategoryName,true,true);
			this.updateView();
		}
		else if(newCategoryName.length >= 9) {
			alert(categoryNameWarningMessage);
			this.addCategoryDialog(newCategoryName);
		}
	},
	addCategory: function(categoryName,canBeDeleted,canBeRenamed) {
		var newCategory = new PimCategory(this.getUniqueRandomId(20),
										  categoryName.toLowerCase(),
										  canBeDeleted,
										  canBeRenamed,
										  this);
		this.categories.push(newCategory);
		return newCategory;
	},
	categoryExists: function(categoryName) {
		for(var i = 0; i < this.categories.length; i++) {
			var currentCategory = this.categories[i];
			if (currentCategory.getName() == categoryName)
                return true;
        }
        return false;
	},
	getCategoryByName: function(categoryName) {
		for(var i = 0; i < this.categories.length; i++) {
			var currentCategory = this.categories[i];
			if (currentCategory.getName() == categoryName)
                return currentCategory;
        }
        return null;
	},
	selectCategory: function(category,selectView) {
		this.unselectAllCategories();
    	category.select();
    	if(selectView)
			this.selectCategoryView(category);
	},
	unselectAllCategories: function() {
		for(var i = 0; i < this.categories.length; i++) {
			var currentCategory = this.categories[i];
			currentCategory.setSelected(false);
		}
    	this.setSelectedCategory(null);
	},
	renameCategoryDialog: function(category) {
		if(category.getCanBeRenamed()) {
			var oldCategoryName = category.getName();
			var newCategoryName = prompt(categoryAddPromptMessageTitle, oldCategoryName.capitalize());
			if((newCategoryName != '') && (newCategoryName != null)
									   && (newCategoryName.length < 9)) {
				newCategoryName = newCategoryName.toLowerCase();
				newCategoryName = this.utilityTool.replaceAllAccents(newCategoryName);
				category.rename(newCategoryName);
			}
			else if(newCategoryName.length >= 9) {
				alert(categoryNameWarningMessage);
				this.renameCategoryDialog(category);
			}
		}
	},
	renameSelectedCategoryDialog: function() {
		if(this.getSelectedCategory() != null)
			this.renameCategoryDialog(this.getSelectedCategory());
	},
	deleteAllCategoryPimsDialog: function(category) {
		if(confirm(categoryDeleteAllPimsConfirmationMessage)) {
			for(var i = 0; i < this.pims.length; i++) {
				var currentPim = this.pims[i];
				if(currentPim.getCategory().getId() == category.getId()) {
					this.deletePim(currentPim);
					this.setDirty();
				}
			}
			category.updatePanelView();
		}
	},
	deleteAllPimsOfSelectedCategoryDialog: function() {
		this.deleteAllCategoryPimsDialog(this.selectedCategory);
	},
	deleteCategory: function(category) {
		if(category.getCanBeDeleted())
			this.categories.remove(category);
	},
	deleteCategoryDialog: function(category,pimsDeletionType,confirmMessage) {
		if(confirm(confirmMessage)) {
			for(var i = 0; i < this.pims.length; i++) {
				var currentPim = this.pims[i];
				if(currentPim.getCategory().getId() == category.getId()) {
					if(pimsDeletionType == 1)
						this.deletePim(currentPim);
					else if(pimsDeletionType == 2)
						currentPim.setCategory(this.getGeneralCategory());
					this.setDirty();
				}
			}
			this.deleteCategory(category);
			this.getGeneralCategory().select();
			this.updateView();
		}
	},
	deleteSelectedCategoryDeletingPimsDialog: function() {
		this.deleteCategoryDialog(this.selectedCategory,1,categoryDeletionDeletingPimsConfirmationMessage);
	},
	deleteSelectedCategoryMovingPimsDialog: function() {
		this.deleteCategoryDialog(this.selectedCategory,2,categoryDeletionMovingPimsConfirmationMessage);
	},
	/** Pims methods */
	addPimDialog: function(category,defaultPimName) {
		var newPim = this.addPim(defaultPimName,category);
		this.setDirty();
		this.updateView();
		newPim.editName();
		return newPim;
	},
	addPimToSelectedCategoryDialog: function() {
		return this.addPimDialog(this.getSelectedCategory(),pimsNewPimAddPromptMessageValue);
	},
	addPim: function(pimName,category) {
		var newPimId = this.getUniqueRandomId(20);
		var newPim = new Pim(newPimId,
							 pimName,
							 newPimId,
							 category,
							 this);
		this.pims.push(newPim);
		return newPim;
	},
	getPimById: function(pimId) {
		for(var i = 0; i < this.pims.length; i++) {
			var currentPim = this.pims[i];
			if (currentPim.getId() == pimId)
                return currentPim;
        }
        return null;
	},
	getPimByName: function(pimName) {
		for(var i = 0; i < this.pims.length; i++) {
			var currentPim = this.pims[i];
			if (currentPim.getName() == pimName)
                return currentPim;
        }
        return null;
	},
	changePimCategory: function(pim,newCategory) {
		var oldCategory = pim.getCategory();
		if(newCategory.getId() != oldCategory.getId()) {
			pim.setCategory(newCategory);
			this.setDirty();
			newCategory.updatePanelView();
			oldCategory.updatePanelView();
		}
	},
	changeDraggedPimCategory: function(newCategory) {
		this.changePimCategory(this.draggedPim,newCategory);
	},
	deletePim: function(pim) {
		this.pims.remove(pim);
		this.deletedPims.push(pim);
	},
	deletePimDialog: function(pim) {
		if(confirm(pimDeletionConfirmationMessage)) {
			this.deletePim(pim);
			this.setDirty();
			pim.getCategory().updatePanelView();
		}
	},
	deleteSelectedPimDialog: function() {
		if(this.getSelectedPim() != null)
			this.deletePimDialog(this.getSelectedPim());
	},
	toggleSelectedPim: function() {
		if(this.getSelectedPim() != null)
			this.getSelectedPim().toggle();
	},
	editNameSelectedPimDialog: function() {
		if(this.getSelectedPim() != null)
			this.getSelectedPim().editName(null);
	},
	/** Formated pims methods */
	addFormatedPim: function(formatedPimPath,category,editName) {
		var newPim = null;
		var pimXmlDoc = this.getUtilityTool().loadXMLDoc(formatedPimPath);
		if((pimXmlDoc != null) && (category != null)) {
			newPim = this.importFormatedPimXml(pimXmlDoc,category);
			this.setDirty();
			category.updatePanelView();
			if(editName)
				newPim.editName();
		}
	},
	addFormatedPimToSelectedCategory: function(formatedPimPath,editName) {
		this.addFormatedPim(formatedPimPath,this.getSelectedCategory(),editName);
	},
	addAdoptedFormatedPimToSelectedCategory: function(formatedPimType,editName) {
		this.addFormatedPimToSelectedCategory(formatedPimsDirectoryPath + formatedPimType + adoptedFormatedPimsNameSuffix,editName);
	},
	addProposedFormatedPimToSelectedCategory: function(formatedPimType,editName) {
		this.addFormatedPimToSelectedCategory(formatedPimsDirectoryPath + formatedPimType + proposedFormatedPimsNameSuffix,editName);
	},
	addHCardProposedFormatedPimsToSelectedCategory: function() {
		this.addProposedFormatedPimToSelectedCategory('hidentity',false);
		this.addProposedFormatedPimToSelectedCategory('haddress',false);
		this.addProposedFormatedPimToSelectedCategory('hcontact',true);
	},
	/** Pim elements methods */
	addPimElementToSelectedPimDialog: function() {
		if(this.getSelectedPim() != null)
			this.getSelectedPim().createPimElementDialog();
	},
	deleteSelectedPimElementDialog: function() {
		if(this.getSelectedPimElement() != null)
			this.getSelectedPimElement().getPim().deletePimElementDialog(this.getSelectedPimElement());
	},
	editAnnotationValueSelectedPimElementDialog: function() {
		if(this.getSelectedPimElement() != null)
			this.getSelectedPimElement().editAnnotationValue(null);
	},
    editValueSelectedElementPim: function() {
		if(this.getSelectedPimElement() != null)
			this.getSelectedPimElement().editValue(null);
	},
	/*-----------------------------------------------
		Event methods
	-----------------------------------------------*/
	doDragStartEmptyPimPicture: function(event) {
		event = event || window.event;
		event.dataTransfer.setData('text/plain', '');
		var draggedPimPicture = event.currentTarget;
		event.dataTransfer.setDragImage(draggedPimPicture, event.layerX - 25, event.layerY);
		this.setDraggedEmptyPimPicture(draggedPimPicture);
	},
	doDragEndEmptyPimPicture: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		this.setDraggedEmptyPimPicture(null);
	},
	doDragStartMicroformatPicture: function(event) {
		event = event || window.event;
		event.dataTransfer.setData('text/plain', '');
		var draggedMicroformatPicture = event.currentTarget;
		event.dataTransfer.setDragImage(draggedMicroformatPicture, event.clientX - event.layerX, event.layerY);
		this.setDraggedMicroformatPicture(draggedMicroformatPicture);
	},
	doDragEndMicroformatPicture: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		this.setDraggedMicroformatPicture(null);
	},
	doDrop: function(event) {
		event = event || window.event;
		if(this.getDraggedEmptyPimPicture() != null) {
			this.addPimToSelectedCategoryDialog();
			this.setDraggedEmptyPimPicture(null);
		}
		else if(this.getDraggedMicroformatPicture() != null) {
			var microformatType = this.getDraggedMicroformatPicture().getAttribute('id');
			if(microformatType == 'hcard')
				this.addHCardProposedFormatedPimsToSelectedCategory();
			else
				this.addProposedFormatedPimToSelectedCategory(microformatType,true);
			this.setDraggedMicroformatPicture(null);
		}
		/*else if(this.pimsManager.getDraggedFormGroup() != null) {
			if(!pimDrop) {
				saveAsAPim(draggedFormGroup.getAttribute('id'), draggedFormGroup.getAttribute('rel'), concernedCategoryContextMenu, null);
				draggedFormGroup = null;
			}
			else
				pimDrop = false;
		}
		else if(this.pimsManager.getDraggedFormInput() != null) {
			addPimAndDraggedInformation();
			draggedFormInput = null;
		}*/
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		return this.getPanelView();
	},
	getPanelView: function() {
		return this.interfaceTool.getPimsPanelView(this);
	},
	getTabboxView: function() {
		return this.interfaceTool.getCategoriesTabboxView(this);
	},
	updateView: function() {
		this.updateTabboxView();
	},
	updatePanelView: function() {
		this.interfaceTool.updatePimsPanelView(this);
	},
	updateTabboxView: function() {
		this.interfaceTool.updateCategoriesTabboxView(this);
	},
	updateSavedLabelView: function() {
		this.interfaceTool.updatePimsSavedLabelView(this);
	},
	selectCategoryView: function(category) {
		this.interfaceTool.selectCategoryView(category);
	},
	/*-----------------------------------------------
		Import & Export methods
	-----------------------------------------------*/
	import: function(pimsXml) {
		this.importXml(pimsXml);
	},
	importXml: function(pimsXml) {
		var generalCategory = this.addCategory('general',false,false);
		this.setGeneralCategory(generalCategory);
    	generalCategory.select();
		if(pimsXml != null) {
			this.personalPimsXmlDoc = pimsXml;
			var pims = pimsXml.getElementsByTagName(PIM_XML_TAG);
			for (var i = 0; i < pims.length; i++) {
				var currentPim = pims[i];
				var category = null;
				var categoryName = currentPim.getAttribute(PIM_CATEGORY_XML_TAG);
				if(this.categoryExists(categoryName))
					category = this.getCategoryByName(categoryName);
				else
					category = this.addCategory(categoryName,true,true);
				this.importPimXml(currentPim,category);
			}
		}
	},
	importPimXml: function(pimXml,category) {
		var newPim = this.addPim(pimXml.getAttribute(PIM_NAME_XML_TAG),category);
		newPim.import(pimXml);
		return newPim;
	},
	importFormatedPimXml: function(pimXml,category) {
		var newPim = null;
		if(pimXml != null)
			newPim = this.importPimXml(pimXml.getElementsByTagName(PIM_XML_TAG)[0],category);
		return newPim;
	},
	export: function() {
		return this.exportXml();
	},
	exportXml: function() {
		var pimsXmlDoc = this.utilityTool.loadXMLDoc(emptyPimXmlFilePath);
		for(var i = 0; i < this.pims.length; i++) {
			var currentPim = this.pims[i];
			var currentPimXml = currentPim.export(pimsXmlDoc);
			pimsXmlDoc.getElementsByTagName('pims')[0].appendChild(currentPimXml);
        }
		return pimsXmlDoc;
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
	getPims: function() {
		return this.pims;
	},
	setPims: function(pims) {
		this.pims = pims;
	},
    getDeletedPims: function() {
		return this.deletedPims;
	},
	setDeletedPims: function(deletedPims) {
		this.deletedPims = deletedPims;
	},
	getCategories: function() {
		return this.categories;
	},
	setCategories: function(categories) {
		this.categories = categories;
	},
	getGeneralCategory: function() {
		return this.generalCategory;
	},
	setGeneralCategory: function(generalCategory) {
		this.generalCategory = generalCategory;
	},
	getPersonalPimsXmlDoc: function() {
		return this.personalPimsXmlDoc;
	},
	setPersonalPimsXmlDoc: function(personalPimsXmlDoc) {
		this.personalPimsXmlDoc = personalPimsXmlDoc;
	},
	getSelectedPim: function() {
		return this.selectedPim;
	},
	setSelectedPim: function(selectedPim) {
		this.selectedPim = selectedPim;
	},
	getSelectedPimElement: function() {
		return this.selectedPimElement;
	},
	setSelectedPimElement: function(selectedPimElement) {
		this.selectedPimElement = selectedPimElement;
	},
	getSelectedCategory: function() {
		return this.selectedCategory;
	},
	setSelectedCategory: function(selectedCategory) {
		this.selectedCategory = selectedCategory;
	},
	getDraggedPim: function() {
		return this.draggedPim;
	},
	setDraggedPim: function(draggedPim) {
		this.draggedPim = draggedPim;
	},
	getDraggedPimElement: function() {
		return this.draggedPimElement;
	},
	setDraggedPimElement: function(draggedPimElement) {
		this.draggedPimElement = draggedPimElement;
	},
	getDraggedMicroformatPicture: function() {
		return this.draggedMicroformatPicture;
	},
	setDraggedMicroformatPicture: function(draggedMicroformatPicture) {
		this.draggedMicroformatPicture = draggedMicroformatPicture;
	},
	getShowPimsElementsIconicMenus: function() {
		return this.showPimsElementsIconicMenus;
	},
	setShowPimsElementsIconicMenus: function(showPimsElementsIconicMenus) {
		this.showPimsElementsIconicMenus = showPimsElementsIconicMenus;
	},
	getShowToolPicturesBox: function() {
		return this.showToolPicturesBox;
	},
	setShowToolPicturesBox: function(showToolPicturesBox) {
		this.showToolPicturesBox = showToolPicturesBox;
	},
	getDraggedEmptyPimPicture: function() {
		return this.draggedEmptyPimPicture;
	},
	setDraggedEmptyPimPicture: function(draggedEmptyPimPicture) {
		this.draggedEmptyPimPicture = draggedEmptyPimPicture;
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