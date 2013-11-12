var app = {
    findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            console.log(employees)
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },
    showAlert: function(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    renderAppLoginView: function() {
        var self = this;
        $('body').html(this.homeTpl());
        // $('.search-key').unbind('keyup')
        $('#user, #passw').on('click', function() {
            if ($(this).val() == "Username..." || $(this).val() == "Password...") {
                $(this).val("")
            } else
                this.select();
        })
        $('.loginb').click(function() {
            var usern = $.trim($('#user').val()), passw = $.trim($('#passw').val());
            if (usern.length && passw.length) {
                $.ajax({
                    type: "POST",
                    url: "http://bounce.dev.nextlogic.ro/zaboca/login",
                   // data:"username="+usern+"&password="+passw+"&service_login=zaboca",
                    data:{"username": usern, "password": passw, "service_login": "zaboca"},
                    success: function(resp) {
                        self.showAlert(resp, "Message");
                    }
                })
            }
        })
        //   $('.search-key').on('keyup', $.proxy(this.findByName, this));
        //   $('.search-key').val("");
        //   $('.search-key').trigger('keyup');
    },
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            //    self.homeTpl = Handlebars.compile($("#home-tpl").html());
            self.homeTpl = Handlebars.compile(
                    '    <div class="header"><h1>Login</h1></div>' +
                    '    <div><input value="Username..." id="user"/></div>' +
                    '    <div><input value="Password..." id="passw"/></div>' +
                    '    <button class="loginb">Login</button>');
            self.employeeLiTpl = Handlebars.compile(
                    '{{#.}}' +
                    '<li><a href="#employees/{{this.id}}">{{this.firstName}} {{this.lastName}}<br/>{{this.title}}</a></li>' +
                    '{{/.}}');
            //     self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
            self.renderAppLoginView();
        });
    }
};

app.initialize();
/*var app = {
 // Application Constructor
 initialize: function() {
 this.bindEvents();
 },
 // Bind Event Listeners
 //
 // Bind any events that are required on startup. Common events are:
 // 'load', 'deviceready', 'offline', and 'online'.
 bindEvents: function() {
 document.addEventListener('deviceready', this.onDeviceReady, false);
 },
 // deviceready Event Handler
 //
 // The scope of 'this' is the event. In order to call the 'receivedEvent'
 // function, we must explicity call 'app.receivedEvent(...);'
 onDeviceReady: function() {
 app.receivedEvent('deviceready');
 },
 // Update DOM on a Received Event
 receivedEvent: function(id) {
 var parentElement = document.getElementById(id);
 var listeningElement = parentElement.querySelector('.listening');
 var receivedElement = parentElement.querySelector('.received');
 
 listeningElement.setAttribute('style', 'display:none;');
 receivedElement.setAttribute('style', 'display:block;');
 
 console.log('Received Event: ' + id);
 }
 };
 */