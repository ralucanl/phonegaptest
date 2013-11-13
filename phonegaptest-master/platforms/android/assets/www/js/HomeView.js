var HomeView = function(store) {
    this.render = function() {
        this.el.html(HomeView.template());
        this.el.find('.search-key').val("");
        this.el.find('.search-key').trigger('keyup');
        return this;
    };
    this.findByName = function() {
        var _this = this;
        console.log(_this.el.get(0))
        store.findByName(_this.el.find('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
        });
    };
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', $.proxy(this.findByName, this));
        this.el.on('click', '.search-key', function() {
            this.select();
        });
    };
    this.initialize();
}

HomeView.template = Handlebars.compile(
        '    <div class="header"><h1>Home</h1></div>' +
        '    <div class="search-bar"><input class="search-key" type="text"/></div>' +
        '    <ul class="employee-list"></ul>');
HomeView.liTemplate = Handlebars.compile(
        '{{#.}}' +
        '<li><a href="#employees/{{this.id}}">{{this.firstName}} {{this.lastName}}<br/>{{this.title}}</a></li>' +
        '{{/.}}');