if(window.EventSource !== undefined){
	console.log('starting up'); 
	var source = new EventSource('/connect'); 
	source.addEventListener('message', 	function(e){
		var data = JSON.parse(e.data); 
		var message = Object.keys(data.log)
		.sort(function(a,b){
			return a - b; 
		})
		.map(function (key) {
			return data.log[key];
		});
		if(data.type === "log"){
			console.log(...message); 
		}
		if(data.type === "error"){
			console.error(...message); 
		}
	}, false); 
	source.addEventListener('open', function(e){
		console.log('opened connection'); 
	}, false);
}
else{
	console.log('no event source'); 
}
