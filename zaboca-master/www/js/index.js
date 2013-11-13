var app = { //homePage - HomeView, loginPage - LoginView
    showAlert: function(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    slidePage: function(page) {
        var currentPageDest,
                self = this;
        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }
        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();
        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }
        $('body').append(page.el);
        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });
    },
    getLogged: function() {
        if(!this.logged){
            return false;
        } else return true;
    },
    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.getLogged()) {
                if (this.homePage) {
                    this.slidePage(this.homePage);
                } else {
                    this.homePage = new HomeView(this.store).render();
                    this.slidePage(this.homePage);
                }
            } else {
                if (this.loginPage) {
                    this.slidePage(this.loginPage);
                } else {
                    this.loginPage = new LoginView(this.store).render();
                    this.slidePage(this.loginPage);
                }
            }
            return;
        }
        var match = hash.match(this.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
        }
    },
    initialize: function() {
        var self = this;
        //self.registerEvents();
        self.detailsURL = /^#zab\/(\d{1,})/;
        $(window).on('hashchange', $.proxy(self.route, self));
        // this.store = new MemoryStore(function() {
        self.route();
        // });
    }
};

app.initialize();


////var app = {
//    findByName: function() {
//        var self = this;
//        this.store.findByName($('.search-key').val(), function(employees) {
//            console.log(employees)
//            $('.employee-list').html(self.employeeLiTpl(employees));
//        });
//    },
//    showAlert: function(message, title) {
//        if (navigator.notification) {
//            navigator.notification.alert(message, null, title, 'OK');
//        } else {
//            alert(title ? (title + ": " + message) : message);
//        }
//    },
//    renderAppLoginView: function() {
//        var self = this;
//        $('body').html(this.homeTpl());
//        // $('.search-key').unbind('keyup')
//        $('#user, #passw').on('click', function() {
//            if ($(this).val() == "Username..." || $(this).val() == "Password...") {
//                $(this).val("")
//            } else
//                this.select();
//        })
//        $('.loginb').click(function() {
//            var usern = $.trim($('#user').val()), passw = $.trim($('#passw').val());
//            if (usern.length && passw.length) {
//                $.ajax({
//                    type: "POST",
//                    url: "http://bounce.dev.nextlogic.ro/zaboca/login",
//                   // data:"username="+usern+"&password="+passw+"&service_login=zaboca",
//                    data:{"username": usern, "password": passw, "service_login": "zaboca"},
//                    success: function(resp) {
//                        self.showAlert(resp, "Message");
//                    }
//                })
//            }
//        })
//        //   $('.search-key').on('keyup', $.proxy(this.findByName, this));
//        //   $('.search-key').val("");
//        //   $('.search-key').trigger('keyup');
//    },
//    initialize: function() {
//        var self = this;
//        this.store = new MemoryStore(function() {
//            //    self.homeTpl = Handlebars.compile($("#home-tpl").html());
//            self.homeTpl = Handlebars.compile(
//                    '    <div class="header"><h1>Login</h1></div>' +
//                    '    <div><input value="Username..." id="user"/></div>' +
//                    '    <div><input value="Password..." id="passw"/></div>' +
//                    '    <button class="loginb">Login</button>');
//            self.employeeLiTpl = Handlebars.compile(
//                    '{{#.}}' +
//                    '<li><a href="#employees/{{this.id}}">{{this.firstName}} {{this.lastName}}<br/>{{this.title}}</a></li>' +
//                    '{{/.}}');
//            //     self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
//            self.renderAppLoginView();
//        });
//    }
//};
//
//app.initialize();
