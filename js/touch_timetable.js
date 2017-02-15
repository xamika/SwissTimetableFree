(function() {
	var from = null;
	var to = null;
	var touchContent = "null";
	window.addEventListener('tizenhwkey', function(ev) {
		if (ev.keyName === "back") {
			window.history.back();
		}
	});

	function divClick(divId) {
		if (from && to) {
			from = null;
			to = null;
		}
		if (from === null) {
			from = getCityName(divId);
			var d = document.getElementById(divId);
			d.className += "button-selected";
		} else {
			var regExp = /button-selected/;
			var matches = regExp.exec(document.getElementById(divId).className);
			if (!matches) {
				to = getCityName(divId);
			} else {
				from = null;
				$("#" + divId).removeClass('button-selected');
			}
		}
		if (from && to) {
			window.location = '../views/connections.html?from=' + from + '&to='
					+ to;
		}
	}

	function getCityName(divId) {
		switch (divId) {
		case "top-left":
			return "Bern";
		case "top-right":
			return "Zürich";
		case "bottom-left":
			return "Basel";
		case "bottom-right":
			return "Genf";
		case "top-center":
			return "Luzern";
		case "bottom-center":
			return "Lausanne";
		default:
			alert("Not found");
		}
	}

	function createFile() {
		var newDir, newFile;
		tizen.filesystem.resolve("documents", function(dir) {
			try {
				newDir = dir.createDirectory("sbbGear");
				newFile = newDir.createFile("touchTable.txt");
			} catch (err) {
				dir.createFile("sbbGear/touchTable.txt");
			}

		});
	}

	function showCityNames() {
		document.getElementById('top-left').innerHTML = getCityName('top-left');
		document.getElementById('top-right').innerHTML = getCityName('top-right');
		document.getElementById('top-center').innerHTML = getCityName('top-center');
		document.getElementById('bottom-left').innerHTML = getCityName('bottom-left');
		document.getElementById('bottom-right').innerHTML = getCityName('bottom-right');
		document.getElementById('bottom-center').innerHTML = getCityName('bottom-center');
	}

	tizen.filesystem.resolve("documents", function(dir) {
		var file;
		try {
			file = dir.resolve("sbbGear/touchTable.txt");
		} catch (err) {
			createFile();
			showCityNames();
		}
		if (file) {
			file.openStream("r", function(fs) {
				try {
					var text = fs.read(file.fileSize);
					fs.close();
					touchContent = text;
					showCityNames();
				} catch (err) {
					showCityNames();
				}
			}, function(e) {
				alert("Error " + e.message);
			}, "UTF-8");
		}
	});

	function startEditTouchTimetableListener(divId) {
		setTimeout(function() {
			openEditTouchTimetable(divId)
		}, 750);
	}

	function openEditTouchTimetable(divId) {
		if (edit) {
			alert("Please buy \n Swiss Timetale \n or Swiss Fahrplan \n to edit this view")
		} else {
			edit = true;
		}
	}

	var edit = true;
	$('#top-left').on('touchstart', function() {
		startEditTouchTimetableListener('top-left');
	});

	$('#top-left').on('touchend', function() {
		edit = false;
		divClick('top-left');
	});

	$('#top-right').on('touchstart', function() {
		startEditTouchTimetableListener('top-right');
	});

	$('#top-right').on('touchend', function() {
		edit = false;
		divClick('top-right');
	});

	$('#top-center').on('touchstart', function() {
		startEditTouchTimetableListener('top-center');
	});

	$('#top-center').on('touchend', function() {
		edit = false;
		divClick('top-center');
	});

	$('#bottom-left').on('touchstart', function() {
		startEditTouchTimetableListener('bottom-left');
	});

	$('#bottom-left').on('touchend', function() {
		edit = false;
		divClick('bottom-left');
	});

	$('#bottom-right').on('touchstart', function() {
		startEditTouchTimetableListener('bottom-right');
	});

	$('#bottom-right').on('touchend', function() {
		edit = false;
		divClick('bottom-right');
	});

	$('#bottom-center').on('touchstart', function() {
		startEditTouchTimetableListener('bottom-center');
	});

	$('#bottom-center').on('touchend', function() {
		edit = false;
		divClick('bottom-center');
	});

}());
