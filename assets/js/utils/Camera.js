class Camera {
  constructor(videoNode) {
    this.videoNode = videoNode;
  }

  // power on the camera
  start() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal:300 },
          height: { ideal:300 },
          facingMode: 'environment' 
        },
        audio: false,
      })
      .then((stream) => {
        this.videoNode.srcObject = stream;
        this.stream = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // power off the camera
  stop() {
    this.videoNode.pause();
    this.videoNode.srcObject.getTracks()[0].stop();
  }

  // take a photo
  takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = this.videoNode.videoWidth;
    canvas.height = this.videoNode.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
    let photo = canvas.toDataURL();
    // reset the camera
    return photo;
  }
}
