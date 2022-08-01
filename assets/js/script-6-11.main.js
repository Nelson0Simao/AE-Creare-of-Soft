
var delayGTM = 0;
function openDialog(f, g) {
    var a = document.getElementById(g);
    let d = a.querySelectorAll(".close-dialog");
    if ("true" === f) {
        let b = document.createElement("div");
        a.appendChild(b),
        b.classList.add("modal"),
        zIndexD = 12,
        a.classList.add("open-dialog"),
        a.style.zIndex = zIndexD ++,
        b.style.display = "block";
        for (let c = 0; c < d.length; c++) 
            d[c].addEventListener("click", function () {
                a.classList.remove("open-dialog"),
                b.style.display = "none",
                b.remove(b)
            })
        
    }
}
function trengoOpen() {
    window.Trengo.Api.Widget.open("chat")
}
window.location.pathname.includes("obrigado") && (delayGTM = 0),
setTimeout(function () {
   // gtmInsert()
}, delayGTM);
let imageGetSrc = document.querySelectorAll(".image-mobile-resolution");
for (let e = 0; e < imageGetSrc.length; e++) 
    screen.width > 768 ? imageGetSrc[e].src = imageGetSrc[e].getAttribute("imagemax") : imageGetSrc[e].src = imageGetSrc[e].getAttribute("imagemin");

let imageGet = document.querySelectorAll(".hide-image-mobile");
for (let e = 0; e < imageGet.length; e++) 
    screen.width > 1260 ? imageGet[e].src = imageGet[e].getAttribute("imagelk") : imageGet[e].src = "";

let menu = document.querySelector("#header");
function myFunction() {
    if (window.pageYOffset > 100) 
        return header.classList.add("menu-fixed"),
        document.body.style.padding = "0 0 0",
        myFunction;
    
    header.classList.remove("menu-fixed"),
    document.body.style.padding = "0"
}
let menuOpen = document.querySelector(".menu-hamburguer__button"),
    menuList = document.querySelector(".content-logo-list");
null != menuOpen && (menuOpen.onclick = function () {
    menuList.classList.toggle("open-menu"),
    menu.classList.toggle("open-header")
}),
window.onscroll = function () {
    null != menu && myFunction()
};
var body = document.querySelector("body");
let mascara = document.querySelector("#mask"),
    formCall = document.querySelector("#form-call"),
    btnCall = document.querySelector("#btn-call"),
    btnCloseCall = document.querySelector("#close-formCall"),
    bannerDash = document.querySelector(".banner-dashboard");
var top = "";
function fecharDialog() {
    formCall.classList.remove("ativo"),
    setTimeout(function () {
        mascara.classList.remove("ativo"),
        body.classList.remove("bodySemScroll"),
        formCall.style.display = "none"
    }, 300)
}
btnCall.onclick = function () {
    formCall.style.display = "block",
    mascara.classList.add("ativo"),
    body.classList.add("bodySemScroll"),
    setTimeout(function () {
        formCall.classList.add("ativo")
    }, 35)
},
btnCloseCall.onclick = () => {
    fecharDialog()
},
mascara.onclick = () => {
    fecharDialog()
};
var i,
    acc = document.querySelectorAll(".accordion-header");
for (i = 0; i < acc.length; i++) 
    acc[i].addEventListener("click", function () {
        this.classList.toggle("accordion-open");
        let b = this.querySelector(".icon-accordion svg");
        var a = this.nextElementSibling;
        a.style.height = a.scrollHeight + "px",
        a.scrollHeight = a.scrollHeight,
        a.classList.contains("accordion-body-open") ? (a.classList.remove("accordion-body-open"), b.style.transform = "rotate(90deg)", a.style.height = 0) : (a.classList.add("accordion-body-open"), b.style.transform = "rotate(0deg)", a.style.height = a.scrollHeight)
    });

var accBx,
    accordionBox = document.querySelectorAll(".accordion-box-js");
for (accBx = 0; accBx < accordionBox.length; accBx++) {
    var c = accordionBox[accBx],
        a = accordionBox[accBx].querySelector(".plan-open-button-accordion");
    let d = accordionBox[accBx].querySelector(".open-acc");
    a.addEventListener("click", function () {
        d.classList.toggle("accordion-list-open"),
        d.classList.contains("accordion-list-open") ? d.style.height = "340px" : d.style.height = d.scrollHeight + "px"
    })
}
function scrollTopF() {
    document.body.scrollTop = 0,
    document.documentElement.scrollTop = 0
}
if (screen.width < 840) {
    var a = document.querySelectorAll(".plan-open-button");
    for (let b = 0; b < a.length; b++) 
        a[b].addEventListener("click", function () {
            var a = this.nextElementSibling;
            a.classList.toggle("advantage-plan-open"),
            a.classList.contains("advantage-plan-open") ? a.style.height = a.scrollHeight + "px" : a.style.height = "60px"
        })
    
}
function setCookie(b, c, d) {
    var a = new Date;
    a.setTime(a.getTime() + 24 * d * 36e5);
    var f = "expires=" + a.toUTCString();
    document.cookie = b + "=" + c + ";" + f + ";path=/",
    document.getElementById("LGPD").style.display = "none"
}
function getCookie(f) {
    for (var c = f + "=", d = document.cookie.split(";"), b = 0; b < d.length; b++) {
        for (var a = d[b]; " " == a.charAt(0);) 
            a = a.substring(1);
        
        if (0 == a.indexOf(c)) 
            return a.substring(c.length, a.length)
        
    }
    return ""
}
function checkCookie() {
    var a = getCookie("User");
    document.getElementById("LGPD").style.display = a ? "none" : "flex"
}
!function () {
    for (var b = document.querySelectorAll(".youtube"), a = 0; a < b.length; a++) {
        var d = b[a].getAttribute("url");
        b[a].removeAttribute("url");
        var f = d + "thumbsiframe/" + b[a].getAttribute("thumb-image") + ".webp",
            c = new Image;
        c.src = f,
        c.addEventListener("load", void(c.setAttribute("alt", "teste"), c.setAttribute("title", "teste"), b[a].appendChild(c))),
        b[a].addEventListener("click", function (b) {
            var a = document.createElement("iframe");
            a.setAttribute("onClick", "teste()"),
            a.setAttribute("frameborder", "0"),
            a.setAttribute("allowfullscreen", ""),
            a.setAttribute("src", "youtube" + this.dataset.embed + "?=1"),
            this.innerHTML = "",
            this.appendChild(a)
        })
    }
}(),
window.onload = function () {
    checkCookie(),
    function () {
        document.querySelector("#mascara");
        for (var b = document.querySelectorAll(".vimeo"), a = 0; a < b.length; a++) {
            var d = b[a].getAttribute("url");
            b[a].removeAttribute("url");
            var c = document.createElement("img");
            $.getJSON("https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + d, {
                format: "json",
                width: "640"
            }, function (a) {
                $(c).attr("src", a.thumbnail_url),
                $(c).attr("title", a.title),
                $(c).attr("alt", a.title)
            }),
            c.addEventListener("load", void b[a].appendChild(c)),
            b[a].addEventListener("click", function (b) {
                var a = document.createElement("iframe");
                a.setAttribute("allow", "autoplay; fullscreen; picture-in-picture"),
                a.setAttribute("src", "https://player.vimeo.com/video/" + this.dataset.embed + "&autoplay=1&byline=0&portrait=0"),
                this.innerHTML = "",
                this.appendChild(a)
            })
        }
    }()
}
