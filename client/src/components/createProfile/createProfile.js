import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfiles } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      studentName: "",
      email: "",
      class: "",
      enrollementYear: "",
      city: "",
      country: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      studentId: this.state.studentId,
      studentName: this.state.studentName,
      email: this.state.email,
      class: this.state.class,
      enrollementYear: this.state.enrollementYear,
      city: this.state.city,
      country: this.state.country
    };

    this.props.createProfiles(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Your Details</h1>
              <p className="lead text-center">
                Add some informations 
              </p>
              <small className="d-block pb-3"></small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* StudentId"
                  name="studentId"
                  type="text"
                  value={this.state.studentId}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="StudentName"
                  name="studentName"
                  type="text"
                  value={this.state.studentName}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Class"
                  name="class"
                  type="text"
                  value={this.state.class}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="EnrollementYear"
                  name="enrollementYear"
                  type="text"
                  value={this.state.enrollementYear}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* City"
                  name="city"
                  type="text"
                  value={this.state.city}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Country"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfiles }
)(withRouter(CreateProfile));
