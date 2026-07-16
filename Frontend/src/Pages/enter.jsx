import React from "react";
import {Link} from 'react-router-dom'

const enter = () => {
  return (
    <div className="enterpage">
      <div className="enterbox">
        <Link to="/login">
          <button>
            <span>LOGIN</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default enter;
