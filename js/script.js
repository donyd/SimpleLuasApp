var getLuasTime = function(){
  var httpRequest;

  makeRequest();

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest){
      alert('Unable to create a XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'https://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&stop=sti&encrypt=false');
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE){
      if(httpRequest.status === 200){
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request\n');
		alert(httpRequest.responseText);
      }
    }
  }

};
