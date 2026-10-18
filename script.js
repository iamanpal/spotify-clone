
let currentsong=new Audio();
async function getsongs(){
    let a = await fetch("/songs/")
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;

    let link = div.getElementsByTagName("a")

    let songs = []
    for (let index = 0; index < link.length; index++) {
        const element = link[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("%5C")[2])
        }
    }
    return songs
}

const playMusic= (track)=>{
// let audio =new Audio("/songs/"+track)
currentsong.src="/songs/"+track;
currentsong.play()
play.src="pause.svg"
document.querySelector(".songinfo").innerHTML=track;
document.querySelector(".songtime").innerHTML= "00.00/00.00"
}

async function main(){
   
    let songs = await getsongs();


    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
            <img class="invert" src="/icons/music.svg" alt="music icon">
            <div class="info">
                <div>${song.replaceAll("%20"," ")}</div>
                <div>Aman</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img src="/icons/play.svg" alt="play icon">
            </div>
        </li>`
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", ()=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
}


const play=document.getElementById("play");

play.addEventListener("click",()=>{
   if(currentsong.paused){
       currentsong.play();
       play.src = "/icons/pause.svg";
       
   }
   else{
    currentsong.pause()
    play.src="/icons/play.svg"
    
   }


})


main();
