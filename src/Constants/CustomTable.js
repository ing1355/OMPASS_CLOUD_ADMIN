import React from 'react';

const CustomTable = ({columns, datas, rowClick}) => {
    return <table>
        <thead>
            <tr>
            {
                columns.map((c,ind) => <th key={ind}>
                    {c.name}
                </th>)
            }
            </tr>
        </thead>
        <tbody>
            {
                datas.map((d,ind) => <tr key={ind} onClick={() => {
                    if(rowClick) rowClick(d);
                }}>
                    {
                        columns.map((c,_ind) => <td key={_ind}>
                            {
                                c.render ? c.render(d) : d[c.key]
                            }
                        </td>)
                    }
                    </tr>)
            }
        </tbody>
    </table>
}

export default CustomTable;