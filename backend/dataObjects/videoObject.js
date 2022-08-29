// Create a video object


class Video {
  constructor(videoName, videoId, userId, uploadDate) {
    this.videoName =videoName;
    this.videoId = videoId;
    this.userId = userId;
    this.uploadDate = uploadDate;
    this.comments = [];
    this.ratings = [];
    this.avgRating = 0;
  }

}

module.exports = Video;
