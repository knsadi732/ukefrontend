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
          style={{ minHeight: "5vh", maxHeight: "40vh" }}
        >
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr
                className="text-center"
                style={{
                  fontSize: "small",
                  position: "sticky",
                  top: 0,
                }}
              >
                {headers?.map((columnName, index) => (
                  <th className="col">{columnName?.header}</th>
                ))}
                {flag !== "" && <th className="col-2">View Details</th>}
                <th className="col-2">Action</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CustomTable;
