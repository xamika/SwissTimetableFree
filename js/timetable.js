( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			window.history.back();
		}
	} );
	
	show_home_view();
	
	function show_home_view() {
		var btn_show_connections = document.getElementById('show_connections');

	    btn_show_connections.addEventListener('click', function() {
	    	var from = document.getElementById('from');
	    	var to = document.getElementById('to');      
	        if (name != undefined && name != null) {
	            window.location = '../views/connections.html?from=' + from.value + '&to=' + to.value;
	        }
	    });
	}
}());
