import React, { Suspense } from 'react'
import { useParams } from 'react-router'
import { menuItems } from '../../../Constants/Docs_items'

const Content = () => {
    const Items = menuItems.flatMap(item => item.subMenuItems)
    const subMenuItems = Items.filter(item => item.path)
    const subDetailItems = Items.filter(item => !item.path).flatMap(item => item.details)
    const { content } = useParams()
    
    return <Suspense fallback={<div>loading...</div>}>
        <div className={"docs-content-container" + (['restApiu2f', 'restApiuaf'].includes(content) ? ' hasPopBox' : '')}>
            {
                [...subMenuItems, ...subDetailItems].find(item => item.path === content).component
            }
        </div>
    </Suspense>
}

export default Content