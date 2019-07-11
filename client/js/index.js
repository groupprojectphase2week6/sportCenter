const baseUrl = `http://localhost:3000`

$(document).ready(function() {
    registerUser()
    loginUser()
})



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


