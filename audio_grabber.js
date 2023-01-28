class AudioRecorder{

    /**
     * Initializes a Graph Renderer object
     * @param    {document}  document       HTML document on which to render the graph
     * @param    {string}    canvasID       HTML canvas on which to render the graph
    */
    constructor(){
        self.chunks = []
    }


    startRecording(){
        if (!navigator.mediaDevices.getUserMedia){
            throw new Error("Media not supported or allowed")
        }
        else{//from https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Get_microphone_permission
            navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
                window.localStream = stream; 
                self.currentStream = stream;
                self.currentRecorder = new MediaRecorder(stream);
                self.currentRecorder.start();
                self.currentRecorder.addEventListener("dataavailable", (e) => {self.chunks.push(e.data)});
            })
            .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
        }
    }

    /**
     * 
     */
    stopRecording(){
        let blobType = self.currentRecorder.mimeType;
        console.log("blobtype: ")
        console.log(blobType)
        self.currentRecorder.addEventListener("stop", (event) => {

            self.recordedBlob = new Blob(self.chunks, {type: blobType});
            self.audioURL = window.URL.createObjectURL(self.recordedBlob)
            console.log("blob URL:")
            console.log(self.audioURL)
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = self.audioURL;
            console.log(audio);
        });
        self.currentRecorder.stop();
        self.currentStream.getTracks()
        .forEach(track => {track.stop();});
    }

    /**
     * @return {PointDefinedWave} Representation of the audio we recorded
     */
    blobToPDW(){

    }

    /** 
     * from
     * https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Get_microphone_permission
     */ 
    getLocalStream() {
        navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
            window.localStream = stream; // A
        })
        .catch((err) => {
            console.error(`you got an error: ${err}`);
        });
    }
}
  