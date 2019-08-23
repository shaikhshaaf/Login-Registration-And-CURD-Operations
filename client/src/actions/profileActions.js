import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfileById = profile_id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/profile/${profile_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/addStudent", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  console.log("profiledata", profileData);
};

export const createProfiles = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/aa", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  console.log("profiledata", profileData);
};

export const updateProfile = (profileUpdateData, history) => dispatch => {
  axios
    .put(`/api/profile/update/${profileUpdateData._id}`, profileUpdateData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  console.log("action completes");
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const deleteProfile = id => dispatch => {
  axios
    .delete(`/api/profile/profile/${id}`)
    .then(
      res => alert("Detail deleted successfully!"),
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    );
};
