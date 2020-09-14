import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { createProfile, getCurrentProfile } from '../../actions/profile';
const EditProfile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  history,
}) => {
  const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  };
  const [formState, setFormState] = useState(initialState);
  const [displaySocialForm, toggleSocialForm] = useState(false);
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormState(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  // if loading and no profile company set it to a blank field, if not loading and there is profile set it to the profilefield
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formState;

  const handleInputs = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formState, history, true);
  };
  return (
    <>
      {loading || !profile ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Edit Your Profile</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Let's get some information to make
            your profile stand out
          </p>
          <small>* = required field</small>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-group'>
              <select name='status' onChange={handleInputs} value={status}>
                <option value='0'>* Select Professional Status</option>
                <option value='Developer'>Developer</option>
                <option value='Junior Developer'>Junior Developer</option>
                <option value='Senior Developer'>Senior Developer</option>
                <option value='Manager'>Manager</option>
                <option value='Student or Learning'>Student or Learning</option>
                <option value='Instructor'>Instructor or Teacher</option>
                <option value='Intern'>Intern</option>
                <option value='Other'>Other</option>
              </select>
              <small className='form-text'>
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Company'
                name='company'
                value={company}
                onChange={handleInputs}
              />
              <small className='form-text'>
                Could be your own company or one you work for
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Website'
                name='website'
                value={website}
                onChange={handleInputs}
              />
              <small className='form-text'>
                Could be your own or a company website
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={handleInputs}
              />
              <small className='form-text'>
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Skills'
                name='skills'
                value={skills}
                onChange={handleInputs}
              />
              <small className='form-text'>
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Github Username'
                name='githubusername'
                value={githubusername}
                onChange={handleInputs}
              />
              <small className='form-text'>
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className='form-group'>
              <textarea
                placeholder='A short bio of yourself'
                name='bio'
                onChange={handleInputs}
                value={bio}></textarea>
              <small className='form-text'>
                Tell us a little about yourself
              </small>
            </div>

            <div className='my-2'>
              <button
                type='button'
                className='btn btn-light'
                onClick={() => toggleSocialForm(!displaySocialForm)}>
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>
            {displaySocialForm && (
              <>
                <div className='form-group social-input'>
                  <i className='fab fa-twitter fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Twitter URL'
                    name='twitter'
                    value={twitter}
                    onChange={handleInputs}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-facebook fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Facebook URL'
                    name='facebook'
                    value={facebook}
                    onChange={handleInputs}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-youtube fa-2x'></i>
                  <input
                    type='text'
                    placeholder='YouTube URL'
                    name='youtube'
                    value={youtube}
                    onChange={handleInputs}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-linkedin fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Linkedin URL'
                    name='linkedin'
                    value={linkedin}
                    onChange={handleInputs}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-instagram fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Instagram URL'
                    name='instagram'
                    value={instagram}
                    onChange={handleInputs}
                  />
                </div>
              </>
            )}

            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </>
      )}
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mappedStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mappedStateToProps, {
  createProfile,
  getCurrentProfile,
})(withRouter(EditProfile));
