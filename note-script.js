function getVarParse(){
    var getVars = new Array();
    var locvartemp = ( window.location.href.indexOf( "?" ) + 1 ) ? window.location.href.substr( window.location.href.indexOf( "?" ) + 1 ) : "";
    locvartemp = locvartemp.split( "&" );
    for( var x = 0; x < locvartemp.length; x++ ) {
        var lvTempVar = locvartemp[x].split( "=" );
        getVars[ unescape( lvTempVar[0] ) ] = unescape( lvTempVar[1] );
    }
    return getVars;
}
function setCookie(cname, cvalue, exdays) {
    if (exdays != undefined) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    else {
        document.cookie = cname + "=" + cvalue + ";path=/";
    }
}
function p(raw){
    if (raw == undefined) {
        return "Paige" + document.getElementById("pn").innerHTML;
    }
    else {
        return parseInt(document.getElementById("pn").innerHTML);
    }
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function deleteCookie(cname){
    document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function updateCookies(){
    var button = document.getElementById("KitKat Bar");
    button.innerHTML = "Saving↻..."
    setCookie(p(),document.getElementById("Paige").value);
    button.innerHTML = "Saved!"
    setTimeout(function(){document.getElementById("KitKat Bar").innerHTML = "💾Save💾";}, 2000);
}
var addvar = getVarParse();
onload = function(){
    console.log(addvar);
    if (addvar["p"] != undefined){
        document.getElementById("pn").innerHTML = addvar["p"];
    }
    if (p(1) == 1){
        document.getElementById("back").style.display = "none";
    }
    console.log(getCookie(p()));
    document.getElementById("Paige").value = getCookie(p());
    document.getElementById("Paige").onchange = "updateCookies();";
    document.getElementById("paigedisp").innerHTML = p(1).toString()
}