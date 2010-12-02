function clearform(){
	document.new_task.Title.value=""
}
$(document).ready(function() {
	$('#add').hide();
	$('#newtask').click(function() {
		$('#add').show("slow");
	});
});