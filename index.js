/**
 * 
 */
var self = this;
var html_source = "";

function searchData() {
    var i;
	var name = document.getElementById("searchTxt").value;
	
	loadingData();				//carica la gif animata
	loadSnippet();				//carica lo snippet

    $.ajax({
      url: 'http://localhost:9200/pages/_search?',
      dataType: 'json',
      type: 'GET',
      contentType: "application/json",
      crossDomain: true,
      data: 'q='+name,//JSON.stringify(data),
      success: function(data) {
                  //alert(""+JSON.parse(data.hits.total));
                  //qui vanno i dati da mandare all'html!
                  
                  $("#uno").empty();
                  $("#uno").append("<div class='container'><table class='table'><thead><tr><th>"+data.hits.total+" risultati trovati</th></tr></thead><tbody>");
                  $.each(data.hits.hits, function(i,item){
                    this.html_source = item._source.htmlCode;
                    $("#uno").append("<tr><td><h4><div class='col-lg-6'><p onClick='openWindow()'>"+item._source.title+"</p></div></h4></td></tr><tr><td><h8><div class='col-lg-6' style=\"width: 80%; color: green\">"+"</div><h8></td></tr><tr><td><div class='col-lg-6' style=\"width: 80%\">"+"</div></td></tr>");
                  
                  });
                  $("#uno").append("</tbody></table></div>");
                }
              });
	
	
};

function openWindow() {
    window.location ="results.html";
    $("#results").html(this.html_source);
}

/* Per caricare gli snippet negli appositi spazi nel div bottom */
function loadSnippet() {
    setTimeout(function () {																	//è legata a loadingData, hanno lo stesso tempo.
    	document.getElementById("bottom").setAttribute("style", "visibility: visible");
    }, 2500);
    loadHTML();
    
}

function loadHTML() {
	$(".snippet.primo").html("Qui va il codice HTML preso dall'oggetto JSON (restituito da elasticsearch")
}


function loadingData() {
	wait();
    setTimeout(function () {
    	document.getElementById("body").setAttribute("style","opacity:1");
    	document.getElementById("load").setAttribute("style", "visibility: hidden");
    	document.getElementById("load").setAttribute("style", "display: none");
    }, 2500);
}

function wait() {
	document.getElementById("body").setAttribute("style", "opacity:0.1");
	document.getElementById("load").setAttribute("style", "visibility: visible");
	document.getElementById("load").setAttribute("style", "position: absolute");
}

function reload() {
    setTimeout(function () {
    	document.getElementById("body").setAttribute("style","opacity:1");
    	document.getElementById("load").setAttribute("style", "visibility: hidden");
    	document.getElementById("load").setAttribute("style", "display: none");
    }, 2000);
}

function suggestResult() {
	alert("ci penso io");
}