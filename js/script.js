var getLuasTime = function(){
  var httpRequest;
  var respText, parse, xmlObj;

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
        // alert(httpRequest.responseText);
        // document.getElementById("").innerHTML = reponseXML.getElementsByTagName("direction")[0].childNodes[0].nodeValue;

        // Get XML response
        respText = httpRequest.responseText;
        //alert(typeof(respText));
        //alert(respText);

        // Setup XML Object from responseText (if using responseText)
        parser = new DOMParser();
        var respXML = parser.parseFromString(respText, "text/xml");
        //alert("type of respXML is " + typeof(respXML));
        //alert(respXML);

        /////////////////////////////////////////////////////
        // Populate Dom elements with retrieved info
        /////////////////////////////////////////////////////
        var directionIn = respXML.getElementsByTagName("direction")[0].childNodes;
        //var tramTwo = directionIn[0].childNodes[0].getAttribute("dueMins");

        var destination = respXML.getElementsByTagName("tram")[0].getAttribute("destination");
        document.getElementsByClassName("destination")[0].innerHTML = destination;
        document.getElementsByClassName("destination")[1].innerHTML = destination;

        var tramOne = respXML.getElementsByTagName("tram")[0].getAttribute("dueMins");
        document.getElementById("currentLuas").innerHTML = tramOne;

        var tramTwo = respXML.getElementsByTagName("tram")[1].getAttribute("dueMins");
        document.getElementById("nextLuas").innerHTML = tramTwo;
        tramTwo = respXML.getElementsByTagName("tram")[1].getAttribute("dueMins");

        //var root = respXML.documentElement;
        //alert("root is typeof " + typeof(root));
        //alert(root);
        //alert(root.getElementsByTagName("stopInfo")[1].childNodes[0].nodeValue);

        /////////////////////////////////////////////////////
        // Xpath setup
        /////////////////////////////////////////////////////
        var txt = "";
        var path = '//direction[@name="Inbound"]/tram';
        var pathResult = respXML.evaluate(path, respXML, null, XPathResult.ANY_TYPE, null);
        var result = pathResult.iterateNext();
        while(result){
          txt += result.textContent;
          result = pathResult.iterateNext();
        }
        //alert(pathResult);

      } else {
        alert('There was a problem with the request\n');
        alert(httpRequest.responseText);
      }
    }
  }

};
