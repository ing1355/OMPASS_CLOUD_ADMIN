import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import DoubleLeftArrow from "../customAssets/DoubleLeftArrow";
import DoubleRightArrow from "../customAssets/DoubleRightArrow";
import LeftArrow from "../customAssets/LeftArrow";
import RightArrow from "../customAssets/RightArrow";
import "./CustomTable.css";

const CustomTable = ({
  columns,
  datas,
  rowClick,
  pagination,
  numPerPage,
  loading,
  multipleSelectable,
  selectedId,
  onChangeSelectedRows,
  rowSelectable,
  className,
  columnsHide
}) => {
  const firstRenderRef = useRef(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const tableData = multipleSelectable
    ? datas.map((d) => ({
      check: "",
      ...d,
    }))
    : datas;
  const tableColumns = multipleSelectable
    ? [
      {
        name: "",
        key: "check",
        render: (row) => (
          <div>
            <input
              className="table-row-select-checkbox"
              type="checkbox"
              checked={selectedRows.includes(row[selectedId])}
              onClick={() => {
                rowSelect(row[selectedId]);
              }}
              onChange={() => { }}
            />
          </div>
        ),
      },
      ...columns,
    ]
    : columns;
  const _numPerPage = numPerPage ? numPerPage : 10;
  const pageNum = parseInt(datas.length / _numPerPage) + (datas.length % _numPerPage === 0 ? 0 : 1);
  const [currentPage, setCurrentPage] = useState(0);

  const rowSelect = useCallback((id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((r) => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  },[selectedRows]);

  useEffect(() => {
    firstRenderRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (firstRenderRef.current) {
      if (onChangeSelectedRows) onChangeSelectedRows(selectedRows);
    }
  }, [selectedRows]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(0);
  },[]);

  const goToLastPage = () => {
    setCurrentPage(pageNum - 1);
  };

  const goToBeforePage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  },[currentPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  },[currentPage]);

  const dataList = useMemo(() => tableData.slice(
    currentPage * _numPerPage,
    currentPage * _numPerPage + _numPerPage
  ).map((d, ind) => (
    <tr
      key={ind}
      className={rowClick ? "pointer" : ""}
      onClick={(e) => {
        //  && e.target.tagName === "TD"
        if (rowSelectable) rowSelect(d[selectedId]);
        if (rowClick) rowClick(d);
      }}
    >
      {tableColumns.map((c, _ind) => (
        <td
          key={_ind}
          style={c.key === 'check' ? { minWidth: '60px', width: '60px' } : null}
        >
          {c.render ? c.render(d) : d[c.key]}
        </td>
      ))}
    </tr>
  )), [tableColumns, tableData, currentPage, numPerPage, rowSelectable, rowClick])

  return (
    <table className={className ? "custom-table-box " + className : 'custom-table-box'}>
      <colgroup>
        {tableColumns.map((c, ind) => <col key={ind} style={c.key === 'check' ? { minWidth: '60px', width: '60px' } : { minWidth: c.width, width: c.width }} />)}
      </colgroup>
      <thead style={{ display: columnsHide ? 'none' : '' }}>
        <tr>
          {tableColumns.map((c, ind) =>
            c.key === "check" ? (
              <th key={ind} style={{ minWidth: "60px", width: '60px' }}>
                <input
                  className="table-all-row-select-checkbox"
                  checked={tableData.length > 0 && selectedRows.length === tableData.length}
                  type="checkbox"
                  onClick={() => {
                    if (selectedRows.length === tableData.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(tableData.map((d) => d[selectedId]));
                    }
                  }}
                  onChange={() => { }}
                />
              </th>
            ) : (
              <th
                key={ind}>
                {c.name}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {!loading && tableData && tableData.length > 0 ? (
          dataList
        ) : (
          <tr className="no-data">
            {
              loading ? (
                <td className="loading-td" >
                  <div className="box">
                    <div className="loader6"></div>
                    <p>data loading</p>
                  </div>
                </td>
              ) : (
                <td className="no-data" colSpan={tableColumns.length}>No Data</td>
              )}
          </tr>
        )
        }
      </tbody >
      { tableData && tableData.length > numPerPage && (
        <tfoot>
          <tr className="custom-table-footer">
            {pagination && pageNum > 0 && (
              <td colSpan={5}>
                <div className="custom-pagination-container">
                  <div className="custom-pagination-items" style={{ width: (pageNum > 5 ? 150 : pageNum * 30) + 92 }}>
                    <DoubleLeftArrow
                      onClick={goToFirstPage}
                      disabled={currentPage === 0 || currentPage === 1}
                    />
                    <LeftArrow
                      onClick={goToBeforePage}
                      disabled={currentPage === 0}
                    />
                    <div
                      className="custom-pagination-pages-container"
                      style={{ width: pageNum > 5 ? 150 : pageNum * 30 }}
                    >
                      {new Array(pageNum).fill(1).map((p, ind) => {
                        const temp = (
                          <span
                            className={
                              "custom-pagination-page-item" +
                              (currentPage === ind ? " selected" : '')
                            }
                            onClick={() => {
                              setCurrentPage(ind);
                            }}
                            key={ind}
                          >
                            {ind + 1}
                          </span>
                        );
                        if (currentPage < 3) {
                          if (ind < 5) return temp;
                        } else if (currentPage > pageNum - 3) {
                          if (ind > pageNum - 6) return temp;
                        } else if (currentPage) {
                          if (ind < currentPage + 3 && ind > currentPage - 3)
                            return temp;
                        } else if (pageNum < 5) return temp;
                      })}
                    </div>
                    <RightArrow
                      onClick={goToNextPage}
                      disabled={currentPage === pageNum - 1}
                    />
                    <DoubleRightArrow
                      onClick={goToLastPage}
                      disabled={currentPage === pageNum - 1 || currentPage === pageNum - 2}
                    />
                  </div>
                </div>
              </td>
            )}
          </tr>
        </tfoot>
      )}
    </table >
  );
};

export default CustomTable;
