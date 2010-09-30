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
var today = year+'-'+month+'-'+date;
if(parseInt(year/4)==year/4 && month==02 && date==29){
	var tomorrow = year+'-'+(month+1)+'-'+'01'
};
if(parseInt(year/4)!=year/4 && month==02 && date==28){
	var tomorrow = year+'-'+(month+1)+'-'+'01'
};
if((month==04||06||09||11) && date==30){
	var tomorrow = year+'-'+(month+1)+'-'+'01'
};
if((month==01||03||05||07||08||10) && date==30){
	var tomorrow = year+'-'+(month+1)+'-'+'01'
};
if(month==12 && date==31){
	var tomorrow = (year+1)+'-'+'01'+'-'+'01'
};

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
		if(data.entries.completed="null"){
		$.each(data.entries, function(i,item){
			var title = item.title;
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
		});
		}
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