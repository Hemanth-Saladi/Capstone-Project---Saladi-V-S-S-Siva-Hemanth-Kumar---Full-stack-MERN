// Class to manage contacts
var ContactManager = /** @class */ (function () {
    function ContactManager() {
        this.contacts = [];
    }
    // Add new contact
    ContactManager.prototype.addContact = function (contact) {
        var exists = this.contacts.find(function (c) { return c.id === contact.id; });
        if (exists) {
            console.log("Error: Contact with this ID already exists.");
            return;
        }
        this.contacts.push(contact);
        console.log("Contact added successfully.");
    };
    // View all contacts
    ContactManager.prototype.viewContacts = function () {
        return this.contacts;
    };
    // Modify existing contact
    ContactManager.prototype.modifyContact = function (id, updatedContact) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact) {
            console.log("Error: Contact not found.");
            return;
        }
        Object.assign(contact, updatedContact);
        console.log("Contact modified successfully.");
    };
    // Delete contact
    ContactManager.prototype.deleteContact = function (id) {
        var index = this.contacts.findIndex(function (c) { return c.id === id; });
        if (index === -1) {
            console.log("Error: Contact not found.");
            return;
        }
        this.contacts.splice(index, 1);
        console.log("Contact deleted successfully.");
    };
    return ContactManager;
}());
// Testing the class
var manager = new ContactManager();
manager.addContact({
    id: 1,
    name: "Hemanth",
    email: "hemanth@gmail.com",
    phone: "9876543210"
});
manager.addContact({
    id: 2,
    name: "roshini",
    email: "roshini@gmail.com",
    phone: "9123456780"
});
manager.addContact({
    id: 3,
    name: "Satya",
    email: "satya@gmail.com",
    phone: "7685902134"
});
manager.addContact({
    id: 4,
    name: "Venkat",
    email: "venkat@gmail.com",
    phone: "6789012345"
});
manager.modifyContact(1, { name: "Siva" });
manager.modifyContact(2, { phone: "8312045679" });
manager.deleteContact(4);
console.log("Final Contacts:");
console.log(manager.viewContacts());
