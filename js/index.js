// Selects all elements
const burgerMenu = document.querySelector("#burger-menu");
const sideBarMenu = document.querySelector("#side-bar");
const mainSection = document.querySelector("#main-section");
//
const addContactButtonList = document.querySelectorAll(".addContactButton");
const arrowBack = document.getElementById("arrowBack");
//
const contactListContainer = document.getElementById("contactListContainer");
const emptyContactList = document.getElementById("emptyContactList");
const contactList = document.getElementById("contactList");
const contactListTable = document.getElementById("contactListTable");
//
const formContact = document.getElementById("formContact");
const contactFormContainer = document.getElementById("contactFormContainer");
const contactFirstName = document.getElementById("contactFirstName");
const contactName = document.getElementById("contactName");
const contactEntreprise = document.getElementById("contactEntreprise");
const contactFonction = document.getElementById("contactFonction");
const contactEmail = document.getElementById("contactEmail");
const contactNumero = document.getElementById("contactNumero");
const contactLabel = document.getElementById("contactLibele");
const saveContact = document.getElementById("saveContact");
let indexTemp = null;
let labelTab = [];
const labelItemList = document.getElementById("labelItemList");
let contacts = [];

let contactCompt = document.querySelectorAll(".contactCompt");

//function for adding
function handleAddStyle(element, style) {
  element.classList.add(style);
}
//function for removing
function handleRemoveStyle(element, style) {
  element.classList.remove(style);
}
//function for hiddenElement
function hideElement(element) {
  handleRemoveStyle(element, "display-visible");
  handleAddStyle(element, "display-none");
}
//function for displayElement
function displayElement(element) {
  handleRemoveStyle(element, "display-none");
  handleAddStyle(element, "display-visible");
}

//function for gobackTocontactList
function goBackToContactList() {
  hideElement(contactFormContainer);
  displayElement(contactListContainer);
  if (contacts.length > 0) {
    hideElement(emptyContactList);
    displayElement(contactList);
  } else {
    hideElement(contactList);
    displayElement(emptyContactList);
  }
}
//listening evenement in the button addcontact
addContactButtonList.forEach(addContactButton => {
  addContactButton.addEventListener("click", () => {
    hideElement(contactListContainer);
    displayElement(contactFormContainer);
  });
});
//listening evenement in burgermenu
burgerMenu.addEventListener("click", event => {
  if (sideBarMenu.classList.contains("display-none")) {
    handleRemoveStyle(sideBarMenu, "display-none");
    handleRemoveStyle(mainSection, "w-100");
  } else {
    handleAddStyle(sideBarMenu, "display-none");
    handleAddStyle(mainSection, "w-100");
  }
});
//listening evenement in arrowback
arrowBack.addEventListener("click", () => {
  goBackToContactList();
});

function Contactrow(contacts) {
  contactListTable.innerHTML = "";
  contacts.forEach((contact, index) => {
    const contactId = contact.contactEmail + index;
    const contactBadge = contact.contactFirstName[0].toUpperCase();
    const contactTr = document.createElement("tr");
    contactTr.innerHTML = `
                  
                  <td class="padding-top-bottom-1rem">
                    <div class="flex items-center gap-1rem">
                      <p class="text-badge">${contactBadge}</p>
                      <p>${contact.contactFirstName} ${contact.contactName}</p>
                    </div>
                  </td>
                  <td class="padding-top-bottom-1rem">${contact.contactEmail}</td>
                  <td class="padding-top-bottom-1rem">${contact.contactNumero}</td>
                  <td class="padding-top-bottom-1rem">${contact.contactFonction} ${contact.contactEntreprise}</td>
                  <td class="padding-top-bottom-1rem">${contact.contactLabel}</td>
                  <td class="padding-top-bottom-1rem">
                  <div class="flex gap-1rem">
                      <button id="${contactId}-updatebtn" class="btn btn-info addContactButton button-radius-07 flex items-center" type="button">
                        Modifier
                      </button>
                      <button id="${contactId}-deletebtn" class="btn btn-danger addContactButton button-radius-07 flex items-center" type="button">
                        Supprimer
                      </button>
                  </td>

    `;
    contactListTable.appendChild(contactTr);
    const buttonRemove = document.getElementById(contactId + "-deletebtn");
    const buttonUpdate = document.getElementById(contactId + "-updatebtn");
    buttonUpdate.addEventListener("click", () => {
      updateContact(contact, index);
    });
    buttonRemove.addEventListener("click", () => {
      deleteContact(contact);
    });
  });
}

function deleteContact(contact) {
  contacts = contacts.filter(contactItem => {
    return contactItem != contact;
  });
  Contactrow(contacts);
  showCompt();
}

//
function updateContact(contact, index) {
  indexTemp = index;
  console.log("index:", index);

  contactFirstName.value = contact.contactFirstName;
  contactName.value = contact.contactName;
  contactEntreprise.value = contact.contactEntreprise;
  contactFonction.value = contact.contactFonction;
  contactEmail.value = contact.contactEmail;
  contactNumero.value = contact.contactNumero;
  contactLabel.value = contact.contactLabel;
  hideElement(contactListContainer);
  displayElement(contactFormContainer);
}
//
saveContact.addEventListener("click", event => {
  event.preventDefault();
  const contact = {
    contactFirstName: contactFirstName.value,
    contactName: contactName.value,
    contactEntreprise: contactEntreprise.value,
    contactFonction: contactFonction.value,
    contactEmail: contactEmail.value,
    contactNumero: contactNumero.value,
    contactLabel: contactLabel.value
  };
  if (!contact.contactName || !contact.contactFirstName || !contact.contactNumero) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  showCompt();
  if (indexTemp == null) {
    contacts.push(contact);
  }
  contacts[indexTemp] = contact;
  console.log("indexTemp:", indexTemp);
  indexTemp = null;

  console.log(contacts);
  showCompt();
  contactFirstName.value = "";
  contactName.value = "";
  contactEntreprise.value = "";
  contactFonction.value = "";
  contactEmail.value = "";
  contactNumero.value = "";
  contactLabel.value = "";
  Contactrow(contacts);

  goBackToContactList();
});
//
function showCompt() {
  contactCompt.forEach(element => {
    element.textContent = contacts.length;
  });
}
