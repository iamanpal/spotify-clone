console.log('aman');
console.log('isha');

async function getsongs(){
    let a= await fetch("http://127.0.0.1:3000/songs")
    let response= await a.text();
    let div=document.createElement("div")
    div.innerHTML=response;
    let link =div.getElementsByTagName("a")
    let songs=[]
    for (let index = 0; index < link.length; index++) {
        const element = link[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href)
        }
        
    }
    return songs
    
    
}

async function main(){
    let song= await getsongs();
    console.log(song);

    let audio = new Audio(song[4]);
audio.play();

}
main();
