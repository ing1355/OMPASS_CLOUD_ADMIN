import React, { Component, useRef } from 'react';
import {
    ExcelExport,
    ExcelExportColumn,
    ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { Button } from 'antd';
import { AiOutlineDownload } from 'react-icons/ai'

const ExcelDownload = () => {
    const _exporter = useRef(null);
    const _export = (res) => {
        let workbook = _exporter.current.workbookOptions();
        let title_row = workbook.sheets[0].rows[0];
        let columns = workbook.sheets[0].columns;
        // workbook.sheets[0].rows.map((row, ind) => {
        //   row.cells.map((cell) => {
        //     if (ind !== 1 && ind % 2 === 1) {
        //       cell.color = "#fd0101";
        //     }
        //   });
        // });
        title_row.height = 70;
        title_row.cells[0] = {
            ...title_row.cells[0],
            background: "#ffffff",
            color: "#000000",
            fontSize: 50,
        };
        _exporter.current.save(workbook);
    };
    return <div>
        <Button
            id="download"
            type="primary"
            style={{ float: "right" }}
            onClick={_export}
        >
            엑셀 다운로드
      <AiOutlineDownload />
        </Button>
        <ExcelExport
            data={data}
            fileName={`${title}.xlsx`}
            ref={_exporter}
        >
            <ExcelExportColumnGroup
                title="사용자 리스트"
                headerPaddingCellOptions={{ background: "#ff0000" }}
                headerCellOptions={{
                    textAlign: "center",
                    borderBottom: 3,
                    borderLeft: 3,
                    borderRight: 3,
                    borderTop: 3,
                    fontSize: 16,
                    bold: true,
                    verticalAlign: "center",
                }}
            >
                {columns.map((res, ind) => {
                    return (
                        <ExcelExportColumn
                            key={ind}
                            field={res[0]}
                            title={res[1]}
                            width={res[1].length * 30}
                            cellOptions={{ textAlign: "center" }}
                            headerCellOptions={{ textAlign: "center" }}
                        />
                    );
                })}
            </ExcelExportColumnGroup>
        </ExcelExport>
    </div>
}

export default ExcelDownload;

export default class Excel_Download extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    _exporter;

    render() {
        const { data, title } = this.props;
        const columns = this.props.columns.map((res) => {
            return [res.dataIndex, res.title];
        });
        console.log(data, columns);
        return (
        
      );
    }
}