import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardBlock from "../common/CardBlock";


const UploadWODocumentHome = () => {
const location = useLocation()
console.log(location?.pathname)
  const queryParams = new URLSearchParams(location.search);
  const wo_no = queryParams.get("work_order_no");
console.log({wo_no})

  useEffect(() => {
    document.title = "Modify Auction";
  }, []);



  return (
    <>
      <div className="container responsive mt-2 ">
        <div className="row mt-3 mb-2">
          <div className="d-flex justify-content-between col-1">
            {/* <i
              className="bi bi-arrow-left-circle"
              style={{
                fontSize: "xx-large",
                color: "black",
                backgroundColor: "white",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></i> */}
          </div>
          <div className="col-10 mt-2 float-start ms-2">
            <h5 className="">Work Order No : {wo_no}</h5>
          </div>
        </div>
      </div>

      <div className="container container-body">
        <CardBlock
          name="Upload DPR Excel"
          //   logo={AddAuction}
          to={`/work_order/upload_dpr_excel?work_order_no=${wo_no}`}
        />
        <CardBlock
          name="Upload Checklist Excel"
          //   logo={EditAuctionDetails}
          to={`/work_order/upload_checklist_excel?uid=${wo_no}`}
        />
      </div>
    </>
  );
};

export default UploadWODocumentHome;

