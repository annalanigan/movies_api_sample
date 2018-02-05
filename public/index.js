var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

// need to refacot the global variable..
var page = 1;

const buttonClick = function(){
  page = 1;
  updatePage(page);
}

const pageUp = function(){
  // if (page > 10){
    page ++;
    updatePage(page);
  // }
}

const pageDown = function(){
  if (page > 1){
    page --;
    updatePage(page);
  }
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
    var populatePage = new Populate(movies)
    populatePage.addToPage(page);
  }
}

const updatePage = function(pageNo){
  var key = new ApiKey();
  var input = document.querySelector('input');
  var searchQuery = input.value;
  var url = 'http://www.omdbapi.com/?s=' + searchQuery + '&page=' + pageNo + '&type=movie&apikey=' + key.getKey();
  console.log(url);
  makeRequest(url, requestComplete);
}

var app = function(){

  var button = document.querySelector('button');
  button.addEventListener('click', buttonClick);

  var forwardButton = document.querySelector('#forward');
  forwardButton.addEventListener('click', pageUp)

  var backButton = document.querySelector('#back');
  backButton.addEventListener('click', pageDown)

}

window.addEventListener('load', app);
