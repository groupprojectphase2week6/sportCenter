const baseUrl = `http://localhost:3000`

$(document).ready(() => {
    // preLogin()
    // getMatch()
    // upComming()
    // registerUser()
    // loginUser()
    Login()
    getMatch()
    upComming()
    getNews()
    registerUser()
    loginUser()
    homePage()
    loginPage()
    registerPage()
})


function homePage() {
    $('#form-register').hide()
    $('#match').hide()
    $('#form-signin').hide()
    $('#carouselImg').show()
    $('#loginPage').show()
    $('#logout').hide()
}

function showHideLoginPage() {
    $('form-signin').empty()
    $('#form-register').hide()
    $('#match').hide()
    $('#form-signin').show()
    $('#carouselImg').hide()
}

function showHideRegisterPage() {
    $('form-register').empty()
    $('#form-register').show()
    $('#match').hide()
    $('#form-signin').hide()
    $('#carouselImg').hide()
}

function registerPage() {
    $('#registerPage').click(function(event) {
        event.preventDefault()
        showHideRegisterPage()
    })
}

function loginPage() {
    $('#loginPage').click(function(event) {
        event.preventDefault()
        showHideLoginPage()
    })
}

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
            console.log(datas);
            localStorage.setItem('token', datas)
            localStorage.setItem('email', $("#inputEmail").val())
            showUserProfile()
            homePage()
            $('#loginPage').hide()
            $('#logout').show()

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
            localStorage.setItem('email',profile.getEmail())
            localStorage.setItem('picture',profile.getImageUrl())
            showUserProfile()
            homePage()
            $('#loginPage').hide()
            $('#logout').show()
        })
        .fail((err) => {
            console.log(err);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('picture')
        showUserProfile()
        homePage()
        $('loginPage').show()
      console.log('User signed out.');
    });
}

function preLogin(){
    $('#form-signin').show()
    $('#form-register').hide()
    $('#match').hide()
    $('#upComming').hide()
    $('#sidebar').hide()
}

function Login(){
    $('#form-signin').hide()
    $('#form-register').hide()
    $('#sidebar').show()
}

function showUserProfile() {
   const storageToken = localStorage.getItem('token')
   const emailToken = localStorage.getItem('email')
   const picture = localStorage.getItem('picture')
//    console.log(storageToken);
    // console.log(emailToken);
   if(storageToken && emailToken && picture) {
       $('#profile').append(`
       <div class="card">
       <div class="text-center">
       <img src="${picture}" width="100px" height="100px" class="img-thumbnail rounded-circle">
       <div class="card-body">
       <h5 class="card-title">${emailToken}</h5>
       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       </div>
       </div>
     </div>
       `)
    //    $('#profile').show()
   } else if(storageToken && emailToken) {
    $('#profile').append(`
    <div class="card">
        <div class="text-center">
        <img src="../images/img_avatar.png" width="100px" height="100px" class="img-thumbnail rounded-circle">
        <div class="card-body">
        <h5 class="card-title">${emailToken}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>
    </div>
    `)
   } else {
       $('#profile').hide()
   }
}


