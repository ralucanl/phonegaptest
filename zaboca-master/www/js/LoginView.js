
var LoginView = function(store) {
    this.render = function() {
        this.el.html(LoginView.template());
        this.registerEvents();
        return this;
    };
    this.registerEvents = function() {
    };
    this.initialize = function() {
        this.el = $('<div/>');
        OAuth.initialize('VeQmyEu0QtzIOO9WjM1IlAU0ty4');

        this.el.on('click', '#user, #passw', function() {
            if ($(this).val() == "Username..." || $(this).val() == "Password...") {
                $(this).val("")
            } else {
                this.select();
            }
        });
        this.el.on('click', '.loginb', function() {

            OAuth.popup("facebook", function(e, r) {
                console.log(e)
                console.log(r)
             /*   if (e)
                    $('#result').html('error: ' + e.message);
                else
                    greetings(r.access_token);*/
            });

            /*  $.getScript("http://connect.facebook.net/en_UK/all.js", function() {
             console.log("??")
             FB.init({
             appId: '491375597552243'
             //channelUrl: '//C:/Users/work3000/phonegap1_git/zaboca-master/www/index.html',
             });
             //LoadFacebookhandler();
             });*/
            /*var _this = this, usern = $.trim($('#user').val()), passw = $.trim($('#passw').val());
             if (usern.length && passw.length) {
             $.ajax({
             type: "POST",
             dataType: "json",
             url: "http://bounce.dev.nextlogic.ro/zaboca/login",
             data: {"username": usern, "password": passw, "service_login": "zaboca"},
             success: function(resp) {
             if(resp.success){
             app.logged = true;
             app.homePage = new HomeView({id:resp.id, email:resp.email}).render();
             app.slidePage(app.homePage);
             }
             console.log(resp)
             }
             })
             }*/

            /* var _this = this, usern = $.trim($('#user').val()), passw = $.trim($('#passw').val());
             if (usern.length && passw.length) {
             $.ajax({
             type: "POST",
             dataType: "json",
             url: "http://bounce.dev.nextlogic.ro/zaboca/login",
             data: {"username": usern, "password": passw, "service_login": "zaboca"},
             success: function(resp) {
             if(resp.success){
             app.logged = true;
             app.homePage = new HomeView({id:resp.id, email:resp.email}).render();
             app.slidePage(app.homePage);
             }
             console.log(resp)
             }
             })
             }*/
        })
    };
    this.initialize();
}

LoginView.template = Handlebars.compile([
    '    <div class="header"><h1>Login</h1></div>',
    '   <div><input value="Username..." id="user"/></div>',
    '    <div><input value="Password..." id="passw"/></div>',
    '    <button class="loginb">Login</button>'
].join(""));
