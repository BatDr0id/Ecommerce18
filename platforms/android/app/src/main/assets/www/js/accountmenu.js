var remember = false; //used for remember me button
var username, password; //user login
var checkbox = false;
var fingersave = localStorage.getItem("fingerauth");
var id, name, first, last, image, email, capabilitiesm, cookie;

function createAccountMenu() {
    //If remember me checkbox is checked retireve information on menu creation
    
    //If user has loged in already create account menu
    
    cookie = sessionStorage.getItem('cookie');
    if(cookie){
        id = sessionStorage.getItem('id');
        name = sessionStorage.getItem('name');
        first = sessionStorage.getItem('first');
        last = sessionStorage.getItem('last');
        image = sessionStorage.getItem('image');
        email = sessionStorage.getItem('eamil');
        loginSuccess(id, name, first, last, image, email);
    }
    
    //if there is no login present open login page
    else {
        $(".main").append(
            "<div class='navMenuContainer'>"+
                "<div class='navProfile'>"+
                    "<p>My Account</p>"+
                    "<div class='divider'></div>"+
                    "<input type='text' placeholder='Username' id='username'>"+
                    "<input id='password' type='password' placeholder='Password'>"+
                    "<button class='login-button' type='button'>Login</button>"+
                    "<div class='divider'></div>"+
                    "<a href=''><div>Sign Up</div></a>"+
                    "<a href=''><div>Forgot Password?</div></a>"+
                    "<a href=''><div>Go to our website</div></a>"+
                    "<div class='divider'></div>"+
                    "<p id='checkText'>Remember Me</p>"+
                    "<input type='checkbox' id='checkbox'/>"
                +"</div>"
            +"</div>"); 
    }
    if (localStorage.getItem('remember')){
        username = localStorage.getItem('remember');
        password = atob(localStorage.getItem('rememberp'));
        console.log(password);
        remember = true;
    }
    
    
    //if remeber me checkbox button is checked retrieve this infomation
    if (remember){
        $('#username').val(username);
        if(!localStorage.getItem('fingerauth')){
            $('#password').val(password);
        }
        $('#checkbox').prop('checked',true);
    }
    
    //Click listener to close the menu if anywhere outside the menu is clicked
    $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
    });
    
    
    $('#checkbox').click(function(e){
        if(!this.checked){
            if(localStorage.getItem('remember') || localStorage.getItem('rememberp')){
                localStorage.removeItem('remember');
                localStorage.removeItem('rememberp');}
                checkbox = false;
                $('#checkbox').prop('checked',false);
                remember = false;
            }
            else {
                checkbox = true;
            }
        }
    );
    if(fingersave && !cookie){
        fingerDecrypt();
        loginAjax();
    }
    $(".login-button").click(function(e){
        username = $("#username").val();
        password = $('#password').val();
        checkbox = $("#checkbox").is(":checked");
        
        //fingerauth(username, password);
        fingerRegister();
        loginAjax();
    });
}

function successEncryption(_fingerResult){
    console.log("successCallback(): " + JSON.stringify(_fingerResult));
    console.log("Stringify " + _fingerResult);
        if (_fingerResult.withFingerprint) {
            console.log("Successfully encrypted credentials.");
            console.log("Encrypted credentials: " + _fingerResult.token);
            localStorage.setItem('token', _fingerResult.token);
            localStorage.setItem('fingerauth', true);
            console.log("Encrypted stuff stored");
            console.log(localStorage.setItem('fingerauth', true) );
        } else if (_fingerResult.withBackup) {
            console.log("Authenticated with backup password");
        }
        else {
            localStorage.setItem('token', _fingerResult.token);
        }
}

