function popsurface() {
    const covering = document.getElementById('covering');
    const surface = document.getElementById('surface');
    covering.classList.toggle('active');
    surface.classList.toggle('active');
}

function hideSurface() {
    const covering = document.getElementById('covering');
    const surface = document.getElementById('surface');
    const t4 = document.getElementById('t4');
    const l4 = document.getElementById('l4');
    
    covering.classList.remove('active');
    surface.classList.remove('active');
    
    t4.classList.remove('loading');
    l4.classList.remove('loading');
    t4.disabled = false;
    l4.disabled = false;
}

var t4 = document.getElementById("t4");
if (t4) {
    t4.addEventListener("click", function(e) {
        if (!t4.classList.contains('loading') && !l4.classList.contains('loading')) {
            showLoading(t4, "TLogin.html");
        }
    });
}

var l4 = document.getElementById("l4");
if (l4) {
    l4.addEventListener("click", function(e) {
        if (!t4.classList.contains('loading') && !l4.classList.contains('loading')) {
            showLoading(l4, "LLogin.html");
        }
    });
}

function showLoading(button, url) {
    button.classList.add('loading');
    button.disabled = true;
    setTimeout(() => {
        window.location.href = url;
    }, 2000); // Simulate a 2-second loading time
}

document.addEventListener("DOMContentLoaded", function() {
const buttonContainers = ['textButton8', 'textButton9', 'txt10'];
const delay = 5000; // delay time in milliseconds (5000ms = 5 seconds)

setTimeout(function() {
  buttonContainers.forEach(containerId => {
    const buttonContainer = document.getElementById(containerId);
    if (buttonContainer) {
        const button = document.createElement('button');
        button.setAttribute('loading', 'lazy'); // Set the loading attribute to lazy
        buttonContainer.appendChild(button);
    }
  });
}, delay);
});
 
 document.querySelectorAll(".text-button-wrapper, .open-account-btn, .button2").forEach(button => {

    button.addEventListener("click", function() {
        const popupId = button.getAttribute("data-popup");
        const popup = document.getElementById(popupId);
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add("active");
        }, 10); // Small delay to allow the display change to take effect
        document.getElementById("overlay").classList.add("active");
        document.querySelector('.content').classList.add('blur-background');
    });
});

document.getElementById("overlay").addEventListener("click", function() {
    document.querySelectorAll(".popup-menu").forEach(popup => {
        popup.classList.remove("active");
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500); // Match this timeout with the animation duration
    });
    document.getElementById("overlay").classList.remove("active");
    document.querySelector('.content').classList.remove('blur-background');
});

var textButton1 = document.getElementById("textButton1");
if (textButton1) {
    textButton1.addEventListener("click", function (e) {
  window.location.href = "Helpdesk.html"; 
});
}

var textButton2 = document.getElementById("textButton2");
if (textButton2) {
    textButton2.addEventListener("click", function (e) {
  window.location.href = "About.html"; 
});
}

var textButton3 = document.getElementById("textButton3");
if (textButton3) {
    textButton3.addEventListener("click", function (e) {
  window.location.href = "Security.html";
});
}

var contactUsText = document.getElementById("contactUsText");
if (contactUsText) {
contactUsText.addEventListener("click", function (e) {
  window.location.href = "Contactus.html";
});
}

var button = document.getElementById("button");
if (button) {
button.addEventListener("click", function (e) {
  window.location.href = "Login.html";
});
}

var textButtonA = document.getElementById("textButtonA");
if (textButtonA) {
    textButtonA.addEventListener("click", function (e) {
        window.location.href = "Home.html";
});
}

var txt1 = document.getElementById("txt1");
if (txt1) {
txt1.addEventListener("click", function (e) {
  window.location.href = "Helpdesk.html";
});
}

var txt2 = document.getElementById("txt2");
if (txt2) {
txt2.addEventListener("click", function (e) {
  window.location.href = "About.html"; 
});
}

var txt3 = document.getElementById("txt3");
if (txt3) {
txt3.addEventListener("click", function (e) {
  window.location.href = "Security.html";
});
}

var textButton6 = document.getElementById("textButton6");
if (textButton6) {
textButton6.addEventListener("click", function (e) {
  window.location.href = "Privacy.html";
});
}

var textButton7 = document.getElementById("textButton7");
if (textButton7) {
textButton7.addEventListener("click", function (e) {
  window.location.href = "Terms.html";
});
}

var tenant1 = document.getElementById("tenant1");
if (tenant1) {
    tenant1.addEventListener("click", function (e) {
        window.location.href = "TSignup.html";
    });
}

var landlord1 = document.getElementById("landlord1");
if (landlord1) {
    landlord1.addEventListener("click", function (e) {
        window.location.href = "LSignup.html";
    });
}

var tenant2 = document.getElementById("tenant2");
if (tenant2) {
    tenant2.addEventListener("click", function (e) {
        window.location.href = "TSignup.html";
    });
}

var landlord2 = document.getElementById("landlord2");
if (landlord2) {
    landlord2.addEventListener("click", function (e) {
        window.location.href = "LSignup.html";
    });
}

var tenant3 = document.getElementById("tenant3");
if (tenant3) {
    tenant3.addEventListener("click", function (e) {
        window.location.href = "TSignup.html";
    });
}
var Tdash = document.getElementById("Tdash");
if (Tdash) {
  Tdash.addEventListener("click", function (e) {
        window.location.href = "RedirectLogin.html";
    });
}

var landlord3 = document.getElementById("landlord3");
if (landlord3) {
    landlord3.addEventListener("click", function (e) {
        window.location.href = "LSignup.html";
    });
}