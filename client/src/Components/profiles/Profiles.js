import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  const renderProfiles = () => {
    if (profiles.length > 0) {
      return profiles.map((profile) => {
        return <ProfileItem key={profile._id} profile={profile} />;
      });
    } else {
      return <h4>No profiles found</h4>;
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Devs</h1>
          <p className='lead'>
            <i className='fab fa-connectdeveloper'></i> See whos lurking and say
            hello
          </p>
          <div className='profiles'>{renderProfiles()}</div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};
const mappedStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mappedStateToProps, { getProfiles })(Profiles);
