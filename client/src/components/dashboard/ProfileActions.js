import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/create-profile" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add New Details
      </Link>
    </div>
  );
};

export default ProfileActions;
