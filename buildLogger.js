var fs = require('fs'); 
var os = require('os');
var interfaces = os.networkInterfaces();
var networkIP;
for (var interface in interfaces) {
    for (var connection in interfaces[interface]) {
        var address = interfaces[interface][connection];
        if (address.family === 'IPv4' && !address.internal) {
            networkIP = address.address + ":8080"; 
        }
    }
}

var url = process.argv[2] || process.env.LOGGERIP || networkIP || "http://192.168.0.50:8080";


fs.readFile('./logger.js','utf8', function(err, data){
	if(err){
		throw err; 
	}else{
		var fileArray = data.split('\n');
		fileArray[1] = '    var url = "' + url +'";';
		var stitchedFile = fileArray.join('\n'); 
		fs.writeFile('./logger.js', stitchedFile, function(err){
			if(err){
				throw err; 
			}
		});
	}
});