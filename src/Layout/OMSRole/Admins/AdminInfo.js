import React from 'react'
import './AdminInfo.css'

const AdminInfo = ({ data }) => {
    const { email, country, company, name, phone } = data || {};
    return <section>
        <h2>User Info</h2>
        <div>
            Email : {email}
        </div>
        <div>
            Company : {company}
        </div>
        <div>
            Country : {country}
        </div>
        <div>
            Name : {name}
        </div>
        <div>
            Phone : {phone}
        </div>        
    </section>
}

export default AdminInfo