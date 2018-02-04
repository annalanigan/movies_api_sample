var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) {
    return;
  }
  var jsonString = this.responseText;
  var movies = JSON.parse(jsonString);
  if (movies.Search == undefined){
    var location = document.querySelector('#movies-list');
    location.innerText = '';
    var results = document.querySelector('#total-results');
    results.innerText = 'No results for this search';
  } else {
    populatePage(movies);
  }
}

var populatePage = function(movies){
  var location = document.querySelector('#movies-list');
  location.innerText = '';
  var results = document.querySelector('#total-results');
  results.innerText = 'Total Results: ' + movies.totalResults;

  movies.Search.forEach(function(movie){
    var li = document.createElement('li');
    var title = document.createElement('p');
    title.id = 'title'
    title.innerText = movie.Title;
    var year = document.createElement('p');
    year.innerText = movie.Year;
    var img = document.createElement('img');
    if (movie.Poster === "N/A"){
      img.src = 'https://vignette.wikia.nocookie.net/max-steel-reboot/images/7/72/No_Image_Available.gif/revision/latest?cb=20130902173013'
    } else {
      img.src = movie.Poster;
    }
    img.height = 300;
    img.width = 200;
    li.appendChild(title);
    li.appendChild(year);
    li.appendChild(img);
    location.appendChild(li);
  })
}

buttonClick = function(){
  var key = new ApiKey();
  var input = document.querySelector('input');
  var searchQuery = input.value;
  var url = 'http://www.omdbapi.com/?s=' + searchQuery + '&page=1&type=movie&apikey=' + key.getKey();
  makeRequest(url, requestComplete);
}

var app = function(){
  var button = document.querySelector('button');
  button.addEventListener('click', buttonClick);
}

window.addEventListener('load', app);
