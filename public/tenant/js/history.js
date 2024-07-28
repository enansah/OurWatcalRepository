let historyUsername = " ";

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
        historyUsername = data.tenant.username;
        // console.log(historyUsername);
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
    content.classList.add('content-blur-background');
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
    content.classList.remove('contentcontent-blur-background');
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












document.addEventListener('DOMContentLoaded', async function() {

    const currentYear = new Date().getFullYear();
    const months = [
        { name: 'January', class: 'jan-btn' },
        { name: 'February', class: 'feb-btn' },
        { name: 'March', class: 'mar-btn' },
        { name: 'April', class: 'apr-btn' },
        { name: 'May', class: 'may-btn' },
        { name: 'June', class: 'jun-btn' },
        { name: 'July', class: 'jul-btn' },
        { name: 'August', class: 'aug-btn' },
        { name: 'September', class: 'sep-btn' },
        { name: 'October', class: 'oct-btn' },
        { name: 'November', class: 'nvo-btn' },
        { name: 'December', class: 'dec-btn' }
    ];

    const monthButtonsContainer = document.getElementById('month-buttons');

    months.forEach(({ name, class: monthClass }) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = monthClass;

        const monthButton = document.createElement('b');
        monthButton.className = `${name.toLowerCase()}-${currentYear}`;
        monthButton.textContent = `${name}, ${currentYear}`;

        monthDiv.appendChild(monthButton);
        monthButtonsContainer.appendChild(monthDiv);
    });

    monthButtonsContainer.addEventListener('click', async function(event) {
        const target = event.target;
        if (target.tagName === 'B') {
            const [month] = target.className.split('-');
            try {
                if (!historyUsername) {
                    console.error('Tenant not authenticated');
                    return;
                }
                console.log(month);
                // Fetch and display monthly history
                await fetchMonthlyHistory(historyUsername, month, currentYear);
                // Generate chart for the selected month
                await generateMonthlyChart(historyUsername, month, currentYear);
            } catch (error) {
                console.error('Error fetching tenant information:', error);
            }
        }
    });

    async function fetchMonthlyHistory(username, month, year) {
        try {
            const response = await fetch(`/api/tenant-history/${username}/${month}/${year}`);
            const data = await response.json();
            console.log('Fetched monthly history data:', data);

            document.querySelector('.empty-units').textContent = data.date;
            document.querySelector('.div').textContent = data.readingTime;
            document.querySelector('.kw').textContent = `${data.readingValue}`;
            document.querySelector('.div1').textContent = data.lastReadingTime;
            document.querySelector('.kw1').textContent = `${data.lastReadingValue}`;
            document.querySelector('.div2').textContent = data.lastReadingDate;
            document.querySelector('.kwh').textContent = data.kwh;
            document.querySelector('.ghs-120').textContent = data.cost;
        } catch (error) {
            console.error('Error fetching monthly history:', error);
        }
    }

    let chartInstance = null; // Variable to keep track of the current chart instance

    async function generateMonthlyChart(username, month, year) {
        try {
            const response = await fetch(`/api/tenant-history/${username}/${month}/${year}`);
            const data = await response.json();
            
            let labels, dataValues;
            if (!Array.isArray(data.readings) || data.readings.length === 0) {
                labels = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h'];
                dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            } else {
                labels = data.readings.map((_, index) => `${index + 1}h`);
                dataValues = data.readings.map(reading => reading.value);
            }

            const chartData = {
                labels: labels,
                datasets: [{
                    label: 'Monthly Meter Readings (kWh)',
                    data: dataValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: '#06cc02',
                    borderWidth: 2,
                    fill: false
                }]
            };

            const chartConfig = {
                type: 'line',
                data: chartData,
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
                                text: 'Hours',
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

            // Get the canvas context
            const ctx = document.getElementById('myChart').getContext('2d');

            // Destroy the existing chart instance if it exists
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Create a new chart instance
            chartInstance = new Chart(ctx, chartConfig);
        } catch (error) {
            console.error('Error generating monthly chart:', error);
        }
    }
});
