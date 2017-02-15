(function() {
	showConnectionBody();
	var backKeyEvent = function(ev) {
		if (ev.keyName === "back") {
			window.history.back();
		}
	}

	var backKeyEventConnection = function(ev) {
		if (ev.keyName === "back") {
			window.removeEventListener('tizenhwkey', backKeyEventConnection);
			showConnectionBody();
		}
	}

	function showConnectionBody() {
		$("#body").load("../views/connections_body.html", function() {
			window.addEventListener('tizenhwkey', backKeyEvent);
			showConnections();
		});
	}

	function showConnections() {
		var from = findGetParameter('from');
		var to = findGetParameter('to')
		document.getElementById('title').innerHTML = from + " - " + to;

		var connections_data = null;
		getConnection(from, to)

		function findGetParameter(parameterName) {
			var result = null, tmp = [];
			location.search.substr(1).split("&").forEach(function(item) {
				tmp = item.split("=");
				if (tmp[0] === parameterName)
					result = decodeURIComponent(tmp[1]);
			});
			return result;
		}

		function showConnectionsData(data) {
			var box = document.getElementById('connections');
			var return_html = "";
			var connection_id = 0;
			$(data.connections).each(
					function(index, connection) {
						return_html += '<li><a href="#" id="connection'
								+ connection_id
								+ '">'
								+ connection.from.departure
										.match(/(\d\d:\d\d)/gi) + ", Pl. "
								+ connection.from.platform + "</a></li>";
						connection_id++;
					});
			box.innerHTML = return_html;
			connections_data = data;
			scrollContent();
			
		}
		$('#connections').on('click', '#connection0', function() {
			showDetails(0);
		});
		$('#connections').on('click', '#connection1', function() {
			showDetails(1);
		});
		$('#connections').on('click', '#connection2', function() {
			showDetails(2);
		});
		$('#connections').on('click', '#connection3', function() {
			showDetails(3);
		});
		$('#connections').on('click', '#connection4', function() {
			showDetails(4);
		});

		function showDetails(id) {
			showDetailPage(connections_data.connections[id]);
		}

		function getConnection(from, to) {
			$.ajax({
				dataType : "json",
				url : "http://transport.opendata.ch/v1/connections?from="
						+ from + "&to=" + to,
				success : function(data) {
					showConnectionsData(data);
				},
				error : function(xhr, status, error) {
					alert("Error while getting data")
				}
			});
		}
	}
	
	function scrollContent() {
		(function() {
			var SCROLL_STEP = 40; // distance of moving scroll for each rotary event

			elScroller = document.querySelector(".ui-content");

			// rotary event handler
			rotaryEventHandler = function(e) {
				if (elScroller) {
					var test =  elScroller.scrollTop;
					if (e.detail.direction === "CW") { // Right direction
						$(elScroller).animate({ scrollTop: elScroller.scrollTop + SCROLL_STEP }, 30);
					} else if (e.detail.direction === "CCW") { // Left direction
						$(elScroller).animate({ scrollTop: elScroller.scrollTop - SCROLL_STEP }, 30);
					}
				}
			};

			// register rotary event.
			document.addEventListener("rotarydetent", rotaryEventHandler,
					false);

			// unregister rotary event
			document.addEventListener("pagebeforehide",
					function pageHideHanlder() {
						document.removeEventListener("pagebeforehide",
								pageHideHanlder, false);
						document.removeEventListener("rotarydetent",
								rotaryEventHandler, false);
					}, false);
		}());
	}

	function showDetailPage(connection) {
		alert("Please buy \n Swiss timetable \n or Swiss Fahrplan \n to see this view.")
	}
}());
