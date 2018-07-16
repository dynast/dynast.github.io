var pBar = false;
var m = false;
var s = 0;
var t = 0;

window.applicationCache.addEventListener('checking',logEvent,false);
window.applicationCache.addEventListener('noupdate',logEvent,false);
window.applicationCache.addEventListener('downloading',logEvent,false);
window.applicationCache.addEventListener('cached',logEvent,false);
window.applicationCache.addEventListener('updateready',logEvent,false);
window.applicationCache.addEventListener('obsolete',logEvent,false);
window.applicationCache.addEventListener('error',logEvent,false);

window.applicationCache.addEventListener('progress', function (event) {
   //console.log('Item', event.loaded, 'of', event.total, 'fetched');
   s = event.loaded;
   t = event.total;
   
   $("#prog").html(s + " of " + t);
}, false);

function manualUpdate(){
	m=true;
	window.applicationCache.update();
}

function logEvent(event) {
	//console.log(event.type);
	if(event.type == "downloading"){
		pBar = true;
		$("#disclaimer div.Absolute-Center").removeAttr("onclick");
		var disc = '<div class="Absolute-Center" style="height:300px;text-align:center;"><h3>Total Mission Solution is updating…</h3><p><img src="styles/images/ajax-loader.gif"></p><p id="prog"></p></div>';
		$("#disclaimer").css("display", "block");
		$("*").css("overflow", "hidden");
		$('#disclaimer').html(disc);
	}
	if(event.type == "error"){
		$("#disclaimer div.Absolute-Center").append("<p style='color:#ffffff;'>ERROR!<br/>Click anywhere to retry.</p>");
		$("#disclaimer div.Absolute-Center").attr("onclick", "manualUpdate()");
	}
	if(event.type == "updateready" || event.type == "cached" && pBar == true){
		closeDisclaimer();
		window.applicationCache.swapCache();
  		window.location.reload();
	}
	if(event.type == "noupdate" && m){
		pBar = true;
		var disc = '<div class="Absolute-Center" style="height:300px;text-align:center;" onclick="closeDisclaimer()"><h3>No update required</h3><p>Click/tap anywhere to continue</p></div>';	
		$("#disclaimer").css("display", "block");
		$("*").css("overflow", "hidden");
		$('#disclaimer').html(disc);
	}
}
function closeDisclaimer(){
	pBar = false;
	$("#disclaimer").css("display", "none");
	$("*").css("overflow", "initial");
	$('#disclaimer').html("");
	$("#disclaimer div.Absolute-Center").removeAttr("onclick");
}