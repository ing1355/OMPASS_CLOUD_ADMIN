import React from "react";
import "./AdminInfo.css";

const AdminInfo = ({ data }) => {
  const { email, country, company, name, phone } = data || {};
  return (
    <section className="admin-info-section" style={{ border: "0" }}>
      <h2>Admin Info</h2>
      <div>
        Email : <b>{email}</b>
      </div>
      <div>
        Company : <b>{company}</b>
      </div>
      <div>
        Country : <b>{country}</b>
      </div>
      <div>
        Name : <b>{name}</b>
      </div>
      <div>
        Phone : <b>{phone}</b>
      </div>
    </section>
  );
};

export default AdminInfo;
