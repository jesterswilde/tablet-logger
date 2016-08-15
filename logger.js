var logger = function(){
    var url = "192.168.0.100:8080";
	if(typeof console.log === "function"){
		var oldLog = console.log; 
		console.log = function(){
			var logType = "/log";
			var args = arguments; 
			var xml = new XMLHttpRequest(); 
			xml.open("POST", url + logType);
			xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xml.send(JSON.stringify(args)); 
			oldLog.apply(console, args);
		};
	}
	if(typeof console.error === "function"){
		var oldError = console.error; 
		console.error = function(){
			var logType = "/error"; 
			var args = arguments; 
			var xml = new XMLHttpRequest(); 
			xml.open("POST", url + logType);
			xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xml.send(JSON.stringify(args)); 
			oldError.apply(console, args);
		};
	}
}(); 