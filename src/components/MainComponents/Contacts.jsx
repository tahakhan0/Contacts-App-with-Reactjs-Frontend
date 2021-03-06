import React, { useState, useEffect } from "react";
import { getContacts } from "./getData";
import ContactDetails from "./ContactDetails";
import { SearchBar } from "./SearchBar";
import Form from "../Form/Form";
import Pagination from "./Pagination/Pagination";
import paginate from "./Pagination/paginate";

function Contacts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [contact, setContact] = useState({
    updateContact: false,
    deleteContact: false,
    addNewContact: false,
  });

  const [activeContact, setActiveContact] = useState({
    currentContact: "",
    currentContactDetails: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const [displayNewContactForm, setDisplayNewContactForm] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log("getdata is called");
      const { data } = await getContacts();
      if (data.length === 0) {
        setContact({ addNewContact: true });
      } else {
        setData(data);
        if (contact.updateContact === false || contact.deleteContact === true) {
          setActiveContact({
            currentContact: data[0].id,
            currentContactDetails: data[0],
          });
        }
      }
      setLoading(false);
    };
    getData();
    return () => {
      console.log("component will unmout is called");
    };
  }, [contact]);

  const toggleAddContactButton = (value) => {
    if (value) {
      setDisplayNewContactForm(value);
      setActiveContact({ currentContact: "", currentContactDetails: "" });
    } else {
      setDisplayNewContactForm(value);
      setActiveContact({
        currentContact: data[0].id,
        currentContactDetails: data[0],
      });
    }
  };

  const getActiveContactDetails = (id) => {
    const response = data.find((d) => d.id === id);
    console.log(id, response);
    setActiveContact({ currentContact: id, currentContactDetails: response });
  };

  const saveNewContact = (data) => {
    setDisplayNewContactForm(false);
    setContact({ addNewContact: true });
    setActiveContact({ currentContact: data.id, currentContactDetails: data });
  };

  const updateContactAfterEdit = (data) => {
    setContact({ updateContact: true });
    setActiveContact({ currentContactDetails: data, currentContact: data.id });
  };

  const deleteContact = () => {
    setContact({ deleteContact: true });
  };

  const listGroupStyle = "list-group-item list-group-item-action";

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

  const { currentContact, currentContactDetails } = activeContact;

  return (
    <div className="container-fluid contactsContainer">
      <SearchBar
        value={searchQuery}
        onChange={handleQuery}
        name="search"
        addNewContact={toggleAddContactButton}
      />
      <div className="column-layout">
        <div className="main-column">
          {!displayNewContactForm &&
            currentContact &&
            currentContactDetails && (
              <ContactDetails
                contactDetailsCard={currentContactDetails}
                updateContact={updateContactAfterEdit}
                setDeleteContact={deleteContact}
              />
            )}
          {displayNewContactForm && (
            <Form
              cancelNewContact={
                data.length === 0 ? null : toggleAddContactButton
              }
              saveNewContact={saveNewContact}
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
                disabled={displayNewContactForm}
                className={
                  currentContact === d.id
                    ? listGroupStyle + " active"
                    : listGroupStyle
                }
                onClick={() => getActiveContactDetails(d.id)}
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
