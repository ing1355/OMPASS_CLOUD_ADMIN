import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { menuItems } from '../../../Constants/Docs_items'

const Sidebar = () => {
    const navigate = useNavigate()
    const { content } = useParams()

    useEffect(() => {
        const Items = menuItems.flatMap(item => item.subMenuItems)
        const subMenuItems = Items.filter(item => item.path).map(item => item.path)
        const subDetailItems = Items.filter(item => !item.path).flatMap(item => item.details).flatMap(item => item.path)
        if (!(subMenuItems.includes(content) || subDetailItems.includes(content))) navigate('/docs/u2fuaf')
    }, [])

    return <div className="docs-sidebar-container">
        <h2 className="docs-title">
            OMPASS DOCS(On-Premise)
            </h2>
        <div className="docs-sidebar-scroll-container">
            {
                menuItems.map(({ title, icon, subMenuItems }, index) => <ul key={index}>
                    <li>
                        {icon}
                        {title}
                    </li>
                    {
                        subMenuItems.map(({ title, path, details }, _index) => <li key={_index}
                            className={"docs-item" + (path ? ' pointer' : '') + (path && path === content ? ' selected' : '') + (details ? ' hasChild' : '')}
                            onClick={() => {
                                if (path) navigate('/docs/' + path)
                            }}>
                            {title}
                            {
                                details && <ul>
                                    {
                                        details.map(({ title, path }, __index) => <li key={__index}
                                        className={"docs-sub-item" + (path ? ' pointer' : '') + (path && path === content ? ' selected' : '')} onClick={() => {
                                            if (path) navigate('/docs/' + path)
                                        }}>
                                            - {title}
                                        </li>)
                                    }
                                </ul>
                            }
                        </li>)
                    }
                </ul>)
            }
        </div>
    </div>
}

export default Sidebar