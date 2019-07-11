function searchVideo(homeTeam, awayTeam){
    $("#resultsYoutube").empty()
    $('#loading_detail').show()

    console.log('show youtube', character, game)
    $.ajax({
        url:`https://www.googleapis.com/youtube/v3/search`,
        method:'GET',
        data:{
            key:'AIzaSyAEe7fIgBWUHPE6WdW_OmlNgriajvvCj2c',
            part: "snippet",
            q: `Footbal ${homeTeam} ${awayTeam}`,
            type:"video",
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2018-01-01T00:00:00Z",
        }
    })
    .done((response)=>{
        $('#loading_detail').hide()
        $("#resultsYoutube").empty()
        response.items.forEach(el => {
            $("#resultsYoutube").append(
                `
                <h2>${character}</h2>
                <div class="item">
                    <iframe class="video w100" width="100%" height="355" center-align src="//www.youtube.com/embed/${el.id.videoId}" frameborder="0" allowfullscreen></iframe>
                </div>`
            );     
        });
    })
    .fail((jqXHR, textStatus)=>{
        console.log(`request failed ${textStatus}`)
    })
}