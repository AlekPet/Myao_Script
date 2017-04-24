// ==UserScript==
// @name         Myao_Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AlekPet
// @match        http*://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// ==/UserScript==
function poluch_vibranoe()
{
    if(window.getSelection)
    {
        return window.getSelection().toString();
    }
    else if(document.getSelection)
    {
        return document.getSelection();
    }
    else if(document.selection)
    {
        return document.selection.createRange().text;
    }
}

function mup(){
	var psx_selectedtext = poluch_vibranoe().slice(0,50);
    alert(psx_selectedtext);
    GM_setValue('psx_selectedtext',psx_selectedtext);
}

(function() {
var uprav = {
    muted:false,
    autostart:true,
    width:"480",
    heigth:"360",
    begun:true
};   

    var tag=[];
    tag=["<img style=\"width:"+uprav.width+";\" id=\"tempe_myao_script\" src=\"","\" onclick=\"alert('Мяу-мяу!')\">"];

    var arr=["http://img-fotki.yandex.ru/get/9108/27433797.b1/0_957a3_f7a6d65f_XXL.jpg",
             "http://lifepic.me/wp-content/uploads/2016/03/9-20.jpg",
            "http://img-fotki.yandex.ru/get/9314/27433797.b1/0_957a4_4931fa91_XXL.jpg",
             "http://fishki.net/picsw/122010/28/bonus/koti/007.jpg",
             "http://fishki.net/picsw/122010/28/bonus/koti/011.jpg",
             "http://fishki.net/picsw/122010/28/bonus/koti/015.jpg",
             "http://img-fotki.yandex.ru/get/4126/186894833.71/0_c29f6_5548f39a_orig.jpg",
             '<iframe src="//coub.com/embed/11qdc?muted=true&autostart=true&originalSize=false&startWithHD=false" allowfullscreen="false" frameborder="0" width="480" height="360"></iframe>',
             '<iframe src="//coub.com/embed/d06ir?muted=true&autostart=true&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="540" height="540"></iframe>',
             '<iframe src="//coub.com/embed/1hrmg5q?muted=true&autostart=true&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="480" height="360"></iframe>'
            ]; 
    for(var i=0;i<arr.length;i++){
    if(/iframe/ig.test(arr[i])) {
      arr[i]=arr[i].replace(/(muted=)true|false$/ig,"$1"+uprav.muted);
      arr[i]=arr[i].replace(/(autostart=)true|false$/ig,"$1"+uprav.autostart);  
      arr[i]=arr[i].replace(/(width=)"\d+" (height=)"\d+"/ig,"$1"+uprav.width + " $2"+uprav.heigth);  
    }
    }
function getN(znach){
    if(znach !==""){
 GM_xmlhttpRequest({
  method: "GET",
      headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  url: "https://yandex.ru/images/search?text="+znach,
  onload: function(response) {
    alert(response.responseText);
  }
});   
    }
}
function smena(){
  
    var rnd=Math.floor(Math.random()*arr.length);
    document.getElementById("divvv").innerHTML=((/jpg|png|gif|jpeg/ig.test(arr[rnd]))?tag[0]:"")+arr[rnd]+((/jpg|png|gif|jpeg/ig.test(arr[rnd]))?tag[1]:"");    
 
    var buuff = (/jpg|png|gif|jpeg/ig.test(arr[rnd]))?5000:10000;
    var tim=setTimeout(function(){
        smena();
        },buuff);
}

    
var d=document.createElement("div");
d.setAttribute("style","position:fixed;top:50%;right:5px;cursor:pointer;z-index:99999;");
d.id="divvv";

    if(uprav.begun){
d.addEventListener("mouseover",function(){
      var r= Math.floor(Math.random()*window.screen.availWidth-300);
      var t=Math.floor(Math.random()*window.screen.availHeight-300);
        
      if(t<0) t=5;
        else if(t>window.screen.availHeight) t=window.screen.availHeight-uprav.heigth;
      if(r<0) r=uprav.width;
        else if(r>window.screen.availWidth) r=window.screen.availWidth-uprav.width;
        
        this.style.top=t+"px";
        this.style.right=r+"px";
    });
    }
    document.body.appendChild(d);
   smena();

})();
