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
        Panels methods
    -----------------------------------------------*/
    createPanelsView: function(personalSpace) {
        var rootElement = this.utilInterfaceTool.getRootElement();
        /** Menu bar */
        rootElement.appendChild(this.getMenuBarView(personalSpace));
        /** Pims panel */
        rootElement.appendChild(personalSpace.getPimsManager().getPanelView());
        /** Microformats panel */
        if(personalSpace.getUser().isUser())
            rootElement.appendChild(personalSpace.getMicroformatsManager().getView());
        /** Annotation panel */
        else if(personalSpace.getUser().isAnnotator())
            rootElement.appendChild(personalSpace.getAnnotationsManager().getPanelView());
    },
    deletePanelsView: function(personalSpace) {
        var rootElement = this.utilInterfaceTool.getRootElement();
        /** Menu bar */
        var menuBarView = document.getElementById(MENU_ID);
        rootElement.removeChild(menuBarView);
        /** Pims panel */
        var pimsPanelView = document.getElementById(PIMS_PANEL_ID);
        rootElement.removeChild(pimsPanelView);
        /** Microformats panel */
        if(personalSpace.getUser().isUser()) {
            var microformatsPanelView = document.getElementById(MICROFORMATS_PANEL_ID);
            rootElement.removeChild(microformatsPanelView);
        }
        /** Annotation panel */
        else if(personalSpace.getUser().isAnnotator()) {
            var annotationsPanelView = document.getElementById(ANNOTATION_PANEL_ID);
            rootElement.removeChild(annotationsPanelView);
        }
    },
    selectPanel: function(panelName){
        var pimsPanel = this.pluginContext.getElementById(PIMS_PANEL_ID);
        var microformatsPanel = this.pluginContext.getElementById(MICROFORMATS_PANEL_ID);
        var annotationsPanel = this.pluginContext.getElementById(ANNOTATION_PANEL_ID);
        if(panelName == 'microformats') {
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
        else {
            pimsPanel.hidden = false;
            if(microformatsPanel != null)
                microformatsPanel.hidden = true;
            if(annotationsPanel != null)
                annotationsPanel.hidden = true;
        }
    },
    getSelectedPanelName: function(){
        var selectedPanelName = '';
        var microformatsPanel = this.pluginContext.getElementById(MICROFORMATS_PANEL_ID);
        var annotationsPanel = this.pluginContext.getElementById(ANNOTATION_PANEL_ID);
        if((microformatsPanel != null) && (!microformatsPanel.hidden))
            selectedPanelName = 'microformats';
        else if((annotationsPanel != null) && (!annotationsPanel.hidden))
            selectedPanelName = 'annotations';
        else
            selectedPanelName = 'pims';
        return selectedPanelName;
    },
    addLogConsoleMessage: function(message) {
        
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