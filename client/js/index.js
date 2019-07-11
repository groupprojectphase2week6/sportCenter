const baseUrl = `http://localhost:3000`

$(document).ready(() => {
    // getMatch()
    upComming()
    registerUser()
    loginUser()
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


function registerUser() {
    const regisForm = '#form-register'
    // console.log('asd')
        $(regisForm).submit(function(event) {
            event.preventDefault()
            $.ajax({
                method: 'POST',
                url: `${baseUrl}/users/register`,
                data: $(this).serialize(),
                success: function (data) {
                    console.log('Submission was successful.');
                    console.log(data);
                    window.location.href="http://localhost:8080/";
                },
                error: function (data) {
                    console.log('An error occurred.');
                    console.log(data);
                },
        })
    })
}

function loginUser() {
    console.log('asd');
    $('#form-signin').submit(function(event) {
        event.preventDefault()
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/users/login`,
            data: $(this).serialize(),
            // success: function (data) {
            //     console.log('Submission was successful.');
            //     console.log({data});
            //     // window.location.href="http://localhost:8080/";
            // },
            // error: function (data) {
            //     console.log('An error occurred.');
            //     console.log(data);
            // },
    })
        .done((datas) => {
            localStorage.setItem('token', datas)
        })
        .fail((err) => {
            console.log(err);
        })
    })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url: `${baseUrl}/users/googleSignIn`,
        data: {
            token: id_token
        }
    })
        .done((datas) => {
            localStorage.setItem('token',datas)
        })
        .fail((err) => {
            console.log(err);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
      console.log('User signed out.');
    });
}


