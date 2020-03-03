import React from "react";
const BookList = props => {
  return props.JobHistvalues.map((val, idx) => {
    let designation = `designation-${idx}`,
    employer = `employer-${idx}`,
    jfrom = `jfrom-${idx}`,
    jto = `jto-${idx}`,
    jcountry = `jcountry-${idx}`;
    return (
      <div className="form-row" key={val.index}>
        <div className="col">
          <label>Designation</label>
          <input type="text" className="form-control required" value={val.designation} placeholder="Designation" name="designation" data-id={idx} id={designation} />
        </div>
        <div className="col">
          <label>Employer</label>
          <input type="text" className="form-control required" value={val.employer} placeholder="Employer" name="employer" id={employer} data-id={idx} />
        </div>
        <div className="col">
          <label>Join From</label>
          <input type="text" className="form-control" value={val.jfrom} placeholder="Join From" name="jfrom" id={jfrom} data-id={idx} />
        </div>
        <div className="col">
          <label>Join To</label>
          <input type="text" className="form-control" value={val.jto} placeholder="Join To" name="jto" id={jto} data-id={idx} />
        </div>
        <div className="col">
          <label>Country</label>
          <input type="text" className="form-control" value={val.jto} placeholder="Country" name="jcountry" id={jcountry} data-id={idx} />
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
