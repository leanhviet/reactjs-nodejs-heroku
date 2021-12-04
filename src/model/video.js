const mongoose = require('mongoose');

const video = new mongoose.Schema({
  id: 'string',
  title: 'string',
  sharedBy: 'string',
  likeCount: 'number',
  dislikeCount: 'number',
  description: 'string'
}, {
  collection: 'video'
});

module.exports = mongoose.model('video', video);
