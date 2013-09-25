/** Constants */
var MENU_ID = 'pimi_menu';

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
PersonalSpaceXulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PersonalSpaceXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
PersonalSpaceXulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        return this.utilInterfaceTool.getPluginElement(elementType,attributesNames,attributesValues);
    },
    /*-----------------------------------------------
        General methods
    -----------------------------------------------*/
    selectPanel: function(panelName){
        var pimsPanel = this.pluginContext.getElementById(PIMS_PANEL_ID);
        var microformatsPanel = this.pluginContext.getElementById(MICROFORMATS_PANEL_ID);
        var annotationsPanel = this.pluginContext.getElementById(ANNOTATION_PANEL_ID);
        if(panelName == 'pims') {
            pimsPanel.hidden = false;
            if(microformatsPanel != null)
                microformatsPanel.hidden = true;
            if(annotationsPanel != null)
                annotationsPanel.hidden = true;
        }
        else if(panelName == 'microformats') {
            pimsPanel.hidden = true;
            if(microformatsPanel != null)
                microformatsPanel.hidden = false;
            if(annotationsPanel != null)
                annotationsPanel.hidden = true;
        }
        else if(panelName == 'annotations') {
            pimsPanel.hidden = true;
            if(microformatsPanel != null)
                microformatsPanel.hidden = true;
            if(annotationsPanel != null)
                annotationsPanel.hidden = false;
        }
    },
    /*-----------------------------------------------
        Init methods
    -----------------------------------------------*/
    createPanelsView: function(personalSpace) {
        var rootElement = this.pluginContext.getElementById('pimi_sidebar');
        /** Menu bar */
        rootElement.appendChild(this.getMenuBarView(personalSpace));
        /** Pims panel */
        rootElement.appendChild(personalSpace.getPimsManager().getPanelView());
        /** Annotations panel */
        if(personalSpace.getUser().isUser())
            rootElement.appendChild(personalSpace.getMicroformatsManager().getView());
        else if(personalSpace.getUser().isAnnotator())
            rootElement.appendChild(personalSpace.getAnnotationsManager().getPanelView());
        /** Contextual menus */
        rootElement.appendChild(this.getGeneralContextMenuView(personalSpace));
        rootElement.appendChild(this.getGeneralCategoryTabContextMenuView(personalSpace));
        rootElement.appendChild(this.getCategoriesTabsContextMenuView(personalSpace));
        rootElement.appendChild(this.getPimsContextMenuView(personalSpace));
        rootElement.appendChild(this.getPimsElementsContextMenuView(personalSpace));
        rootElement.appendChild(this.getMicroformatsBasedPimsContextMenuView(personalSpace));
        rootElement.appendChild(this.getPimChangeValueContextMenuView(personalSpace));
    },
    /*-----------------------------------------------
        Exit methods
    -----------------------------------------------*/
    deletePanelsView: function(personalSpace) {
        var rootElement = this.pluginContext.getElementById('pimi_sidebar');
        /** Menu bar */
        var menuBarView = document.getElementById(MENU_ID);
        rootElement.removeChild(menuBarView);
        /** Pims panel */
        var pimsPanelView = document.getElementById(PIMS_PANEL_ID);
        rootElement.removeChild(pimsPanelView);
        /** Annotations panel */
        if(personalSpace.getUser().isUser()) {
            var microformatsPanelView = document.getElementById(MICROFORMATS_PANEL_ID);
            rootElement.removeChild(microformatsPanelView);
        }
        else if(personalSpace.getUser().isAnnotator()) {
            var annotationsPanelView = document.getElementById(ANNOTATION_PANEL_ID);
            rootElement.removeChild(annotationsPanelView);
        }
    },
    /*-----------------------------------------------
        Menu bar method
    -----------------------------------------------*/
    getMenuBarElementView: function(id) {
        return this.getPluginElement('menubar',['id'],
                                               [id]);
    },
    getMenuBarItemView: function(label) {
        return this.getPluginElement('menuitem',['flex','label'],
                                                ['1',label]);
    },
    getMenuBarView: function(personalSpace) {
        var tabsBar = this.getMenuBarElementView(MENU_ID);
        
        var logOutMenuItem = this.getMenuBarItemView(menuBarLogOutLabel);
        logOutMenuItem.onclick = function(event) { personalSpace.exit(); };
        tabsBar.appendChild(logOutMenuItem);
        var pimsMenuItem = this.getMenuBarItemView(menuBarPimsLabel);
        pimsMenuItem.onclick = function(event) { personalSpace.selectSideBarMenu('pims'); };
        tabsBar.appendChild(pimsMenuItem);
        if(personalSpace.getUser().isUser()) {
            var microformatsMenuItem = this.getMenuBarItemView(menuBarMicroformatsLabel);
            microformatsMenuItem.onclick = function(event) { personalSpace.selectSideBarMenu('microformats'); };
            tabsBar.appendChild(microformatsMenuItem);
        }
        else if(personalSpace.getUser().isAnnotator()) {
            var annotationsMenuItem = this.getMenuBarItemView(menuBarAnnotationLabel);
            annotationsMenuItem.onclick = function(event) { personalSpace.selectSideBarMenu('annotations'); };
            tabsBar.appendChild(annotationsMenuItem);
        }
        //tabsBar.ondragenter = function(event) { personalSpace.doDragEnterMicroformatBasedPim(event); };
        //tabsBar.ondragover = function(event) { personalSpace.doDragOverMicroformatBasedPim(event); };

        return tabsBar;
    },
    /*-----------------------------------------------
        Contextual menus methods
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
    getGeneralContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('general_contextual_menu');

        var addPimCategoryGeneralContextualMenuItem = this.getMenuItemView('images/whitePlus.png',menuContextualAddPimCategoryLabel);
        addPimCategoryGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addCategoryDialog(''); };
        generalMenuPopup.appendChild(addPimCategoryGeneralContextualMenuItem);
        var addEmptyPimGeneralContextualMenuItem = this.getMenuItemView('images/user.png',menuContextualAddEmptyPimLabel);
        addEmptyPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addPimToSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(addEmptyPimGeneralContextualMenuItem);
        generalMenuPopup.appendChild(this.getMicroformatedPimsMenuView(personalSpace));
        generalMenuPopup.appendChild(this.getMenuSeparatorView());
        generalMenuPopup.appendChild(this.getShowPimsElementsIconicMenusMenuView(personalSpace));
        
        /*generalMenuPopup.appendChild(this.getMenuSeparatorView());

        var clearLogConsoleGeneralContextualMenuItem = this.getMenuItemView('images/console.png',menuContextualClearLogConsoleLabel);
        //clearLogConsoleGeneralContextualMenuItem.onclick = function(event) { clearLogConsole(); };
        generalMenuPopup.appendChild(clearLogConsoleGeneralContextualMenuItem);*/
        
        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        generalMenuPopup.appendChild(this.getCompletionWithPimsMenuView(personalSpace));
        generalMenuPopup.appendChild(this.getDetectedSemanticMenuView(personalSpace));
        generalMenuPopup.appendChild(this.getPimsSavingMenuView(personalSpace));

        generalMenuPopup.appendChild(this.getMenuSeparatorView());
        
        var seeHomePageGeneralContextualMenuItem = this.getMenuItemView('images/home.png',menuContextualSeePimiHomePageLabel);
        seeHomePageGeneralContextualMenuItem.onclick = function(event) { personalSpace.showPimiHome(); };
        generalMenuPopup.appendChild(seeHomePageGeneralContextualMenuItem);
        var seeAnnotationsFilesGeneralContextualMenuItem = this.getMenuItemView('images/annotations.png',menuContextualSeeAnnotationsFilesLabel);
        seeAnnotationsFilesGeneralContextualMenuItem.onclick = function(event) { personalSpace.showAnnotationsFiles(); };
        generalMenuPopup.appendChild(seeAnnotationsFilesGeneralContextualMenuItem);
        var seeMicroformatsFilesGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualSeeMicroformatsFilesLabel);
        seeMicroformatsFilesGeneralContextualMenuItem.onclick = function(event) { personalSpace.showMicroformatsFiles(); };
        generalMenuPopup.appendChild(seeMicroformatsFilesGeneralContextualMenuItem);

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        var seePimsFileGeneralContextualMenuItem = this.getMenuItemView('images/pims.png',menuContextualSeePimsFileLabel);
        seePimsFileGeneralContextualMenuItem.onclick = function(event) { personalSpace.showPersonalPims(); };
        generalMenuPopup.appendChild(seePimsFileGeneralContextualMenuItem);
        var savePimsGeneralContextualMenuItem = this.getMenuItemView('images/floppy.png',menuContextualSavePimsLabel);
        savePimsGeneralContextualMenuItem.onclick = function(event) { personalSpace.save(); };
        generalMenuPopup.appendChild(savePimsGeneralContextualMenuItem);
        generalMenuPopup.appendChild(this.getPimsAutoSaveMenuView(personalSpace));

        generalMenuPopup.appendChild(this.getMenuSeparatorView());
        
        var logOutGeneralContextualMenuItem = this.getMenuItemView('images/exit.png',menuContextualLogOutLabel);
        logOutGeneralContextualMenuItem.onclick = function(event) { personalSpace.exit(); };
        generalMenuPopup.appendChild(logOutGeneralContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getGeneralCategoryTabContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_general_tab_contextual_menu');
        
        var addEmptyPimPimsGeneralTabContextualMenuItem = this.getMenuItemView('images/user.png',menuContextualAddEmptyPimLabel);
        addEmptyPimPimsGeneralTabContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addPimToSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(addEmptyPimPimsGeneralTabContextualMenuItem);
        generalMenuPopup.appendChild(this.getMicroformatedPimsMenuView(personalSpace));

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getCategoriesTabsContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_tabs_contextual_menu');

        var addEmptyPimPimsTabsContextualMenuItem = this.getMenuItemView('images/user.png',menuContextualAddEmptyPimLabel);
        addEmptyPimPimsTabsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addPimToSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(addEmptyPimPimsTabsContextualMenuItem);
        generalMenuPopup.appendChild(this.getMicroformatedPimsMenuView(personalSpace));

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        generalMenuPopup.appendChild(this.getDeleteCategoryMenuView(personalSpace));
        var renameCategoryPimsTabsContextualMenuItem = this.getMenuItemView('images/rename.png',menuContextualRenameCategoryLabel);
        renameCategoryPimsTabsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().renameSelectedCategoryDialog(); };
        generalMenuPopup.appendChild(renameCategoryPimsTabsContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getPimsContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_contextual_menu');

        var addInformationPimsContextualMenuItem = this.getMenuItemView('images/greenPlus.png',menuContextualAddInformationLabel);
        addInformationPimsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addPimElementToSelectedPimDialog(); };
        generalMenuPopup.appendChild(addInformationPimsContextualMenuItem);

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        var deletePimPimsContextualMenuItem = this.getMenuItemView('images/greenMinus.png',menuContextualDeletePimLabel);
        deletePimPimsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().deleteSelectedPimDialog(); };
        generalMenuPopup.appendChild(deletePimPimsContextualMenuItem);
        var renamePimPimsContextualMenuItem = this.getMenuItemView('images/rename2.png',menuContextualRenamePimLabel);
        renamePimPimsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().editNameSelectedPimDialog(); };
        generalMenuPopup.appendChild(renamePimPimsContextualMenuItem);
        var showHidePimPimsContextualMenuItem = this.getMenuItemView('images/showHide.png',menuContextualShowHidePimLabel);
        showHidePimPimsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().toggleSelectedPim(); };
        generalMenuPopup.appendChild(showHidePimPimsContextualMenuItem);

        generalMenuPopup.appendChild(this.getMenuSeparatorView());

        var useToCompleteFormPimsContextualMenuItem = this.getMenuItemView('images/fill.png',menuContextualUseToCompleteFormLabel);
        //useToCompleteFormPimsContextualMenuItem.onclick = function(event) { completeFormWithPimContextMenu(); };
        useToCompleteFormPimsContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        generalMenuPopup.appendChild(useToCompleteFormPimsContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getPimsElementsContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pims_elements__contextual_menu');

        var deletePimElementPimsElementsContextualMenuItem = this.getMenuItemView('images/delete_big.png',menuContextualDeletePimElementLabel);
        deletePimElementPimsElementsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().deleteSelectedPimElementDialog(); };
        generalMenuPopup.appendChild(deletePimElementPimsElementsContextualMenuItem);
        var editAnnotationValuePimsElementsContextualMenuItem = this.getMenuItemView('images/editType_big.png',menuContextualEditAnnotationValuePimElementLabel);
        editAnnotationValuePimsElementsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().editAnnotationValueSelectedPimElementDialog(); };
        generalMenuPopup.appendChild(editAnnotationValuePimsElementsContextualMenuItem);
        var editValuePimsElementsContextualMenuItem = this.getMenuItemView('images/editValue_big.png',menuContextualEditValuePimElementLabel);
        editValuePimsElementsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().editValueSelectedElementPim(); };
        generalMenuPopup.appendChild(editValuePimsElementsContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getMicroformatsBasedPimsContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('microformat_based_pim_contextual_menu');
        
        var addMicroformatBasedPimContextualMenuItem = this.getMenuItemView('images/pim.png',menuContextualAddMicroformatBasedPimLabel);
        //addMicroformatBasedPimContextualMenuItem.onclick = function(event) { addMicroformatBasedPim(); };
        addMicroformatBasedPimContextualMenuItem.onclick = function(event) { alert('Coming soon!'); };
        generalMenuPopup.appendChild(addMicroformatBasedPimContextualMenuItem);
        
        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    getPimChangeValueContextMenuView: function(personalSpace) {
        var generalPopupSet = this.getMenuPopupsetView();
        var generalMenuPopup = this.getMenuPopupView('pim_value_change_contextual_menu');

        var pasteSemanticDetectionContextualMenuItem = this.getMenuItemView('images/clipboard.png',menuContextualPasteSemanticDetectionLabel);
        //pasteSemanticDetectionContextualMenuItem.onclick = function(event) { pasteInputDetectedSemantic(); };
        generalMenuPopup.appendChild(pasteSemanticDetectionContextualMenuItem);
        var saveNewValueContextualMenuItem = this.getMenuItemView('images/save.png',menuContextualSaveNewValueLabel);
        //saveNewValueContextualMenuItem.onclick = function(event) { saveNewValue(); };
        generalMenuPopup.appendChild(saveNewValueContextualMenuItem);

        generalPopupSet.appendChild(generalMenuPopup);
        return generalPopupSet;
    },
    /** Contextual submenus */
    getDeleteCategoryMenuView: function(personalSpace) {
        var deleteCategoryMenu = this.getMenuView('images/whiteMinus.png',menuContextualDeleteCategoryLabel);
        var deleteCategoryMenuPopup = this.getMenuEmptyPopupView();

        var deleteCategoryMovingPimsTabsContextualMenuItem = this.getMenuItemView('images/trash.png',menuContextualDeleteCategoryMovingPimsLabel);
        deleteCategoryMovingPimsTabsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().deleteSelectedCategoryDeletingPimsDialog(); };
        deleteCategoryMenuPopup.appendChild(deleteCategoryMovingPimsTabsContextualMenuItem);
        var deleteCategoryDeletingPimsTabsContextualMenuItem = this.getMenuItemView('images/move.png',menuContextualDeleteCategoryDeletingPimsLabel);
        deleteCategoryDeletingPimsTabsContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().deleteSelectedCategoryMovingPimsDialog(); };
        deleteCategoryMenuPopup.appendChild(deleteCategoryDeletingPimsTabsContextualMenuItem);

        deleteCategoryMenu.appendChild(deleteCategoryMenuPopup);
        return deleteCategoryMenu;
    },
    getMicroformatedPimsMenuView: function(personalSpace) {
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
        addHcalendarPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('hcalendar',true); };
        addFormatedPimsMenuPopup.appendChild(addHcalendarPimGeneralContextualMenuItem);
        var addHcardPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHcardPimLabel);
        addHcardPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addHCardProposedFormatedPimsToSelectedCategory(); };
        addFormatedPimsMenuPopup.appendChild(addHcardPimGeneralContextualMenuItem);

        /*var addHreviewPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHreviewPimLabel);
        addHreviewPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('hreview',true); };
        addFormatedPimsMenuPopup.appendChild(addHreviewPimGeneralContextualMenuItem);
        var addXoxoPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddXoxoPimLabel);
        addXoxoPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('xoxo',true); };
        addFormatedPimsMenuPopup.appendChild(addXoxoPimGeneralContextualMenuItem);*/
        
        addFormatedPimsMenuPopup.appendChild(this.getMenuSeparatorView());
        
        var addHaddressPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHaddressPimLabel);
        addHaddressPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('haddress',true); };
        addFormatedPimsMenuPopup.appendChild(addHaddressPimGeneralContextualMenuItem);

        /*var addHbankPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHbankPimLabel);
        addHbankPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('hbank',true); };
        addFormatedPimsMenuPopup.appendChild(addHbankPimGeneralContextualMenuItem);*/

        var addHcontactPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHcontactPimLabel);
        addHcontactPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('hcontact',true); };
        addFormatedPimsMenuPopup.appendChild(addHcontactPimGeneralContextualMenuItem);
        var addHidentityPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHidentityPimLabel);
        addHidentityPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('hidentity',true); };
        addFormatedPimsMenuPopup.appendChild(addHidentityPimGeneralContextualMenuItem);

        addFormatedPimsMenuPopup.appendChild(this.getMenuSeparatorView());

        var addHlogPimGeneralContextualMenuItem = this.getMenuItemView('images/microformats.png',menuContextualAddHlogPimLabel);
        addHlogPimGeneralContextualMenuItem.onclick = function(event) { personalSpace.getPimsManager().addProposedFormatedPimToSelectedCategory('hlog',true); };
        addFormatedPimsMenuPopup.appendChild(addHlogPimGeneralContextualMenuItem);

        addMicroformatedPimsMenu.appendChild(addFormatedPimsMenuPopup);
        return addMicroformatedPimsMenu;
    },
    getShowPimsElementsIconicMenusMenuView: function(personalSpace) {
        var showPimsElementsIconicMenusMenu = this.getMenuView('images/icon.png',menuContextualPimsElementsIconicMenusLabel);
        var showPimsElementsIconicMenusMenuPopup = this.getMenuEmptyPopupView();

        var hidePimsElementsIconicMenusMenuItem = this.getMenuItemView('images/disable.png',menuContextualHidePimsElementsIconicMenusLabel);
        hidePimsElementsIconicMenusMenuItem.onclick = function(event) { personalSpace.getPimsManager().setShowPimsElementsIconicMenus(false);
                                                                        personalSpace.getPimsManager().updateView(); };
        showPimsElementsIconicMenusMenuPopup.appendChild(hidePimsElementsIconicMenusMenuItem);
        var showPimsElementsIconicMenusMenuItem = this.getMenuItemView('images/enable.png',menuContextualShowPimsElementsIconicMenusLabel);
        showPimsElementsIconicMenusMenuItem.onclick = function(event) { personalSpace.getPimsManager().setShowPimsElementsIconicMenus(true);
                                                                        personalSpace.getPimsManager().updateView(); };
        showPimsElementsIconicMenusMenuPopup.appendChild(showPimsElementsIconicMenusMenuItem);

        showPimsElementsIconicMenusMenu.appendChild(showPimsElementsIconicMenusMenuPopup);
        return showPimsElementsIconicMenusMenu;
    },
    getCompletionWithPimsMenuView: function(personalSpace) {
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
    getDetectedSemanticMenuView: function(personalSpace) {
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
    getPimsSavingMenuView: function(personalSpace) {
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
PersonalSpaceHtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function PersonalSpaceHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
PersonalSpaceHtmlInterfaceTool.prototype = {
    
}