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