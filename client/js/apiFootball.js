function getMatch(){
    console.log('masuk')
    $.ajax({
        url: `https://api.football-data.org/v2/competitions/CL/matches?status=FINISHED`,
        method: 'GET'
    })
    .done(({mathes})=> {
        for (let i = 0; i < mathes.length; i++){
            $('#match').append(
                `
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action">${mathes[i].homeTeam} vs ${mathes[i].awayTeam}</a>
                    </div>
                `
            )
        }
        console.log(mathes)
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })
}