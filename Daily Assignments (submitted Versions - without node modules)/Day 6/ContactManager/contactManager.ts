// Interface for Contact
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Class to manage contacts
class ContactManager {
  private contacts: Contact[] = [];

  // Add new contact
  addContact(contact: Contact): void {
    const exists = this.contacts.find(c => c.id === contact.id);

    if (exists) {
      console.log("Error: Contact with this ID already exists.");
      return;
    }

    this.contacts.push(contact);
    console.log("Contact added successfully.");
  }

  // View all contacts
  viewContacts(): Contact[] {
    return this.contacts;
  }

  // Modify existing contact
  modifyContact(id: number, updatedContact: Partial<Contact>): void {
    const contact = this.contacts.find(c => c.id === id);

    if (!contact) {
      console.log("Error: Contact not found.");
      return;
    }

    Object.assign(contact, updatedContact);
    console.log("Contact modified successfully.");
  }

  // Delete contact
  deleteContact(id: number): void {
    const index = this.contacts.findIndex(c => c.id === id);

    if (index === -1) {
      console.log("Error: Contact not found.");
      return;
    }

    this.contacts.splice(index, 1);
    console.log("Contact deleted successfully.");
  }
}

// Testing the class

const manager = new ContactManager();

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