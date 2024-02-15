const fs = require('node:fs/promises');
const crypto = require('crypto');

const contactsPath = require('path');


const filePath = contactsPath.join(__dirname, 'db', 'contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data)
    } catch (err) {
        throw err; 
    }
}

async function getContactById(contactId) {
    try {
        const data = await listContacts()
        const contact = data.find((item) => {
           return item.id===contactId
        }
        )
        if(contact){
            return contact
        }
        else {
            return null
        }
      }
    catch (error) {
        throw error; 
  }
}

async function removeContact(contactId) {
  try {
      const data = await listContacts()
      const deleted = await getContactById(contactId)
      const index = data.findIndex((item) => item.id === contactId);

    if (index !== -1) {
      // Remove the contact from the array
      data.splice(index, 1);

      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

      // Return the deleted contact
      return deleted;
        }
        else {
            return null
        }
      }
    catch (error) {
        throw error; 
  }
}

async function addContact(name, email, phone) {
  try {
      const data = await listContacts()
      const exists = data.some((item) => {
          return item.name.toLowerCase() === name.toLowerCase() ||
                 item.email.toLowerCase() === email.toLowerCase() ||
                 item.phone === phone;
      });
      if (exists) {
          return null;
      }

      const contact = {
          id: crypto.randomUUID(),
          name: name,
          email: email,
          phone: phone,
      };

      const newData = [...data, contact]
      const stringified = JSON.stringify(newData, null, 2);
      await fs.writeFile(filePath, stringified, 'utf8');

      return contact;
  }
  catch (error) {
      console.error('error:', error)
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