function loginSuccess(id, name, first, last, image, email){
    $(".main").append("<div class='navMenuContainer'>"+
            "<div class='navProfile' id='"+name+"' account-number='"+id+"'>"+
                "<p class='myProfileName' >"+first+ " "+last+"</p>"+
                "<div class='myProfileImage'><img src='"+image+"' alt=''></div>"+
                "<div class='myAccountName'>"+name+"</div>"+
                "<div class='divider'></div>"+
                "<div class='accountMenu'>"+
                   "<div class='account-link' slug='orders'><a href='#'>Orders</a></div>"+
                   "<div class='account-link' slug='prof-info'><a href='#'>Profile Info.</a></div>"+
                   "<div class='account-link' slug='downloads'><a href='#'>Downloads</a></div>"+
                   "<div class='account-link' slug='bill-info'><a href='#'>Billing Info.</a></div>"+
                   "<div class='logout'><a href='#'>Logout</a></div>"+
                "</div>"+
            "</div>"+
        "</div>"
    );
    $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
    });
    $(".account-link").click(function(e){
        e = $(this).attr("slug");
        localStorage.setItem('customer-select', e);
        window.location.href = "customer-profile.html";
        
    });
    $('.logout').click(function(e){
        sessionStorage.removeItem('cookie');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('first');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('image');
        sessionStorage.removeItem('item-selected');
        sessionStorage.removeItem('last');
        sessionStorage.removeItem('name');
    });
}

function fingerRegister(){
    FingerprintAuth.isAvailable(function (result){
        if(result.isAvailable ==  true && result.hasEnrolledFingerprints == true && !fingersave ){
            navigator.notification.confirm("Would you like to setup finger print login?", function(e){
                console.log(e);
                if (e == 1){
                    fingerEncrypt();
                    return true;
                }
                else {
                    return false;
                }
            }, ["Finger Print Login"], ["Continue", "Cancel"]);
        }
        else if (result.isAvailable ==  true && result.hasEnrolledFingerprints == true && fingersave ){
            fingerDecrypt();
        }
    }, errorCallback);
}

function fingerEncrypt(){
    var token = localStorage.getItem('token');
    var encryptConfig = {
        clientId: "Ecommerce18",
        username: username,
        token: password,
        maxAttempts: 5,
        locale: "en_US",
        dialogTitle: "Hey dude, your finger to login now",
        dialogMessage: "Put your finger on the device",
        dialogHint: "No one will steal your identity, promised"
    }
    FingerprintAuth.encrypt(encryptConfig, sessionEncrypt, errorCallback );
}

function fingerDecrypt(username){
    var token = localStorage.getItem('token');
    var username = localStorage.getItem('remember');
    var decryptConfig = {
        clientId: "Ecommerce18",
        username: username,
        token: token,
        maxAttempts: 5,
        locale: "en_US",
        dialogTitle: "Hey dude, your finger to login now",
        dialogMessage: "Put your finger on the device",
        dialogHint: "No one will steal your identity, promised"
    }
    FingerprintAuth.decrypt(decryptConfig, sessionDecrypt, errorCallback );
}

function sessionEncrypt(result){
    console.log("successCallback(): "+ JSON.stringify(result));
    if (result.withFingerprint){
        console.log("Successfully encrypted");
        console.log("Resulting token " + result.token);
        localStorage.setItem('token', result.token);
        localStorage.setItem('fingerauth', true);
    }
    else if(result.withFingerprint){
        console.log("authenticated with backup");
    }
}

function sessionDecrypt(result){
    console.log("successCallback(): " + JSON.stringify(result));
    if (result.withFingerprint) {
        console.log("Successful biometric authentication.");
        if (result.password) {
            console.log("Successfully decrypted credential token.");
            console.log("password: " + result.password);  
            password = result.password;
            loginAjax();
        }
    } else if (result.withBackup) {
        console.log("Authenticated with backup password");
    }
}

function errorCallback(error){
    if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
        console.log("FingerprintAuth Dialog Cancelled!");
    } else {
        console.log("FingerprintAuth Error: " + error);
    }
}

function loginAjax(){
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        url: hurl + "/api/auth/generate_auth_cookie/?username="+username+"&password="+password,
        success: function(data){
            console.log(data);
            auth = true;
            createAccountMenu();
            id = data.user.id;
            name = data.user.username;
            first = data.user.firstname;
            last = data.user.lastname;
            image = data.user.avatar;
            email = data.user.email;
            cookie = data.cookie;
            capabilities = data.user.capabilities;
            $(".navMenuContainer").empty().remove();
            loginSuccess(id, name, first, last, image, email);
            sessionStorage.setItem("id", id);
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('first', first);
            sessionStorage.setItem('last', last);
            sessionStorage.setItem('image', image);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('capabilities', capabilities);
            sessionStorage.setItem('cookie', cookie);
            if (checkbox){
                localStorage.setItem('remember', username);
                localStorage.setItem('rememberp', btoa(password));
            }
        }
    });
}
