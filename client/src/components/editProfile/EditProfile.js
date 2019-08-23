import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import { createProfiles, getProfileById } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      studentName: "",
      email: "",
      enrollementYear: "",
      class: "",
      city: "",
      country: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      console.log("dataid", this.props);
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      console.log("nextProps", nextProps);
      const profile = nextProps.profile.profile;

      profile.studentId = !isEmpty(profile.studentId) ? profile.studentId : "";
      profile.studentName = !isEmpty(profile.studentName)
        ? profile.studentName
        : "";
      profile.email = !isEmpty(profile.email) ? profile.email : "";
      profile.enrollementYear = !isEmpty(profile.enrollementYear)
        ? profile.enrollementYear
        : "";
      profile.class = !isEmpty(profile.class) ? profile.class : "";
      profile.city = !isEmpty(profile.city) ? profile.city : "";
      profile.country = !isEmpty(profile.country) ? profile.country : "";

      this.setState({
        studentId: profile.studentId,
        studentName: profile.studentName,
        email: profile.email,
        enrollementYear: profile.enrollementYear,
        class: profile.class,
        city: profile.city,
        country: profile.country
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileUpdateData = {
      studentId: this.state.studentId,
      studentName: this.state.studentName,
      email: this.state.email,
      enrollementYear: this.state.enrollementYear,
      class: this.state.class,
      city: this.state.city,
      country: this.state.country
    };

    this.props.createProfiles(profileUpdateData, this.props.history);
    console.log("profiledsdsd", profileUpdateData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // const profile = this.props.profile;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
               
               
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3"></small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="studentId"
                  name="studentId"
                  type="text"
                  value={this.state.studentId}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="studentName"
                  name="studentName"
                  type="text"
                  value={this.state.studentName}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="class"
                  name="class"
                  type="text"
                  value={this.state.class}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="enrollementYear"
                  name="enrollementYear"
                  type="text"
                  value={this.state.enrollementYear}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="city"
                  name="city"
                  type="text"
                  value={this.state.city}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="country"
                  name="country"
                  type="text"
                  value={this.state.country}
                  onChange={this.onChange}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfiles: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfiles, getProfileById }
)(withRouter(EditProfile));
