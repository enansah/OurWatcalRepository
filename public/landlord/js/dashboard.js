
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

function toggleInfo(button) {
    // Find the closest container to the button that was clicked
    const container = button.closest('.containers');
    // Find the container-content div just beneath the container
    const contentDiv = container.querySelector('.container-content');

    // Toggle the display of the content div
    if (contentDiv.style.display === 'none' || contentDiv.style.display === '') {
        contentDiv.style.display = 'block';
    } else {
        contentDiv.style.display = 'none';
    }
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

var group = document.getElementById("group");
if (group) {
group.addEventListener("click", function (e) {
    window.location.href = "EditProfile.html";
});
}

var dbtnContainer = document.getElementById("dbtnContainer");
if (dbtnContainer) {
dbtnContainer.addEventListener("click", function (e) {
    window.location.href = "Dashboard.html";
});
}

var pienabtnContainer = document.getElementById("pienabtnContainer");
if (pienabtnContainer) {
pienabtnContainer.addEventListener("click", function (e) {
    window.location.href = "Analysis.html";
});
}

var mousebtnContainer = document.getElementById("mousebtnContainer");
if (mousebtnContainer) {
mousebtnContainer.addEventListener("click", function (e) {
    window.location.href = "Settings.html";
});
}

var trendbtnContainer = document.getElementById("trendbtnContainer");
if (trendbtnContainer) {
trendbtnContainer.addEventListener("click", function (e) {
    window.location.href = "History.html";
});
}

var openerBtnContainer = document.getElementById("openerBtnContainer");
if (openerBtnContainer) {
openerBtnContainer.addEventListener("click", function (e) {
    window.location.href = "../Home.html";
});
}
var pay = document.getElementById("pay");
if (pay) {
    pay.addEventListener("click", function (e) {
    window.location.href = "Payment.html";
});
}












document.addEventListener('DOMContentLoaded', async function() {
    // Get today's date
    let today = new Date();

    // Array of day names in order
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Array of elements to update in descending order
    const dateElements = [
        { dateClass: '.june', dayClass: '.sunday', readingClass: '.h-12h' },
        { dateClass: '.june1', dayClass: '.monday', readingClass: '.h-10h' },
        { dateClass: '.june2', dayClass: '.tuesday', readingClass: '.h-10h1' },
        { dateClass: '.june3', dayClass: '.wednesday', readingClass: '.h-10h2' },
        { dateClass: '.june4', dayClass: '.thursday', readingClass: '.h-10h3' },
        { dateClass: '.june5', dayClass: '.friday', readingClass: '.h-15h' },
        { dateClass: '.june6', dayClass: '.saturday', readingClass: '.h-18h' },
        { dateClass: '.june7', dayClass: '.sunday1', readingClass: '.h-12h1' },
        { dateClass: '.june8', dayClass: '.monday1', readingClass: '.h-10h4' },
        { dateClass: '.june9', dayClass: '.tuesday1', readingClass: '.h-10h5' },
        { dateClass: '.june10', dayClass: '.wednesday1', readingClass: '.h-10h6' },
        { dateClass: '.june11', dayClass: '.thursday1', readingClass: '.h-10h7' },
        { dateClass: '.june12', dayClass: '.friday1', readingClass: '.h-15h1' },
        { dateClass: '.june13', dayClass: '.saturday1', readingClass: '.h-18h1' }
    ];

    // Get username from local storage
    const landlordUsername = localStorage.getItem('username');
    if (!landlordUsername) {
        console.error('Username not found in local storage');
        return;
    }

    // Fetch readings for the last 14 days
    let readings = await fetchReadingsForLast14Days(landlordUsername);

    dateElements.forEach((element, index) => {
        let dateElement = document.querySelector(element.dateClass);
        let dayElement = document.querySelector(element.dayClass);
        let readingElement = document.querySelector(element.readingClass);

        if (dateElement && dayElement && readingElement) {
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

            // Update the reading value
            let reading = readings[index] ? `${readings[index]} kWh` : 'N/A';
            readingElement.innerText = reading;
        }
    });
});

async function fetchReadingsForLast14Days(username) {
    try {
        let response = await fetch(`/api/readings/last14days?username=${username}`);
        if (response.ok) {
            let data = await response.json();
            return data.readings;
        } else {
            console.error('Failed to fetch readings:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching readings:', error);
        return [];
    }
}


  
















async function fetchTotalReadingAndCost() {
    const username = localStorage.getItem('username'); // Assuming the username is stored in local storage

    if (!username) {
        console.error('Username is not available in local storage');
        return;
    }
    

    try {
      
        const response = await fetch(`/api/rooms/total?username=${encodeURIComponent(username)}`);
        const data = await response.json();

        const totalReading = data.totalReading !== undefined ? `${data.totalReading}kWh` : '0kWh';
        const totalCost = data.totalCost !== undefined ? data.totalCost : 'GHs 0.00';

        document.querySelector('.kwh').textContent = totalReading;
        document.querySelector('.ghs-120').textContent = totalCost;
    } catch (error) {
        console.error('Error fetching total reading and cost:', error);
    }
}

// Initialize data fetch on page load
document.addEventListener('DOMContentLoaded', fetchTotalReadingAndCost);













document.addEventListener('DOMContentLoaded', function() {
    async function checkAuth() {
        try {
            const response = await fetch('/api/landlordIsAuthenticated');
            const data = await response.json();

            if (!data.isAuthenticated) {
                window.location.href = '../Llogin.html';
            } else {
                const { username, email, uniqueId } = data.landlord;

                // Save username in local storage
                localStorage.setItem('username', username);

                  // Save uniqueId in local storage
                localStorage.setItem('uniqueId', uniqueId);

                // Update the UI
                document.getElementById('username').textContent = username;
                document.getElementById('panelUsername').textContent = username;
                document.getElementById('panelEmail').textContent = email;
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    }

    document.getElementById('openerBtnContainer').addEventListener('click', async function() {
        try {
            const response = await fetch('/api/landlordLogout', { method: 'POST' });

            if (response.ok) {
                // Clear the username from local storage on logout
                localStorage.removeItem('username');
                window.location.href = '../Home.html';
            } else {
                alert('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    });

    checkAuth();
});













// Function to fetch data from the API
async function fetchData(username) {
    try {
      const response = await fetch(`/api/rooms/total?username=${encodeURIComponent(username)}`);
      const data = await response.json();
      if (data.message) {
        console.error('API error:', data.message);
        return []; // Return an empty array in case of an error message
      }
      if (!Array.isArray(data)) {
        console.error('Expected an array but received:', data);
        return [];
      }
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Function to generate the chart
  async function generateChart() {
    // Obtain the username from local storage
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('No username found in local storage');
      return;
    }
  
    // Fetch the readings data
    const readings = await fetchData(username);
  
    // Prepare the data for Chart.js
    let labels, dataValues;
    if (readings.length === 0) {
      // Dummy data for when there is no data
      labels = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h']; // Extended labels
      dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
      labels = readings.map((reading, index) => `${index + 1}h`); // Label x-axis as hours
      dataValues = readings.map(reading => reading.value); // Adjust according to your data structure
    }
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Meter Readings (kWh)',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#06cc02', // Line color for plotting readings
        borderWidth: 2,
        fill: false
      }]
    };
  
    const config = {
      type: 'line', // Use line chart to plot the readings
      data: data,
      options: {
        responsive: true, // Make chart responsive to container size
        maintainAspectRatio: false, // Allow the chart to fit the container size
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50, // Set y-axis labels to be multiples of 50
              callback: function(value) { return value + ' kWh'; }, // Add ' kWh' to y-axis labels
              color: '#ffffff' // Set y-axis label color to white
            },
            grid: {
              color: '#bfbfbf', // Set grid line color to #bfbfbf
              drawBorder: false // Remove border for cleaner grid
            },
            title: {
              display: true,
              text: 'Kilowatt-Hours (kWh)',
              color: '#ffffff' // Set y-axis title color to white
            }
          },
          x: {
            grid: {
              color: '#bfbfbf', // Set grid line color to #bfbfbf
            },
            ticks: {
              maxRotation: 0, // Ensure labels are not rotated
              autoSkip: false, // Show all labels
              callback: function(value) {
                return labels[value]; // Use labels array to display x-axis labels
              },
              color: '#ffffff' // Set x-axis label color to white
            },
            title: {
              display: true,
              text: 'Hours',
              color: '#ffffff' // Set x-axis title color to white
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffffff' // Set the legend label color to white
            }
          }
        }
      }
    };
  
    // Render the chart
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  }
  
  // Wait for the DOM to fully load before generating the chart
  document.addEventListener('DOMContentLoaded', generateChart);
  