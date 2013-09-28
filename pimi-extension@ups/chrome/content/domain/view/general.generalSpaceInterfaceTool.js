/** Constants */
var ACCOUNT_PANEL_ID = 'pimi_home_general_box';
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
        Creation methods
    -----------------------------------------------*/
    createAccountPanelsView: function(generalSpace) {
        var rootElement = this.utilInterfaceTool.getRootElement();
        rootElement.appendChild(this.getAccountPanels(generalSpace));
        this.connexionUserNameFieldFocus(false);
    },
    getAccountPanels: function(generalSpace) {
        var accountPanel = this.getPluginElement('vbox',['id','flex'],
                                                        [ACCOUNT_PANEL_ID,'1']);
        accountPanel.appendChild(this.getAccountPanelsTitle(generalSpace));
        accountPanel.appendChild(this.getAccountConnexionPanel(generalSpace));
        return accountPanel;
    },
    getAccountPanelsTitle: function(generalSpace) {
        var titleBox = this.getPluginElement('hbox',['id'],
                                                    ['pimi_home_title']);
        var titleBoxImage = this.getPluginElement('image',['id','src','tooltiptext'],
                                                          ['pimi_home_logo','images/logo.png',panelPimiLogoTooltipText]);
        titleBoxImage.onclick = function(event) { generalSpace.showPimiHome(); };
        titleBox.appendChild(titleBoxImage);
        return titleBox;
    },
    getAccountConnexionPanel: function(generalSpace) {
        var obj = this;
        var rootElement = this.utilInterfaceTool.getRootElement();
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
        accountSigninButton.onclick = function(event) { obj.connectPimiAccount(generalSpace); };
        accountCreationRow.appendChild(accountSigninButton);
        accountCreationRows.appendChild(accountCreationRow);
        accountCreationRow = this.getPluginElement('row',[],[]);
        var accountSigninSwitchButton = this.getPluginElement('button',['id','class','flex','label','tooltiptext'],
                                                                       [ACCOUNT_SIGNIN_SWITCH_BUTTON_ID,'form_button','1',panelAccountConnexionAccountCreationButtonLabel,panelAccountConnexionAccountCreationButtonTooltipText]);
        accountSigninSwitchButton.onclick = function(event) { obj.switchAccountPanels(generalSpace); };
        var offsetButton = 508;
        var accountSigninSwitchButtonMarginTop = this.utilInterfaceTool.getSideBarHeight() - offsetButton;
        accountSigninSwitchButton.style.marginTop = accountSigninSwitchButtonMarginTop + 'px';
        accountCreationRow.appendChild(accountSigninSwitchButton);
        accountCreationRows.appendChild(accountCreationRow);
        accountCreationGrid.appendChild(accountCreationRows);

        var offsetGrid = 564;
        var accountCreationGridMarginTop = this.utilInterfaceTool.getSideBarHeight() - offsetGrid;
        accountCreationGrid.style.marginTop = accountCreationGridMarginTop + 'px';

        return accountCreationGrid;
    },
    getAccountCreationPanel: function(generalSpace) {
        var obj = this;
        var rootElement = this.utilInterfaceTool.getRootElement();
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
        accountSignupButton.onclick = function(event) { obj.createPimiAccount(generalSpace); };
        accountConnexionRow.appendChild(accountSignupButton);
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionRow = this.getPluginElement('row',[],[]);
        var accountSignupSwitchButton = this.getPluginElement('button',['id','class','flex','label','tooltiptext'],
                                                                       [ACCOUNT_SIGNUP_SWITCH_BUTTON_ID,'form_button','1',panelAccountCreationConnexionButtonLabel,panelAccountCreationConnexionButtonTooltipText]);
        accountSignupSwitchButton.onclick = function(event) { obj.switchAccountPanels(generalSpace); };
        var offsetButton = 584;
        var accountSignupSwitchButtonMarginTop = this.utilInterfaceTool.getSideBarHeight() - offsetButton;
        accountSignupSwitchButton.style.marginTop = accountSignupSwitchButtonMarginTop + 'px';
        accountConnexionRow.appendChild(accountSignupSwitchButton);
        accountConnexionRows.appendChild(accountConnexionRow);
        accountConnexionGrid.appendChild(accountConnexionRows);

        var offsetGrid = 604;
        var accountConnexionGridMarginTop = this.utilInterfaceTool.getSideBarHeight() - offsetGrid;
        accountConnexionGrid.style.marginTop = accountConnexionGridMarginTop + 'px';

        return accountConnexionGrid;
    },
    /*-----------------------------------------------
        Account panel methods
    -----------------------------------------------*/
    deleteAccountPanel: function(){
        var accountPanel = this.pluginContext.getElementById(ACCOUNT_PANEL_ID);
        accountPanel.parentNode.removeChild(accountPanel);
    },
    switchAccountPanels: function(generalSpace) {
        var accountConnexionForm = this.pluginContext.getElementById(ACCOUNT_SIGNIN_PANEL_ID);
        var accountCreationForm = this.pluginContext.getElementById(ACCOUNT_SIGNUP_PANEL_ID);
        if(accountConnexionForm != null) {
            accountCreationForm = this.getAccountCreationPanel(generalSpace);
            accountConnexionForm.parentNode.replaceChild(accountCreationForm, accountConnexionForm);
            this.creationEmailAddressFieldFocus(false);
        }
        else if(accountCreationForm != null) {
            accountConnexionForm = this.getAccountConnexionPanel(generalSpace);
            accountCreationForm.parentNode.replaceChild(accountConnexionForm, accountCreationForm);
            this.connexionUserNameFieldFocus(false);
        }
    },
    enableDisableAccountPanelButtons: function(enable){
        var disabledValue = 'true';
        if(enable)
            disabledValue = 'false';
        var sigInButton = this.pluginContext.getElementById(ACCOUNT_SIGNIN_BUTTON_ID);
        var sigInSwitchButton = this.pluginContext.getElementById(ACCOUNT_SIGNIN_SWITCH_BUTTON_ID);
        if((sigInButton != null) && (sigInSwitchButton != null)) {
            sigInButton.setAttribute('disabled', disabledValue);
            sigInSwitchButton.setAttribute('disabled', disabledValue);
        }
        var sigUpButton = this.pluginContext.getElementById(ACCOUNT_SIGNUP_BUTTON_ID);
        var sigUpSwitchButton = this.pluginContext.getElementById(ACCOUNT_SIGNUP_SWITCH_BUTTON_ID);
        if((sigUpButton != null) && (sigUpSwitchButton != null)) {
            sigUpButton.setAttribute('disabled', disabledValue);
            sigUpSwitchButton.setAttribute('disabled', disabledValue);
        }
    },
    connectPimiAccount: function(generalSpace) {
        var userNameInput = this.pluginContext.getElementById(ACCOUNT_SIGNIN_USERNAME_FIELD_ID);
        var userPasswordInput = this.pluginContext.getElementById(ACCOUNT_SIGNIN_PASSWORD_FIELD_ID);
        generalSpace.connectPimiAccount(userNameInput.value,
                                        userPasswordInput.value);
    },
    createPimiAccount: function(generalSpace) {
        var userEmailAddressInput = this.pluginContext.getElementById('account_creation_email');
        var userNameInput = this.pluginContext.getElementById('account_creation_user_name');
        var userPasswordInput = this.pluginContext.getElementById('account_creation_password');
        var userPasswordRepeatedInput = this.pluginContext.getElementById('account_creation_repeat_password');
        generalSpace.createPimiAccount(userEmailAddressInput.value,
                                       userNameInput.value,
                                       userPasswordInput.value,
                                       userPasswordRepeatedInput.value);
    },
    inputFocus: function(inputId, emptyField) {
        var input = this.pluginContext.getElementById(inputId);
        if(emptyField)
            input.value = '';
        input.focus();
    },
    connexionUserNameFieldFocus: function(emptyField) {
        this.inputFocus(ACCOUNT_SIGNIN_USERNAME_FIELD_ID, emptyField);
    },
    connexionPasswordFieldFocus: function(emptyField) {
        this.inputFocus(ACCOUNT_SIGNIN_PASSWORD_FIELD_ID, emptyField);
    },
    creationEmailAddressFieldFocus: function(emptyField) {
        this.inputFocus('account_creation_email', emptyField);
    },
    creationUserNameFieldFocus: function(emptyField) {
        this.inputFocus('account_creation_user_name', emptyField);
    },
    creationPasswordFieldFocus: function(emptyField) {
        this.inputFocus('account_creation_password', emptyField);
    },
    creationRepeatPasswordFieldFocus: function(emptyField) {
        this.inputFocus('account_creation_repeat_password', emptyField);
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