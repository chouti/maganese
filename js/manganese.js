function make_base_auth(user,pass){
	var tok = user + ':' + pass;
	var hash = Base64.encode(tok);
	return "Basic " + hash;
}

var	doit_username = localStorage.username;
var doit_password = localStorage.password;
var auth = make_base_auth(doit_username, doit_password);
var url = 'https://api.doit.im/v1/tasks';
var d = new Date();
var date = d.getDate();
	if (date < 10)
		date = "0"+date;
var month = d.getMonth()+1;
	if (month < 10)
		month = "0"+month;
var year = d.getFullYear();


$(document).ready(function(){if (localStorage.length==0) {$('#today').append('<p>Please first login your Doit.im account<br /><a href="options.html">Option</a></p>');} else{
$.ajax({
	url: url,
	method: 'GET',
	beforeSend: function(req){
		req.setRequestHeader('Authorization', auth);
	},
	dataType: "json",
	success: function(data){
		if(data.entries.completed="null"){
		$.each(data.entries, function(i,item){
			var title = item.title;
			var startarry = item.start_at.split(" ");
			var start = startarry[0];
			if(start==year+'-'+month+'-'+date){
			$('#intime').append('<span><li>' + title + '</li></span>');
			} else if (start < year+'-'+month+'-'+date){
			$('#overdue').append('<span><li>' + title + '</li></span>');
			}
		});
		}
	}
});
};
});