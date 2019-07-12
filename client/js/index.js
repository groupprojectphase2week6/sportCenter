const baseUrl = `http://localhost:3000`

$(document).ready(() => {
    homePage()

    if(localStorage.getItem('tokens')) {

    } else {

    }
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
    putVideo()
    getMoreNews()
})


function homePage() {
    $('#form-register').hide()
    $('#form-signin').hide()
    $('#carouselImg').show()
    $('#loginPage').show()
    $('#logout').hide()
    $('#sidebar').show()
}

function showHideLoginPage() {
    $('form-signin').empty()
    $('#form-register').hide()
    $('#match').hide()
    $('#form-signin').show()
    $('#carouselImg').hide()
    $('#sidebar').hide()
    $('#result1').hide()
    $('#result2').hide()
    $('#moreNews').hide()
}

function showHideRegisterPage() {
    $('form-register').empty()
    $('#form-register').show()
    $('#match').hide()
    $('#form-signin').hide()
    $('#carouselImg').hide()
    $('#sidebar').hide()
    $('#result1').hide()
    $('#result2').hide()
    $('#moreNews').hide()
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
            $('#match').show()
            $('#loginPage').hide()
            $('#logout').show()
            $('#result1').show()
            $('#result2').show()
            $('#moreNews').show()

        })
        .fail((err) => {
            console.log(err);
        })
    })
}

function onSignIn(googleUser) {
    // event.preventDefault()
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
            $('#match').show()
            $('#loginPage').hide()
            $('#logout').show()
            $('#result1').show()
            $('#result2').show()
            $('#moreNews').show()
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

function showUserProfile() {
   const storageToken = localStorage.getItem('token')
   const emailToken = localStorage.getItem('email')
   const picture = localStorage.getItem('picture')
//    console.log(storageToken);
    // console.log(emailToken);
   if(storageToken && emailToken && picture) {
       console.log('asd');
       $('#profile').append(`
       <div class="card">
       <div class="text-center">
       <img src="${picture}" width="100px" height="100px" class="img-thumbnail rounded-circle">
       <div class="card-body userData">
       <h5 class="card-title">${emailToken}</h5>
       <p class="card-text">Hello again ${emailToken}. Have a good Day!</p>
       </div>
       </div>
     </div>
       `)
    //    $('#profile').show()
   } else if(storageToken && emailToken) {
    $('#profile').append(`
    <div class="card">
        <div class="text-center">
        <img src="./images/img_avatar.png" width="100px" height="100px" class="img-thumbnail rounded-circle">
        <div class="card-body userData">
        <h5 class="card-title">${emailToken}</h5>
        <p class="card-text">Hello again ${emailToken}. Have a good Day!</p>
        </div>
        </div>
    </div>
    `)
   } else {
       $('#profile').hide()
   }
}

function loggedIn() {

}


