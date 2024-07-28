function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('overlay' + popupId.replace('popup', ''));
    const content = document.querySelector('.content');

    overlay.style.display = 'flex';
    popup.style.display = 'block';
    content.classList.add('blur-background');
    document.body.classList.add('disable-scroll');
    document.body.classList.add('popup-open');

    overlay.onclick = function() {
        hidePopup(popupId);
    };
}

function hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('overlay' + popupId.replace('popup', ''));
    const content = document.querySelector('.content');

    overlay.style.display = 'none';
    popup.style.display = 'none';
    content.classList.remove('blur-background');
    document.body.classList.remove('disable-scroll');
    document.body.classList.remove('popup-open');
}

var groupContainer = document.getElementById("groupContainer");
if (groupContainer) {
groupContainer.addEventListener("click", function (e) {
    window.location.href = "EditProfile.html";
});
}

var groupContainer1 = document.getElementById("groupContainer1");
if (groupContainer1) {
groupContainer1.addEventListener("click", function (e) {
    window.location.href = "../Privacy.html";
});
}

var groupContainer2 = document.getElementById("groupContainer2");
if (groupContainer2) {
groupContainer2.addEventListener("click", function (e) {
    window.location.href = "../Help.html";
});
}

var groupContainer3 = document.getElementById("groupContainer3");
if (groupContainer3) {
groupContainer3.addEventListener("click", function (e) {
    window.location.href = "../Terms.html";
});
}

var groupContainer4 = document.getElementById("groupContainer4");
if (groupContainer4) {
groupContainer4.addEventListener("click", function (e) {
  window.location.href = "../ReportP.html";
});
}

var textButton1 = document.getElementById("textButton1");
if (textButton1) {
textButton1.addEventListener("click", function (e) {
    window.location.href = "../Helpdesk.html";
});
}

var textButton = document.getElementById("textButton");
if (textButton) {
textButton.addEventListener("click", function (e) {
    window.location.href = "../Home.html";
});
}

var textButton2 = document.getElementById("textButton2");
if (textButton2) {
textButton2.addEventListener("click", function (e) {
    window.location.href = "../About.html"; 
});
}

var textButton3 = document.getElementById("textButton3");
if (textButton3) {
textButton3.addEventListener("click", function (e) {
    window.location.href = "../Security.html";
});
}


var genre = document.getElementById("genre");
if (genre) {
genre.addEventListener("click", function (e) {
  window.location.href = "EditProfile.html";
});
}

var boardbtnContainer = document.getElementById("boardbtnContainer");
if (boardbtnContainer) {
boardbtnContainer.addEventListener("click", function (e) {
    window.location.href = "Dashboard.html";
});
}

var setbtnContainer = document.getElementById("setbtnContainer");
if (setbtnContainer) {
setbtnContainer.addEventListener("click", function (e) {
    window.location.href = "Settings.html";
});
}

var hisbtnContainer = document.getElementById("hisbtnContainer");
if (hisbtnContainer) {
hisbtnContainer.addEventListener("click", function (e) {
    window.location.href = "History.html";
});
}

var OutBtnContainer = document.getElementById("OutBtnContainer");
if (OutBtnContainer) {
OutBtnContainer.addEventListener("click", function (e) {
    window.location.href = "../Home.html";
});
}

var tenant = document.getElementById("tenant");
if (tenant) {
tenant.addEventListener("click", function (e) {
    window.location.href = "../TSignup.html";
});
}
var landlord = document.getElementById("landlord");
if (landlord) {
landlord.addEventListener("click", function (e) {
    window.location.href = "../LSignup.html";
});
}



  document.addEventListener('DOMContentLoaded', function() {
async function checkAuth() {
    const response = await fetch('/api/tenantIsAuthenticated');
    const data = await response.json();

    if (!data.isAuthenticated) {
    window.location.href = '../Llogin.html';
    } else {
    document.getElementById('panelUsername').textContent = data.tenant.username;
    document.getElementById('panelEmail').textContent = data.tenant.email;
    }
}

document.getElementById('OutBtnContainer').addEventListener('click', async function() {
    const response = await fetch('/api/tenantLogout', { method: 'POST' });

    if (response.ok) {
    window.location.href = '../Home.html';
    } else {
    alert('Logout failed');
    }
});


document.getElementById('logout').addEventListener('click', async function() {
    const response = await fetch('/api/tenantLogout', { method: 'POST' });

    if (response.ok) {
    window.location.href = '../Home.html';
    } else {
    alert('Logout failed');
    }
});
checkAuth();
});