import React, { useState, useEffect } from "react";
import { getContacts } from "./getData";
import ContactDetails from "./ContactDetails";
import { SearchBar } from "./SearchBar";
import Form from "../Form/Form";
import Pagination from "./Pagination/Pagination";
import paginate from "./Pagination/paginate";

function Contacts() {
  const [data, setData] = useState([]);
  const [activeContact, setActiveContact] = useState(0);
  const [contactDetailsCard, setContactDetailsCard] = useState(data[0]);
  const [loading, setLoading] = useState(true);
  const [newContact, setAddNewContact] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteContact, setDeleteContact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const getData = async () => {
    const { data } = await getContacts();
    if (data.length === 0) {
      setAddNewContact(true);
    } else {
      setData(data);
      setActiveContact(data[0].id);
      setContactDetailsCard(data[0]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [deleteContact]);

  const getContactDetails = (d) => {
    setContactDetailsCard(d);
    setActiveContact(d.id);
  };
  const listGroupStyle = "list-group-item list-group-item-action";

  const addNewContact = (displayNewContact) => {
    setAddNewContact(displayNewContact);
    setActiveContact(displayNewContact === true ? null : activeContact);
  };
  const cancelNewContact = () => {
    setAddNewContact(false);
    setActiveContact(data[0].id);
  };
  const updateContact = (d) => {
    setActiveContact(d.id);
    setContactDetailsCard(d);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  let filteredContacts = data;

  if (searchQuery)
    filteredContacts = data.filter((contact) =>
      contact.first_name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

  const paginatedData = paginate(filteredContacts, currentPage, pageSize);

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: "20rem" }}>
        <div className="spinner-border" role="status"></div>
        <h3 style={{ marginTop: "2rem", textAlign: "center" }}>Loading ...</h3>
      </div>
    );
  }
  return (
    <div className="container-fluid contactsContainer">
      <SearchBar
        value={searchQuery}
        onChange={handleQuery}
        name="search"
        addNewContact={addNewContact}
      />
      <div className="column-layout">
        <div className="main-column">
          {!newContact && contactDetailsCard && data && (
            <ContactDetails
              contactDetailsCard={contactDetailsCard}
              activeContact={activeContact}
              updateContact={updateContact}
              setDeleteContact={setDeleteContact}
            />
          )}
          {newContact && (
            <Form
              cancelNewContact={data.length === 0 ? null : cancelNewContact}
              addNewContact={addNewContact}
            />
          )}
        </div>
        <div className="side-column">
          <h4 className="text-center mb-4 pt-3">Name</h4>
          <div className="list-group">
            {paginatedData.map((d) => (
              <button
                key={d.id}
                type="button"
                className={
                  activeContact === d.id
                    ? listGroupStyle + " active"
                    : listGroupStyle
                }
                onClick={() => getContactDetails(d)}
              >
                {d.first_name}, {d.last_name.slice(0, 1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6">
          <p className="text-secondary mt-3">
            Showing {paginatedData.length} of {filteredContacts.length} results.
          </p>
        </div>
        <div className="col col-md-4 d-flex justify-content-start">
          <Pagination
            numOfItems={filteredContacts.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Contacts;
