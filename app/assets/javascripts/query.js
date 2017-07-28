$(function() {
  $("#submit_button").on("click", function(event) {
    event.preventDefault();
    var text = $('#text').val();
    $.ajax({
      type: "POST",
      url: "/add",
      headers: {'Content-Type': 'application/json'},
      dataType: "json",
      data: JSON.stringify({text: text}),
      success: function(result) {
        // Добавление нового запроса в список
        var output = $("<b></b>").text(result.text), // Текст запроса
            date = new Date(result.timestamp); // Время создания запроса
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),  // Форматирование времени
            m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();     
            timestamp = $("<p></p>").text(h + ':' + m +':' + s); 
        $("#queries").append(output, timestamp);

        queryCases(result.numOfQueries);  
      }
    });

    $('#text').val('');
  });
}); 

function queryCases(num) {
  // Изменение склонения слова "запрос"
  
  var counter = document.getElementById('query-counter');
  
  if (num === undefined) {  // Если num не задан, то берем текущее количество запрсов 
    num = counter.innerHTML;
  }
  
  if (num % 100 >= 11 && num % 100 <= 19) {
    counter.innerHTML = num + ' запросов';
  } else {
    switch (num % 10) {
      case 1: 
        counter.innerHTML = num + ' запрос';
        break;
      case 2:
      case 3:
      case 4:
        counter.innerHTML = num + ' запроса';
        break;
      default: counter.innerHTML = num + ' запросов';   
    }
  }
}

window.onload = function() {
  queryCases();
}
