var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src','https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js');
document.head.appendChild(jQueryScript);

$(document).ready(function(){
  let index = Math.floor(Math.random() * lib.length);
  let quote = lib[index].quote;
  let author = lib[index].author;
  let elem = document.getElementById("text");
  elem.innerHTML = "<h2>" + quote + "</h2>";
  elem = document.getElementById("author");
  elem.innerHTML = "- " + author;

let re;
let gr;
let bl;
$(".button1").click(function(){
  let index = Math.floor(Math.random() * lib.length);
  let quote = lib[index].quote;
  let author = lib[index].author;
  let elem = document.getElementById("text");
  while(elem.textContent == quote)
    {
      index = Math.floor(Math.random() * lib.length);
      quote = lib[index].quote;
      author = lib[index].author;
    }
  elem.innerHTML = "<h2>" + quote + "</h2>";
  elem = document.getElementById("author");
  elem.innerHTML = "- " + author;
  re = Math.floor(Math.random()*255);
  gr = Math.floor(Math.random()*255);
  bl = Math.floor(Math.random()*255);


  $('.contain').animate({
      backgroundColor: "rgb("+ re+ "," + gr +","+ bl +")"
    },1000);
    $('.quote').animate({
      color: "rgb("+ re+ "," + gr +","+ bl +")"
    },1000);
    $('.author').animate({
      color: "rgb("+ re+ "," + gr +","+ bl +")"
    },1000);

    $('.btn.button1').animate({
      backgroundColor: "rgb("+ re+ "," + gr +","+ bl +")", color: "white"
    },1000);

    $('.btn.button2').animate({
  backgroundColor: "rgb("+ re+ "," + gr +","+ bl +")"
},1000);
});


$(".btn.button1").hover(function(){
  let re1 = re+30;
  let gr1 = gr+30;
  let bl1 = bl+30;
    $(this).css("background-color", "rgb("+ re1 + "," + gr1 +","+ bl1 +")");
}, function(){
      $(this).css("background-color", "rgb("+ re + "," + gr +","+ bl +")");
  });

$(".btn.button2").hover(function(){
  let re1 = re+30;
  let gr1 = gr+30;
  let bl1 = bl+30;
    $(this).css("background-color", "rgb("+ re1 + "," + gr1 +","+ bl1 +")");
}, function(){
      $(this).css("background-color", "rgb("+ re + "," + gr +","+ bl +")");
  });

});
