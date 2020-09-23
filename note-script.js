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
    setCookie(p(),document.getElementById("Paige").value,36500);
    button.innerHTML = "Saved!"
    setTimeout(function(){document.getElementById("KitKat Bar").innerHTML = "💾Save💾";}, 2000);
}
function sendEmail() {
    var recip = prompt("What email would you like this to go to?", "exampleuser@example.co.uk")
    if (recip == "" || recip == null){
        alert("Nothing has been sent...");
    }
    else {
        var body = "<html>";
        var counter = 1;
        while (true) {
            if (getCookie("Paige" + counter.toString()) !== ""){
                body += "<h1>Page " + counter.toString() + "</h1><p>" + getCookie("Paige" + counter.toString()) + "</p>";
                //alert(getCookie("Paige" + counter.toString()))
            }
            else{
                break
            }
            counter++;
        }
        body += "</html>";
        alert("Sending...");
        Email.send({
        Host: "smtp.gmail.com",
        Username : "kindlenotepadwebapp@gmail.com",
        Password : "B0tsRule",
        To : recip,
        From : "kindlenotepadwebapp@gmail.com",
        Subject : "Your Kindle Notepad Creation!",
        Body : body,
        }).then(
            function(message){
                alert("Mail sent successfully!")
            }
        );
    }
}
function DAT(){
    var body = "<html>";
    var counter = 1;
    while (true) {
        if (getCookie("Paige" + counter.toString()) !== ""){
            body += "<h1>Page " + counter.toString() + "</h1><p>" + getCookie("Paige" + counter.toString()) + "</p>";
            //alert(getCookie("Paige" + counter.toString()))
        }
        else{
            break
        }
        counter++;
    };
    body += "</html>"
    //var data = new Blob([body], {type: 'text/plain'});
    //var url = window.URL.createObjectURL(data);
    //document.location.href = url;
    download(new Blob([body]),"KindleNotepadCreation.txt","text/plain");
}
function sendDataJSON(){
    var xhttp = new XMLHttpRequest();
    var body = "{";
    var counter = 1;
    while (true) {
        if (getCookie("Paige" + counter.toString()) !== ""){
            if (counter > 1) {
                body += ","
            }
            var ckey = "Page " + counter.toString()
            var cval = getCookie("Paige" + counter.toString())
            body += "\"" + ckey + "\":\"" + cval + "\"";
            //alert(getCookie("Paige" + counter.toString()))
        }
        else{
            break
        }
        counter++;
    };
    body += "}"
    alert(body);
    var outputCode;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            alert(this.status.toString());
            alert(this.response);
            alert(xhttp.getAllResponseHeaders());
            outputCode = this.getResponseHeader("Location");
            alert("Your output has gone to: " + outputCode);
        }
    };
    xhttp.open("POST","https://jsonblob.com/api/jsonBlob");
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.setRequestHeader("Accept","application/json");
    xhttp.send(body);
}
function receiveDataJSON(){
    var url = prompt("What's your data url?");
    if (url !== "" && url !== null){
        var xhttp = new XMLHttpRequest();
        var outputCode;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status.toString()[0] == "2") {
                outputCode = this.response;
                outputCode = JSON.parse(outputCode);
                if (confirm("Received: " + this.response + "\nWould you like to import it?")){
                    clearInterval(autoSave);
                    var x;
                    for (x in outputCode) {
                        setCookie(x.replace("Page ","Paige"), outputCode[x])
                    }
                    var cxhttp = new XMLHttpRequest();
                    cxhttp.open("DELETE", url);
                    cxhttp.send();
                    alert("Transfer complete!\n(Autosave has been stopped.  To resume autosave and get the correct information for the current page, refresh the page or change pages.)")
                }
                else{
                    alert("Nothing has been changed...");
                }
            }
        };
        xhttp.open("GET",url);
        xhttp.setRequestHeader("Content-type","application/json");
        xhttp.setRequestHeader("Accept","application/json");
        xhttp.send();
    }
    else{
        alert("Nothing's been changed...");
    }
}
var addvar = getVarParse();
onload = function(){
    console.log(addvar);
    if (addvar["p"] != undefined){
        document.getElementById("pn").innerHTML = addvar["p"];
    }
    if (p(1) == 1){
        document.getElementById("back").disabled = "true";
    }
    console.log(getCookie(p()));
    document.getElementById("Paige").value = getCookie(p());
    document.getElementById("Paige").onchange = "updateCookies();";
    document.getElementById("paigedisp").innerHTML = p(1).toString();
    updateCookies();
    autoSave = setInterval(updateCookies, 5000);
}
