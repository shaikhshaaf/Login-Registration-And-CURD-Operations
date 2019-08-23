import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteProfile } from "../../actions/profileActions";

class Profile extends Component {
  onDeleteClick(id) {
    this.props.deleteProfile(id);
  }

  render() {
    const profile = this.props.profile.profile.map(pro => (
      <tr key={pro._id}>
        <td>{pro.studentId}</td>
        <td>{pro.studentName}</td>
        <td>{pro.email}</td>
        <td>{pro.enrollementYear}</td>
        <td>{pro.class}</td>
        <td>{pro.city}</td>
        <td>{pro.country}</td>

        <td>
          {" "}
          <Link to={`/edit-profile/${pro._id}`} className="btn btn-success">
            <i className="fas fa-user-circle text-info mr-1" /> Edit
          </Link>
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, pro._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <h4 className="mb-4">Your Detail</h4>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>studentId</th>
              <th>stdentName</th>
              <th>email</th>
              <th>enrollementYear</th>
              <th>class</th>
              <th>city</th>
              <th>country</th>
              <th>edit</th>
              <th>delete</th>

              <th />
            </tr>
            {profile}
          </thead>
        </table>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteProfile }
)(Profile);
