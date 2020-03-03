import React from "react";
const BookList = props => {
  return props.Acadevalues.map((val, idx) => {
    let degreeTitle = `degreeTitle-${idx}`,
      degreeUni = `degreeUni-${idx}`,
      yearAwarded = `yearAwarded-${idx}`,
      dcountry = `dcountry-${idx}`;
    return (
      <div className="form-row" key={val.index}>
        <div className="col">
          <label>Degree Title</label>
          <input type="text" className="form-control required" value={val.degreeTitle} placeholder="Degree Title" name="degreeTitle" data-id={idx} id={degreeTitle} />
        </div>
        <div className="col">
          <label>Degree Uni</label>
          <input type="text" className="form-control required" value={val.degreeUni} placeholder="Degree Uni" name="degreeUni" id={degreeUni} data-id={idx} />
        </div>
        <div className="col">
          <label>Year Awarded</label>
          <input type="text" className="form-control" value={val.yearAwarded} placeholder="Year Awarded" name="yearAwarded" id={yearAwarded} data-id={idx} />
        </div>
        <div className="col">
          <label>Country</label>
          <input type="text" className="form-control" value={val.dcountry} placeholder="Country" name="dcountry" id={dcountry} data-id={idx} />
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
