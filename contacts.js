import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.format({
  dir: "db",
  base: "contacts.json",
});

export async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath);
    console.table(JSON.parse(result));
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result);
    const getContact = contacts.find((option) => option.id === contactId);
    console.table(getContact);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result);
    const contact = contacts.filter((contact) => contact.id === `${contactId}`);

    fs.writeFile(contactsPath, JSON.stringify(contacts));

    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newContacts));

    console.table(newContacts);
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result);
    contacts.push(contact);

    fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}
