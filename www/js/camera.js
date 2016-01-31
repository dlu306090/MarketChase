var pictureSource;
var destinationType; 

document.addEventListener("deviceready", onDeviceReady, false);
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
 
var http = new XMLHttpRequest();
var url = "https://upload.gyazo.com/api/upload";
var params = "apikey=9c72a5ef-92e5-4619-a875-81ad3d1974b7&url="+encodeURIComponent(imageData);
alert(params);
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", params.length);
http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        document.getElementById('div1').innerHTML = http.responseText;
        if (http.responseText.barcode[0]["text"] != "0")
          var smallImage = document.getElementById('smallImage');
          smallImage.style.display = 'block';
          smallImage.src = "data:image/jpeg;base64," + imageData;
    }
}
http.send(params);


var http = new XMLHttpRequest();
var url = "https://api.havenondemand.com/1/api/sync/recognizebarcodes/v1";
var params = "apikey=9c72a5ef-92e5-4619-a875-81ad3d1974b7&file="+"data:image/jpeg;base64,"+imageData;
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", params.length);
http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        document.getElementById('div1').innerHTML = "Solved.";
        if (http.responseText.barcode[0]["text"] != "0"){
          var smallImage = document.getElementById('smallImage');
          smallImage.style.display = 'block';
          smallImage.src = "data:image/jpeg;base64," + imageData;

        }
    }
}
http.send(params);
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// // A button will call this function
// //
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URL });
  window.location= "scanning.html";
}

// function capturePhoto() {
// var http = new XMLHttpRequest();
// var url = "https://api.havenondemand.com/1/api/sync/recognizebarcodes/v1";
// var url2 = "https%3A%2F%2Fwww.havenondemand.com%2Fsample-content%2Fbarcode%2Fbc9.jpg"
// var params = "apikey=9c72a5ef-92e5-4619-a875-81ad3d1974b7&url="+url2;
// http.open("POST", url, true);

// //Send the proper header information along with the request
// http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// http.setRequestHeader("Content-length", params.length);
// http.setRequestHeader("Connection", "close");

// http.onreadystatechange = function() {//Call a function when the state changes.
//     if(http.readyState == 4 && http.status == 200) {
//         alert(http.responseText);
//         document.getElementById('div1').innerHTML = http.responseText;
//         if (http.responseText.barcode[0]["text"] == "5000108030539")
//           var smallImage = document.getElementById('smallImage');
//           smallImage.style.display = 'block';
//           smallImage.src = "data:image/jpeg;base64," + imageData;
//     }
// }
// http.send(params);
// }

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}

// function checkSolved(){
//   if {document.getElementById('div1').innerHTML = "Solved."
//     && document.getElementById('div2').innerHTML = "Solved.";
//     && document.getElementById('div2').innerHTML = "Solved.";
//     && document.getElementById('div2').innerHTML = "Solved.";
//     && document.getElementById('div2').innerHTML = "Solved.";}
//     {self.location.href="market_champion.html"}
// }
