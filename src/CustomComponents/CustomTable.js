import React, { useState } from "react";
import DoubleLeftArrow from "../customAssets/DoubleLeftArrow";
import DoubleRightArrow from "../customAssets/DoubleRightArrow";
import LeftArrow from "../customAssets/LeftArrow";
import RightArrow from "../customAssets/RightArrow";
import "./CustomTable.css";

const CustomTable = ({ columns, datas, rowClick, pagination, numPerPage }) => {
  const test = new Array(60)
    .fill(1)
    .map((t, ind) => ({
      userId: "test" + ind,
      appName: "test" + ind,
      type: "test" + ind,
      updateDate: "test",
      byPass: "test",
    }));
  const _numPerPage = numPerPage ? numPerPage : 10
  const pageNum = parseInt(datas.length / _numPerPage) + (datas.length % _numPerPage === 0 ? 0 : 1);
  const [currentPage, setCurrentPage] = useState(0);

  const goToFirstPage = () => {
    setCurrentPage(0);
  };

  const goToLastPage = () => {
    setCurrentPage(pageNum - 1);
  };

  const goToBeforePage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((c, ind) => (
            <th key={ind}>{c.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.slice(currentPage * _numPerPage, currentPage * _numPerPage + _numPerPage).map((d, ind) => (
          <tr
            key={ind}
            onClick={(e) => {
              //  && e.target.tagName === "TD"
              if (rowClick) rowClick(d);
            }}
          >
            {columns.map((c, _ind) => (
              <td key={_ind}>{c.render ? c.render(d) : d[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="custom-table-footer">
          {pagination && pageNum > 0 && (
            <td
              className="custom-pagination-container"
              style={{
                width: pageNum > 5 ? 300 : 100 + pageNum * 40,
              }}
            >
              <DoubleLeftArrow
                onClick={goToFirstPage}
                disabled={currentPage === 0}
              />
              <LeftArrow
                onClick={goToBeforePage}
                disabled={currentPage === 0}
              />
              <div
                className="custom-pagination-pages-container"
                style={{ width: pageNum > 5 ? 200 : pageNum * 40 }}
              >
                {new Array(pageNum).fill(1).map((p, ind) => {
                  const temp = (
                    <span
                      className={
                        "custom-pagination-page-item " +
                        (currentPage === ind ? "selected" : null)
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
                disabled={currentPage === pageNum - 1}
              />
            </td>
          )}
        </tr>
      </tfoot>
    </table>
  );
};

export default CustomTable;
