const Populate = function(list){
  this.list = list;
}

Populate.prototype.layoutPageNumbers = function () {
  var results = document.querySelector('#total-results');
  results.innerText = 'Total Results: ' + this.list.totalResults;
  var numberOfPages = Math.ceil(this.list.totalResults / 10);
  var pages = document.querySelector('#page-number');
  pages.innerText = 'page ' + page + ' of ' + numberOfPages;
};

Populate.prototype.addToPage = function () {

  var location = document.querySelector('#movies-list');
  location.innerText = '';

  this.layoutPageNumbers();

  this.list.Search.forEach(function(movie){
    // set up list
    var li = document.createElement('li');
    // create title line
    var title = document.createElement('p');
    title.id = 'title'
    title.innerText = movie.Title;
    //create year of release line
    var year = document.createElement('p');
    year.innerText = movie.Year;
    // create poster line
    var img = document.createElement('img');
    if (movie.Poster === "N/A"){
      img.src = 'https://vignette.wikia.nocookie.net/max-steel-reboot/images/7/72/No_Image_Available.gif/revision/latest?cb=20130902173013'
    } else {
      img.src = movie.Poster;
    }
    img.height = 300;
    img.width = 200;
    // append and build list item
    li.appendChild(title);
    li.appendChild(year);
    li.appendChild(img);
    location.appendChild(li);
  });
};
