/** Constants */
var PIMS_PANEL_ID = 'pims_panel';

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PimsXulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PimsXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
PimsXulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        return this.utilInterfaceTool.getPluginElement(elementType,attributesNames,attributesValues);
    },
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	updatePimsPanelView: function(pimsManager) {
		var oldPimsPanelView = this.pluginContext.getElementById(PIMS_PANEL_ID);
		var newPimsPanelView = this.getPimsPanelView(pimsManager);
        oldPimsPanelView.parentNode.replaceChild(newPimsPanelView, oldPimsPanelView);
	},
	updateCategoriesTabboxView: function(pimsManager) {
		var oldCategoryTabboxView = this.pluginContext.getElementById('pims_tabbox');
		var newCategoryTabboxView = this.getCategoriesTabboxView(pimsManager);
        oldCategoryTabboxView.parentNode.replaceChild(newCategoryTabboxView, oldCategoryTabboxView);
	},
	getPimsPanelView: function(pimsManager) {
		var pimsPanel = this.getPluginElement('vbox',['id','flex','context'],
                                                     [PIMS_PANEL_ID,'1','general_contextual_menu']);
		pimsPanel.ondrop = function(event) { pimsManager.doDrop(event); };
		//pimsPanel.appendChild(this.getPimsSaveCheckboxView(pimsManager));
		pimsPanel.appendChild(this.getCategoriesTabboxView(pimsManager));
		pimsPanel.appendChild(this.getPimsPicsView(pimsManager));
		return pimsPanel;
	},
	getPimsSaveCheckboxView: function(pimsManager) {
		var pimsSaveCheckbox = this.getPluginElement('checkbox',['id','checked','label','tooltiptext'],
                                                     			['pims_form_groups_save_checkbox','false',pimsFormGroupsSaveCheckboxLabel,pimsFormGroupsSaveCheckboxTooltipText]);
		//pimsSaveCheckbox.onclick = function(event) { enableDisableFormGroupsSave(); };
        pimsSaveCheckbox.onclick = function(event) { alert('Coming soon!'); };
		return pimsSaveCheckbox;
	},
	getCategoriesTabboxView: function(pimsManager) {
		var categoriesTabbox = this.getPluginElement('tabbox',['id','orient'],
                                                     		  ['pims_tabbox','horizontal']);
		var categoriesTabs = this.getPluginElement('tabs',['id','orient'],
                                                     	  ['pims_tabs','vertical']);
		var categoriesTabPanels = this.getPluginElement('tabpanels',[],[]);
		var categories = pimsManager.getCategories();
		for(var i = 0; i < categories.length; i++) {
			var currentCategory = categories[i];
			categoriesTabs.appendChild(currentCategory.getTabView());
			categoriesTabPanels.appendChild(currentCategory.getPanelView());
		}
		categoriesTabbox.appendChild(categoriesTabs);
		categoriesTabbox.appendChild(categoriesTabPanels);
		return categoriesTabbox;
	},
	getPimsPicsView: function(pimsManager) {
		var pimsPicsBox = this.getPluginElement('vbox',['id'],
                                                       ['pims_tools_images_box']);

		var pimsPicsFirstGroupBox = this.getPluginElement('hbox',['id','class'],
                                                       			 ['microformat_tool_image_1','microformat_tool_images']);
		pimsPicsBox.appendChild(pimsPicsFirstGroupBox);

		var addCategoryImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       		 ['add_pim_category_image','function_pic bottom','images/whitePlus.png',categoryAddImageTooltipText]);
		addCategoryImage.onclick = function(event) { pimsManager.addCategoryDialog(''); };
		pimsPicsFirstGroupBox.appendChild(addCategoryImage);

		var pimsPicsFirstGroupBoxSecondImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			 ['create_new_pim_image','pims_pic leftleft bottom','images/user.png',pimsCreateNewPimImageTooltipText]);
		pimsPicsFirstGroupBoxSecondImage.onclick = function(event) { pimsManager.addPimToSelectedCategoryDialog(); };
		pimsPicsFirstGroupBoxSecondImage.ondragstart = function(event) { pimsManager.doDragStartEmptyPimPicture(event); };
		pimsPicsFirstGroupBoxSecondImage.ondragend = function(event) { pimsManager.doDragEndEmptyPimPicture(event); };
		pimsPicsFirstGroupBox.appendChild(pimsPicsFirstGroupBoxSecondImage);

		var pimsPicsFirstGroupBoxThirdImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			['save_pims_image','function_pic top leftleft','images/floppy.png',pimsSavePimsImageTooltipText]);
		pimsPicsFirstGroupBoxThirdImage.onclick = function(event) { pimsManager.getPersonalSpace().save(); };
		pimsPicsFirstGroupBox.appendChild(pimsPicsFirstGroupBoxThirdImage);

		pimsPicsFirstGroupBox.appendChild(this.getPimsSavedLabelView(pimsManager));

		var pimsPicsSecondGroupBox = this.getPluginElement('hbox',['id','class'],
                                                       			  ['microformat_tool_image_2','microformat_tool_images']);
		pimsPicsBox.appendChild(pimsPicsSecondGroupBox);

		var pimsPicsSecondGroupBoxFirstImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			 ['hcard','pims_pic','images/microformat_hcard.png',microformatHcardTooltipText]);
        pimsPicsSecondGroupBoxFirstImage.onclick = function(event) { pimsManager.addHCardProposedFormatedPimsToSelectedCategory(); };
		pimsPicsSecondGroupBoxFirstImage.ondragstart = function(event) { pimsManager.doDragStartMicroformatPicture(event); };
		pimsPicsSecondGroupBoxFirstImage.ondragend = function(event) { pimsManager.doDragEndMicroformatPicture(event); };
		pimsPicsSecondGroupBox.appendChild(pimsPicsSecondGroupBoxFirstImage);

		var pimsPicsSecondGroupBoxSecondImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			  ['hcalendar','pims_pic left','images/microformat_hcalendar.png',microformatHcalendarTooltipText]);
        pimsPicsSecondGroupBoxSecondImage.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hcalendar',true); };
		pimsPicsSecondGroupBoxSecondImage.ondragstart = function(event) { pimsManager.doDragStartMicroformatPicture(event); };
		pimsPicsSecondGroupBoxSecondImage.ondragend = function(event) { pimsManager.doDragEndMicroformatPicture(event); };
		pimsPicsSecondGroupBox.appendChild(pimsPicsSecondGroupBoxSecondImage);

		var pimsPicsThirdGroupBox = this.getPluginElement('hbox',['id','class'],
                                                       			 ['microformat_tool_image_3','microformat_tool_images']);
		pimsPicsBox.appendChild(pimsPicsThirdGroupBox);

		var pimsPicsThirdGroupBoxFirstImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			['hidentity','pims_pic','images/microformat_hidentity.png',microformatHidentityTooltipText]);
        pimsPicsThirdGroupBoxFirstImage.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hidentity',true); };
		pimsPicsThirdGroupBoxFirstImage.ondragstart = function(event) { pimsManager.doDragStartMicroformatPicture(event); };
		pimsPicsThirdGroupBoxFirstImage.ondragend = function(event) { pimsManager.doDragEndMicroformatPicture(event); };
		pimsPicsThirdGroupBox.appendChild(pimsPicsThirdGroupBoxFirstImage);

		var pimsPicsThirdGroupBoxSecondImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			 ['haddress','pims_pic left','images/microformat_haddress.png',microformatHaddressTooltipText]);
        pimsPicsThirdGroupBoxSecondImage.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('haddress',true); };
		pimsPicsThirdGroupBoxSecondImage.ondragstart = function(event) { pimsManager.doDragStartMicroformatPicture(event); };
		pimsPicsThirdGroupBoxSecondImage.ondragend = function(event) { pimsManager.doDragEndMicroformatPicture(event); };
		pimsPicsThirdGroupBox.appendChild(pimsPicsThirdGroupBoxSecondImage);

		var pimsPicsThirdGroupBoxThirdImage = this.getPluginElement('image',['id','class','src','tooltiptext'],
                                                       			 			['hcontact','pims_pic left','images/microformat_hcontact.png',microformatHcontactTooltipText]);
        pimsPicsThirdGroupBoxThirdImage.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hcontact',true); };
		pimsPicsThirdGroupBoxThirdImage.ondragstart = function(event) { pimsManager.doDragStartMicroformatPicture(event); };
		pimsPicsThirdGroupBoxThirdImage.ondragend = function(event) { pimsManager.doDragEndMicroformatPicture(event); };
		pimsPicsThirdGroupBox.appendChild(pimsPicsThirdGroupBoxThirdImage);

		return pimsPicsBox;
	},
	updatePimsSavedLabelView: function(pimsManager) {
		var oldPimsSavedLabelView = this.pluginContext.getElementById('pims_saved_label');
		var newPimsSavedLabelView = this.getPimsSavedLabelView(pimsManager);
        oldPimsSavedLabelView.parentNode.replaceChild(newPimsSavedLabelView, oldPimsSavedLabelView);
	},
	getPimsSavedLabelView: function(pimsManager) {
		var pimsSavedLabelValue = pimsSavedLabel;
		var pimsSavedLabelClass = 'pims_saved';
		if(pimsManager.getPersonalSpace().isBusy()) {
			pimsSavedLabelValue = pimsSavingLabel;
			pimsSavedLabelClass = 'pims_saving';
		}
		else if(pimsManager.getPersonalSpace().isDirty()) {
			pimsSavedLabelValue = pimsUnsavedLabel;
			pimsSavedLabelClass = 'pims_unsaved';
		}
		var pimsSaveModeSuffix = pimsManualSaveModeLabel;
		if(pimsManager.getPersonalSpace().getAutoSave())
			pimsSaveModeSuffix = pimsAutomaticSaveModeLabel;
		pimsSavedLabelValue += ' ' + pimsSaveModeSuffix;
		var pimsSaveInformationLabel = this.getPluginElement('label',['id','class','value'],
                                                 	  	   			 ['pims_saved_label',pimsSavedLabelClass,pimsSavedLabelValue]);
		return pimsSaveInformationLabel;
	},
	/*-----------------------------------------------
		Categories methods
	-----------------------------------------------*/
	updateCategoryView: function(category) {
		this.updateCategoryPanelView(category);
		this.updateCategoryTabView(category);
	},
	updateCategoryPanelView: function(category) {
		var oldCategoryPanelView = this.pluginContext.getElementById(category.getId() + '_pims_category_panel');
		var newCategoryPanelView = category.getPanelView();
        oldCategoryPanelView.parentNode.replaceChild(newCategoryPanelView, oldCategoryPanelView);
	},
	updateCategoryTabView: function(category) {
		var oldCategoryTabView = this.pluginContext.getElementById(category.getId() + '_pims_category_tab');
		var newCategoryTabView = category.getTabView();
        oldCategoryTabView.parentNode.replaceChild(newCategoryTabView, oldCategoryTabView);
	},
	getCategoryPanelView: function(category) {
		var newPanel = this.getCategoryTabPanelView(category);
		var pimsList = category.getPimsManager().getPims();
		for(var i = 0; i < pimsList.length; i++) {
			var currentPim = pimsList[i];
			if(currentPim.getCategory().getId() == category.getId())
				newPanel.appendChild(currentPim.getView());
		}
		return newPanel;
	},
	getCategoryTabPanelView: function(category) {
		var newPanel = this.getPluginElement('tabpanel',['id','class'],
                                                       	[category.getId() + '_pims_category_panel','pims_panel']);
		newPanel.ondragenter = function(event) { event = event || window.event; event.stopPropagation(); event.preventDefault(); };
		newPanel.ondragover = function(event) { event = event || window.event; event.stopPropagation(); event.preventDefault(); };
		newPanel.ondragleave = function(event) { event = event || window.event; event.stopPropagation(); event.preventDefault(); };
		newPanel.ondrop = function(event) { category.doDrop(event); };
		return newPanel;
	},
	getCategoryTabView: function(category) {
		var newTab = this.getPluginElement('tab',['id','label'],
                                                 [category.getId() + '_pims_category_tab',category.getName().capitalize()]);
		if(category.isSelected())
			newTab.setAttribute('selected','true');
		if(category.getCanBeDeleted()) {
			newTab.setAttribute('class','pims_tab pims_tab_shift');
			newTab.setAttribute('context','pims_tabs_contextual_menu');
			newTab.setAttribute('tooltiptext',categoryTabTooltipText);
			newTab.ondblclick = function(event) { category.getPimsManager().renameCategoryDialog(category); };
		}
		else {
			newTab.setAttribute('class','pims_tab');
			newTab.setAttribute('context','pims_general_tab_contextual_menu');
		}
		newTab.onclick = function(event) { category.getPimsManager().selectCategory(category); };
		newTab.ondragenter = function(event) { category.doDragEnter(event); };
		newTab.ondragover = function(event) { category.doDragOver(event); };
		newTab.ondragleave = function(event) { category.doDragLeave(event); };
		newTab.ondrop = function(event) { category.doDrop(event); };
		return newTab;
	},
	selectCategory: function(category) {
		var tabbox = this.pluginContext.getElementById('pims_tabbox');
		var tab = this.pluginContext.getElementById(category.getId() + '_pims_category_tab');
		tabbox.selectedTab = tab;
	},
	/*-----------------------------------------------
		Pims methods
	-----------------------------------------------*/
	updatePimView: function(pim) {
		var oldPimView = this.pluginContext.getElementById(pim.getId());
		var newPimView = this.getPimView(pim);
        oldPimView.parentNode.replaceChild(newPimView, oldPimView);
	},
	getPimView: function(pim) {
		var pimView = this.getPluginElement('vbox',['id','class','context'],
                                                   [pim.getId(),'pim','pims_contextual_menu']);
		pimView.appendChild(this.getPimHeaderView(pim));
		pimView.appendChild(this.getPimBodyView(pim));
		pimView.onclick = function(event) { pim.getPimsManager().setSelectedPim(pim); };
		pimView.ondragstart = function(event) { pim.doDragStart(event); };
		pimView.ondragend = function(event) { pim.doDragEnd(event); };
		/*pimView.ondragenter = function(event) { doDragEnterPimFormInput(event); };
		pimView.ondragover = function(event) { doDragOverPimFormInput(event); };
		pimView.ondragleave = function(event) { doDragLeavePimFormInput(event); };
		pimView.ondrop = function(event) { doDropPimFormInput(event); };*/
		return pimView;
	},
	getPimHeaderView: function(pim) {
		var headerBox = this.getPluginElement('hbox',[],[]);
		var nameBox = this.getPluginElement('hbox',['class'],
												   ['pim_name_box']);
		if(pim.isNameEdited()) {
			nameBox.appendChild(this.getPimEditedNameView(pim));
			nameBox.appendChild(this.getPimOrPimElementEditedValueImagesView(pim,'pimName'));
		}
		else
			nameBox.appendChild(this.getPimNameView(pim));
		headerBox.appendChild(nameBox);
		headerBox.appendChild(this.getPimToggleBoxView(pim));
		return headerBox;
	},
	getPimNameView: function(pim) {
		var nameLabelValue = pim.getName();
		if(nameLabelValue.isEmpty())
			nameLabelValue = pimDefaultNameValue;
		var nameLabel = this.getPluginElement('label',['class','value'],
                                                 	  ['pim_name',nameLabelValue]);
		nameLabel.ondblclick = function(event) { pim.editName(event); };
		return nameLabel;
	},
	getPimEditedNameView: function(pim) {
		var nameLabelValue = pim.getName();
		if(nameLabelValue.isEmpty())
			nameLabelValue = pimDefaultNameValue;
		var nameTextBox = this.getPluginElement('textbox',['id','class','value','context'],
                                                 	 	  [pim.getId() + '_name_textbox','pim_name_textbox',nameLabelValue,'pim_value_change_contextual_menu']);
		nameTextBox.onkeypress = function(event) { pim.keyPressEditName(event); };
		return nameTextBox;
	},
	getPimEditedNameDom: function(pim) {
		return this.pluginContext.getElementById(pim.getId() + '_name_textbox');
	},
	getPimToggleBoxView: function(pim) {
		var toggleBox = this.getPluginElement('vbox',['class'],
													 ['pim_toggle_box']);
		toggleBox.appendChild(this.getPimToggleImageView(pim));
		return toggleBox;
	},
	getPimToggleImageView: function(pim) {
		var toggleImagePath = 'images/bottom.png';
		var toggleImageTooltipText = pimExpandTooltipText;
		if(pim.isOpened()) {
			toggleImagePath = 'images/top.png';
			toggleImageTooltipText = pimReduceTooltipText;
		}
		var toggleImage = this.getPluginElement('image',['class','src','tooltiptext'],
                                                 	 	['pim_toggle_image',toggleImagePath,toggleImageTooltipText]);
		toggleImage.onclick = function(event) { if(event.button == 0) pim.toggle(); };
		return toggleImage;
	},
	getPimBodyView: function(pim) {
		var bodyBox = this.getPluginElement('vbox',['class'],
                                                   ['pim_body']);
		if(pim.isOpened())
			bodyBox.style.display = 'block';
		else
			bodyBox.style.display = 'none';
        bodyBox.appendChild(this.getPimElementsView(pim));
		bodyBox.appendChild(this.getPimButtonsBoxView(pim));
		return bodyBox;
	},
	getPimElementsView: function(pim) {
		var pimElementsBox = this.getPluginElement('vbox',['class'],
                                                 	   	  ['pim_elements_box']);
		var pimElements = pim.getPimElements();
		for(var i = 0; i < pimElements.length; i++)
            pimElementsBox.appendChild(this.getPimElementBoxView(pim,pimElements[i]));
		return pimElementsBox;
	},
	getPimElementBoxView: function(pim,pimElement) {
		var pimElementBox = this.getPluginElement('vbox',['class'],
                                              			 ['pim_element_box']);
		var pimElementView = pimElement.getView();
		pimElementView.setAttribute('rel', pim.getId());
        pimElementBox.appendChild(pimElementView);
		return pimElementBox;
	},
	getPimButtonsBoxView: function(pim) {
		var buttonsBox = this.getPluginElement('hbox',['class'],
                                                 	  ['pim_buttons_box']);
		buttonsBox.appendChild(this.getAddPimElementButtonView(pim));
		buttonsBox.appendChild(this.getDeletePimButtonView(pim));
		return buttonsBox;
	},
	getAddPimElementButtonView: function(pim) {
		var addPimElementButton = this.getPluginElement('button',['class','label'],
                                                 	 	 		 ['pim_button',pimAddElementLabel]);
		addPimElementButton.onclick = function(event) { if(event.button == 0) pim.createPimElementDialog(); };
		return addPimElementButton;
	},
	getDeletePimButtonView: function(pim) {
		var deletePimButton = this.getPluginElement('button',['class','label'],
                                             	 	 	     ['pim_button',pimDeleteLabel]);
		deletePimButton.onclick = function(event) { if(event.button == 0) pim.getPimsManager().deletePimDialog(pim); };
		return deletePimButton;
	},
	/*-----------------------------------------------
		 Pims elements methods
	-----------------------------------------------*/
	updatePimElementView: function(pimElement) {
		var oldPimElementView = this.pluginContext.getElementById(pimElement.getId());
		var newPimElementView = this.getPimElementView(pimElement);
        oldPimElementView.parentNode.replaceChild(newPimElementView, oldPimElementView);
	},
	getPimElementView: function(pimElement) {
		var obj = this;
		var pimElementView = this.getPluginElement('hbox',['id','context'],
                                                 	  	  [pimElement.getId(),'pims_elements__contextual_menu']);
		pimElementView.appendChild(this.getPimElementBodyView(pimElement));
		if(!pimElement.isEdited() && pimElement.getPimsManager().getShowPimsElementsIconicMenus())
			pimElementView.appendChild(this.getPimElementToolsBoxView(pimElement));
		pimElementView.onclick = function(event) { pimElement.getPimsManager().setSelectedPimElement(pimElement); };
		pimElementView.onmouseover = function(event) { obj.getPimElementToolsBoxDom(pimElement).style.display = 'block'; };
		pimElementView.onmouseout = function(event) { obj.getPimElementToolsBoxDom(pimElement).style.display = 'none'; };
		//pimElementView.ondragstart = function(event) { pimElement.doDragStart(event); };
		//pimElementView.ondragend = function(event) { pimElement.doDragEnd(event); };
		return pimElementView;
	},
	getPimElementToolsBoxView: function(pimElement) {
		var toolsBox = this.getPluginElement('vbox',['id','class'],
													[pimElement.getId() + '_tools_images_box','pim_element_tools_images_box']);
		toolsBox.appendChild(this.getPimElementDeleteBoxView(pimElement));
		toolsBox.appendChild(this.getPimElementEditAnnotationValueBoxView(pimElement));
		toolsBox.appendChild(this.getPimElementEditValueBoxView(pimElement));
		return toolsBox;
	},
	getPimElementToolsBoxDom: function(pimElement) {
		return this.pluginContext.getElementById(pimElement.getId() + '_tools_images_box');
	},
	getPimElementDeleteBoxView: function(pimElement) {
		var deleteBox = this.getPluginElement('vbox',[],[]);
		var deleteImage = this.getPluginElement('image',['class','src','tooltiptext'],
                                                 	  	['pim_element_tool_image','images/delete.png',pimElementDeletionLabel]);
		deleteImage.onclick = function(event) { if(event.button == 0) pimElement.getPim().deletePimElementDialog(pimElement); };
		deleteBox.appendChild(deleteImage);
		return deleteBox;
	},
	getPimElementEditAnnotationValueBoxView: function(pimElement) {
		var editAnnotationValueBox = this.getPluginElement('vbox',[],[]);
		var editAnnotationValueImage = this.getPluginElement('image',['class','src','tooltiptext'],
                                                 	  				 ['pim_element_tool_image','images/editAnnotationValue.png',pimElementAnnotationValueEditionLabel]);
		editAnnotationValueImage.onclick = function(event) { if(event.button == 0) pimElement.editAnnotationValue(null); };
		editAnnotationValueBox.appendChild(editAnnotationValueImage);
		return editAnnotationValueBox;
	},
	getPimElementEditValueBoxView: function(pimElement) {
		var editAnnotationValueBox = this.getPluginElement('vbox',[],[]);
		var editAnnotationValueImage = this.getPluginElement('image',['class','src','tooltiptext'],
                                                 	  				 ['pim_element_tool_image','images/editValue.png',pimElementValueEditionLabel]);
		editAnnotationValueImage.onclick = function(event) { if(event.button == 0) pimElement.editValue(null); };
		editAnnotationValueBox.appendChild(editAnnotationValueImage);
		return editAnnotationValueBox;
	},
	getPimElementBodyView: function(pimElement) {
		var pimElementBody = this.getPluginElement('vbox',[],[]);
		pimElementBody.appendChild(this.getPimElementAnnotationValueBoxView(pimElement));
		pimElementBody.appendChild(this.getPimElementValueBoxView(pimElement));
		return pimElementBody;
	},
	getPimElementAnnotationValueBoxView: function(pimElement) {
		var annotationValueBox = this.getPluginElement('hbox',['class'],
															  ['pim_element_annotation_value_box']);
		if(pimElement.isAnnotationValueEdited()) {
			annotationValueBox.appendChild(this.getPimElementEditedAnnotationValueView(pimElement));
			annotationValueBox.appendChild(this.getPimOrPimElementEditedValueImagesView(pimElement,'pimElementAnnotationValue'));
		}
		else
			annotationValueBox.appendChild(this.getPimElementAnnotationValueView(pimElement));
		annotationValueBox.ondblclick = function(event) { pimElement.editAnnotationValue(event); };
		return annotationValueBox;
	},
	getPimElementAnnotationValueView: function(pimElement) {
		var annotationValueLabelValue = pimElement.getAnnotationValue();
		if(annotationValueLabelValue.isEmpty())
			annotationValueLabelValue = pimElementDefaultAnnotationValue;
		var annotationValueLabel = this.getPluginElement('label',['class','value'],
                                                 	  	 		 ['pim_element_annotation_value',annotationValueLabelValue]);
		return annotationValueLabel;
	},
	getPimElementEditedAnnotationValueView: function(pimElement) {
		var annotationValueLabelValue = pimElement.getAnnotationValue();
		if(annotationValueLabelValue.isEmpty())
			annotationValueLabelValue = pimElementDefaultAnnotationValue;
		var annotationValueTextBox = this.getPluginElement('textbox',['id','class','value','context'],
                                                 	 	  			 [pimElement.getId() + '_annotation_value_textbox','pim_element_annotation_value_textbox',annotationValueLabelValue,'pim_value_change_contextual_menu']);
		annotationValueTextBox.onkeypress = function(event) { pimElement.keyPressEditAnnotationValue(event); };
		return annotationValueTextBox;
	},
	getPimElementEditedAnnotationValueDom: function(pimElement) {
		return this.pluginContext.getElementById(pimElement.getId() + '_annotation_value_textbox');
	},
	getPimElementValueBoxView: function(pimElement) {
		var valueBox = this.getPluginElement('hbox',['class'],
													['pim_element_value_box']);
		if(pimElement.isValueEdited()) {
			valueBox.appendChild(this.getPimElementEditedValueView(pimElement));
			valueBox.appendChild(this.getPimOrPimElementEditedValueImagesView(pimElement,'pimElementValue'));
		}
		else
			valueBox.appendChild(this.getPimElementValueView(pimElement));
		valueBox.ondblclick = function(event) { pimElement.editValue(event); };
		return valueBox;
	},
	getPimElementValueView: function(pimElement) {
		var valueLabelValue = pimElement.getValue();
		if(valueLabelValue.isEmpty())
			valueLabelValue = pimElementDefaultValue;
		var valueLabel = this.getPluginElement('label',['class','value'],
                                                 	   ['pim_element_value',valueLabelValue]);
		return valueLabel;
	},
	getPimElementEditedValueView: function(pimElement) {
		var valueLabelValue = pimElement.getValue();
		if(valueLabelValue.isEmpty())
			valueLabelValue = pimElementDefaultValue;
		var valueTextBox = this.getPluginElement('textbox',['id','class','value','context'],
                                                 	 	   [pimElement.getId() + '_value_textbox','pim_element_value_textbox',valueLabelValue,'pim_value_change_contextual_menu']);
		valueTextBox.onkeypress = function(event) { pimElement.keyPressEditValue(event); };
		return valueTextBox;
	},
	getPimOrPimElementEditedValueImagesView: function(pimOrPimElement,editionType) {
		var obj = this;
		var editImagesBox = this.getPluginElement('vbox',['class'],
														 ['pim_element_edited_value_images']);
		var acceptImageBox = this.getPluginElement('vbox',[],[]);
		var acceptImage = this.getPluginElement('image',['class','src','tooltiptext'],
                                                 	  			 ['pim_element_edited_value_accept_image','images/accept.png',pimsAcceptValueChangeLabel]);
		acceptImage.onclick = function(event) {
			if(event.button == 0) {
				var textBox = null;
				if(editionType == 'pimName') {
					textBox = obj.getPimEditedNameDom(pimOrPimElement);
					pimOrPimElement.changeName(textBox.value);
				}
				else if(editionType == 'pimElementAnnotationValue') {
					textBox = obj.getPimElementEditedAnnotationValueDom(pimOrPimElement);
					pimOrPimElement.changeAnnotationValue(textBox.value);
				}
				else if(editionType == 'pimElementValue') {
					textBox = obj.getPimElementEditedValueDom(pimOrPimElement);
					pimOrPimElement.changeValue(textBox.value);
				}
			}
		};
		acceptImageBox.appendChild(acceptImage);
		editImagesBox.appendChild(acceptImageBox);
		var cancelImageBox = this.getPluginElement('vbox',[],[]);
		var cancelImage = this.getPluginElement('image',['class','src','tooltiptext'],
                                                 	  	   		 ['pim_element_edited_value_cancel_image','images/cancel.png',pimsCancelValueChangeLabel]);
		cancelImage.onclick = function(event) {
			if(event.button == 0) {
				if(editionType == 'pimName')
					pimOrPimElement.setNameEdited(false);
				else if(editionType == 'pimElementAnnotationValue')
					pimOrPimElement.setAnnotationValueEdited(false);
				else if(editionType == 'pimElementValue')
					pimOrPimElement.setValueEdited(false);
				pimOrPimElement.updateView();
			}
		};
		cancelImageBox.appendChild(cancelImage);
		editImagesBox.appendChild(cancelImageBox);
		return editImagesBox;
	},
	getPimElementEditedValueDom: function(pimElement) {
		return this.pluginContext.getElementById(pimElement.getId() + '_value_textbox');
	},
	/*-----------------------------------------------
		Getters & Setters
	-----------------------------------------------*/
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
	getUtilInterfaceTool: function() {
		return this.utilInterfaceTool;
	},
	setUtilInterfaceTool: function(utilInterfaceTool) {
		this.utilInterfaceTool = utilInterfaceTool;
	}
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PimsHtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PimsHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
PimsHtmlInterfaceTool.prototype = {
	
}