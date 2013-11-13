var EmployeeView = function(employee) {
    this.addLocation = function(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
                function(position) {
                    $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
                },
                function() {
                    app.showAlert('Error getting location');
                });
        return false;
    };
    this.addToContacts = function(event) {
        event.preventDefault();
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: employee.firstName, familyName: employee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    };
    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
    };
    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };
    this.initialize();
};

EmployeeView.template = Handlebars.compile([
    "<div class='header'><a href='#' class='button header-button header-button-left'>Back</a><h1>Details</h1></div>",
    "   <div class='details'>",
    "        <img class='employee-image' src='img/{{firstName}}_{{lastName}}.jpg' />",
    "    <h1>{{firstName}} {{lastName}}</h1>",
    "    <h2>{{title}}</h2>",
    "    <span class='location'></span>",
    "    <ul>",
    "       <li><a href='#' class='add-location-btn'>Add Location</a></li>",
    "       <li><a href='#' class='add-contact-btn'>Add to Contacts</a></li>",
    "        <li><a href='tel:{{officePhone}}'>Call Office<br/>{{officePhone}}</a></li>",
    "        <li><a href='tel:{{cellPhone}}'>Call Cell<br/>{{cellPhone}}</a></li>",
    "        <li><a href='sms:{{cellPhone}}'>SMS<br/>{{cellPhone}}</a></li>",
    "    </ul>",
    "</div>"].join(""));