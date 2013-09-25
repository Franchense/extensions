/** Server urls */
var serverAddress = 'http://piaff-test.winckler.webfactional.com';
var rootPrefix = '/';
var piaffHomeUrl = rootPrefix;
var pimisGetUrl = rootPrefix + 'pims/get.php';
var pimisShowUrl = rootPrefix + 'pims/show.php';
var pimisUpdateUrl = rootPrefix + 'pims/update.php';
var usersCreateUrl = rootPrefix + 'users/create.php';
var usersConnectUrl = rootPrefix + 'users/connect.php';
var usersDisconnectUrl = rootPrefix + 'users/disconnect.php';
var annotationsGetUrl = rootPrefix + 'annotations';
var annotationsFindUrl = rootPrefix + 'annotations/find.php';
var annotationsUpdateUrl = rootPrefix + 'annotations/update.php';
var microformatsGetUrl = rootPrefix + 'microformats';

/** Remote files locations */
var emptyAnnotationXmlFileLocation = '/data/annotations/emptyAnnotationFile.xml';
var userCssFileLocation = '/css/pimsplugin.css';
var adoptedMicroformatsXmlFileLocation = '/data/microformats/microformats.xml';
var proposedMicroformatsXmlFileLocation = '/data/microformats/microformats_proposed.xml';

/** Internal files */
var configDirectoryPath = 'config/';
var dataDirectoryPath = 'data/';
var pimsDirectoryPath = 'pims/';
var formatedPimsDirectoryPath = dataDirectoryPath + 'microformatedPims/';
var formatedPimsNameSuffix = '.microformatedPim.xml';
var adoptedFormatedPimsNameSuffix = '.adopted' + formatedPimsNameSuffix;
var proposedFormatedPimsNameSuffix = '.proposed' + formatedPimsNameSuffix;
var emptyPimXmlFilePath = dataDirectoryPath + pimsDirectoryPath + 'pimsEmpty.xml';
var configXmlFilePath = configDirectoryPath + 'config.xml';

/** Local settings */
var regularUserTypeName = 'user';
var annotatorUserTypeName = 'annotator';

/** Logical settings */
var parseFormIntervalTimer = 2000;
var formGroupPrefix = 'formGroup';