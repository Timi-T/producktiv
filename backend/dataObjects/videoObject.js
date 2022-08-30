// Create a video object


class Video {
  constructor(videoName, userId, uploadDate, description, category, videoLink) {
    this.videoName = videoName;
    this.category = category;
    this.userId = userId;
    this.uploadDate = uploadDate;
    this.description = description;
    this.videoLink = videoLink;
    this.comments = [];
    this.ratings = [];
    this.avgRating = 0;
  }

}

module.exports = Video;
