import React from "react";
import "../css/App.css";

/* returns the error messgae when input validation fails*/
const InputError = () => {
  return(
      <div className="input-error">
          <span>Allowed characters:&nbsp;
          Alphabets [a-z][A-Z],&nbsp;
          Numbers [0-9],&nbsp;
          Space,&nbsp;
          Special characters - _ .</span>
          <div>With a max of 50 characters</div>
      </div>
  )
};

export default InputError;