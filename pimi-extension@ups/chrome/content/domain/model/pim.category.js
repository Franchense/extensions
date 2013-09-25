/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PimCategory
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PimCategory(id,name,canBeDeleted,canBeRenamed,pimsManager) {
	this.id = id;
    this.name = name;
    this.canBeDeleted = canBeDeleted;
    this.canBeRenamed = canBeRenamed;
	this.selected = !canBeDeleted;
    this.pimsManager = pimsManager;
    this.interfaceTool = pimsManager.getInterfaceTool();
	this.utilityTool = pimsManager.getUtilityTool();
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
PimCategory.prototype = {
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	select: function() {
    	this.setSelected(true);
    	this.pimsManager.setSelectedCategory(this);
	},
	isSelected: function() {
		return this.selected;
	},
	rename: function(newName) {
		if(this.canBeRenamed && (this.name != newName)) {
			this.name = newName;
			this.pimsManager.setDirty();
			this.updateTabView();
		}
	},
	/*-----------------------------------------------
		View methods
	-----------------------------------------------*/
	getView: function() {
		return this.getPanelView();
	},
	getPanelView: function() {
		return this.interfaceTool.getCategoryPanelView(this);
	},
	getTabView: function() {
		return this.interfaceTool.getCategoryTabView(this);
	},
	updateView: function() {
		this.interfaceTool.updateCategoryView(this);
	},
	updatePanelView: function() {
		this.interfaceTool.updateCategoryPanelView(this);
	},
	updateTabView: function() {
		this.interfaceTool.updateCategoryTabView(this);
	},
	/*-----------------------------------------------
		Events methods
	-----------------------------------------------*/
	doDragEnter: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		var selectTab = true;
		if(this.pimsManager.getDraggedPim() != null) {
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryPimColor);
			selectTab = false;
		}
		else if(this.pimsManager.getDraggedEmptyPimPicture() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryEmptyPimColor);
		else if(this.pimsManager.getDraggedMicroformatPicture() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryPictureColor);
		/*else if(this.pimsManager.getDraggedFormGroup() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryFormGroupColor);
		else if(this.pimsManager.getDraggedFormInput() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryFormInputPimColor);*/
		if(selectTab)
			this.pimsManager.selectCategory(this);
	},
	doDragOver: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		if(this.pimsManager.getDraggedPim() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryPimColor);
		else if(this.pimsManager.getDraggedEmptyPimPicture() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryEmptyPimColor);
		else if(this.pimsManager.getDraggedMicroformatPicture() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryPictureColor);
		/*else if(this.pimsManager.getDraggedFormGroup() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryFormGroupColor);
		else if(this.pimsManager.getDraggedFormInput() != null)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOverCategoryFormInputPimColor);*/
	},
	doDragLeave: function(event) {
		event = event || window.event;
		event.stopPropagation();
		event.preventDefault();
		if((this.pimsManager.getDraggedPim() != null) || (this.pimsManager.getDraggedEmptyPimPicture() != null)
													  || (this.pimsManager.getDraggedMicroformatPicture() != null)
												      /*|| (this.pimsManager.getDraggedFormGroup() != null)
												      || (this.pimsManager.getDraggedFormInput() != null)*/)
			this.interfaceTool.setColorStyle(event.currentTarget,dragOutCategoryColor);
	},
	doDrop: function(event) {
		event = event || window.event;
		var categoryTab = event.currentTarget;
		if(this.pimsManager.getDraggedPim() != null) {
			this.pimsManager.changeDraggedPimCategory(this);
			this.pimsManager.setDraggedPim(null);
		}
		else if(this.pimsManager.getDraggedEmptyPimPicture() != null) {
			this.pimsManager.doDrop(event);
		}
		else if(this.pimsManager.getDraggedMicroformatPicture() != null) {
			this.pimsManager.doDrop(event);
		}
		/*else if(this.pimsManager.getDraggedFormGroup() != null) {
			this.pimsManager.doDrop(event);
		}
		else if(this.pimsManager.getDraggedFormInput() != null) {
			this.pimsManager.doDrop(event);
		}*/
		this.interfaceTool.setColorStyle(categoryTab,dragOutCategoryColor);
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
	getCanBeDeleted: function() {
		return this.canBeDeleted;
	},
	setCanBeDeleted: function(canBeDeleted) {
		this.canBeDeleted = canBeDeleted;
	},
	getCanBeRenamed: function() {
		return this.canBeRenamed;
	},
	setCanBeRenamed: function(canBeRenamed) {
		this.canBeRenamed = canBeRenamed;
	},
	getSelected: function() {
		return this.selected;
	},
	setSelected: function(selected) {
		this.selected = selected;
	},
	getPimsManager: function() {
		return this.pimsManager;
	},
	setPimsManager: function(pimsManager) {
		this.pimsManager = pimsManager;
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