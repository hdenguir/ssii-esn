import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      <div className="posts">
        {posts.length &&
          posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
