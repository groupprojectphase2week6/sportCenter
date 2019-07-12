const baseUrl = `http://localhost:3000`

$(document).ready(() => {
    homePage()

    $('#registerPage').click(function(event) {
        event.preventDefault()
        showHideRegisterPage()
    })

    $('#loginPage').click(function(event) {
        event.preventDefault()
        showHideLoginPage()
    })
    getNews()
    registerUser()
    loginUser()
})


function homePage() {
    $('#form-register').hide()
    $('#form-signin').hide()
    $('#carouselImg').show()
}

function showHideLoginPage() {
    $('form-signin').empty()
    $('#form-register').hide()
    $('#match').hide()
    $('#form-signin').show()
    $('#carouselImg').hide()
    $('#sidebar').hide()
}

function showHideRegisterPage() {
    $('form-register').empty()
    $('#form-register').show()
    $('#match').hide()
    $('#form-signin').hide()
    $('#carouselImg').hide()
    $('#sidebar').hide()
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
      console.log('User signed out.');
    });
}

function showUserProfile() {
   const storageToken = localStorage.getItem('token')
   const emailToken = localStorage.getItem('email')
   const picture = localStorage.getItem('picture')
//    console.log(storageToken);
    // console.log(emailToken);
   if(storageToken && emailToken) {
       $('#profile').append(`
       <div class="card">
       <img src="${picture}" class="img-thumbnail rounded-circle">
       <div class="card-body">
         <h5 class="card-title">${emailToken}</h5>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       </div>
       <ul class="list-group list-group-flush">
         <li class="list-group-item">Cras justo odio</li>
         <li class="list-group-item">Dapibus ac facilisis in</li>
         <li class="list-group-item">Vestibulum at eros</li>
       </ul>
     </div>
       `)
    //    $('#profile').show()
   } else {
       $('#profile').hide()
   }
}


