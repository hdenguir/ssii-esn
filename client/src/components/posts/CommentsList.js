import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentsList = ({ post: { comments, _id } }) => (
  <div className="comments">
    {comments
        && comments.map(comment => (
          <CommentItem key={comment._id} postId={_id} comment={comment} />
        ))}
  </div>
);

CommentsList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentsList;
