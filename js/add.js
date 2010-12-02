function clearform(){
	document.new_task.Title.value=""
}

$(document).ready(function() {
	$('#add').hide();
	$('#newtask').click(function() {
		$('#add').show("slow");
	});
});

var title = $("input[name='Title']").val();
var due_date = $("select[name='due_date']").val();

$(document).ready(function() {
	$('#new_task').submit(function(){
		if (title!="") {} else{
			alert("Title can not be empty");
		};
	});
});