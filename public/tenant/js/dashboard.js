document.addEventListener('DOMContentLoaded', function() {
    async function checkAuth() {
        const response = await fetch('/api/tenantIsAuthenticated');
        const data = await response.json();

        if (!data.isAuthenticated) {
        window.location.href = '../Tlogin.html';
        } else {
        document.getElementById('username').textContent = data.tenant.username;
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

    checkAuth();
});







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
var pay = document.getElementById("pay");
if (pay) {
    pay.addEventListener("click", function (e) {
    window.location.href = "Payment.html";
});
}












document.addEventListener('DOMContentLoaded', function() {
 
    // Get today's date
    const today = new Date();

    // Array of day names in order
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Array of elements to update in descending order
    const dateElements = [
        { dateClass: '.june', dayClass: '.sunday' },
        { dateClass: '.june1', dayClass: '.monday' },
        { dateClass: '.june2', dayClass: '.tuesday' },
        { dateClass: '.june3', dayClass: '.wednesday' },
        { dateClass: '.june4', dayClass: '.thursday' },
        { dateClass: '.june5', dayClass: '.friday' },
        { dateClass: '.june6', dayClass: '.saturday' },
        { dateClass: '.june7', dayClass: '.sunday1' },
        { dateClass: '.june8', dayClass: '.monday1' },
        { dateClass: '.june9', dayClass: '.tuesday1' },
        { dateClass: '.june10', dayClass: '.wednesday1' },
        { dateClass: '.june11', dayClass: '.thursday1' },
        { dateClass: '.june12', dayClass: '.friday1' },
        { dateClass: '.june13', dayClass: '.saturday1' }
    ];

    dateElements.forEach((element, index) => {
        let dateElement = document.querySelector(element.dateClass);
        let dayElement = document.querySelector(element.dayClass);

        if (dateElement && dayElement) {
            // Calculate the date for each element (decreasing)
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() - index);

            // Extract day and date parts
            let dayName = daysOfWeek[currentDate.getDay()];
            let dayDate = currentDate.getDate();
            let monthName = currentDate.toLocaleString('default', { month: 'long' });

            // Update the element with the new date
            dateElement.innerText = `${dayDate} ${monthName}`;
            // Update the corresponding day name element
            dayElement.innerText = dayName;
        }
    });
});

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}















const tierRates = [
    { upperLimit: 50, rate: 0.00 },     // Tier 1 (Lifeline)
    { upperLimit: 150, rate: 0.2460 },  // Tier 2
    { upperLimit: 300, rate: 0.3409 },  // Tier 3
    { upperLimit: 600, rate: 0.4642 },  // Tier 4
    { upperLimit: 1000, rate: 0.5693 }, // Tier 5
    { upperLimit: Infinity, rate: 0.6758 } // Tier 6
];

function calculateCost(consumption) {
    let cost = 0;
    let remainingConsumption = consumption;

    for (const tier of tierRates) {
        if (remainingConsumption > 0) {
            const tierConsumption = Math.min(remainingConsumption, tier.upperLimit);
            cost += tierConsumption * tier.rate;
            remainingConsumption -= tierConsumption;
        } else {
            break;
        }
    }

    return `GHs ${cost.toFixed(2)}`; // Format to two decimal places
}

async function getUsername() {
    try {
        const response = await fetch('/api/tenantIsAuthenticated');
        const data = await response.json();
        return data.tenant.username;
    } catch (error) {
        console.error('Error fetching username:', error);
        return null;
    }
}

async function fetchData() {
    try {
        const username = await getUsername();
        console.log(username);
        if (!username) {
            // Handle case where username is not available (e.g., redirect to login)
            return;
        }
        const response = await fetch(`/api/tenant/${username}/data`);
        const data = await response.json();
        console.log(data);
        // Update table data
        document.querySelector('.empty-units').textContent = data.date;
        document.querySelector('.div').textContent = data.readingTime;
        document.querySelector('.kw').textContent = `${data.readingValue}`;
        document.querySelector('.div1').textContent = data.lastReadingTime;
        document.querySelector('.kw1').textContent = `${data.lastReadingValue}`;
        document.querySelector('.div2').textContent = data.lastReadingDate;

        // Update consumption breakdown
        const kwhElement = document.querySelector('.kwh');
        kwhElement.textContent = `${data.readingValue}`;

        const costElement = document.querySelector('.ghs-120');
        const calculatedCost = calculateCost(data.readingValue);
        costElement.textContent = calculatedCost;

        // Store the calculated cost in localStorage
        localStorage.setItem('totalConsumptionCost', calculatedCost);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;
