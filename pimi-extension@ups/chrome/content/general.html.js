/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Folders paths
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
var configFolderPath = "config/";
var modelFolderPath = "model/";

/*-------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
Libraries import
---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------*/
importJsScriptElement(configFolderPath + "config.js");
importJsScriptElement(configFolderPath + "language.js");
importJsScriptElement(configFolderPath + "style.js");
importJsScriptElement(modelFolderPath + "model.js");

function importJsScriptElement(filePath) {
    var scriptElement =  document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = filePath;
	document.body.appendChild(scriptElement);
}