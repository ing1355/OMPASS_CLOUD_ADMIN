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
import searchIcon from "../assets/searchIcon.png";
import { connect } from "react-redux";

const sortFunctionByKey = (_array, key, sortType) => {
  const valueType = typeof (_array[0] && _array[0][key]);
  const array = [..._array]
  switch (valueType) {
    case "number":
      if (sortType === "ascend") return array.sort((a, b) => a[key] - b[key]);
      else if (sortType === "descend")
        return array.sort((a, b) => b[key] - a[key]);
      else return array;
    case "string":
      if (sortType === "ascend")
        return array.sort((a, b) =>
          a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
        );
      else if (sortType === "descend")
        return array.sort((a, b) =>
          a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
        );
      else return array;
    default:
      return array;
  }
};

const CustomTable = ({
  columns,
  datas,
  rowClick,
  pagination,
  numPerPage=20,
  currentPage,
  setCurrentPage,
  loading,
  multipleSelectable,
  selectedId,
  onChangeSelectedRows,
  rowSelectable,
  className,
  columnsHide,
  searched,
  selectedRows,
  locale,
  searchFunction,
  sorted,
  setSorted
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
  const searchInputRef = useRef(null);
  const _numPerPage = useMemo(
    () => (numPerPage ? numPerPage : 10),
    [numPerPage]
  );
  const pageNum = tableData
    ? parseInt(tableData.length / _numPerPage) +
      (tableData.length % _numPerPage === 0 ? 0 : 1)
    : 0;
  const [searchColumn, setSearchColumn] = useState(null);
  const [searchTarget, setSearchTarget] = useState({});

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
    if (datas) {
      setTableData(getAllTableData());
    }
  }, [datas, getAllTableData]);

  useLayoutEffect(() => {
    if (searched) {
      const initialColumn = columns.find((c) => c.searched);
      if (initialColumn) setSearchColumn(initialColumn.key);
    }
  }, [searched, columns]);

  useLayoutEffect(() => {
    if (searchColumn) {
      if (searchInputRef.current) searchInputRef.current.value = "";
      setSearchTarget(columns.find((c) => c.key === searchColumn));
    }
  }, [searchColumn, columns]);

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
  }, [onChangeSelectedRows]);

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

  const goToLastPage = useCallback(() => {
    setCurrentPage(pageNum - 1);
  },[pageNum]);

  const goToBeforePage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const dataList = useMemo(() => {
    try {
      if (Array.isArray(tableData)) {
        const sortedKey = sorted ? Object.keys(sorted) : []
        const sortedItems = (sortedKey.length > 0 ? sortFunctionByKey(tableData, sortedKey[0], sorted[sortedKey[0]]) : tableData)
        const temp = pagination ? sortedItems.slice( currentPage * _numPerPage, currentPage * _numPerPage + _numPerPage) : sortedItems
        return temp.map((d, ind) => (
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
        ));
      } else {
        throw "Table datas is wrong.";
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [
    tableColumns,
    pagination,
    tableData,
    currentPage,
    _numPerPage,
    rowSelectable,
    rowClick,
    selectedRows,
    sorted
  ]);
  
  return (
    <div>
      {searched && (
        <form
          className="table-search-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(0);
            const { column, content } = e.target.elements;
            const _data = getAllTableData();
            if (content.value === "true" || content.value === "false") {
              if (content.value === "true")
                setTableData(_data.filter((tD) => tD[column.value]));
              else setTableData(_data.filter((tD) => !tD[column.value]));
            } else {
              if (!content.value) setTableData(_data);
              else {
                const target = columns.find((c) => c.key === column.value);
                if (target.searchFunction) {
                  setTableData(
                    _data.filter((tD) => searchFunction(tD, content.value))
                  );
                } else {
                  if (target.searchedOptions) {
                    setTableData(
                      _data.filter((tD) => tD[column.value] === content.value)
                    );
                  } else {
                    setTableData(
                      _data.filter((tD) =>
                        tD[column.value].includes(content.value)
                      )
                    );
                  }
                }
              }
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
                    ? searchTarget.getSearchedLabel(opt, locale)
                    : opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="table-search-column-input"
              name="content"
              ref={searchInputRef}
              maxLength={
                searchColumn
                  ? columns.find((c) => c.key === searchColumn).maxLength || 16
                  : 0
              }
            />
          )}
          <button type="submit" className="button searchButton">
            <img src={searchIcon} width="60%" height="50%" alt="" />
          </button>
        </form>
      )}
      <table
        className={
          className ? "custom-table-box " + className : "custom-table-box"
        }
      >
        {tableColumns && !loading && (
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
        )}
        <thead style={{ display: columnsHide ? "none" : "" }}>
          {tableColumns && (
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
                  <th
                    key={ind}
                    className={
                      "custom-table-th" + (c.sorted ? " has-sort" : "")
                    }
                    onClick={() => {
                      let temp = {};
                      if (c.sorted) {
                        if (c.sortFunction) {
                        } else {
                          if (!sorted[c.key]) {
                            temp[c.key] = "ascend";
                          } else if (sorted[c.key] === "ascend") {
                            temp[c.key] = "descend";
                          }
                          setSorted(temp);
                          // setTableData
                        }
                      }
                    }}
                  >
                    {c.name && (
                      <div className="custom-table-th-title">
                        <FormattedMessage id={c.name} />
                      </div>
                    )}
                    {c.sorted && (
                      <div className="custom-table-sort">
                          <div className={"triangular-up" + (sorted[c.key] === 'ascend' ? ' active' : '')}></div>
                          <div className={"triangular-down" + (sorted[c.key] === 'descend' ? ' active' : '')}></div>
                      </div>
                    )}
                  </th>
                )
              )}
            </tr>
          )}
        </thead>
        <tbody className={loading ? "no-data-container" : ""}>
          {!loading && tableData && tableData.length > 0 ? (
              dataList
          ) : (
            <tr className="no-data">
              {loading ? (
                <td
                  className="loading-td"
                  colSpan={tableColumns ? tableColumns.length : 1}
                >
                  <div className="box">
                    <div className="loader6"></div>
                    <p>data loading</p>
                  </div>
                </td>
              ) : (
                <td
                  className="no-data"
                  colSpan={tableColumns ? tableColumns.length : 1}
                >
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
                <td colSpan={columns.length}>
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
                          return null;
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

function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
