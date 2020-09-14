import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_GITHUBREPO,
} from './types';
// get profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const { data } = await axios.get(`http://localhost:3001/api/profile`);
    dispatch({
      type: GET_PROFILES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, err: err.response.status },
    });
  }
};
// get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/profile/user/${userId}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, err: err.response.status },
    });
  }
};
// get github repos
export const getGitHubRepos = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/profile/github/${username}`
    );
    dispatch({ type: GET_GITHUBREPO, payload: data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, err: err.response.status },
    });
  }
};
// get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/profile/me`);

    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const createProfile = (formState, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    const { data } = await axios.post(
      `http://localhost:3001/api/profile/`,
      formState,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
    // alerts the user that profile is created and redirects them to dashboard
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addExperience = (formState, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    const { data } = await axios.put(
      `http://localhost:3001/api/profile/experience`,
      formState,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert('Experience updated', 'success'));
    history.push('/dashboard');

    // alerts the user that profile is created and redirects them to dashboard
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addEducation = (formState, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };
    const { data } = await axios.put(
      `http://localhost:3001/api/profile/education`,
      formState,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert('Education updated', 'success'));
    history.push('/dashboard');

    // alerts the user that profile is created and redirects them to dashboard
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// delete profilee experience
export const deleteExperience = (experienceId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/api/profile/experience/${experienceId}`
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert('Experience deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteEducation = (educationId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/api/profile/education/${educationId}`
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert('Education deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete account.This can not be undone.'
    )
  ) {
    try {
      await axios.delete(`http://localhost:3001/api/profile`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permenatly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
