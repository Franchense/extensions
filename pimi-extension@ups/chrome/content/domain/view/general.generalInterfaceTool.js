/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
UtilInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
UtilInterfaceTool.prototype = {
    /*-----------------------------------------------
        General methods
    -----------------------------------------------*/
    addChild: function(childParent,child) {
        childParent.appendChild(child);
    },
    addChildById: function(childParentId,child) {
        this.pluginContext.getElementById(childParentId).appendChild(child);
    },
    createElement: function(elementType) {
        return this.pluginContext.createElement(elementType);
    },
    getAttribute: function(element,attributeType) {
        return element.setAttribute(attributeType);
    },
    setAttribute: function(element,attributeType,attributeValue) {
        element.setAttribute(attributeType,attributeValue);
    },
    addEventListener: function(element,eventType,listenerFunction,capture) {
        element.addEventListener(eventType,listenerFunction,capture);
    },
    addClickEvent: function(element,clickFunction) {
        element.onclick = clickFunction;
    },
    addDblClickEvent: function(element,dblClickFunction) {
        element.ondblclick = dblClickFunction;
    },
    setColorStyle: function(element,colorStyleValue) {
        element.style.color = colorStyleValue;
    },
    setBackgroundStyle: function(element,backgroundStyleValue) {
        element.style.background = backgroundStyleValue;
    },
    /*-----------------------------------------------
        Interface components methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        var element = this.pluginContext.createElement(elementType);
        if(attributesNames.length == attributesValues.length) {
            for(var i = 0; i < attributesNames.length; i++)
                element.setAttribute(attributesNames[i],attributesValues[i]);
        }
        return element;
    },
    /*-----------------------------------------------
        Sidebar methods
    -----------------------------------------------*/
    getRootElement: function() {
        return this.pluginContext.getElementById('pimi_sidebar');
    },
    getSideBarHeight: function() {
        var rootElement = this.getRootElement();
        return rootElement.clientHeight;
    },
    getSideBarWidth: function() {
        var rootElement = this.getRootElement();
        return rootElement.clientWidth;
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
    }
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
XulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function XulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.generalSpaceInterfaceTool = new GeneralSpaceXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.personalSpaceInterfaceTool = new PersonalSpaceXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.contextualMenusInterfaceTool = new ContextualMenusXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.pimsInterfaceTool = new PimsXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,this.contextualMenusInterfaceTool);
    this.microformatsInterfaceTool = new MicroformatsXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,this.contextualMenusInterfaceTool);
    this.annotationsInterfaceTool = new AnnotationsXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,this.contextualMenusInterfaceTool);
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
XulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    addChild: function(childParent,child) {
        this.utilInterfaceTool.addChild(childParent,child);
    },
    addChildById: function(childParentId,child) {
        this.utilInterfaceTool.addChildById(childParentId,child);
    },
    createElement: function(elementType) {
        return this.utilInterfaceTool.createElement(elementType);
    },
    getAttribute: function(element,attributeType) {
        return this.utilInterfaceTool.getAttribute(element,attributeType);
    },
    setAttribute: function(element,attributeType,attributeValue) {
        this.utilInterfaceTool.setAttribute(element,attributeType,attributeValue);
    },
    addEventListener: function(element,eventType,listenerFunction,capture) {
        this.utilInterfaceTool.addEventListener(element,eventType,listenerFunction,capture);
    },
    addClickEvent: function(element,clickFunction) {
        this.utilInterfaceTool.addClickEvent(element,clickFunction);
    },
    addDblClickEvent: function(element,dblClickFunction) {
        this.utilInterfaceTool.addDblClickEvent(element,dblClickFunction);
    },
    setColorStyle: function(element,colorStyleValue) {
        this.utilInterfaceTool.setColorStyle(element,colorStyleValue);
    },
    setBackgroundStyle: function(element,backgroundStyleValue) {
        this.utilInterfaceTool.setBackgroundStyle(element,backgroundStyleValue);
    },
    /*-----------------------------------------------
        GeneralSpaceInterfaceTool methods
    -----------------------------------------------*/
    /** Creation methods */
    createAccountPanelsView: function(generalSpace) {
        this.generalSpaceInterfaceTool.createAccountPanelsView(generalSpace);
    },
    /** Account panel methods */
    deleteAccountPanel: function(){
        this.generalSpaceInterfaceTool.deleteAccountPanel();
    },
    switchAccountPanels: function(generalSpace) {
        this.generalSpaceInterfaceTool.switchAccountPanels(generalSpace);
    },
    enableDisableAccountPanelButtons: function(enable){
        this.generalSpaceInterfaceTool.enableDisableAccountPanelButtons(enable);
    },
    connectPimiAccount: function(generalSpace) {
        this.generalSpaceInterfaceTool.connectPimiAccount(generalSpace);
    },
    createPimiAccount: function(generalSpace) {
        this.generalSpaceInterfaceTool.createPimiAccount(generalSpace);
    },
    connexionUserNameFieldFocus: function(emptyField) {
        this.generalSpaceInterfaceTool.connexionUserNameFieldFocus(emptyField);
    },
    connexionPasswordFieldFocus: function(emptyField) {
        this.generalSpaceInterfaceTool.connexionPasswordFieldFocus(emptyField);
    },
    creationEmailAddressFieldFocus: function(emptyField) {
        this.generalSpaceInterfaceTool.creationEmailAddressFieldFocus(emptyField);
    },
    creationUserNameFieldFocus: function(emptyField) {
        this.generalSpaceInterfaceTool.creationUserNameFieldFocus(emptyField);
    },
    creationPasswordFieldFocus: function(emptyField) {
        this.generalSpaceInterfaceTool.creationPasswordFieldFocus(emptyField);
    },
    creationRepeatPasswordFieldFocus: function(emptyField) {
        this.generalSpaceInterfaceTool.creationRepeatPasswordFieldFocus(emptyField);
    },
    /*-----------------------------------------------
        PersonalSpaceInterfaceTool methods
    -----------------------------------------------*/
    /** Panels methods */
    selectPanel: function(panelName){
        this.personalSpaceInterfaceTool.selectPanel(panelName);
    },
    createPanelsView: function(personalSpace) {
        this.personalSpaceInterfaceTool.createPanelsView(personalSpace);
    },
    deletePanelsView: function(personalSpace) {
        this.personalSpaceInterfaceTool.deletePanelsView(personalSpace);
    },
    /** Console methods */
    addLogConsoleMessage: function(message) {
        this.personalSpaceInterfaceTool.addLogConsoleMessage(message);
    },
    /*-----------------------------------------------
        PimsInterfaceTool methods
    -----------------------------------------------*/
    /** General */
    updateCategoriesTabboxView: function(pimsManager) {
        this.pimsInterfaceTool.updateCategoriesTabboxView(pimsManager);
    },
    updatePimsPanelView: function(pimsManager) {
        this.pimsInterfaceTool.updatePimsPanelView(pimsManager);
    },
    getPimsPanelView: function(pimsManager) {
        return this.pimsInterfaceTool.getPimsPanelView(pimsManager);
    },
    getCategoriesTabboxView: function(pimsManager) {
        return this.pimsInterfaceTool.getCategoriesTabboxView(pimsManager);
    },
    updatePimsSavedLabelView: function(pimsManager) {
        return this.pimsInterfaceTool.updatePimsSavedLabelView(pimsManager);
    },
    /** Categories methods */
    updateCategoryView: function(category) {
        this.pimsInterfaceTool.updateCategoryView(category);
    },
    updateCategoryPanelView: function(category) {
        this.pimsInterfaceTool.updateCategoryPanelView(category);
    },
    updateCategoryTabView: function(category) {
        this.pimsInterfaceTool.updateCategoryTabView(category);
    },
    getCategoryPanelView: function(category) {
        return this.pimsInterfaceTool.getCategoryPanelView(category);
    },
    getCategoryTabPanelView: function(category) {
        return this.pimsInterfaceTool.getCategoryTabPanelView(category);
    },
    getCategoryTabView: function(category) {
        return this.pimsInterfaceTool.getCategoryTabView(category);
    },
    selectCategory: function(category) {
        this.pimsInterfaceTool.selectCategory(category);
    },
    /** Pims methods */
    updatePimView: function(pim) {
        this.pimsInterfaceTool.updatePimView(pim);
    },
    getPimView: function(pim) {
        return this.pimsInterfaceTool.getPimView(pim);
    },
    getPimEditedNameDom: function(pim) {
        return this.pimsInterfaceTool.getPimEditedNameDom(pim);
    },
    /** Pims elements methods */
    updatePimElementView: function(pimElement) {
        this.pimsInterfaceTool.updatePimElementView(pimElement);
    },
    getPimElementView: function(pimElement) {
        return this.pimsInterfaceTool.getPimElementView(pimElement);
    },
    getPimElementEditedAnnotationValueDom: function(pimElement) {
        return this.pimsInterfaceTool.getPimElementEditedAnnotationValueDom(pimElement);
    },
    getPimElementEditedValueDom: function(pimElement) {
        return this.pimsInterfaceTool.getPimElementEditedValueDom(pimElement);
    },
    /*-----------------------------------------------
        AnnotationsInterfaceTool methods
    -----------------------------------------------*/
    updateAnnotationsPanelView: function(annotationsManager) {
        this.annotationsInterfaceTool.updateAnnotationsPanelView(annotationsManager);
    },
    getAnnotationsPanelView: function(annotationsManager) {
        return this.annotationsInterfaceTool.getAnnotationsPanelView(annotationsManager);
    },
    getPersonalAnnotationTextboxDom: function() {
        return this.annotationsInterfaceTool.getPersonalAnnotationTextboxDom();
    },
    getAnnotationDescriptionTextboxDom: function() {
        return this.annotationsInterfaceTool.getAnnotationDescriptionTextboxDom();
    },
    /*-----------------------------------------------
        MicroformatsInterfaceTool methods
    -----------------------------------------------*/
    updateMicroformatsPanelView: function(microformatsManager) {
        this.microformatsInterfaceTool.updateMicroformatsPanelView(microformatsManager);
    },
    getMicroformatsPanelView: function(microformatsManager) {
        return this.microformatsInterfaceTool.getMicroformatsPanelView(microformatsManager);
    },
    updateMicroformatsTreeView: function(microformatsManager) {
        this.microformatsInterfaceTool.updateMicroformatsTreeView(microformatsManager);
    },
    getMicroformatsTreeView: function(microformatsManager) {
        return this.microformatsInterfaceTool.getMicroformatsTreeView(microformatsManager);
    },
    getMicroformatTreeView: function(microformat) {
        return this.microformatsInterfaceTool.getMicroformatTreeView(microformat);
    },
    getMicroformatGroupTreeView: function(microformatGroup) {
        return this.microformatsInterfaceTool.getMicroformatGroupTreeView(microformatGroup);
    },
    getAtomicMicroformatTreeView: function(atomicMicroformat) {
        return this.microformatsInterfaceTool.getAtomicMicroformatTreeView(atomicMicroformat);
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
    },
    getGeneralSpaceInterfaceTool: function() {
        return this.generalSpaceInterfaceTool;
    },
    setGeneralSpaceInterfaceTool: function(generalSpaceInterfaceTool) {
        this.generalSpaceInterfaceTool = generalSpaceInterfaceTool;
    },
    getPersonalSpaceInterfaceTool: function() {
        return this.personalSpaceInterfaceTool;
    },
    setPersonalSpaceInterfaceTool: function(personalSpaceInterfaceTool) {
        this.personalSpaceInterfaceTool = personalSpaceInterfaceTool;
    },
    getContextualMenusInterfaceTool: function() {
        return this.contextualMenusInterfaceTool;
    },
    setContextualMenusInterfaceTool: function(contextualMenusInterfaceTool) {
        this.contextualMenusInterfaceTool = contextualMenusInterfaceTool;
    },
    getPimsInterfaceTool: function() {
        return this.pimsInterfaceTool;
    },
    setPimsInterfaceTool: function(pimsInterfaceTool) {
        this.pimsInterfaceTool = pimsInterfaceTool;
    },
    getMicroformatsInterfaceTool: function() {
        return this.microformatsInterfaceTool;
    },
    setMicroformatsInterfaceTool: function(microformatsInterfaceTool) {
        this.microformatsInterfaceTool = microformatsInterfaceTool;
    },
    getAnnotationsInterfaceTool: function() {
        return this.annotationsInterfaceTool;
    },
    setAnnotationsInterfaceTool: function(annotationsInterfaceTool) {
        this.annotationsInterfaceTool = annotationsInterfaceTool;
    }
}

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
HtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function HtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.generalSpaceInterfaceTool = new GeneralSpaceHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.personalSpaceInterfaceTool = new PersonalSpaceHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.contextualMenusInterfaceTool = new ContextualMenusHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
    this.pimsInterfaceTool = new PimsHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,this.contextualMenusInterfaceTool);
    this.microformatsInterfaceTool = new MicroformatsHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,this.contextualMenusInterfaceTool);
    this.annotationsInterfaceTool = new AnnotationsHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,this.contextualMenusInterfaceTool);
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
HtmlInterfaceTool.prototype = {
    
}