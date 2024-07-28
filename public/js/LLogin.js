document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/landlordLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Login failed');
        }

        // Save the username to local storage
        localStorage.setItem('username', username);

        // Redirect to the dashboard
        setTimeout(() => {
            
            window.location.href = '/landlord/Dashboard.html';
             

        }, 1000);
    } catch (error) {
        document.getElementById('message').innerHTML = `<p style="color: red;">Sign in failed</p>`;
        console.log("Login Failed");
    }
});




document.querySelectorAll(".text-button-wrapper, .button2").forEach(button => {
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

var textButton8 = document.getElementById("textButton8");
if (textButton8) {
textButton8.addEventListener("click", function (e) {
    window.location.href = "Home.html"; 
});
}

var textButton9 = document.getElementById("textButton9");
if (textButton9) {
textButton9.addEventListener("click", function (e) {
    window.location.href = "Helpdesk.html"; 
});
}

var textButton10 = document.getElementById("textButton10");
if (textButton10) {
textButton10.addEventListener("click", function (e) {
    window.location.href = "About.html"; 
});
}

var textButton11 = document.getElementById("textButton11");
if (textButton11) {
textButton11.addEventListener("click", function (e) {
    window.location.href = "Security.html"; 
});
}

var contactUsText = document.getElementById("contactUsText");
if (contactUsText) {
contactUsText.addEventListener("click", function (e) {
    window.location.href = "Contactus.html"; 
});
}

var textButtonA = document.getElementById("textButtonA");
if (textButtonA) {
textButtonA.addEventListener("click", function (e) {
    window.location.href = "Home.html"; 
});
}

var textButton1 = document.getElementById("textButton1");
if (textButton1) {
textButton1.addEventListener("click", function (e) {
    window.location.href = "Helpdesk.html"; 
});
}

var textButton2 = document.getElementById("textButton2");
if (textButton6) {
textButton6.addEventListener("click", function (e) {
    window.location.href = "About.html"; 
});
}

var textButton3 = document.getElementById("textButton3");
if (textButton3) {
textButton3.addEventListener("click", function (e) {
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

var forgotpassword = document.getElementById("forgotpassword");
if (forgotpassword) {
    forgotpassword.addEventListener("click", function (e) {
        window.location.href = "Lforgotpassword.html";
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Toggle the eye icon image source
        const iconSrc = type === "password" ? "./images/e.png" : "./images/closed-eye-white.png";
        togglePassword.setAttribute("src", iconSrc);
    });
});





document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById('username','password');

    input.addEventListener('input', function() {
      this.style.backgroundColor = '#1A1A1A';
    });

    input.addEventListener('change', function() {
      this.style.backgroundColor = '#1A1A1A';
    });
  });