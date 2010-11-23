if (typeof(localStorage) == 'undefined' ) {
	alert('Your browser does not support HTML5 localStorage. Try upgrading.');
} else {
	$("#logForm").submit(function(){
		var newDate = new Date();
		var itemId = newDate.getTime();
		var values = new Array();
		var project = $("input[name='project']").val();
		var hours = $("input[name='hours']").val();
		var date = $("input[name='date']").val();

		//strip html tags
		project = project.replace(/(<([^>]+)>)/ig, "");
		values.push(project);
		values.push(hours);
		values.push(date);

		if (project != "" && hours != "" && date != "") {
			try {
				localStorage.setItem(itemId, values.join(';'));
			} catch (e) {
				if (e == QUOTA_EXCEEDED_ERR) {
					alert('Quota exceeded!');
				}
			}
		} else {
			alert("All fields are required.");
		}
	});
}