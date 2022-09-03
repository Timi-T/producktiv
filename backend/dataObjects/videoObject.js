// Create a video object


class Video {
  constructor(videoName, userId, uploadDate, description, category, embedVideo, videoStats, userName) {
    this.videoName = videoName;
    this.category = category;
    this.userId = userId;
    this.uploadDate = uploadDate;
    this.description = description;
    this.embedVideo = embedVideo;
    this.userName = userName;
    this.stats = videoStats
    this.comments = [];
    this.ratings = [];
    this.avgRating = 0;
  }

}

module.exports = Video;
