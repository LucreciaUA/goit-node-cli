const contacts = require('./contacts');
const { program } = require('commander');
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      
      try {
        const data = await contacts.listContacts()
        console.table(data)
      } catch (error) {
        error=>console.error('Error listing contacts:', error)
      }
      break;

    case "get":
      try {
        const data = await contacts.getContactById(id)
        console.log(data||null)
      } catch (error) {
        error=>console.error('Error getting contact by id:', error)
      }
      break;

    case "add":
      try {
        const data = await contacts.addContact(name, email, phone)
        console.log(data||null)
      } 
      catch(error) {
        error=>console.error('Error adding new contact:', error)
      }
      break;

    case "remove":
      try {
        const data = await contacts.removeContact(id)
        console.log(data||null)
      } catch (error) {
        error=>console.error('Error deleting contact by id:', error)
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
