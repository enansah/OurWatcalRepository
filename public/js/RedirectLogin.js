var text1 = document.getElementById("text1");
if (text1) {
text1.addEventListener("click", function (e) {
    window.location.href = "Home.html"; 
});
}

var text2 = document.getElementById("text2");
if (text2) {
text2.addEventListener("click", function (e) {
    window.location.href = "Helpdesk.html"; 
});
}

var text3 = document.getElementById("text3");
if (text3) {
text3.addEventListener("click", function (e) {
    window.location.href = "About.html"; 
});
}

var text4 = document.getElementById("text4");
if (text4) {
text4.addEventListener("click", function (e) {
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





document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const landlordId = document.getElementById('username').value;
        const tenantId = document.getElementById('password').value;

        try {
            const response = await fetch('/api/viewTenant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ landlordId, tenantId })
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            if (data.success) {
                // Store tenant data in localStorage
                localStorage.setItem('tenantData', JSON.stringify(data));
                // Redirect to tenant dashboard
                window.location.href = 'Redirect.html';
            } else {
                document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching tenant data:', error);
            document.getElementById('result').innerHTML = `<p>Login failed</p>`;
        }
    });
});