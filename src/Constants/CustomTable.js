import React, { useState } from 'react';
import DoubleLeftArrow from '../customAssets/DoubleLeftArrow';
import DoubleRightArrow from '../customAssets/DoubleRightArrow';
import LeftArrow from '../customAssets/LeftArrow';
import RightArrow from '../customAssets/RightArrow';
import './CustomTable.css';

const CustomTable = ({ columns, datas, rowClick, pagination }) => {
    const test = new Array(60).fill(1).map((t, ind) => ({ userId: 'test' + ind, appName: 'test' + ind, type: 'test' + ind, updateDate: 'test', bypass: 'test' }))
    const pages = new Array(parseInt(test.length / 10)).fill(1);
    const [currentPage, setCurrentPage] = useState(0);

    const goToFirstPage = () => {
        setCurrentPage(0)
    }

    const goToLastPage = () => {
        setCurrentPage(pages.length - 1)
    }

    const goToBeforePage = () => {
        setCurrentPage(currentPage - 1)
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    return <table>
        <thead>
            <tr>
                {
                    columns.map((c, ind) => <th key={ind}>
                        {c.name}
                    </th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                datas.slice(currentPage * 10, (currentPage * 10) + 10).map((d, ind) => <tr key={ind} onClick={() => {
                    if (rowClick) rowClick(d);
                }}>
                    {
                        columns.map((c, _ind) => <td key={_ind}>
                            {
                                c.render ? c.render(d) : d[c.key]
                            }
                        </td>)
                    }
                </tr>)
            }
        </tbody>
        <div className="custom-table-footer">
            {pagination && pages.length > 0 && <div className="custom-pagination-container" style={{width: pages.length > 5 ? 300 : 100 + (pages.length * 40)}}>
                <DoubleLeftArrow onClick={goToFirstPage} disabled={currentPage === 0} />
                <LeftArrow onClick={goToBeforePage} disabled={currentPage === 0} />
                <div className="custom-pagination-pages-container" style={{width: pages.length > 5 ? 200 : pages.length * 40}}>
                    {
                        pages.map((p, ind) => {
                            const temp = <span className={"custom-pagination-page-item " + (currentPage === ind ? 'selected' : null)} onClick={() => {
                                setCurrentPage(ind);
                            }}>{ind + 1}</span>
                            if (currentPage < 3) {
                                if(ind < 5) return temp;
                            } else if(currentPage > pages.length - 3) {
                                if(ind > pages.length - 6) return temp
                            } else if(currentPage) {
                                if(ind < currentPage + 3 && ind > currentPage - 3) return temp
                            } else if(pages.length < 5) return temp
                        })
                    }
                </div>
                <RightArrow onClick={goToNextPage} disabled={currentPage === pages.length - 1} />
                <DoubleRightArrow onClick={goToLastPage} disabled={currentPage === pages.length - 1} />
            </div>}
        </div>
    </table>
}

export default CustomTable;