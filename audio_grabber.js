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
        this.currentRecorder.addEventListener("stop", (event) => {
            this.recordedBlob = new Blob(this.chunks, {type: 'audio/webm;codecs=opus'});
            this.audioURL = window.URL.createObjectURL(this.recordedBlob)

            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = this.audioURL;

            this.blobToPCM();
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
        this.source = audioCtx.createBufferSource();
        let fileReader = new FileReader();

        fileReader.addEventListener("loadend", () => {
            audioCtx.decodeAudioData(fileReader.result).then((decodedData) => {
                this.source.buffer = decodedData;
                let rate = decodedData.sampleRate;
                let points = decodedData.getChannelData(0).slice(-513, -1);
                this.pcmData = {sampleRate:rate, pointDefinitions:points}
                /*let pcmPromise = new Promise((resolve, reject)=>{
                    resolve({sampleRate:rate, pointDefinitions:points})
                });*/
                //return pcmPromise
                
            });
        });
        fileReader.readAsArrayBuffer(this.recordedBlob)
    }

    getPcmData(){
        return this.pcmData;
    }

    playCollectedAudio(){
        this.source.connect(audioCtx.destination);
        this.source.start(0);
    }


    laterStuff(){
    }
    
}
  