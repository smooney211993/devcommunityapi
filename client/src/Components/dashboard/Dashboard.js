import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardLinks from './DashboardLinks';
import Experience from './Experience';
import Education from './Education';

export const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'></i>Hello {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardLinks />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </>
      ) : (
        <>
          <p>You have not set up a profile. Please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
      <div className='my-2'>
        <button className='btn btn-danger' onClick={() => deleteAccount()}>
          <i className='fas fa-user-minus'></i> Delete My Account
        </button>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mappedStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mappedStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
