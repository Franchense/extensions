/** Constants */
var MICROFORMATS_PANEL_ID = 'microformats_panel';
var MICROFORMATS_TREE_ID = 'microformats_tree';

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
MicroformatsXulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function MicroformatsXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,contextualMenusInterfaceTool) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.contextualMenusInterfaceTool = contextualMenusInterfaceTool;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
MicroformatsXulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        return this.utilInterfaceTool.getPluginElement(elementType,attributesNames,attributesValues);
    },
    /*-----------------------------------------------
        General methods
    -----------------------------------------------*/
    updateMicroformatsPanelView: function(microformatsManager) {
        var oldMicroformatsPanelView = this.pluginContext.getElementById(MICROFORMATS_PANEL_ID);
        var newMicroformatsPanelView = this.getMicroformatsPanelView(microformatsManager);
        oldMicroformatsPanelView.parentNode.replaceChild(newMicroformatsPanelView, oldMicroformatsPanelView);
    },
    getMicroformatsPanelView: function(microformatsManager) {
        var microformatsBox = this.getPluginElement('vbox',['id','context'],
                                                           [MICROFORMATS_PANEL_ID,'microformats_panel_contextual_menu']);
        microformatsBox.appendChild(microformatsManager.getTreeView());
        microformatsBox.appendChild(this.contextualMenusInterfaceTool.getMicroformatsPanelContextMenuView(microformatsManager));

        var rootElement = this.utilInterfaceTool.getRootElement();
        var otherElementsHeight = 29;
        var microformatsBoxHeight = this.utilInterfaceTool.getSideBarHeight() - otherElementsHeight;
        microformatsBox.style.height = microformatsBoxHeight + 'px';

        return microformatsBox;
    },
    updateMicroformatsTreeView: function(microformatsManager) {
        var oldMicroformatsTreeView = this.pluginContext.getElementById(MICROFORMATS_TREE_ID);
        var newMicroformatsTreeView = this.getMicroformatsTreeView(microformatsManager);
        oldMicroformatsTreeView.parentNode.replaceChild(newMicroformatsTreeView, oldMicroformatsTreeView);
    },
    getMicroformatsTreeView: function(microformatsManager) {
        var annotationMicroformatsTree = this.getPluginElement('tree',['id','flex','seltype','treelines','hidecolumnpicker'],
                                                                      [MICROFORMATS_TREE_ID,'1','single','false','true']);
        var annotationMicroformatsTreeCols = this.getPluginElement('treecols',[],[]);
        var annotationMicroformatsTreeCol = this.getPluginElement('treecol',['id','flex','primary','label'],
                                                                            ['microformats_tree_header','1','true',annotationTreeMicroformatsHeaderLabel]);
        annotationMicroformatsTreeCols.appendChild(annotationMicroformatsTreeCol);
        annotationMicroformatsTree.appendChild(annotationMicroformatsTreeCols);
        annotationMicroformatsTree.appendChild(this.getMicroformatsTreeBodyView(microformatsManager));
        //annotationMicroformatsTree.appendChild(this.contextualMenusInterfaceTool.getMicroformatsTreeContextMenuView(microformatsManager));

        var rootElement = this.utilInterfaceTool.getRootElement();
        var otherElementsHeight = 244;
        var annotationMicroformatsTreeHeight = this.utilInterfaceTool.getSideBarHeight() - otherElementsHeight;
        annotationMicroformatsTree.style.height = annotationMicroformatsTreeHeight + 'px';

        return annotationMicroformatsTree;
    },
    getMicroformatsTreeBodyView: function(microformatsManager) {
        var annotationMicroformatsTreeBody = this.getPluginElement('treechildren',['id','context'],
                                                                                  ['microformats_tree_body','microformat_based_pim_contextual_menu']);
        //annotationMicroformatsTreeBody.ondragstart = function(event) { doDragStartAnnotationTreeValue(event); };
        //annotationMicroformatsTreeBody.ondragend = function(event) { doDragEndAnnotationTreeValue(event); };

        annotationMicroformatsTreeBody.appendChild(this.getMicroformatsTypeTitle('adopted'));
        annotationMicroformatsTreeBody.appendChild(this.getPluginElement('treeseparator',[],[]));

        var adoptedMicroformats = microformatsManager.getAdoptedMicroformats();
        for (var i = 0; i < adoptedMicroformats.length; i++) {
            var currentMicroformat = adoptedMicroformats[i];
            annotationMicroformatsTreeBody.appendChild(currentMicroformat.getTreeView());
        }

        annotationMicroformatsTreeBody.appendChild(this.getPluginElement('treeseparator',[],[]));

        annotationMicroformatsTreeBody.appendChild(this.getMicroformatsTypeTitle('proposed'));
        annotationMicroformatsTreeBody.appendChild(this.getPluginElement('treeseparator',[],[]));
        var proposedMicroformats = microformatsManager.getProposedMicroformats();
        for (var i = 0; i < proposedMicroformats.length; i++) {
            var currentMicroformat = proposedMicroformats[i];
            annotationMicroformatsTreeBody.appendChild(currentMicroformat.getTreeView());
        }

        return annotationMicroformatsTreeBody;
    },
    getMicroformatsTypeTitle: function(microformatsType) {
        var treeItem = this.getPluginElement('treeitem',[],[]);
        var treeRow = this.getPluginElement('treerow',[],[]);
        var microformatSectionTitle = microformatAdoptedMicroformatsSectionTitle;
        if(microformatsType == 'proposed')
            microformatSectionTitle = microformatProposedMicroformatsSectionTitle;
        treeRow.appendChild(this.getPluginElement('treecell',['label'],
                                                             [microformatSectionTitle]));
        treeItem.appendChild(treeRow);
        return treeItem;
    },
    getMicroformatTreeView: function(microformat) {
        var treeItem = this.getPluginElement('treeitem',['container','open'],
                                                        ['true','false']);
        var treeRow = this.getPluginElement('treerow',[],[]);
        var treeCell = this.getPluginElement('treecell',['label','class'],
                                                        [microformat.getName().capitalize(),'format_name']);
        treeRow.appendChild(treeCell);
        treeItem.appendChild(treeRow);
        var treeChildren = this.getPluginElement('treechildren',[],[]);
        var atomicMicroformats = microformat.getMicroformatGroups();
        for (var j = 0; j < atomicMicroformats.length; j++) {
            var currentMicroformatGroup = atomicMicroformats[j];
            treeChildren.appendChild(currentMicroformatGroup.getTreeView());
            treeItem.appendChild(treeChildren);
        }
        return treeItem;
    },
    getMicroformatGroupTreeView: function(microformatGroup) {
        var treeItem = this.getPluginElement('treeitem',['container','open'],
                                                        ['true','false']);
        var treeRow = this.getPluginElement('treerow',[],[]);
        var treeCell = this.getPluginElement('treecell',['label','class'],
                                                        [microformatGroup.getName(),'format_attribute_name']);
        treeRow.appendChild(treeCell);
        treeItem.appendChild(treeRow);
        var treeChildren = this.getPluginElement('treechildren',[],[]);
        var atomicMicroformats = microformatGroup.getAtomicMicroformats();
        for (var k = 0; k < atomicMicroformats.length; k++) {
            var currentAtomicMicroformat = atomicMicroformats[k];
            treeChildren.appendChild(currentAtomicMicroformat.getTreeView());
        }
        treeItem.appendChild(treeChildren);
        return treeItem;
    },
    getAtomicMicroformatTreeView: function(atomicMicroformat) {
        var treeItem = this.getPluginElement('treeitem',[],[]);
        var treeRow = this.getPluginElement('treerow',[],[]);
        var treeCell = this.getPluginElement('treecell',['label','class'],
                                                        [atomicMicroformat.getSubClassAttributeValue(),'format_sub_attribute_name']);
        treeRow.appendChild(treeCell);
        treeItem.appendChild(treeRow);
        return treeItem;
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
    getContextualMenusInterfaceTool: function() {
        return this.contextualMenusInterfaceTool;
    },
    setContextualMenusInterfaceTool: function(contextualMenusInterfaceTool) {
        this.contextualMenusInterfaceTool = contextualMenusInterfaceTool;
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
MicroformatsHtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function MicroformatsHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext,contextualMenusInterfaceTool) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.contextualMenusInterfaceTool = contextualMenusInterfaceTool;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
MicroformatsHtmlInterfaceTool.prototype = {
    
}