import React from 'react'
import './Document.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import Content from './Content'

const Document = () => {
    return <section className="docs-container">
        <Routes>
            <Route path="/:content" element={<>
                <Sidebar />
                <Content />
            </>} />
            <Route path="/*" element={<Navigate to="/docs/u2fuaf" />} />
        </Routes>
    </section>
}

export default Document