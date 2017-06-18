/*
  Here is a guide for the steps you could take:
*/
// 1. First select and store the elements you'll be working with
let audioPlayer = document.querySelector(".music-player");
let form = document.querySelector(".search-form");
let results = document.querySelector(".results");
let label = document.querySelector(".cls_nowplaying");
let ele = document.getElementById("id_musicplayer");
let idResults = document.getElementById("id_results");

// 2. Create your `onSubmit` event for getting the user's search term
form.onsubmit = function onSubmit() {
  if(form.txt_Search.value == ""){
    alert("Enter the artist name");
    form.txt_Search.focus();
    return false;
  }
  event.preventDefault();
  searchSoundCloud(form.txt_Search.value);
};

// 3. Create your `fetch` request that is called after a submission
function searchSoundCloud(song){
  fetch("http://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=" + song)
  .then(function(response){
    response.json().then(function(data){
      let songs_innerhtml = "";
      for (let i=0;i < data.length; i++)
      {
        data[i].artwork_url = (data[i].artwork_url === null)? '#' : data[i].artwork_url;
        songs_innerhtml += "<div class='inner_rows'><img src='"+ data[i].artwork_url +"' alt='"+ data[i].title +"'>";
        songs_innerhtml += "<p class='cls_title'>"+ data[i].title +"</p><p class='cls_bandname'>"+ data[i].user.username ;
        songs_innerhtml += "<img src='play.png' alt='"+ data[i].title +"' class='cls_imgPlay' id='"+ data[i].id +"' ></p></div>";
      }
      idResults.innerHTML = songs_innerhtml; // 4. Create a way to append the fetch results to your page
    })
  })
}

// 5. Create a way to listen for a click that will play the song in the audio play
idResults.addEventListener("click", function(event){
  if(event.target && event.target.matches("img.cls_imgPlay"))
  {
    let str_uri =  "https://api.soundcloud.com/tracks/" + event.target.id + "/stream?client_id=8538a1744a7fdaa59981232897501e04";
    audioPlayer.src = str_uri;
    audioPlayer.autoplay = true;
    label.innerHTML = "<p><b>Now playing: "+ event.target.alt +"</b></p>"
  }
});
