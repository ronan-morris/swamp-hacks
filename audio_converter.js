class AudioConverter{
    constructor(){
    }
    pcmToFourComponents(pointDefinitions){
        const input = new Array(512);
        input.fill(0);
        let complexArr;
        complexArr = fourier.dft(pointDefinitions, input);
        let realArr = complexArr[0]
        let imArr = complexArr[1]
        let magArr = [0,0,0,0]
        let indexArr = [0,0,0,0]
        let phaseArr = [0,0,0,0]
        let magnitude = 0;
        let phaseShift = 0;
        for(let i = 0; i < 512; i++){
            magnitude = Math.pow(realArr[i],2) + Math.pow(imArr[i],2)
            phaseShift = Math.atan2(realArr[i], imArr[i])
            if(magnitude > magArr[0]){
                magArr[3] = magArr[2]
                magArr[2] = magArr[1]
                magArr[1] = magArr[0]
                magArr[0] = magnitude

                phaseArr[3] = phaseArr[2]
                phaseArr[2] = phaseArr[1]
                phaseArr[1] = phaseArr[0]
                phaseArr[0] = phaseShift

                indexArr[3] = indexArr[2]
                indexArr[2] = indexArr[1]
                indexArr[1] = indexArr[0]
                indexArr[0] = i
            }
            else if (magnitude > magArr[1]){
                magArr[3] = magArr[2]
                magArr[2] = magArr[1]
                magArr[1] = magnitude

                phaseArr[3] = phaseArr[2]
                phaseArr[2] = phaseArr[1]
                phaseArr[1] = phaseShift

                indexArr[3] = indexArr[2]
                indexArr[2] = indexArr[1]
                indexArr[1] = i

            }
            else if (magnitude > magArr[2]){
                magArr[3] = magArr[2]
                magArr[2] = magnitude

                phaseArr[3] = phaseArr[2]
                phaseArr[2] = phaseShift

                indexArr[3] = indexArr[2]
                indexArr[2] = i

            }
            else if (magnitude > magArr[3]){
                magArr[3] = magnitude

                phaseArr[3] = phaseShift

                indexArr[3] = i

            }
        }
        let componentWaveArr = [];
        for(let j in indexArr){
            componentWaveArr.push({amplitude:magArr[j], phaseShift:phaseArr[j], frequency:indexArr[j]});
        }
        return componentWaveArr

    }
}