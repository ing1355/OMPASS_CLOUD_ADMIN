import React, { useRef } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import CustomButton from "../../../CustomComponents/CustomButton";

import { DownloadOutlined } from "@ant-design/icons";

const title = "test";

const ExcelDownload = ({ data, columns }) => {
  console.log(data);
  const _exporter = useRef(null);
  const _export = (res) => {
    let workbook = _exporter.current.workbookOptions();
    let columns = workbook.sheets[0].columns;
    columns.map((col, ind) => {
      if (ind === 0) col.width = 300;
      else if (ind === 1) col.width = 240;
      else if (ind === 2) col.width = 200;
      else if (ind === 3) col.width = 150;
      else if (ind === 4) col.width = 150;
      else if (ind === 5) col.width = 200;
    });
    _exporter.current.save(workbook);
  };
  return (
    <div>
      <CustomButton id="download" style={{ float: "right" }} onClick={_export}>
        <DownloadOutlined /> 엑셀 다운로드
      </CustomButton>
      <ExcelExport
        data={data.map((d) => ({
          appName: d.appName,
          userId: d.userId,
          type: d.type,
          lastLoginDate: d.lastLoginDate,
          byPass: d.byPass,
        }))}
        fileName={`${title}.xlsx`}
        ref={_exporter}
      >
        <ExcelExportColumnGroup
          title={title}
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
                field={res.key}
                title={res.name}
                width={res.name.length * 30}
                cellOptions={{ textAlign: "center" }}
                headerCellOptions={{ textAlign: "center" }}
              />
            );
          })}
        </ExcelExportColumnGroup>
      </ExcelExport>
    </div>
  );
};

export default ExcelDownload;
