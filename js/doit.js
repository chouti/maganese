function	get_user_info(){
	$.get(settings, function(data) {
	  $('#user_info').append("You've logged in as:"+data.username)
	});
}

function	get_user_tasks(){
	$.get(tasks, function(data){
		$.each(data.entries, function(i,item){
			var task_title=item.title;
			var easy2do_tasks=item.start_at!=null&&item.completed==null&&item.trashed==null;
			if(easy2do_tasks){
				var start_at_array=item.start_at.split(" ");
				var start_at=start_at_array[0];
				if(start_at==today){$('#intime').append('<span><li>' + task_title + '</li></span>');}else if(start_at<today){$('#overdue').append('<span><li>' + task_title + '</li></span>');};
				if(start_at==tomorrow){$('#next').append('<span><li>' + task_title + '</li></span>');}
			}
		})
	});
}

function post_user_tasks(){
	var newtask_title=$("input[name='title']").val();
	var newtask_start_at_option=$("select[name='start_at']").val();
	if(newtask_start_at_option=="today"){newtask_start_at=today}else{newtask_start_at=tomorrow};
	newtask=JSON.stringify({'title':newtask_title,'start_at':newtask_start_at});
	$.post(tasks, newtask, function(){
		get_user_tasks();
	});
}

function show_add_task(){
	$('#add').hide();
	$('#addtask').click(function(){
		$('#add').show('slow');
	});
}

$(document).ready(function() {
	show_add_task();
	get_user_info();
	get_user_tasks();
	$('#new_task').submit(function(){
		post_user_tasks();
	});
});
