const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

/* 
/ @route POST api/posts
/ @desc : Create a Post
/ @access Private
*/
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id
      };

      const post = await new Post(newPost).save();

      res.json(post);
    } catch (err) {
      return res.status(400).json({
        errors: [{ msg: err.message }]
      });
    }
  }
);

/* 
/ @route GET api/posts
/ @desc : Get All Posts
/ @access Private
*/
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      errors: [{ msg: err.message }]
    });
  }
});

/* 
/ @route GET api/posts
/ @desc : Get Single Post
/ @access Private
*/
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).json({
        errors: [{ msg: "There is no post for this ID" }]
      });

    res.json(post);
  } catch (err) {
    if (err.kind == "ObjectId")
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });
    return res.status(400).json({
      errors: [{ msg: err.message }]
    });
  }
});

/* 
/ @route DELETE api/posts/:id
/ @desc : Delete Post by id
/ @access Private
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });

    // Check User if authorized
    if (post.user.toString() !== req.user.id)
      return res.status(400).json({
        errors: [{ msg: "User not authorized" }]
      });

    await post.remove();

    res.json({ msg: "Post removed successfully" });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });
    return res.status(400).json({
      errors: [{ msg: err.message }]
    });
  }
});

/* 
/ @route PUT api/posts/like/:id
/ @desc : Add Like
/ @access Private
*/
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });

    // Check if the post has already liked by user
    const countLike = post.likes.filter(
      like => like.user.toString() === req.user.id
    ).length;

    if (countLike > 0)
      return res.status(400).json({
        errors: [{ msg: "Post already liked" }]
      });

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });

    return res.status(400).json({
      errors: [{ msg: err.message }]
    });
  }
});

/* 
/ @route PUT api/posts/unlike/:id
/ @desc : Remove Like
/ @access Private
*/
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });

    // Check if the post has already liked by user
    const countLike = post.likes.filter(
      like => like.user.toString() === req.user.id
    ).length;

    if (countLike == 0)
      return res.status(400).json({
        errors: [{ msg: "Post has not yet been liked" }]
      });

    // Get Removed Index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });

    return res.status(400).json({
      errors: [{ msg: err.message }]
    });
  }
});

/* 
/ @route POST api/posts/comments/:id
/ @desc : Comment on a post
/ @access Private
*/
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({
        errors: [{ msg: err.message }]
      });
    }
  }
);

/* 
/ @route DELETE api/posts/comment/:id/:comment_id
/ @desc : Delete Comment By Id
/ @access Private
*/
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ msg: "Post not found" });

    // 1. Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // 2. Check if comment exists
    if (!comment) {
      return res.status(400).json({
        errors: [{ msg: "Comment does not exists" }]
      });
    }

    // 3. Check User if authorized
    if (comment.user.toString() !== req.user.id)
      return res.status(400).json({
        errors: [{ msg: "User not authorized" }]
      });

    // 4. Get Removed Index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    if (removeIndex == -1)
      return res.status(400).json({
        errors: [{ msg: "There is no comment for this ID" }]
      });

    post.comments.splice(removeIndex, 1);

    // 5. Save
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({
        errors: [{ msg: "Post not found" }]
      });
    return res.status(400).json({
      errors: [{ msg: err.message }]
    });
  }
});

module.exports = router;
