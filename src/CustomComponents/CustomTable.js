import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
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
  columnsHide,
  searched,
  selectedRows,
}) => {
  const { formatMessage } = useIntl();
  const [tableData, setTableData] = useState([]);
  const tableColumns = multipleSelectable
    ? [
        {
          name: "",
          key: "check",
          render: (data, row) => (
            <div>
              <input
                className="table-row-select-checkbox"
                type="checkbox"
                checked={selectedRows.includes(row[selectedId])}
                onClick={() => {
                  rowSelect(row[selectedId]);
                }}
                onChange={() => {}}
              />
            </div>
          ),
        },
        ...columns,
      ]
    : columns;
  const firstRenderRef = useRef(false);

  const _numPerPage = numPerPage ? numPerPage : 10;
  const pageNum =
    parseInt(datas.length / _numPerPage) +
    (datas.length % _numPerPage === 0 ? 0 : 1);
  const [searchColumn, setSearchColumn] = useState(null);
  const [searchTarget, setSearchTarget] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllTableData = useCallback(
    () =>
      multipleSelectable
        ? datas.map((d) => ({
            check: "",
            ...d,
          }))
        : datas,
    [multipleSelectable, datas]
  );

  useLayoutEffect(() => {
    if (datas.length) {
      setTableData(getAllTableData());
    }
  }, [datas]);

  useLayoutEffect(() => {
    if (searched) {
      const initialColumn = columns.find((c) => c.searched);
      if (initialColumn) setSearchColumn(initialColumn.key);
    }
  }, [searched]);

  useLayoutEffect(() => {
    if (searchColumn) {
      setSearchTarget(columns.find((c) => c.key === searchColumn));
    }
  }, [searchColumn]);

  const rowSelect = useCallback(
    (id) => {
      if (selectedRows.includes(id)) {
        onChangeSelectedRows(selectedRows.filter((r) => r !== id));
      } else {
        onChangeSelectedRows([...selectedRows, id]);
      }
    },
    [selectedRows]
  );

  useLayoutEffect(() => {
    if (onChangeSelectedRows) onChangeSelectedRows([]);
  }, []);

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
  }, []);

  const goToLastPage = () => {
    setCurrentPage(pageNum - 1);
  };

  const goToBeforePage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const dataList = useMemo(
    () =>
      tableData
        .slice(
          currentPage * _numPerPage,
          currentPage * _numPerPage + _numPerPage
        )
        .map((d, ind) => (
          <tr
            key={ind}
            className={rowClick || onChangeSelectedRows ? "pointer" : ""}
            onClick={(e) => {
              //  && e.target.tagName === "TD"
              if (rowSelectable) rowSelect(d[selectedId]);
              if (rowClick) rowClick(d);
            }}
          >
            {tableColumns.map((c, _ind) => (
              <td
                key={_ind}
                style={
                  c.key === "check" ? { minWidth: "60px", width: "60px" } : null
                }
              >
                {c.render ? c.render(d[c.key], d, ind) : d[c.key]}
              </td>
            ))}
          </tr>
        )),
    [
      tableColumns,
      tableData,
      currentPage,
      numPerPage,
      rowSelectable,
      rowClick,
      selectedRows,
    ]
  );

  return (
    <div>
      {searched && (
        <form
          className="table-search-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            const { column, content } = e.target.elements;
            const _data = getAllTableData();
            if (content.value === "true" || content.value === "false") {
              if (content.value === "true")
                setTableData(_data.filter((tD) => tD[column.value]));
              else setTableData(_data.filter((tD) => !tD[column.value]));
            } else {
              if (!content.value) setTableData(_data);
              else
                setTableData(
                  _data.filter((tD) => tD[column.value].includes(content.value))
                );
            }
          }}
        >
          <select
            className="table-search-column-select"
            name="column"
            onChange={(e) => {
              setSearchColumn(e.target.value);
            }}
          >
            {columns
              .filter((c) => c.searched)
              .map((c) => (
                <option key={c.key} value={c.key}>
                  {formatMessage({ id: c.name })}
                </option>
              ))}
          </select>
          {searchColumn && searchTarget.searchedOptions ? (
            <select className="table-search-column-select" name="content">
              {searchTarget.searchedOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {searchTarget.getSearchedLabel
                    ? searchTarget.getSearchedLabel(opt)
                    : opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="table-search-column-input"
              name="content"
              maxLength={20}
            />
          )}
          <button type="submit" className="button">
            Search
          </button>
        </form>
      )}
      <table
        className={
          className ? "custom-table-box " + className : "custom-table-box"
        }
      >
        <colgroup>
          {tableColumns.map((c, ind) => (
            <col
              key={ind}
              style={
                c.key === "check"
                  ? { minWidth: "60px", width: "60px" }
                  : { minWidth: c.width, width: c.width }
              }
            />
          ))}
        </colgroup>
        <thead style={{ display: columnsHide ? "none" : "" }}>
          <tr>
            {tableColumns.map((c, ind) =>
              c.key === "check" ? (
                <th key={ind} style={{ minWidth: "60px", width: "60px" }}>
                  <input
                    className="table-all-row-select-checkbox"
                    checked={
                      tableData.length > 0 &&
                      selectedRows.length === tableData.length
                    }
                    type="checkbox"
                    onClick={() => {
                      if (selectedRows.length === tableData.length) {
                        onChangeSelectedRows([]);
                      } else {
                        onChangeSelectedRows(
                          tableData.map((d) => d[selectedId])
                        );
                      }
                    }}
                    onChange={() => {}}
                  />
                </th>
              ) : (
                <th key={ind}>
                  <FormattedMessage id={c.name} />
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
              {loading ? (
                <td className="loading-td" colSpan={tableColumns.length}>
                  <div className="box">
                    <div className="loader6"></div>
                    <p>data loading</p>
                  </div>
                </td>
              ) : (
                <td className="no-data" colSpan={tableColumns.length}>
                  No Data
                </td>
              )}
            </tr>
          )}
        </tbody>
        {tableData && tableData.length > numPerPage && (
          <tfoot>
            <tr className="custom-table-footer">
              {pagination && pageNum > 0 && (
                <td colSpan={5}>
                  <div className="custom-pagination-container">
                    <div
                      className="custom-pagination-items"
                      style={{ width: (pageNum > 5 ? 150 : pageNum * 30) + 92 }}
                    >
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
                                (currentPage === ind ? " selected" : "")
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
                        disabled={
                          currentPage === pageNum - 1 ||
                          currentPage === pageNum - 2
                        }
                      />
                    </div>
                  </div>
                </td>
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default CustomTable;
