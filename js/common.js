function make_base_auth(user,pass){
	var tok = user + ':' + pass;
	var hash = Base64.encode(tok);
	return "Basic " + hash;
}	// HTTP basic auth function.

var	doit_username = localStorage.username;
var doit_password = localStorage.password;
var auth = make_base_auth(doit_username, doit_password);

function showdate(n){
var uom = new Date(new Date()-0+n*86400000);
uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate();
return uom.replace(/\b(\w)\b/g, '0$1');
}	// get date info.

var today = showdate(0);
var tomorrow = showdate(1);

var settings = 'https://api.doit.im/v1/settings';	// User info api url.
var tasks = 'https://api.doit.im/v1/tasks';	// User task info api url.

$.ajaxSetup({
	dataType: 'json',
	beforeSend: function(req){
		req.setRequestHeader('Authorization', auth);
	},
	contentType: "application/json; charset=utf-8"
});


function open_option() {
		var url = chrome.extension.getURL('options.html');
		chrome.tabs.create({
		url: url,
		selected: true
		});
}

function clearform(){
	document.new_task.title.value=""
}
