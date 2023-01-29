class AudioRecorder{


    constructor(){
        this.chunks = []
    }


    startRecording(){
        //from https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Get_microphone_permission
        this.chunks = []


        navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then(stream => {
                /*
                window.localStream = stream;
                window.localAudio.srcObject = stream;
                window.localAudio.autoplay = true;
                */
                this.currentStream = stream;
                this.currentRecorder = new MediaRecorder(stream);
                this.currentRecorder.ondataavailable = (e) => {//CURRENTLY EMPTY
                    this.chunks.push(e.data);
                };
                this.currentRecorder.start();
            })
            .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
    }

    /**
     * 
     */
    stopRecording(){
        let blobType = this.currentRecorder.mimeType;
        console.log("blobtype: ")
        console.log(blobType)
        this.currentRecorder.addEventListener("stop", (event) => {
            this.recordedBlob = new Blob(this.chunks, {type: 'audio/webm;codecs=opus'}); 
            console.log(this.recordedBlob)
            this.audioURL = window.URL.createObjectURL(this.recordedBlob)

            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = this.audioURL;
        });
        this.currentRecorder.stop();
        this.currentStream.getTracks()
        .forEach(track => {track.stop();});
    }

    /**
     * @return {PointDefinedWave} Representation of the audio we recorded
     */
    blobToPCM(){
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let source = audioCtx.createBufferSource();
        let fileReader = new FileReader();

        fileReader.addEventListener("loadend", () => {
            audioCtx.decodeAudioData(fileReader.result).then((decodedData) => {
                console.log(decodedData);
                source.buffer = decodedData;
                source.connect(audioCtx.destination);
                //source.loop = true;
                source.start(0);
            });
        });
        fileReader.readAsArrayBuffer(this.recordedBlob)
    }

    


    laterStuff(){
    }
    
}
  