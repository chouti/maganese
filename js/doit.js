function	get_user_info(){
	$.get(settings, function(data) {
	  $('#user_info').append("You've logged in as:"+data.username)
	});
}

function	get_user_tasks(){
	$.getJSON(tasks, function(data){
		$.each(data.entries, function(i,item){
			var task_title=item.title;
			var easy2do_tasks=item.start_at!=null&&item.completed==null&&item.trashed==null&&item.assignment==null&&item.repeater==null;
			var task_id=item.id;
			if(easy2do_tasks){
				var start_at_array=item.start_at.split(" ");
				var start_at=start_at_array[0];
				var new_pair={task_id:task_title};
				if(start_at==today){
					$('#intime').append('<li><input type="image" name="complete_intime" src="img/complete.png" value="'+(task_id)+'"><span id="origin_task">' + task_title + '</span></li>');}
					else if(start_at<today){
						$('#overdue').append('<li><input type="image" name="complete_overdue" src="img/complete.png" value="'+(task_id)+'"><span id="origin_task">' + task_title + '</span></li>');};
				if(start_at==tomorrow){
					$('#next').append('<li><input type="image" name="complete_next" src="img/complete.png" value="'+(task_id)+'"><span id="origin_task">' + task_title + '</span></li>');}
			}
		})
	});
	
}

function post_user_tasks(){
	var newtask_title=$("input[name='title']").val();
	var newtask_start_at_option=$("select[name='start_at']").val();
	if(newtask_start_at_option=="today"){newtask_start_at=today}else{newtask_start_at=tomorrow};
	newtask=JSON.stringify({'title':newtask_title,'start_at':newtask_start_at});
	$.post(tasks, newtask);
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

function complete_user_task(origin_id){
	$.getJSON(tasks, function(data){
		for(var i=0; i<data.entries.length; i++){
			if(data.entries[i].id==origin_id){
				var entry=data.entries[i];
				entry.completed=today;
				var new_entry=JSON.stringify(entry);
				console.log(new_entry);
				$.post(tasks, new_entry);
				return;
			}
		}
	});
}

function advertise(){
	if(localStorage.length==0){
		$('#now').hide();
		$('#before').hide();
		$('#operater').hide();
		$('#feature').hide();
		$('#today').append("<p id='adv'>You need login your Doit.im account first.</p>");
		$('#tomorrow').append("<p id='adv'>You need login your Doit.im account first.</p>");
	}
	else  if($('input[name="complete_intime"]').length==0&&$('input[name="complete_overdue"]').length==0){
		$('#now').hide();
		$('#before').hide();
		$('#today').append("<p id='adv'>Wow! You've done all your tasks for today!<br /><br /> Or take a look at your tomorrow's tasks...</p>");
	}
	if(localStorage.length!=0&&$('input[name="complete_next"]').length==0){
		$('#feature').hide();
		$('#tomorrow').append("<p id='adv'>Hola! No tasks for tomorrow, how about create some?</p>")
	}
}

$(document).ready(function() {
	setTimeout(function(){advertise();},1500);
	show_add_task();
	get_user_tasks();
	$('#new_task').submit(function(){
	post_user_tasks();
	});
	setTimeout(function(){
		$('input[name*="complete"]').click(function(){
			var origin_id=$(this).attr('value');
			console.log(origin_id);
			complete_user_task(origin_id);
			$(this).parent('li').slideUp();
		});
		},1500);
});
