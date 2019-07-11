$(document).ready(() => {
    // getMatch()
    upComming()
})

function getMatch(){
    $.ajax({
        url: `https://api.football-data.org/v2/competitions/CL/matches?status=FINISHED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        for (let i = 0; i < matches.length; i++){
            $('#match').append(
                `
                    <div class="list-group" style="text-align: center;">
                        <a href="#" class="list-group-item list-group-item-action">
                        ${matches[i].homeTeam.name} ${matches[i].score.fullTime.homeTeam} vs ${matches[i].score.fullTime.awayTeam} ${matches[i].awayTeam.name}
                        </a>
                    </div>
                `
            )
        }
        console.log(matches)
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })
}

function upComming(){
    $.ajax({
        url: `https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        for (let i = 0; i < matches.length; i++){
            $('#match').append(
                `
                    <div class="list-group" style="text-align: center;">
                        <a href="#" class="list-group-item list-group-item-action">
                        ${matches[i].homeTeam.name} vs  ${matches[i].awayTeam.name}
                        </a>
                    </div>
                `
            )
        }
        console.log(matches)
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })
}