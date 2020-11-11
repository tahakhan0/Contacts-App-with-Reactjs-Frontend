import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const allContacts = "contacts/";

export function getContacts() {
  return Axios.get(allContacts);
}

export function saveContacts(contact) {
  if (contact.id) {
    const body = { ...contact };
    return Axios.put(allContacts + contact.id, body);
  } else {
    const body = { ...contact };
    return Axios.post(allContacts + "add", body);
  }
}

export function deleteContact(id) {
  return Axios.delete(allContacts + id);
}
