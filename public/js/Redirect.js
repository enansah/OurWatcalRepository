function goBack() {
    window.history.back();
  }
    var textButton1 = document.getElementById("textButton1");
    if (textButton1) {
      textButton1.addEventListener("click", function (e) {
          window.location.href = "Helpdesk.html";
      });
    }
    
    var textButton = document.getElementById("textButton");
    if (textButton) {
      textButton.addEventListener("click", function (e) {
          window.location.href = "Home.html";
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






    document.addEventListener('DOMContentLoaded', async function() {
        const tenantId = localStorage.getItem('tenantId');
      
        if (!tenantId) {
            console.error('Tenant ID not found in localStorage');
            return;
        }
      
        try {
            const response = await fetch('/api/viewTenantData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tenantId })
            });
      
            if (!response.ok) {
                console.error('Failed to fetch tenant data');
                return;
            }
      
            const tenantData = await response.json();
      
            const currentTime = new Date();
          // Retrieve the last visit time from local storage
            const lastVisitTime = localStorage.getItem('lastVisitTime');
            
            if (lastVisitTime) {
                // Convert the stored time back to a Date object
                const lastAccessTime = new Date(lastVisitTime);
                
                // Display the last access time as the last reading time
                document.querySelector('.last-reading-time-parent .div2').textContent = lastAccessTime.toLocaleTimeString();
            } else {
                // Handle the case where there is no stored last visit time
                document.querySelector('.last-reading-time-parent .div2').textContent = 'N/A';
            }
            
            // Store the current time in local storage
            localStorage.setItem('lastVisitTime', currentTime.toString());
            
            // Display current reading time as the current time
            document.querySelector('.reading-time-parent .div').textContent = currentTime.toLocaleTimeString();
      
            if (tenantData.readings.length >= 0) {
                const lastReading = tenantData.readings[tenantData.readings.length - 0];
                document.querySelector('.reading-value-parent .kwh').textContent = `${lastReading.readingValue}kWh`;
      
                const previousReading = tenantData.readings[tenantData.readings.length - 1];
                if (previousReading) {
                    document.querySelector('.last-reading-value-parent .kwh2').textContent = `${previousReading.readingValue}kWh`;
                } else {
                    document.querySelector('.last-reading-value-parent .kwh2').textContent = 'N/A';
                }
            } else {
                document.querySelector('.reading-value-parent .kwh').textContent = 'N/A';
                document.querySelector('.last-reading-value-parent .kwh2').textContent = 'N/A';
            }
      
            // Display daily percentage usage
            document.querySelector('.percentage .b').textContent = `${tenantData.dailyPercentageUsage || 0}%`;
      
            // Display daily cost
            document.querySelector('.daily-bills-ghs').textContent = `Daily bills: Ghs ${tenantData.dailyCost || 0}`;

            // Display total cost per two
            document.querySelector('.total-cost-per').textContent = `Total cost per month: Ghs ${tenantData.twoWeeksCost || 0}`;
      
            // Display total cost per month
            document.querySelector('.total-cost-per').textContent = `Total cost per month: Ghs ${tenantData.monthlyCost || 0}`;
      
            // Display room number
            document.querySelector('.welcome-to-your-dashboard-parent .username').textContent = tenantData.roomNumber;
      
            // Additional values
            document.querySelector('.date').nextElementSibling.querySelector('.empty-value').textContent = tenantData.readingDate ? new Date(tenantData.readingDate).toLocaleDateString() : 'N/A';
            document.querySelector('.last-reading-date-parent .div3').textContent = tenantData.lastReadingDate ? new Date(tenantData.lastReadingDate).toLocaleDateString() : 'N/A';
            document.querySelector('.monthly-reading-value-wrapper .kwh1').textContent = `${tenantData.monthlyReading || 0}kWh`;
            document.querySelector('.monthly-percentage-usage-parent .div1').textContent = `${tenantData.monthlyPercentageUsage || 0}%`;
      
        } catch (error) {
            console.error('Error fetching tenant data:', error);
        }
      });
      
      // Function to fetch data from the API
      async function fetchData(tenantId) {
          try {
            const response = await fetch('/api/viewTenantData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ tenantId })
            });
            const data = await response.json();
            if (!data.success) {
              console.error('API error:', data.message);
              return []; // Return an empty array in case of an error message
            }
            return data.readings;
          } catch (error) {
            console.error('Error fetching data:', error);
            return [];
          }
        }
        
        // Function to generate the chart
        async function generateChart() {
          // Obtain the tenantId from local storage
          const tenantId = localStorage.getItem('tenantId');
          if (!tenantId) {
            console.error('No tenantId found in local storage');
            return;
          }
        
          // Fetch the readings data
          const readings = await fetchData(tenantId);
        
          // Prepare the data for Chart.js
          let labels, dataValues;
          if (readings.length === 0) {
            // Dummy data for when there is no data
            labels = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10'];
            dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          } else {
            labels = readings.map((_, index) => `d${index + 1}`);
            dataValues = readings.map(reading => reading.readingValue);
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
        
          // Render the chart
          const myChart = new Chart(
            document.getElementById('myChart'),
            config
          );
        }
        
        // Wait for the DOM to fully load before generating the chart
        document.addEventListener('DOMContentLoaded', generateChart);
      