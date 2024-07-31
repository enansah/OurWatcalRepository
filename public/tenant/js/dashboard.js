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




// Function to fetch the username from the server
async function getUsername() {
    try {
        const response = await fetch('/api/tenantIsAuthenticated');
        const data = await response.json();
        if (response.ok && data.tenant && data.tenant.username) {
            return data.tenant.username;
        } else {
            console.error('Error: Invalid response data', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        return null;
    }
}

// Function to fetch data from the tenant API
async function fetchData(username) {
    try {
        const response = await fetch(`/api/tenant/${encodeURIComponent(username)}/data`);
        const data = await response.json();
        if (response.ok) {
            if (Array.isArray(data)) {
                return data;
            } else {
                console.error('Expected an array but received:', data);
                return [];
            }
        } else {
            console.error('API error:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to generate the chart
async function generateChart() {
    const username = await getUsername();
    if (!username) {
        console.error('No username found');
        return;
    }

    const readings = await fetchData(username);

    let labels, dataValues;
    if (readings.length === 0) {
        labels = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10'];
        dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
        labels = readings.map((reading, index) => `d${index + 1}`);
        dataValues = readings.map(reading => reading.value);
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'Meter Readings (kWh)',
            data: dataValues,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#06cc02',
            borderWidth: 2,
            fill: false
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 50,
                        callback: function(value) { return value + ' kWh'; },
                        color: '#ffffff'
                    },
                    grid: {
                        color: '#bfbfbf',
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Kilowatt-Hours (kWh)',
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: '#bfbfbf',
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: false,
                        callback: function(value) {
                            return labels[value];
                        },
                        color: '#ffffff'
                    },
                    title: {
                        display: true,
                        text: 'Days',
                        color: '#ffffff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

// Function to update the table data and chart
async function updatePageData() {
    const username = await getUsername();
    if (!username) {
        console.error('No username found');
        return;
    }

    try {
        const response = await fetch(`/api/tenant/${encodeURIComponent(username)}/data`);
        const data = await response.json();
        
        if (response.ok) {
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
            
            // Generate the chart
            await generateChart();
        } else {
            console.error('API error:', data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Initialize the page data and chart
window.onload = updatePageData;
