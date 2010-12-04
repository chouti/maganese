function make_base_auth(user,pass){
	var tok = user + ':' + pass;
	var hash = Base64.encode(tok);
	return "Basic " + hash;
}

var	doit_username = localStorage.username;
var doit_password = localStorage.password;
var auth = make_base_auth(doit_username, doit_password);
var url = 'https://api.doit.im/v1/tasks';
function showdate(n)
{
var uom = new Date(new Date()-0+n*86400000);
uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate();
return uom.replace(/\b(\w)\b/g, '0$1');
}
var today = showdate(0);
var tomorrow = showdate(1);

$(document).ready(function(){if (localStorage.length==0) {
$('#message').append('<p>Please first login your Doit.im account<br /><a href="#" id="options">Option</a></p>');
$('#today').hide();
$('#tomorrow').hide();
} else{
$('#message').hide();
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
			var easy2do_tasks=item.start_at != null && item.completed==null && item.trashed==null;
			if(easy2do_tasks==true){
			var startarry = item.start_at.split(" ");
			var start = startarry[0];
			if(start==today){
			$('#intime').append('<span><li>' + title + '</li></span>');
			} else if (start < today){
			$('#overdue').append('<span><li>' + title + '</li></span>');
			};
			if(start==tomorrow){
			$('#next').append('<span><li>' + title + '</li></span>')
			}
		}
		});
		}
});
};
});

$(document).ready(function() {
	$('#options').click(function() {
		var url = chrome.extension.getURL('options.html');
		chrome.tabs.create({
		url: url,
		selected: true
		});
	});
});