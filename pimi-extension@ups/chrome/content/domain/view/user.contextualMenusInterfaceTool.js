/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
ContextualMenusXulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function ContextualMenusXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
ContextualMenusXulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        return this.utilInterfaceTool.getPluginElement(elementType,attributesNames,attributesValues);
    },
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	/** Contextual menu elements */
    getMenuPopupsetView: function() {
        return this.getPluginElement('popupset',[],[]);
    },
    getMenuPopupView: function(id) {
        return this.getPluginElement('menupopup',['id'],
                                                 [id]);
    },
    getMenuEmptyPopupView: function() {
        return this.getPluginElement('menupopup',[],[]);
    },
    getMenuView: function(imagePath,label) {
        return this.getPluginElement('menu',['class','image','label'],
                                            ['menu-iconic',imagePath,label]);
    },
    getMenuItemView: function(imagePath,label) {
        return this.getPluginElement('menuitem',['class','image','label'],
                                                ['menuitem-iconic',imagePath,label]);
    },
    getMenuSeparatorView: function() {
        return this.getPluginElement('menuseparator',[],[]);
    },
    /** Contextual menus */
    addGeneralContextMenuView: function(personalSpace,contextMenuPopup) {
        var seeHomePageGeneralContextualMenuItem = this.getMenuItemView('images/home.png',menuContextualSeePimiHomePageLabel);
        seeHomePageGeneralContextualMenuItem.onclick = function(event) { personalSpace.showPimiHome(); };
        contextMenuPopup.appendChild(seeHomePageGeneralContextualMenuItem);
        
        var seeAnnotationsFilesGeneralContextualMenuItem = this.getMenuItemView('images/annotations.png',menuContextualSeeAnnotationsFilesLabel);
        seeAnnotationsFilesGeneralContextualMenuItem.onclick = function(event) { personalSpace.showAnnotationsFiles(); };
        contextMenuPopup.appendChild(seeAnnotationsFilesGeneralContextualMenuItem);
        
        var seeMicroformatsFilesGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualSeeMicroformatsFilesLabel);
        seeMicroformatsFilesGeneralContextualMenuItem.onclick = function(event) { personalSpace.showMicroformatsFiles(); };
        contextMenuPopup.appendChild(seeMicroformatsFilesGeneralContextualMenuItem);

        contextMenuPopup.appendChild(this.getMenuSeparatorView());

        var seePimsFileGeneralContextualMenuItem = this.getMenuItemView('images/pims.png',menuContextualSeePimsFileLabel);
        seePimsFileGeneralContextualMenuItem.onclick = function(event) { personalSpace.showPersonalPims(); };
        contextMenuPopup.appendChild(seePimsFileGeneralContextualMenuItem);
        
        var savePimsGeneralContextualMenuItem = this.getMenuItemView('images/floppy.png',menuContextualSavePimsLabel);
        savePimsGeneralContextualMenuItem.onclick = function(event) { personalSpace.save(); };
        contextMenuPopup.appendChild(savePimsGeneralContextualMenuItem);
        
        contextMenuPopup.appendChild(this.getPimsAutoSaveMenuView(personalSpace));

        contextMenuPopup.appendChild(this.getMenuSeparatorView());
        
        var logOutGeneralContextualMenuItem = this.getMenuItemView('images/exit.png',menuContextualLogOutLabel);
        logOutGeneralContextualMenuItem.onclick = function(event) { personalSpace.exit(); };
        contextMenuPopup.appendChild(logOutGeneralContextualMenuItem);
    },
    getPimsPanelContextMenuView: function(pimsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_panel_contextual_menu');

        var addPimCategoryGeneralContextualMenuItem = this.getMenuItemView('images/whitePlus.png',menuContextualAddPimCategoryLabel);
        addPimCategoryGeneralContextualMenuItem.onclick = function(event) { pimsManager.addCategoryDialog(''); };
        generalMenuPopup.appendChild(addPimCategoryGeneralContextualMenuItem);

        var addEmptyPimGeneralContextualMenuItem = this.getMenuItemView('images/user.png',menuContextualAddEmptyPimLabel);
        addEmptyPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addPimToSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(addEmptyPimGeneralContextualMenuItem);
        
        generalMenuPopup.appendChild(this.getMicroformatedPimsMenuView(pimsManager));

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        generalMenuPopup.appendChild(this.getShowPicturesBoxMenuView(pimsManager));
        generalMenuPopup.appendChild(this.getShowPimsElementsIconicMenusMenuView(pimsManager));
        
        /*generalMenuPopup.appendChild(this.getMenuSeparatorView());
        var clearLogConsoleGeneralContextualMenuItem = this.getMenuItemView('images/console.png',menuContextualClearLogConsoleLabel);
        //clearLogConsoleGeneralContextualMenuItem.onclick = function(event) { clearLogConsole(); };
        generalMenuPopup.appendChild(clearLogConsoleGeneralContextualMenuItem);*/
        
        /*generalMenuPopup.appendChild(this.getMenuSeparatorView());
        generalMenuPopup.appendChild(this.getCompletionWithPimsMenuView(pimsManager));
        generalMenuPopup.appendChild(this.getDetectedSemanticMenuView(pimsManager));
        generalMenuPopup.appendChild(this.getPimsSavingMenuView(pimsManager));*/

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        this.addGeneralContextMenuView(pimsManager.getPersonalSpace(),generalMenuPopup);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getGeneralCategoryTabContextMenuView: function(pimsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_general_tab_contextual_menu');
        
        var addEmptyPimPimsGeneralTabContextualMenuItem = this.getMenuItemView('images/user.png',menuContextualAddEmptyPimLabel);
        addEmptyPimPimsGeneralTabContextualMenuItem.onclick = function(event) { pimsManager.addPimToSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(addEmptyPimPimsGeneralTabContextualMenuItem);
        
        generalMenuPopup.appendChild(this.getMicroformatedPimsMenuView(pimsManager));

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getCategoriesTabsContextMenuView: function(pimsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_tabs_contextual_menu');

        var addEmptyPimPimsTabsContextualMenuItem = this.getMenuItemView('images/user.png',menuContextualAddEmptyPimLabel);
        addEmptyPimPimsTabsContextualMenuItem.onclick = function(event) { pimsManager.addPimToSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(addEmptyPimPimsTabsContextualMenuItem);
        
        generalMenuPopup.appendChild(this.getMicroformatedPimsMenuView(pimsManager));

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        generalMenuPopup.appendChild(this.getDeleteCategoryMenuView(pimsManager));
        
        var renameCategoryPimsTabsContextualMenuItem = this.getMenuItemView('images/rename.png',menuContextualRenameCategoryLabel);
        renameCategoryPimsTabsContextualMenuItem.onclick = function(event) { pimsManager.renameSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(renameCategoryPimsTabsContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getPimsContextMenuView: function(pimsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_contextual_menu');
        
        var showHidePimPimsContextualMenuItem = this.getMenuItemView('images/showHide.png',menuContextualShowHidePimLabel);
        showHidePimPimsContextualMenuItem.onclick = function(event) { pimsManager.toggleSelectedPim(); };
        generalMenuPopup.appendChild(showHidePimPimsContextualMenuItem);
        
        var renamePimPimsContextualMenuItem = this.getMenuItemView('images/rename2.png',menuContextualRenamePimLabel);
        renamePimPimsContextualMenuItem.onclick = function(event) { pimsManager.editNameSelectedPimDialog(); };
        generalMenuPopup.appendChild(renamePimPimsContextualMenuItem);

        var deletePimPimsContextualMenuItem = this.getMenuItemView('images/greenMinus.png',menuContextualDeletePimLabel);
        deletePimPimsContextualMenuItem.onclick = function(event) { pimsManager.deleteSelectedPimDialog(); };
        generalMenuPopup.appendChild(deletePimPimsContextualMenuItem);

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        var addInformationPimsContextualMenuItem = this.getMenuItemView('images/greenPlus.png',menuContextualAddInformationLabel);
        addInformationPimsContextualMenuItem.onclick = function(event) { pimsManager.addPimElementToSelectedPimDialog(); };
        generalMenuPopup.appendChild(addInformationPimsContextualMenuItem);

        /*generalMenuPopup.appendChild(this.getMenuSeparatorView());

        var useToCompleteFormPimsContextualMenuItem = this.getMenuItemView('images/fill.png',menuContextualUseToCompleteFormLabel);
        //useToCompleteFormPimsContextualMenuItem.onclick = function(event) { completeFormWithPimContextMenu(); };
        useToCompleteFormPimsContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        generalMenuPopup.appendChild(useToCompleteFormPimsContextualMenuItem);*/

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getPimsElementsContextMenuView: function(pimsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_elements_contextual_menu');

        var deletePimElementPimsElementsContextualMenuItem = this.getMenuItemView('images/delete_big.png',menuContextualDeletePimElementLabel);
        deletePimElementPimsElementsContextualMenuItem.onclick = function(event) { pimsManager.deleteSelectedPimElementDialog(); };
        generalMenuPopup.appendChild(deletePimElementPimsElementsContextualMenuItem);
        
        var editAnnotationValuePimsElementsContextualMenuItem = this.getMenuItemView('images/editType_big.png',menuContextualEditAnnotationValuePimElementLabel);
        editAnnotationValuePimsElementsContextualMenuItem.onclick = function(event) { pimsManager.editAnnotationValueSelectedPimElementDialog(); };
        generalMenuPopup.appendChild(editAnnotationValuePimsElementsContextualMenuItem);
        
        var editValuePimsElementsContextualMenuItem = this.getMenuItemView('images/editValue_big.png',menuContextualEditValuePimElementLabel);
        editValuePimsElementsContextualMenuItem.onclick = function(event) { pimsManager.editValueSelectedElementPim(); };
        generalMenuPopup.appendChild(editValuePimsElementsContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getPimChangeValueContextMenuView: function(pimsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pim_value_change_contextual_menu');

        var pasteSemanticDetectionContextualMenuItem = this.getMenuItemView('images/clipboard.png',menuContextualPasteSemanticDetectionLabel);
        //pasteSemanticDetectionContextualMenuItem.onclick = function(event) { pasteInputDetectedSemantic(); };
        pasteSemanticDetectionContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        generalMenuPopup.appendChild(pasteSemanticDetectionContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getMicroformatsPanelContextMenuView: function(microformatsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('microformats_panel_contextual_menu');

        this.addGeneralContextMenuView(microformatsManager.getPersonalSpace(),generalMenuPopup);
        
        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getMicroformatsTreeContextMenuView: function(microformatsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('microformat_based_pim_contextual_menu');

        var addMicroformatBasedPimContextualMenuItem = this.getMenuItemView('images/pim.png',menuContextualAddMicroformatBasedPimLabel);
        //addMicroformatBasedPimContextualMenuItem.onclick = function(event) { addMicroformatBasedPim(); };
        addMicroformatBasedPimContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        generalMenuPopup.appendChild(addMicroformatBasedPimContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getAnnotationsPanelContextMenuView: function(annotationsManager) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('annotations_panel_contextual_menu');

        this.addGeneralContextMenuView(annotationsManager.getPersonalSpace(),generalMenuPopup);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    /** Contextual submenus */
    getDeleteCategoryMenuView: function(pimsManager) {
        var deleteCategoryMenu = this.getMenuView('images/whiteMinus.png',menuContextualDeleteCategoryLabel);
        var deleteCategoryMenuPopup = this.getMenuEmptyPopupView();

        var deleteCategoryMovingPimsTabsContextualMenuItem = this.getMenuItemView('images/trash.png',menuContextualDeleteCategoryMovingPimsLabel);
        deleteCategoryMovingPimsTabsContextualMenuItem.onclick = function(event) { pimsManager.deleteSelectedCategoryDeletingPimsDialog(); };
        deleteCategoryMenuPopup.appendChild(deleteCategoryMovingPimsTabsContextualMenuItem);

        var deleteCategoryDeletingPimsTabsContextualMenuItem = this.getMenuItemView('images/move.png',menuContextualDeleteCategoryDeletingPimsLabel);
        deleteCategoryDeletingPimsTabsContextualMenuItem.onclick = function(event) { pimsManager.deleteSelectedCategoryMovingPimsDialog(); };
        deleteCategoryMenuPopup.appendChild(deleteCategoryDeletingPimsTabsContextualMenuItem);

        deleteCategoryMenu.appendChild(deleteCategoryMenuPopup);
        return deleteCategoryMenu;
    },
    getMicroformatedPimsMenuView: function(pimsManager) {
        var addMicroformatedPimsMenu = this.getMenuView('images/pim.png',menuContextualAddFormatedPimLabel);
        var addFormatedPimsMenuPopup = this.getMenuEmptyPopupView();

        /*var addShortHcalendarPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddShortHcalendarPimLabel);
        //addShortHcalendarPimGeneralContextualMenuItem.onclick = function(event) { addFormatedPimToCategory('hcalendar'); };
        addFormatedPimsMenuPopup.appendChild(addShortHcalendarPimGeneralContextualMenuItem);
        var addShortHcardPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddShortHcardPimLabel);
        //addShortHcardPimGeneralContextualMenuItem.onclick = function(event) { addFormatedPimToCategory('hcard'); };
        addFormatedPimsMenuPopup.appendChild(addShortHcardPimGeneralContextualMenuItem);

        addFormatedPimsMenuPopup.appendChild(this.getMenuSeparatorView());*/

        var addHcalendarPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHcalendarPimLabel);
        addHcalendarPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hcalendar',true); };
        addFormatedPimsMenuPopup.appendChild(addHcalendarPimGeneralContextualMenuItem);
        
        var addHcardPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHcardPimLabel);
        addHcardPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addHCardProposedFormatedPimsToSelectedCategory(); };
        addFormatedPimsMenuPopup.appendChild(addHcardPimGeneralContextualMenuItem);

        /*var addHreviewPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHreviewPimLabel);
        addHreviewPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hreview',true); };
        addFormatedPimsMenuPopup.appendChild(addHreviewPimGeneralContextualMenuItem);
        var addXoxoPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddXoxoPimLabel);
        addXoxoPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('xoxo',true); };
        addFormatedPimsMenuPopup.appendChild(addXoxoPimGeneralContextualMenuItem);*/
        
        addFormatedPimsMenuPopup.appendChild(this.getMenuSeparatorView());
        
        var addHaddressPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHaddressPimLabel);
        addHaddressPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('haddress',true); };
        addFormatedPimsMenuPopup.appendChild(addHaddressPimGeneralContextualMenuItem);

        /*var addHbankPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHbankPimLabel);
        addHbankPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hbank',true); };
        addFormatedPimsMenuPopup.appendChild(addHbankPimGeneralContextualMenuItem);*/

        var addHcontactPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHcontactPimLabel);
        addHcontactPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hcontact',true); };
        addFormatedPimsMenuPopup.appendChild(addHcontactPimGeneralContextualMenuItem);
        
        var addHidentityPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHidentityPimLabel);
        addHidentityPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hidentity',true); };
        addFormatedPimsMenuPopup.appendChild(addHidentityPimGeneralContextualMenuItem);

        addFormatedPimsMenuPopup.appendChild(this.getMenuSeparatorView());

        var addHlogPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHlogPimLabel);
        addHlogPimGeneralContextualMenuItem.onclick = function(event) { pimsManager.addProposedFormatedPimToSelectedCategory('hlog',true); };
        addFormatedPimsMenuPopup.appendChild(addHlogPimGeneralContextualMenuItem);

        addMicroformatedPimsMenu.appendChild(addFormatedPimsMenuPopup);
        return addMicroformatedPimsMenu;
    },
    getShowPicturesBoxMenuView: function(pimsManager) {
        var showToolPicturesBoxMenu = this.getMenuView('images/desk.png',menuContextualToolPicturesBoxLabel);
        var showToolPicturesBoxMenuPopup = this.getMenuEmptyPopupView();

        var hideToolPicturesBoxMenuItem = this.getMenuItemView('images/disable.png',menuContextualHideToolPicturesBoxLabel);
        hideToolPicturesBoxMenuItem.onclick = function(event) { pimsManager.setShowToolPicturesBox(false);
                                                                pimsManager.updatePanelView(); };
        showToolPicturesBoxMenuPopup.appendChild(hideToolPicturesBoxMenuItem);
        
        var showToolPicturesBoxMenuItem = this.getMenuItemView('images/enable.png',menuContextualShowToolPicturesBoxLabel);
        showToolPicturesBoxMenuItem.onclick = function(event) { pimsManager.setShowToolPicturesBox(true);
                                                                pimsManager.updatePanelView(); };
        showToolPicturesBoxMenuPopup.appendChild(showToolPicturesBoxMenuItem);

        showToolPicturesBoxMenu.appendChild(showToolPicturesBoxMenuPopup);
        return showToolPicturesBoxMenu;
    },
    getShowPimsElementsIconicMenusMenuView: function(pimsManager) {
        var showPimsElementsIconicMenusMenu = this.getMenuView('images/tools.png',menuContextualPimsElementsIconicMenusLabel);
        var showPimsElementsIconicMenusMenuPopup = this.getMenuEmptyPopupView();

        var hidePimsElementsIconicMenusMenuItem = this.getMenuItemView('images/disable.png',menuContextualHidePimsElementsIconicMenusLabel);
        hidePimsElementsIconicMenusMenuItem.onclick = function(event) { pimsManager.setShowPimsElementsIconicMenus(false);
                                                                        pimsManager.updateView(); };
        showPimsElementsIconicMenusMenuPopup.appendChild(hidePimsElementsIconicMenusMenuItem);
        
        var showPimsElementsIconicMenusMenuItem = this.getMenuItemView('images/enable.png',menuContextualShowPimsElementsIconicMenusLabel);
        showPimsElementsIconicMenusMenuItem.onclick = function(event) { pimsManager.setShowPimsElementsIconicMenus(true);
                                                                        pimsManager.updateView(); };
        showPimsElementsIconicMenusMenuPopup.appendChild(showPimsElementsIconicMenusMenuItem);

        showPimsElementsIconicMenusMenu.appendChild(showPimsElementsIconicMenusMenuPopup);
        return showPimsElementsIconicMenusMenu;
    },
    getCompletionWithPimsMenuView: function(pimsManager) {
        var completionWithPimsMenu = this.getMenuView('images/formEnabled.png',menuContextualCompletionWithPimsLabel);
        var completionWithPimsMenuPopup = this.getMenuEmptyPopupView();

        var disableCompletionWithPimsGeneralContextualMenuItem = this.getMenuItemView('images/disable.png',menuContextualDisableCompletionWithPimsLabel);
        //disableCompletionWithPimsGeneralContextualMenuItem.onclick = function(event) { disablePimsCompletion(); };
        disableCompletionWithPimsGeneralContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        completionWithPimsMenuPopup.appendChild(disableCompletionWithPimsGeneralContextualMenuItem);
        
        var enableCompletionWithPimsGeneralContextualMenuItem = this.getMenuItemView('images/enable.png',menuContextualEnableCompletionWithPimsLabel);
        //enableCompletionWithPimsGeneralContextualMenuItem.onclick = function(event) { enablePimsCompletion(); };
        enableCompletionWithPimsGeneralContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        completionWithPimsMenuPopup.appendChild(enableCompletionWithPimsGeneralContextualMenuItem);

        completionWithPimsMenu.appendChild(completionWithPimsMenuPopup);
        return completionWithPimsMenu;
    },
    getDetectedSemanticMenuView: function(pimsManager) {
        var detectedSemanticMenu = this.getMenuView('images/semantic.png',menuContextualDetectedInputsSemanticLabel);
        var detectedSemanticMenuPopup = this.getMenuEmptyPopupView();
        
        var hideDetectedInputsSemanticGeneralContextualMenuItem = this.getMenuItemView('images/disable.png',menuContextualHideDetectedInputsSemanticLabel);
        //hideDetectedInputsSemanticGeneralContextualMenuItem.onclick = function(event) { disableInputsSemanticDetection(); };
        hideDetectedInputsSemanticGeneralContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        detectedSemanticMenuPopup.appendChild(hideDetectedInputsSemanticGeneralContextualMenuItem);
        
        var showDetectedInputsSemanticGeneralContextualMenuItem = this.getMenuItemView('images/enable.png',menuContextualShowDetectedInputsSemanticLabel);
        //showDetectedInputsSemanticGeneralContextualMenuItem.onclick = function(event) { enableInputsSemanticDetection(); };
        showDetectedInputsSemanticGeneralContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        detectedSemanticMenuPopup.appendChild(showDetectedInputsSemanticGeneralContextualMenuItem);

        detectedSemanticMenu.appendChild(detectedSemanticMenuPopup);
        return detectedSemanticMenu;
    },
    getPimsSavingMenuView: function(pimsManager) {
        var addFormatedPimsMenu = this.getMenuView('images/database.png',menuContextualFormGroupsSaveLabel);
        var addFormatedPimsMenuPopup = this.getMenuEmptyPopupView();
        
        var disableFormGroupsSaveGeneralContextualMenuItem = this.getMenuItemView('images/disable.png',menuContextualDisableFormGroupsSaveLabel);
        //disableFormGroupsSaveGeneralContextualMenuItem.onclick = function(event) { disableFormGroupsSave(); };
        disableFormGroupsSaveGeneralContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        addFormatedPimsMenuPopup.appendChild(disableFormGroupsSaveGeneralContextualMenuItem);
        
        var enableFormGroupsSaveGeneralContextualMenuItem = this.getMenuItemView('images/enable.png',menuContextualEnableFormGroupsSaveLabel);
        //enableFormGroupsSaveGeneralContextualMenuItem.onclick = function(event) { enableFormGroupsSave(); };
        enableFormGroupsSaveGeneralContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        addFormatedPimsMenuPopup.appendChild(enableFormGroupsSaveGeneralContextualMenuItem);

        addFormatedPimsMenu.appendChild(addFormatedPimsMenuPopup);
        return addFormatedPimsMenu;
    },
    getPimsAutoSaveMenuView: function(personalSpace) {
        var autoSavePimsMenu = this.getMenuView('images/cycle.png',menuContextualPimsAutoSaveLabel);
        var autoSavePimsMenuPopup = this.getMenuEmptyPopupView();
        
        var disablePimsAutoSaveGeneralContextualMenuItem = this.getMenuItemView('images/disable.png',menuContextualDisablePimsAutoSaveLabel);
        disablePimsAutoSaveGeneralContextualMenuItem.onclick = function(event) { personalSpace.setAutoSaveMode(false); };
        autoSavePimsMenuPopup.appendChild(disablePimsAutoSaveGeneralContextualMenuItem);
        
        var enablePimsAutoSaveGeneralContextualMenuItem = this.getMenuItemView('images/enable.png',menuContextualEnablePimsAutoSaveLabel);
        enablePimsAutoSaveGeneralContextualMenuItem.onclick = function(event) { personalSpace.setAutoSaveMode(true); };
        autoSavePimsMenuPopup.appendChild(enablePimsAutoSaveGeneralContextualMenuItem);

        autoSavePimsMenu.appendChild(autoSavePimsMenuPopup);
        return autoSavePimsMenu;
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
ContextualMenusHtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function ContextualMenusHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
ContextualMenusHtmlInterfaceTool.prototype = {
	
}