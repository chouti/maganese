function clearform(){
	document.new_task.title.value=""
}

function	postvalues(){
	var values = $(":input").serialzeArray();
}

$(document).ready(function() {
	$('#add').hide();
	$('#newtask').click(function() {
		$('#add').show("slow");
	});
});

$(document).ready(function() {
	$('#new_task').submit(function() {
		var title=$("input[name='Title']").val();
		var due_date=$("select[name='due_date']").val();
		var data = $(':input').serializeArray();
		console.log(data);
		if(title!=""){
			$.ajax({
			  url: url,
			  type: "POST",
			  beforeSend: function(req){
				req.setRequestHeader('Authorization', auth);
			},
			  contentType:'application/json; charset=utf-8',
			  data: data,
			  dataType: 'json'
			});
		}else{
			alert("Title can not be empty!");
		}
	});
});