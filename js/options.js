function logout(){
	$('#clear').click(function(){
		localStorage.clear();
		$('#content').slideDown();
		get_user_info();
		});
}

$(document).ready(function() {
	get_user_info();
	setTimeout(function(){
		logout();
		},3000);
//		console.log($('#clear'))
});