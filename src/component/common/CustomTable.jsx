import React from "react";
import ReactLoading from "react-loading";

const CustomTable = (props) => {
  const {
    headers,
    body,
    loading,
    setViewDocModalData,
    setViewDocModal,
    handleEdit,
    flag,
    handleDelete,
    handleRedirectToDetails,
  } = props;

  console.log({ body }, body[0]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <ReactLoading type="bubbles" color="black" height={100} width={100} />
        </div>
      ) : (
        <div
          className="container table-responsive mt-2 text-center"
          style={{ minHeight: "10vh", maxHeight: "80vh" }}
        >
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr
                className="text-center"
                style={{
                  fontSize: "small",
                  position: "sticky",
                  top: 0,
                  zIndex: 1, // Set a higher z-index for the header
                }}
              >
                {headers?.map((columnName, index) => (
                  <th
                    key={`header-${index}`}
                    className="col"
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#f8f9fa", // Explicit background for sticky behavior
                      zIndex: 4,
                    }}
                  >
                    {columnName?.header}
                  </th>
                ))}
                {flag !== "" && (
                  <th
                    className="col-2"
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#f8f9fa",
                      zIndex: 5,
                    }}
                  >
                    View Details
                  </th>
                )}
                <th
                  className="col-2"
                  style={{
                    position: "sticky",
                    top: 0,
                    right:"-13px",
                    background: "#f8f9fa", // Explicit background for visibility
                    zIndex: 6, // Higher z-index than other header cells
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            {/* <tbody>
              {body && body?.length > 0 ? (
                body?.map((rowData, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="text-center">
                    {headers.map((columnName, colIndex) => (
                      <td
                        key={`row-${rowIndex}-col-${colIndex}`}
                        className="col"
                      >
                        {rowData[columnName?.dataKey]}
                      </td>
                    ))}
                    {flag !== "" && (
                      <td className="text-nowrap">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setViewDocModal(true);
                            setViewDocModalData(rowData);
                          }}
                          style={{ cursor: "pointer" }}
                          aria-label={`View details of row ${rowIndex}`}
                        >
                          <i className="bi bi-eye-fill text-white"></i> View
                        </button>
                      </td>
                    )}
                    <td>
                      <i
                        className="bi bi-pencil-square mx-3"
                        onClick={() => handleEdit(rowData.id)}
                        style={{
                          cursor: "pointer",
                        }}
                        aria-label={`Edit row ${rowIndex}`}
                        data-bs-toggle="tooltip"
                        title="Edit"
                      ></i>
                      <i
                        className="bi bi-trash mx-3"
                        onClick={() => handleDelete(rowData.id)}
                        style={{
                          cursor: "pointer",
                        }}
                        aria-label={`Edit row ${rowIndex}`}
                        data-bs-toggle="tooltip"
                        title="Edit"
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length + 2}
                    className="text-danger text-center"
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody> */}
            <tbody>
              {body && body.length > 0 ? (
                body.map((rowData, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="text-center">
                    {headers.map((column, colIndex) => (
                      <td
                        key={`row-${rowIndex}-col-${colIndex}`}
                        className="col"
                        style={{
                          cursor:
                            column.dataKey === "wo_no" ? "pointer" : "default",
                          color:
                            column.dataKey === "wo_no" ? "blue" : "inherit",
                          textDecoration:
                            column.dataKey === "wo_no" ? "underline" : "none",
                        }}
                        onClick={() => {
                          if (column.dataKey === "wo_no") {
                            // Redirect logic for Work Order No
                            handleRedirectToDetails(rowData[column.dataKey]);
                          }
                        }}
                      >
                        {rowData[column.dataKey]}
                      </td>
                    ))}
                    {flag !== "" && (
                      <td className="text-nowrap">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setViewDocModal(true);
                            setViewDocModalData(rowData);
                          }}
                          style={{ cursor: "pointer" }}
                          aria-label={`View details of row ${rowIndex}`}
                        >
                          <i className="bi bi-eye-fill text-white"></i> View
                        </button>
                      </td>
                    )}
                    <td
                      style={{
                        position: "sticky",
                        right: "-13px", // Stick to the far right
                        background: "#fff",
                        zIndex: 5, // Highest priority
                      }}
                    >
                      <i
                        className="bi bi-pencil-square mx-3"
                        onClick={() => handleEdit(rowData)}
                        style={{
                          cursor: "pointer",
                        }}
                        aria-label={`Edit row ${rowIndex}`}
                        data-bs-toggle="tooltip"
                        title="Edit"
                      ></i>
                      <i
                        className="bi bi-trash mx-3"
                        onClick={() => handleDelete(rowData.id)}
                        style={{
                          cursor: "pointer",
                        }}
                        aria-label={`Delete row ${rowIndex}`}
                        data-bs-toggle="tooltip"
                        title="Delete"
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length + 2}
                    className="text-danger text-center"
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CustomTable;
