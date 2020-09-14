import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, unLike, deletePost } from '../../actions/post';
import Moment from 'react-moment';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  unLike,
  addLike,
  deletePost,
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {showActions && (
          <>
            <button
              type='button'
              onClick={() => addLike(_id)}
              className='btn btn-light'>
              <i className='fas fa-thumbs-up'></i>
              {likes.length > 0 && (
                <span className='comment-count'>{likes.length}</span>
              )}
            </button>
            <button
              type='button'
              onClick={() => unLike(_id)}
              className='btn btn-light'>
              <i className='fas fa-thumbs-down'></i>{' '}
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => deletePost(_id)}>
                <i className='fas fa-times'></i> Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mappedStateToProps = (state) => ({
  auth: state.auth,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
});

export default connect(mappedStateToProps, { addLike, unLike, deletePost })(
  PostItem
);
