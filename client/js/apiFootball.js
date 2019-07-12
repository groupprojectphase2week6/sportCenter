function getMatch(code){
    $.ajax({
        url: `https://api.football-data.org/v2/competitions/${code}/matches?status=FINISHED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        $('#match').empty()
        for (let i = 0; i < matches.length; i++){
            $('#match').append(
                `
                    <div class="list-group" style="text-align: center;">
                        <a href="#" class="list-group-item list-group-item-action" id='yutub'>
                        ${matches[i].homeTeam.name} ${matches[i].score.fullTime.homeTeam} vs ${matches[i].score.fullTime.awayTeam} ${matches[i].awayTeam.name}
                        </a>
                    </div>
                `
            )
            let data = {
                homeTeam : `${matches[i].homeTeam.name}`,
                awayTeam : `${matches[i].awayTeam.name}`
            }
            $("#yutub").on('click', ()=> {
                cariVideo(data)
            })
        }
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })
}

function upComming(){
    $("match").empty()
    $.ajax({
        url: `https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        for (let i = 0; i < 3; i++){
            $('#CL').append(
                `   
                    <li>
                    <a href="#" class="list-group-item list-group-item-action">
                    ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                    </a>
                    </li>
                   
                `
            )
        }
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })

    $.ajax({
        url: `https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        for (let i = 0; i < 3; i++){
            $('#PL').append(
                `
                    <div class="list-group" style="text-align: center;">
                        <a href="#" class="list-group-item list-group-item-action">
                        ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                        </a>
                    </div>
                `
            )
        }
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })

    $.ajax({
        url: `https://api.football-data.org/v2/competitions/FL1/matches?status=SCHEDULED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        for (let i = 0; i < 3; i++){
            $('#SA').append(
                `
                    <div class="list-group" style="text-align: center;">
                        <a href="#" class="list-group-item list-group-item-action">
                        ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                        </a>
                    </div>
                `
            )
        }
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })

}

