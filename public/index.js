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
  populatePage(movies);
}

var populatePage = function(movies){
  var location = document.querySelector('#movies-list');
  var results = document.querySelector('#total-results');
  results.innerText = 'Total Results: ' + movies.totalResults;
  console.log(movies.totalResults);

  movies.Search.forEach(function(movie){
    // console.log("what is my movie?", movie);
    var li = document.createElement('li');
    var title = document.createElement('p');
    title.innerText = movie.Title;
    var year = document.createElement('p');
    year.innerText = movie.Year;
    var img = document.createElement('img');
    if (movie.Poster === "N/A"){
      img.src = 'https://hprcc.unl.edu/images/No-Image-Available.jpg'
    } else {
      img.src = movie.Poster;
    }
    img.width = 200;
    // console.log(movie.Title);
    li.appendChild(title);
    li.appendChild(year);
    li.appendChild(img);
    location.appendChild(li);
  })
}

searchQuery = function(){
  // find word when the button is pushed on the page
}

var app = function(){
  var key = new ApiKey();
  // var search = searchQuery();
  var search = 'star';
  var url = 'http://www.omdbapi.com/?s=' + search + '&page=1&type=movie&apikey=' + key.getKey();
  console.log(url);
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
