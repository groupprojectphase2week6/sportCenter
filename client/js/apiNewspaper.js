function getNews() {
    $('#carouselImg').empty()
    $.ajax({
        method: 'GET',
        url: `https://newsapi.org/v2/everything?q=Soccer&pageSize=5&apiKey=5828c40a6d474f479e1af34e80ade025`,
    })
    .done(({articles}) => {
        for(let i = 0; i < articles.length;i++) {
            if(i==0) {
                $('#carouselImg').append(`
                <div class="carousel-item active">
                    <img class="d-block w-100 h-100" src="${articles[i].urlToImage}" alt="First slide">
                    <div class="carousel-caption text-dark">
                         <h3> <a href="${articles[i].url}" class="hrefURL">${articles[i].title}</a></h3>
                         <p>${articles[i].description}</p>
                    </div>
                </div>
                `)
            }  else {
                $('#carouselImg').append(`
                <div class="carousel-item">
                    <img class="d-block w-100 h-00" src="${articles[i].urlToImage}" alt="Second slide">
                    <div class="carousel-caption text-dark">
                         <h3><a href="${articles[i].url}" class="hrefURL">${articles[i].title}</a></h3>
                         <p >${articles[i].description}</p>
                    </div>
                </div>
                `)
            }
        }
    })
}

function getMoreNews() {
    $.ajax({
        method: 'GET',
        url: `https://newsapi.org/v2/everything?q=PremierLeague&pageSize=4&apiKey=5828c40a6d474f479e1af34e80ade025`,
    })
    .done(({articles}) => {
        for(let i = 0; i < articles.length;i++) {
            console.log(articles[i]);
            $('#moreNews').append(`
            <div class="col-md-12  ">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">${articles[i].title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${articles[i].author}</h6>
                <p class="card-text">${articles[i].description}</p>
                <a href="${articles[i].url}" class="card-link">Read more</a>
            </div>
            </div>
            </div>
            `)
        }
    })
}