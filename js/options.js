	$(document).ready(function() {
		if (typeof(localStorage) == 'undefined' ) {
			alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		} else {
			$("#login").submit(function(){
				var newDate = new Date();
				var itemId = newDate.getTime();
				var values = new Array();
				var username = $("input[name='conf_doit_username']").val();
				var password = $("input[name='conf_doit_password']").val();

				values.push(username);
				values.push(password);

				if (username != "" && password != "") {
					try {
						localStorage.setItem(itemId, values.join(';'));
					} catch (e) {
						if (e == QUOTA_EXCEEDED_ERR) {
							alert('Quota exceeded!');
						}
					}
				} else {
					alert("Username and Password needed.");
				}
			});
		}
	});