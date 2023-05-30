window.onload = getPicture;
var memes = new Array("memes/404image.png","memes/meme1.jpg","memes/meme2.jpg","memes/meme3.png","memes/meme4.jpg","memes/meme5.jpg","memes/meme6.jpg","memes/meme7.jpg","memes/meme8.jpg","memes/meme9.jpg","memes/meme10.jpg","memes/meme11.jpg");

function getPicture() {
    var ran = Math.floor(Math.random() * memes.length);
    document.getElementById("myPicture").src = memes[ran];
}
