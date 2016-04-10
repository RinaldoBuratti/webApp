$(document).ready(function() {
  $('#bt_search').click(function(e)
//qui va la query, per ora non viene usata
  {
    var data = {
      query:{term:{name:$('#query').val()}},
      fields: '_id'
    };
    $.ajax({
      url: 'http://localhost:9200/pages/html',
      dataType: 'json',
      type: 'GET',
      contentType: "application/json",
      crossDomain: true,
      data: 'q='+$('#query').val(),//JSON.stringify(data),
      success: function(data) {
                  //alert(""+JSON.parse(data.hits.total));
                  //qui vanno i dati da mandare all'html!
                  $("#results").empty();
                  $("#results").append("<div class='container'><table class='table'><thead><tr><th>"+data.hits.total+" risultati trovati</th></tr></thead><tbody>");
                  $.each(data.hits.hits, function(i,item){
                    $("#results").append("<tr><td><h4><div class='col-lg-6'><a href="+item._source.url+">"+item._source.title+"</div></h4></td></tr><tr><td><h8><div class='col-lg-6' style=\"width: 80%; color: green\">"+item._source.url+"</div><h8></td></tr><tr><td><div class='col-lg-6' style=\"width: 80%\">"+item._source.html+"</div></td></tr>");
                  });
                  $("results").append("</tbody></table></div>");
                }
              });
});
});