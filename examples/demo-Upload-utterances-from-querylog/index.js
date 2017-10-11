var path = require('path');

const download = require('./_download');
const parse = require('./_parse');
const upload = require('./_upload');

// TBD: CHANGE THESE VALUES
const LUIS_subscriptionKey = "e237d6bc86cd4562bf67b09dff44d2e6"; 
const LUIS_appId = "84d6601f-a1f0-456e-a894-be5e662a5a6b";
const LUIS_versionId = "0.1";

// NOTE: final output of upload api named utterances.upload.json
const downloadFile= "./utterances.csv";
const uploadFile = "./utterances.json"

/* download configuration */
var configDownload = {
    LUIS_subscriptionKey: LUIS_subscriptionKey,
    LUIS_appId: LUIS_appId,
    outFile: path.join(__dirname, "./utterances.csv"),
    uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/querylogs".replace("{appId}",LUIS_appId)
};

/* upload configuration */
var configUpload = {
    LUIS_subscriptionKey: LUIS_subscriptionKey,
    LUIS_appId: LUIS_appId,
    LUIS_versionId: LUIS_versionId,
    inFile: path.join(__dirname, uploadFile),
    uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples".replace("{appId}", LUIS_appId).replace("{versionId}", LUIS_versionId)
};

/* parse configuration */
var configParse = {
    inFile: path.join(__dirname, "./utterances.csv"),
    outFile: path.join(__dirname, "./utterances.json")
}; 

var output = {};

download(configDownload)
.then(output => {
    output.download = output;
    return parse(configParse);
}).then(output => {
    output.convert = output;
    return upload(configUpload);
}).then(output => {
    output.upload = output;
    console.log("process done");  
});

// single step - uncomment 1 line only
//download(configDownload).catch(console.log);
//parse(configParse);
//upload(configUpload)