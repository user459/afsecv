Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
prediction=""
camera=document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MqqRD7qfe/model.json",model_loaded);
function model_loaded(){
console.log("success");
}
function speak(){
var synth=window.speechSynthesis;
    speak_data_1="first prediction="+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1); 
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if(results[0].label==amazing){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label==best){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label==victory){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
    }
}
