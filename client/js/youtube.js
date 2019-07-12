function searchVideo(data){
    console.log(data)
    $("#resultsYoutube").empty()

    $.ajax({
        url:`https://www.googleapis.com/youtube/v3/search`,
        method:'GET',
        data:{
            key:'AIzaSyAEe7fIgBWUHPE6WdW_OmlNgriajvvCj2c',
            part: "snippet",
            q: `Footbal ${data.homeTeam} ${data.awayTeam}`,
            type:"video",
            maxResults: 2,
            order: "viewCount",
            publishedAfter: "2018-01-01T00:00:00Z",
        }
    })
    .done((response)=>{
        $("#match").empty()
        response.items.forEach(el => {
            $("#resultsYoutube").append(
                `
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