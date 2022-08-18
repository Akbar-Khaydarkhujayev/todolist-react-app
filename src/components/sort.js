import React from "react";

const Sort = (props) => {
  return (
    <ul className="list-group list-group-horizontal sort">
      <li className="list-group-item active" onClick={props.onSort}>
        All tasks
      </li>
      <li className="list-group-item" onClick={props.onSort}>
        To Do
      </li>
      <li className="list-group-item" onClick={props.onSort}>
        Completed
      </li>
    </ul>
  );
};

export default Sort;
