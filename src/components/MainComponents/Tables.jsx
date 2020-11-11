import React, { useState, useEffect } from "react";
import { getContacts } from "./getData";

export default function Tables() {
  const [displayDetail, setDisplayDetails] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await getContacts();
    setData(data);
  };
  useEffect(() => {
    setMounted(true);
    getData();
  }, [mounted]);

  const display = () => {
    setDisplayDetails(true);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm rounded">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.id} className="accordion">
                    <td>
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                    </td>

                    <td>{d.first_name}</td>
                    <td>{d.last_name}</td>
                    <td>{}</td>
                    <td>
                      <i
                        className={
                          displayDetail
                            ? `fa fa-minus-square-o`
                            : `fa fa-plus-square-o`
                        }
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          fontSize: "22px",
                        }}
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        onClick={() => display()}
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                ))}
                {displayDetail && (
                  <tr>
                    <td colSpan={5}>
                      <div id="collapseOne" className="collapse in p-3">
                        <div className="row">
                          <div className="col-2">label</div>
                          <div className="col-6">value 1</div>
                        </div>
                        <div className="row">
                          <div className="col-2">label</div>
                          <div className="col-6">value 2</div>
                        </div>
                        <div className="row">
                          <div className="col-2">label</div>
                          <div className="col-6">value 3</div>
                        </div>
                        <div className="row">
                          <div className="col-2">label</div>
                          <div className="col-6">value 4</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
