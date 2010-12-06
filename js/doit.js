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
			var task_id=item.id;
			if(easy2do_tasks){
				var start_at_array=item.start_at.split(" ");
				var start_at=start_at_array[0];
				var new_pair={task_id:task_title};
				if(start_at==today){
					$('#intime').append('<li><img src="img/complete.png" id="complete_task" value="'+(task_id)+'" /><span id="origin_task">' + task_title + '</span></li>');}
					else if(start_at<today){
						$('#overdue').append('<li><img src="img/complete.png" id="complete_task" value="'+(task_id)+'" /><span id="origin_task">' + task_title + '</span></li>');};
				if(start_at==tomorrow){
					$('#next').append('<li><img src="img/complete.png" id="complete_task" value="'+(task_id)+'" /><span id="origin_task">' + task_title + '</span></li>');}
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
	$('#cancel_add').hide();
	$('#addtask').click(function(){
		$('#add').show('slow');
		$('#addtask').hide();
		$('#cancel_add').show();
	});
	$('#cancel_add').click(function(){
		$('#add').hide('slow');
		$('#cancel_add').hide();
		$('#addtask').show();
	});
}

function complete_task(){
		var checked_id=$("input:checked").val();
		$.get(tasks,function(data){
		$.each(data.entries, function(i,item){
			alert(item.title);
		});
	});

}

$(document).ready(function() {
	show_add_task();
	get_user_tasks();
	$('#new_task').submit(function(){
	post_user_tasks();
	});
	$('#complete_checkbox').bind('onclick',function(){complete_task});
	
});
