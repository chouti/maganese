function make_base_auth(user,pass){
	var tok = user + ':' + pass;
	var hash = Base64.encode(tok);
	return "Basic " + hash;
}

var	doit_username = localStorage.username;
var doit_password = localStorage.password;
var auth = make_base_auth(doit_username, doit_password);
var url = 'https://api.doit.im/v1/settings';

$(document).ready(function() {
	if (localStorage.length==0) {
		$("#userinfo").append('<p>Need login before loading user information...</p>')} else{
$.ajax({
	url: url,
	method: 'GET',
	beforeSend: function(req){
		req.setRequestHeader('Authorization', auth);
	},
	dataType: "json",
	success: function(data){
		$('#content').hide();
		$('#userinfo').append("<p>You've logged in as:"+data.username+'</p>' );
	},
	error: function(){
		$('#userinfo').append('<p>Username or password wrong</p>');
	}
});
};
});