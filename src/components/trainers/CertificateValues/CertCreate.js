import React from "react";

const BookList = props => {
  return props.Certvalues.map((val, idx) => {
    let certificateName = `certificateName-${idx}`,
    certIssuedBy = `certIssuedBy-${idx}`,
    certDateIssue = `certDateIssue-${idx}`,
    certExpiry = `certExpiry-${idx}`,
    certID = `certID-${idx}`;
    return (
      <div className="form-row" key={val.index}>
        <div className="col">
          <label>Certificate Name</label>
          <input type="text" className="form-control required" placeholder="Certificate Name" name="certificateName" data-id={idx} id={certificateName} />
        </div>
        <div className="col">
          <label>Certificate Issued By</label>
          <input type="text" className="form-control required" placeholder="Certificate Issued By" name="certIssuedBy" id={certIssuedBy} data-id={idx} />
        </div>
        <div className="col">
          <label>Certificate Date Issue</label>
          <input type="text" className="form-control" placeholder="Certificate Date Issue" name="certDateIssue" id={certDateIssue} data-id={idx} />
        </div>
        <div className="col">
          <label>Certificate Expiry</label>
          <input type="text" className="form-control" placeholder="Certificate Expiry" name="certExpiry" id={certExpiry} data-id={idx} />
        </div>
        <div className="col">
          <label>Certificate ID</label>
          <input type="text" className="form-control" placeholder="Certificate ID" name="certID" id={certID} data-id={idx} />
        </div>
        <div className="col p-4">
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type="button"
              className="btn btn-primary text-center"
            >
              <i className="fa fa-plus-circle" aria-hidden="true" />
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => props.delete(val)}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default BookList;
