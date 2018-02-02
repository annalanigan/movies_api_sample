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
  // console.log("what are my moveis?", movies.Search);
  populatePage(movies.Search);
}

var populatePage = function(movies){
  var location = document.querySelector('#movies-list');

  movies.forEach(function(movie){
    var li = document.createElement('li');
    li.innerText = movie.Title;
    // console.log(movie.Title);
    location.appendChild(li);
  })
}

var app = function(){
  var url = 'http://www.omdbapi.com/?s=star&apikey=3e48f36d&';
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
