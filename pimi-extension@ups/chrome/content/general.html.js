/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Folders paths
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
var configFolderPath = "config/";
var domainFolderPath = "domain/";

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Libraries import
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
importJsScriptElement(configFolderPath + "config.js");
importJsScriptElement(configFolderPath + "language.js");
importJsScriptElement(configFolderPath + "style.js");
importJsScriptElement(domainFolderPath + "domain.js");

function importJsScriptElement(filePath) {
    var scriptElement =  document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = filePath;
	document.body.appendChild(scriptElement);
}