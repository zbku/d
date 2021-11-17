if(window!=top){top.location.href=window.location.href;}
var shouji = navigator.userAgent.match(/Android|iPad|iPhone|iPod/i) != null;
var url = window.location.href;
var host = window.location.host;
if(shouji){
	if(url.indexOf('//www.') > -1){
		var wwwurl = url.replace("//www.","//m.");
		location.href= wwwurl;
	}
}else{
	if(url.indexOf('//m.') > -1){
		var wwwurl = url.replace("//m.","//www.");
		location.href= wwwurl;
	}
}