

async function getsongs(){
    let a = await fetch("/songs/")
    let response= await a.text();
    
    let div=document.createElement("div")
    div.innerHTML=response;
 
    
    let link =div.getElementsByTagName("a")
  
    
    let songs=[]
    for (let index = 0; index < link.length; index++) {
        const element = link[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("%5C")[2])
        }
        
    }
    return songs
    
    
} 

async function main(){
    let songs= await getsongs();
    console.log(songs);

    let songUl =document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML + `<li><img class="invert" src="/icons/music.svg" alt="music icon">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Aman</div>
                            </div>
                            <div class="playnow">
                            <span>Play Now</span>
                            <img src="/icons/play.svg" alt="play icon">
                            </div></li>`
        
    }




    let audio = new Audio(songs[1]); 
// audio.play(); 


audio.addEventListener("loadedmetadata", () => {
    console.log(audio.duration,audio.currentSrc,audio.currentTime);
    
});
}
main(); 