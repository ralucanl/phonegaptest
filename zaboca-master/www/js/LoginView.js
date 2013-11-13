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
        this.el.on('click', '#user, #passw', function() {
            if ($(this).val() == "Username..." || $(this).val() == "Password...") {
                $(this).val("")
            } else {
                this.select();
            }
        });
        this.el.on('click', '.loginb', function() {
            var _this = this, usern = $.trim($('#user').val()), passw = $.trim($('#passw').val());
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
            }
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
