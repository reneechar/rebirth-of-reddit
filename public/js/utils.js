(function(window) {
	//namespacing
	window.App = window.App || {};

	//url must be a string
	//callback : function(data)
	const Get = (url,callback) => {
	  // create new XHR object
	  let oReq = new XMLHttpRequest();

	  // attach events: 'load', 'error'
	  oReq.addEventListener('progress', function(){
	    
	  });
	  oReq.addEventListener('load', function(){
	    callback(this.responseText);
	  });
	  oReq.addEventListener('error', function(){
	    console.log('ERROR loading data from', url);
	  });

	  // first arg: METHOD, second arg: URL
	  oReq.open('GET', url);
	  // HEADERS GO HERE
	  oReq.setRequestHeader('Accept', 'application/json');
	  //fire off request
	  oReq.send();
	};
	

	window.App.utils = {
		Get
	}
}(window));