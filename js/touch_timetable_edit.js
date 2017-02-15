( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			window.history.back();
		}
	} );
	
	show_home_view();
	
	function show_home_view() {
		var btn_show_connections = document.getElementById('save');
		var city = document.getElementById('city');
		city.value = findGetParameter('content');

	    btn_show_connections.addEventListener('click', function() {
	    	if (validate_input(city.value)) {
	    		updateFile(findGetParameter('divId'), city.value);
	    	}
	    });
	}
	
	function validate_input(input) {
		var regExp = /([a-zA-ZäöüÄÖÜ,\(\)-éèàôÉÈÀÔ ]+)/;
		var matches = regExp.exec(input);
		if (matches) {
			return true
		}
		alert("Only these characters\n are allowed:\n a-zA-Z\näöüÄÖÜ\néèàôÉÈÀÔ\n,-()")
		return false
	}
	
	function findGetParameter(parameterName) {
		var result = null, tmp = [];
		location.search.substr(1).split("&").forEach(function(item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName)
				result = decodeURIComponent(tmp[1]);
		});
		return result;
	}
	
	function updateFile(divId, city) {
		tizen.filesystem.resolve("documents", function(dir) {
			var file = dir.resolve("sbbGear/touchTable.txt");
			if (file) {
				file.openStream(
						"r",
						function(fs) {
							try {
								var text = fs.read(file.fileSize);
								var regExp = new RegExp(divId + ":\[a-zA-ZäöüÄÖÜ,\(\)-éèàôÉÈÀÔ ]+###", "g");
								var matches = regExp.exec(text)
								if (matches) {
									text = text.replace(matches[0], divId + ":" + city + "###");
								} else {
									text += divId + ":" + city + "###";
								}
								writeToFile(text);
							} catch(err) {
								writeToFile(divId + ":" + city + "###")
							}
							fs.close();
						}, function(e) {
							alert("Error " + e.message);
						}, "UTF-8");
			} else {
				writeToFile(divId + ":" + city + "###");
			}
		});
	}
	
	function writeToFile(text) {
		tizen.filesystem.resolve("documents", function(dir) {
			var file = dir.resolve("sbbGear/touchTable.txt");
			if (file) {
				file.openStream(
						"w",
						function(fs) {
							fs.write(text);
							fs.close();
							window.history.back();
						}, function(e) {
							alert("Error " + e.message);
						}, "UTF-8");
			} else {
				alert("Error while writing to File")
			}

		});
	}
}());
