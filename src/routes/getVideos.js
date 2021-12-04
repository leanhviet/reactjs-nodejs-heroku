// Models
const VideoModel = require('../model/video')

const getVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find()

    res.send({
      value: videos,
      status: 200
    })
  } catch (error) {
    const errorMsg = 'Unexpected error while getting videos'

    console.log('Error: ', error)
    res.send({
      message: errorMsg,
      status: 500
    })
  }
}

module.exports = getVideos
