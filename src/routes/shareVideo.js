const axios = require('axios')

// Models
const VideoModel = require('../model/video')

// Constants
const VIDEOS_URL = '/videos'
const PART = 'snippet,contentDetails,statistics'

const shareVideo = async (req, res) => {
  const { APP_API_URL, APP_API_KEY } = process.env
  const { videoUrl, email } = req.body || ''
  let videoId = videoUrl.split('v=')[1]
  const ampersandPosition = (videoId || '').indexOf('&')

  if (ampersandPosition != -1) {
    videoId = videoId.substring(0, ampersandPosition)
  }

  if (!videoId) {
    res.send({
      message: 'URL invalid',
      status: 500
    })
  }

  try {
    const url = `${APP_API_URL}${VIDEOS_URL}?part=${PART}&id=${videoId}&key=${APP_API_KEY}`
    const response = await axios.get(url)
    const { snippet, statistics } = response.data.items[0] || {}

    const newData = {
      id: videoId,
      title: snippet.title || '',
      sharedBy: email,
      likeCount: statistics.likeCount || 0,
      dislikeCount: statistics.dislikeCount || 0,
      description: snippet.description || ''
    }

    const data = new VideoModel(newData)
    data.save()

    res.send({
      value: data,
      status: 200
    })
  } catch (error) {
    const errorMsg = 'Unexpected error while share a video'
    console.log('error: ', error)

    res.send({
      message: errorMsg,
      status: 500
    })
  }
}

module.exports = shareVideo
