var app = {
    findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
        /* console.log('findByName');
         this.store.findByName($('.search-key').val(), function(employees) {
         var l = employees.length;
         var e;
         $('.employee-list').empty();
         for (var i = 0; i < l; i++) {
         e = employees[i];
         $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
         }
         });*/
    },
    showAlert: function(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    renderHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        $('.search-key').val(" ");
        $('.search-key').trigger('keyup');
    },
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
        //    self.homeTpl = Handlebars.compile($("#home-tpl").html());
        self.homeTpl = Handlebars.compile(
        '    <div class="header"><h1>Home</h1></div>'+
        '    <div class="search-bar"><input class="search-key" type="text"/></div>'+
        '    <ul class="employee-list"></ul>');
        self.employeeLiTpl = Handlebars.compile(
            '{{#.}}'+
            '<li><a href="#employees/{{this.id}}">{{this.firstName}} {{this.lastName}}<br/>{{this.title}}</a></li>'+
            '{{/.}}');
       //     self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
            self.renderHomeView();
        });
    }
};

app.initialize();