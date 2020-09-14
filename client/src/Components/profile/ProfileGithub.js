import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGitHubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import GithubItem from './GithubItem';

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(username);
  }, [getGitHubRepos, username]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>REPOS</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => <GithubItem key={repo.id} repo={repo} />)
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};
const mappedToStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mappedToStateToProps, { getGitHubRepos })(ProfileGithub);
