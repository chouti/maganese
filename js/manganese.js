function make_base_auth(user,pass){
	var tok = user + ':' + pass;
	var hash = Base64.encode(tok);
	return "Basic " + hash;
}

var	doit_username = localStorage.username;
var doit_password = localStorage.password;
var auth = make_base_auth(doit_username, doit_password);
var url = 'https://api.doit.im/v1/tasks';

if (localStorage.length==0) {$('#wrap').append('<p>Please first login your Doit.im account<br /><a href="options.html">Option</a></p>');} else{
$.ajax({
	url: url,
	method: 'GET',
	beforeSend: function(req){
		req.setRequestHeader('Authorization', auth);
	},
	dataType: "json",
	success: function(data){
		$.each(data.entries, function(i,item){
			var title = item.title;
			$('#wrap').append('<li>' + title + '</li>');
		});
	}
});
};