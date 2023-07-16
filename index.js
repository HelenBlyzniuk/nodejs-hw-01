import { program } from "commander";
import contactServices from "./contacts.js";


program
  .option("-a, --action <type>")
  .option("-i,--id <type>")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
  program.parse(process.argv);
  
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactServices.listContacts();
      return console.log(allContacts);

    case "get":
      const contact = await contactServices.getContactById(id);
      return console.log(contact);
      break;

    case "add":
      const newContact = await contactServices.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deletedContact = await contactServices.removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
// invokeAction({action:'list'})
// invokeAction({action:'get',id:'e6ywwRe4jcqxXfCZOj_1e'})
//  invokeAction({action:'add', name:"Lena",email:"helen@gmail.com",phone:"4432156"})
//  invokeAction({action:'remove',id:'e6ywwRe4jcqxXfCZOj_1e'})
