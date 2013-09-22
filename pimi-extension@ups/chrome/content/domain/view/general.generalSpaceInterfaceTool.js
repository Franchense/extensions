/** Constants */
var ACCOUNT_PANEL_ID = 'pimi_home_general_box';
var ACCOUNT_HOME_PANEL_ID = 'pimi_home_connected';
var ACCOUNT_SIGNIN_PANEL_ID = 'pimi_home_disconnected';
var ACCOUNT_SIGNUP_PANEL_ID = 'pimi_home_account_creation';
var ACCOUNT_SIGNIN_USERNAME_FIELD_ID = 'account_connexion_user_name';
var ACCOUNT_SIGNIN_PASSWORD_FIELD_ID = 'account_connexion_password';
var ACCOUNT_SIGNUP_BUTTON_ID = 'account_creation_create_button';
var ACCOUNT_SIGNUP_SWITCH_BUTTON_ID = 'account_creation_connexion_button';
var ACCOUNT_SIGNIN_BUTTON_ID = 'account_connexion_connect_button';
var ACCOUNT_SIGNIN_SWITCH_BUTTON_ID = 'account_connexion_account_creation_button';

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
GeneralSpaceXulInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function GeneralSpaceXulInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
GeneralSpaceXulInterfaceTool.prototype = {
    /*-----------------------------------------------
        UtilInterfaceTool methods
    -----------------------------------------------*/
    getPluginElement: function(elementType,attributesNames,attributesValues) {
        return this.utilInterfaceTool.getPluginElement(elementType,attributesNames,attributesValues);
    },
    /*-----------------------------------------------
        General methods
    -----------------------------------------------*/
    createAccountPanelsView: function(generalSpace) {
        var rootElement = this.pluginContext.getElementById('pimi_sidebar');
        rootElement.appendChild(this.getAccountPanels(generalSpace));
        this.pluginContext.getElementById(ACCOUNT_SIGNIN_USERNAME_FIELD_ID).focus();
    },
    getAccountPanels: function(generalSpace) {
        var accountPanel = this.getPluginElement('vbox',['id','flex'],
                                                        [ACCOUNT_PANEL_ID,'1']);
        accountPanel.appendChild(this.getAccountPanelsTitle(generalSpace));
        accountPanel.appendChild(this.getAccountCreationPanel(generalSpace));
        accountPanel.appendChild(this.getAccountConnexionPanel(generalSpace));
        return accountPanel;
    },
    getAccountPanelsTitle: function(generalSpace) {
        var titleBox = this.getPluginElement('hbox',['id'],
                                                    ['pimi_home_title']);
        var titleBoxImage = this.getPluginElement('image',['id','src','tooltiptext'],
                                                          ['pimi_home_logo','images/logo.png',panelPimiLogoTooltipText]);
        //titleBoxImage.onclick = function(event) { showPimiHomeSideBar(); };
        titleBox.appendChild(titleBoxImage);
        return titleBox;
    },
    getAccountCreationPanel: function(generalSpace) {
        var accountCreationGrid = this.getPluginElement('grid',['id'],
                                                               [ACCOUNT_SIGNIN_PANEL_ID]);
        accountCreationGrid.onkeypress = function(event) { generalSpace.keyPressConnect(event); };

        var accountCreationColumns = this.getPluginElement('columns',[],[]);
        accountCreationColumns.appendChild(this.getPluginElement('column',[],[]));
        accountCreationGrid.appendChild(accountCreationColumns);
        var accountCreationRows = this.getPluginElement('rows',[],[]);
        var accountCreationRow = this.getPluginElement('row',[],[]);
        accountCreationRow.appendChild(this.getPluginElement('label',['id','class','value'],
                                                                     ['account_connexion_user_name_label','form_label',panelAccountConnexionUserNameLabel]));
        accountCreationRows.appendChild(accountCreationRow);
        accountCreationRow = this.getPluginElement('row',[],[]);

        accountCreationRow.appendChild(this.getPluginElement('textbox',['id','class','size','maxlength'],
                                                                       [ACCOUNT_SIGNIN_USERNAME_FIELD_ID,'form_input','25','20']));

        accountCreationRows.appendChild(accountCreationRow);
        accountCreationRow = this.getPluginElement('row',[],[]);
        accountCreationRow.appendChild(this.getPluginElement('label',['id','class','value'],
                                                                     ['account_connexion_password_label','form_label',panelAccountConnexionPasswordLabel]));
        accountCreationRows.appendChild(accountCreationRow);
        accountCreationRow = this.getPluginElement('row',[],[]);
        accountCreationRow.appendChild(this.getPluginElement('textbox',['id','class','type','size','maxlength'],
                                                                       [ACCOUNT_SIGNIN_PASSWORD_FIELD_ID,'form_input','password','25','20']));
        accountCreationRows.appendChild(accountCreationRow);
        accountCreationRow = this.getPluginElement('row',[],[]);

        var accountSigninButton = this.getPluginElement('button',['id','class','flex','label','tooltiptext'],
                                                                 [ACCOUNT_SIGNIN_BUTTON_ID,'form_button','1',panelAccountConnexionConnectButtonLabel,panelAccountConnexionConnectButtonTooltipText]);
        accountSigninButton.onclick = function(event) { generalSpace.connectPimiAccount(); };
        accountCreationRow.appendChild(accountSigninButton);

        accountCreationRows.appendChild(accountCreationRow);
        accountCreationRow = this.getPluginElement('row',[],[]);

        var accountSigninSwitchButton = this.getPluginElement('button',['id','class','flex','label','tooltiptext'],
                                                                       [ACCOUNT_SIGNIN_SWITCH_BUTTON_ID,'form_button','1',panelAccountConnexionAccountCreationButtonLabel,panelAccountConnexionAccountCreationButtonTooltipText]);
        accountSigninSwitchButton.onclick = function(event) { generalSpace.switchToPimiAccountCreation(); };
        accountCreationRow.appendChild(accountSigninSwitchButton);

        accountCreationRows.appendChild(accountCreationRow);
        accountCreationGrid.appendChild(accountCreationRows);
        return accountCreationGrid;
    },
    getAccountConnexionPanel: function(generalSpace) {
        var accountConnexionGrid = this.getPluginElement('grid',['id'],
                                                                [ACCOUNT_SIGNUP_PANEL_ID]);
        accountConnexionGrid.onkeypress = function(event) { generalSpace.keyPressCreate(event); };
        var accountConnexionColumns = this.getPluginElement('columns',[],[]);
        accountConnexionColumns.appendChild(this.getPluginElement('column',[],[]));
        accountConnexionGrid.appendChild(accountConnexionColumns);
        var accountConnexionRows = this.getPluginElement('rows',[],[]);
        var accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('label',['id','class','value'],
                                                                      ['account_creation_email_label','form_label',panelAccountCreationEmailLabel]));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('textbox',['id','class','size'],
                                                                        ['account_creation_email','form_input','25']));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('label',['id','class','value'],
                                                                      ['account_creation_user_name_label','form_label',panelAccountCreationUserNameLabel]));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('textbox',['id','class','size','maxlength'],
                                                                        ['account_creation_user_name','form_input','25','20']));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('label',['id','class','value'],
                                                                      ['account_creation_password_label','form_label',panelAccountCreationPasswordLabel]));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('textbox',['id','class','type','size','maxlength'],
                                                                        ['account_creation_password','form_input','password','25','20']));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('label',['id','class','value'],
                                                                      ['account_creation_repeat_password_label','form_label',panelAccountCreationRepeatPasswordLabel]));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        accountConnexionRow.appendChild(this.getPluginElement('textbox',['id','class','type','size','maxlength'],
                                                                        ['account_creation_repeat_password','form_input','password','25','20']));
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);

        var accountSignupButton = this.getPluginElement('button',['id','class','flex','label','tooltiptext'],
                                                                 [ACCOUNT_SIGNUP_BUTTON_ID,'form_button','1',panelAccountCreationCreateButtonLabel,panelAccountCreationCreateButtonTooltipText]);
        accountSignupButton.onclick = function(event) { generalSpace.createPimiAccount(); };
        accountConnexionRow.appendChild(accountSignupButton);
        
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);

        var accountSignupSwitchButton = this.getPluginElement('button',['id','class','flex','label','tooltiptext'],
                                                                       [ACCOUNT_SIGNUP_SWITCH_BUTTON_ID,'form_button','1',panelAccountCreationConnexionButtonLabel,panelAccountCreationConnexionButtonTooltipText]);
        accountSignupSwitchButton.onclick = function(event) { generalSpace.switchToPimiAccountCreation(); };
        accountConnexionRow.appendChild(accountSignupSwitchButton);

        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionGrid.appendChild(accountConnexionRows);
        return accountConnexionGrid;
    },
    showHideAccountPanel: function(show){
        var cssAttributeValue = 'none';
        if(show)
            cssAttributeValue = 'block';
        this.pluginContext.getElementById(ACCOUNT_PANEL_ID).style.display = cssAttributeValue;
    },
    enableDisableConnexionButton: function(enable){
        var cssAttributeValue = 'false';
        if(enable)
            cssAttributeValue = 'true';
        this.pluginContext.getElementById(ACCOUNT_SIGNIN_BUTTON_ID).setAttribute('disabled', cssAttributeValue);
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
GeneralSpaceHtmlInterfaceTool
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
/*
* Constructor
**/
function GeneralSpaceHtmlInterfaceTool(pluginContext,webPageDomContext,webPageJsContext) {
    this.pluginContext = pluginContext;
    this.webPageDomContext = webPageDomContext;
    this.webPageJsContext = webPageJsContext;
    this.utilInterfaceTool = new UtilInterfaceTool(pluginContext,webPageDomContext,webPageJsContext);
}
/*-----------------------------------------------
    Prototype definition
-----------------------------------------------*/
GeneralSpaceHtmlInterfaceTool.prototype = {
    
}