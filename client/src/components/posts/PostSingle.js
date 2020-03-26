import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getPost } from '../../actions/post';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import Spinner from '../layout/Spinner';

const PostSingle = ({ getPost, post: { post, loading }, match }) => {
  const { t } = useTranslation();
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        {t('BackPosts')}
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={match.params.id} />
      <CommentsList post={post} />
    </>
  );
};

PostSingle.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(PostSingle);
