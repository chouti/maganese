function	get_user_info(){
	$.ajax({
		url: settings,
		type: 'GET',
		success: function(data){
			$('#user_info').append("You've logged in as:"+data.username)
		}
	});
}

function	get_user_tasks(){
	$.ajax({
		url: tasks,
		type: 'GET',
		success: function(data){
			$.each(function(index) {
				
			});
			$('#task_list').append("Your")
		}
	});
}

$(document).ready(function() {
	get_user_info();
});