const express = require('express');
const router = express.Router();
const Posts = require('./data/db.js');

// POST - ready to test
// /api/posts
// Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      success: false,
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.insert({ title: title, contents: contents })
      .then(post => {
        res.status(201).json({ success: true, post });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

// POST - ready to test
// /api/posts/:id/comments
// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const text = req.body;

  if (!text) {
    res.status(400).json({
      success: false,
      errorMessage: 'Please provide text for the comment'
    });
  } else {
    Posts.findById(id)
      .then(post => {
        if (post) {
          res.status(201).json({ success: true, comment });
        } else {
          res.status(404).json({
            success: false,
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: 'There was an error while saving the comment to the database.'
        });
      });
  }
});

// GET - ready to test
// /api/posts
// Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json({ success: true, posts });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: 'The posts information could not be retrieved.'
      });
    });
});

// GET - ready to test
// /api/posts/:id
// Returns the post object with the specified id.
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json({ success: true, post });
      } else {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: 'The post information could not be retrieved.'
      });
    });
});

// GET - ready to test
// /api/posts/:id/comments
// Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(comments => {
      if (id) {
        res.status(200).json({ success: true, comments });
      } else {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: 'The comments information could not be retrieved.'
      });
    });
});

// DELETE - ready to test
// /api/posts/:id
// Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Posts.remove(id)
    .then(deletedPost => {
      if (deletedPost) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, error: 'The post could not be removed' });
    });
});

// PUT - ready to test
// /api/posts/:id
// Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;
  const post = req.body;

  if (!title || !body) {
    res.status(400).json({
      success: false,
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  if (!id) {
    res.status(404).json({
      success: false,
      message: 'The post with the specified ID does not exist.'
    });
  } else {
    Posts.update(id, post)
      .then(post => {
        res.status(200).json({ success: true, post });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: 'The post information could not be modified.'
        });
      });
  }
});

module.exports = router;
