/** Constants */
var ANNOTATION_PANEL_ID = 'annotation_box';
var ANNOTATION_PERSONAL_TEXTFIELD_ID = 'annotation_box_personal_hbox_textbox';
var ANNOTATION_DESCRIPTION_TEXTFIELD_ID = 'annotation_box_description_textbox';

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
AnnotationsXulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AnnotationsXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
AnnotationsXulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        return this.utilInterfaceTool.getPluginElement(elementType,attributesNames,attributesValues);
    },
	/*-----------------------------------------------
		General methods
	-----------------------------------------------*/
	updateAnnotationsPanelView: function(annotationsManager) {
		var oldAnnotationsPanelView = this.pluginContext.getElementById(ANNOTATION_PANEL_ID);
		var newAnnotationsPanelView = this.getAnnotationsPanelView(annotationsManager);
        oldAnnotationsPanelView.parentNode.replaceChild(newAnnotationsPanelView, oldAnnotationsPanelView);
	},
	getAnnotationsPanelView: function(annotationsManager) {
		var generalBox = this.getPluginElement('vbox',['id','context'],
                                                 	  [ANNOTATION_PANEL_ID,'general_contextual_menu']);
		//generalBox.appendChild(this.getSemanticDetectionCheckboxView(annotationsManager));
		generalBox.appendChild(this.getPersonalAnnotationView(annotationsManager));
		generalBox.appendChild(this.getAnnotationDescriptionView(annotationsManager));
		generalBox.appendChild(this.getMicroformatAnnotationView(annotationsManager));
		return generalBox;
	},
	getSemanticDetectionCheckboxView: function(annotationsManager) {
		var semanticDatectionCheckBox = this.getPluginElement('checkbox',['id','checked','label'],
                                                						 ['annotation_box_semantic_checkbox','false',annotationSemanticCheckboxLabel]);
        semanticDatectionCheckBox.onclick = function(event) { alert('Coming soon!'); };
		return semanticDatectionCheckBox;
	},
	getPersonalAnnotationView: function(annotationsManager) {
		var personalAnnotationBox = this.getPluginElement('vbox',['id'],
                                                 	  			 ['annotation_box_personal']);
		personalAnnotationBox.appendChild(this.getPersonalAnnotationHeaderView());
		personalAnnotationBox.appendChild(this.getPersonalAnnotationBodyView(annotationsManager));
		return personalAnnotationBox;
	},
	getPersonalAnnotationHeaderView: function() {
		return this.getPluginElement('label',['id','value'],
                                             ['annotation_box_personal_label',annotationPersonalLabelValue]);
	},
	getPersonalAnnotationBodyView: function(annotationsManager) {
		var personalAnnotationControlsBox = this.getPluginElement('hbox',['id'],
                                                 	  			 		 ['annotation_box_personal_hbox']);
		personalAnnotationControlsBox.appendChild(this.getPersonalAnnotationTextboxView(annotationsManager));
		personalAnnotationControlsBox.appendChild(this.getPersonalAnnotationImageView());
		return personalAnnotationControlsBox;
	},
	getPersonalAnnotationTextboxView: function(annotationsManager) {
		var personalAnnotationTextbox = this.getPluginElement('textbox',['id','flex','value'],
                                                 	  			 		['annotation_box_personal_hbox_textbox','1',annotationPersonalAnnotationTextboxDefaultValue]);
		personalAnnotationTextbox.onfocus = function(event) { annotationsManager.doFocusPersonalAnnotationTextbox(event); };
		personalAnnotationTextbox.onblur = function(event) { annotationsManager.doBlurPersonalAnnotationTextbox(event); };
		return personalAnnotationTextbox;
	},
	getPersonalAnnotationTextboxDom: function() {
		return this.pluginContext.getElementById('annotation_box_personal_hbox_textbox');
	},
	getPersonalAnnotationImageView: function() {
		var personalAnnotationImageBox = this.getPluginElement('vbox',[],[]);
		var personalAnnotationImage = this.getPluginElement('image',['id','src','tooltiptext'],
                                                 	  			 	['annotation_box_personal_hbox_image','images/annotation.png',annotationPersonalImageTooltipText]);
		//personalAnnotationImage.ondragstart = function(event) { doDragStartAnnotationTextboxValue(event); };
		//personalAnnotationImage.ondragend = function(event) { doDragEndAnnotationTextboxValue(event); };
		personalAnnotationImageBox.appendChild(personalAnnotationImage);
		return personalAnnotationImageBox;
	},
	getAnnotationDescriptionView: function(annotationsManager) {
		var annotationDescriptionBox = this.getPluginElement('vbox',['id','flex'],
                                                 	  			 	['annotation_box_description','1']);
		annotationDescriptionBox.appendChild(this.getAnnotationDescriptionTitleView());
		annotationDescriptionBox.appendChild(this.getAnnotationDescriptionTextboxView(annotationsManager));
		return annotationDescriptionBox;
	},
	getAnnotationDescriptionTitleView: function() {
		return this.getPluginElement('label',['id','value'],
                                             ['annotation_box_description_label',annotationDescriptionLabelValue]);
	},
	getAnnotationDescriptionTextboxView: function(annotationsManager) {
		var annotationDescriptionTextbox = this.getPluginElement('textbox',['id','multiline','value'],
                                                 	  			 		   ['annotation_box_description_textbox','true',annotationDescriptionAnnotationTextboxDefaultValue]);
		annotationDescriptionTextbox.onfocus = function(event) { annotationsManager.doFocusAnnotationDescriptionTextbox(event); };
		annotationDescriptionTextbox.onblur = function(event) { annotationsManager.doBlurAnnotationDescriptionTextbox(event); };
		return annotationDescriptionTextbox;
	},
	getAnnotationDescriptionTextboxDom: function() {
		return this.pluginContext.getElementById('annotation_box_description_textbox');
	},
	getMicroformatAnnotationView: function(annotationsManager) {
		var annotationMicroformatsBox = this.getPluginElement('vbox',['id'],
                                                 	  			 	 ['annotation_box_microformats']);
		annotationMicroformatsBox.appendChild(annotationsManager.getPersonalSpace().getMicroformatsManager().getTreeView());
		annotationMicroformatsBox.appendChild(this.getMicroformatAnnotationDraggedBoxView());
		return annotationMicroformatsBox;
	},
	getMicroformatAnnotationDraggedBoxView: function() {
		return this.getPluginElement('vbox',['id','flex'],
                                            ['annotation_box_microformats_dragged_box','1']);
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
AnnotationsHtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function AnnotationsHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
	Prototype definition
-----------------------------------------------*/
AnnotationsHtmlInterfaceTool.prototype = {
	
}