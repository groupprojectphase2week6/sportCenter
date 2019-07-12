function getMatch(code){
    $.ajax({
        url: `https://api.football-data.org/v2/competitions/${code}/matches?status=FINISHED`,
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b00ee5aa8d01494b9a8a1e4a2a08964e'
        }
    })
    .done(({matches})=> {
        console.log(matches)
        $('#carouselExampleIndicators').empty()
        $('#match').empty()
        $('#result1').hide()
        $('#result2').hide()
        $('#moreNews').hide()
        for (let i = 0; i < matches.length; i++){
            $('#match').append(
                `
                    <div class="list-group" style="text-align: center;">
                        <a href="#" class="list-group-item list-group-item-action" id="${matches[i].id}">
                        ${matches[i].homeTeam.name} ${matches[i].score.fullTime.homeTeam} vs ${matches[i].score.fullTime.awayTeam} ${matches[i].awayTeam.name}
                        </a>
                    </div>
                `
            )

            let data = {
                homeTeam : `${matches[i].homeTeam.name}`,
                awayTeam : `${matches[i].awayTeam.name}`
            }
            $(`#${matches[i].id}`).click(function(){
                searchVideo(data)
            })
        }
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
        $('#carouselExampleIndicators').empty()
        $('#result1').hide()
        $('#result2').hide()
        $('#moreNews').hide()
        // $('#CL').empty()
        // $('#PL').empty()
        // $('#SA').empty()
        // $("#match").empty()
        for (let i = 0; i < 3; i++){
            if(i == 0 ){
                $('#CL').append(
                    `   
                    <div class="list-group" style="text-align: center; width: 100%">
                        <h1> Champion League </h1>
                        <a href="#" class="list-group-item list-group-item-action">
                        ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                        <br>
                        <p>Time: ${matches[i].utcDate}</p>
                        </a>
                        
                    </div>
                       
                    `
                )
            } else {
                $('#CL').append(
                    `   
                    <div class="list-group" style="text-align: center; width: 100%">
                        <a href="#" class="list-group-item list-group-item-action">
                        ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                        <br>
                        <p>Time: ${matches[i].utcDate}</p>
                        </a>
                    </div>
                       
                    `
                )
            }
            
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
            if(i == 0 ){
                $('#PL').append(
                    `
                        <div class="list-group" style="text-align: center; width: 100%">
                        <h1> Premier League </h1>
                            <a href="#" class="list-group-item list-group-item-action">
                            ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                            <br>
                            <p>Time: ${matches[i].utcDate}</p>
                            </a>
                        </div>
                    `
                )
            } else {
                $('#PL').append(
                    `
                        <div class="list-group" style="text-align: center; width: 100%">
                            <a href="#" class="list-group-item list-group-item-action">
                            ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                            <br>
                            <p>Time: ${matches[i].utcDate}</p>
                            </a>
                        </div>
                    `
                )
            }
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
            if(i == 0){
                $('#SA').append(
                    `
                        <div class="list-group" style="text-align: center; width: 100%">
                        <h1> Ligue 1 </h1>
                            <a href="#" class="list-group-item list-group-item-action">
                            ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                            <br>
                            <p>Time: ${matches[i].utcDate}</p> 
                            </a>
                        </div>
                    `
                )
            } else {
                $('#SA').append(
                    `
                        <div class="list-group" style="text-align: center; width: 100%">
                            <a href="#" class="list-group-item list-group-item-action">
                            ${matches[i].homeTeam.name} vs ${matches[i].awayTeam.name}
                            <br>
                            <p>Time: ${matches[i].utcDate.toLocaleString()}</p>
                            </a>
                        </div>
                    `
                )
            }
        }
    })
    .fail((jqXHR, textstatus) => {
        console.log('fail', textstatus)
    })

}

