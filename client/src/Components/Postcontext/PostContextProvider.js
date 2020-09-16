import React, { createContext, useReducer } from 'react';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../../actions/types';
import axios from 'axios';

export const PostContext = createContext({});

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== payload;
        }),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.postId) {
            return { ...post, likes: payload.likes };
          }
          return post;
        }),
        // map through the posts, for each post check to see if it matches the payload and then manipulate that posts likes
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    default:
      return state;
  }
};

const PostContextProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/post');
      dispatch({
        type: GET_POSTS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, err: err.response.status },
      });
    }
  };

  const value = {
    getPosts,
    state,
    dispatch,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
