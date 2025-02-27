function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('overlay' + popupId.replace('popup', ''));
    const content = document.querySelector('.tent');

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
    const content = document.querySelector('.tent');

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

       
        


        
      
      













document.addEventListener('DOMContentLoaded', function() {
    async function checkAuth() {
        const response = await fetch('/api/landlordIsAuthenticated');
        const data = await response.json();

        if (!data.isAuthenticated) {
        window.location.href = '../Llogin.html';
        } else {
        document.getElementById('username').textContent = data.landlord.username;
        document.getElementById('panelUsername').textContent = data.landlord.username;
        document.getElementById('panelEmail').textContent = data.landlord.email;
        }
    }

    document.getElementById('openerBtnContainer').addEventListener('click', async function() {
        const response = await fetch('/api/landlordLogout', { method: 'POST' });

        if (response.ok) {
        window.location.href = '../Home.html';
        } else {
        alert('Logout failed');
        }
    });

    checkAuth();
});











// Main popup function
function mainpop(button) {
  const popup = document.getElementById('pop');
  const overlay = document.getElementById('over');
  const content = document.querySelector('.tent');

  overlay.style.display = 'flex';
  popup.style.display = 'block';
  content.classList.add('blur-background');
  document.body.classList.add('disable-scroll');
  document.body.classList.add('popup-open');

  const roomContainer = button.closest('.containers');
  const roomNumber = roomContainer.querySelector('.container-header').dataset.roomNumber;

  console.log('Room Number from button:', roomNumber);

  // Store room number in the popup for deletion
  if (roomNumber) {
    popup.dataset.roomNumber = roomNumber;
    console.log('Room number set in popup dataset:', popup.dataset.roomNumber);
  } else {
    console.error('Room number not found in button dataset');
    hide();
  }

  overlay.onclick = function() {
    hide();
  };
}

function hide() {
  const popup = document.getElementById('pop');
  const overlay = document.getElementById('over');
  const content = document.querySelector('.tent');

  overlay.style.display = 'none';
  popup.style.display = 'none';
  content.classList.remove('blur-background');
  document.body.classList.remove('disable-scroll');
  document.body.classList.remove('popup-open');
}

function showSuccessPopup() {
  const successPopup = document.getElementById('success-popup');
  successPopup.style.display = 'block';
}

function hideSuccessPopup() {
  const successPopup = document.getElementById('success-popup');
  successPopup.style.display = 'none';
}

// Add event listeners to the "Yes" and "No" buttons
document.addEventListener('DOMContentLoaded', () => {
  const yesButton = document.querySelector('.yes1');
  const noButton = document.querySelector('.no1');
  const closeButton = document.querySelector('.clo-icon');

  yesButton.addEventListener('click', async () => {
    const popup = document.getElementById('pop');
    const roomNumber = popup.dataset.roomNumber;

    console.log('Room number in popup dataset:', roomNumber);

    if (!roomNumber) {
      console.error('Room number not found in popup dataset');
      return;
    }

    try {
      const response = await fetch(`/api/room/${roomNumber}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const roomContainer = document.querySelector(`.containers .container-header[data-room-number="${roomNumber}"]`).closest('.containers');
        roomContainer.remove();
        hide();
        showSuccessPopup(); // Show success popup upon successful deletion
      } else {
        console.error('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  });

  noButton.addEventListener('click', hide);
  closeButton.addEventListener('click', hide);
});



















document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => {
        const containerWrapper = document.querySelector('.containers-wrapper');
        containerWrapper.innerHTML = '';
  
        // Calculate the total sum of readings
        const totalSum = data.reduce((sum, room) => {
          const lastReading = room.readings[room.readings.length - 1];
          return sum + (lastReading ? lastReading.readingValue : 0);
        }, 0);
  
        data.forEach(room => {
          const lastReading = room.readings[room.readings.length - 1];
          const currentDate = new Date().toLocaleDateString();
          const currentTime = new Date().toLocaleTimeString();
          const lastReadingDate = lastReading ? new Date(lastReading.timestamp).toLocaleDateString() : 'N/A';
          const lastReadingTime = lastReading ? new Date(lastReading.timestamp).toLocaleTimeString() : 'N/A';
          const lastReadingValue = lastReading ? lastReading.readingValue : 0;
          const cost = calculateCost(lastReadingValue);
          const percentage = totalSum ? ((lastReadingValue / totalSum) * 100).toFixed(1) : 0;
          const uniqueRoomId = room.uniqueRoomId;
  
          const container = document.createElement('div');
          container.className = 'containers';
          container.innerHTML = `
          <div class="container-header" data-room-number=${room.roomNumber}>
           <div class="container-header-inner">
            <div class="room-name-parent">
              <h2 class="room-name">${room.roomNumber}</h2> <!--Display room name here-->
              <div class="room-name-value">
                <div class="div">TenantID- ${uniqueRoomId}</div>
              </div>
              <div class="frame-parent">
                <div class="rectangle-parent">
                  <div class="frame-child"></div>
                  <img
                    class="eye-regular-1-icon"
                    loading="lazy"
                    alt=""
                    src="./images/look.svg"
                  />
                </div>
                <div class="rectangle-group" onclick="showPopup('popup2')">
                  <div class="frame-item"></div>
                  <img
                    class="download-solid-1-icon"
                    loading="lazy"
                    alt=""
                    src="./images/download.svg"
                  />
                </div>
                <div class="rectangle-container" onclick="mainpop(this)">
                  <div class="frame-inner"></div>
                  <img
                    class="trash-can-regular-1-icon"
                    loading="lazy"
                    alt=""
                    src="./images/del.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="data-list">
            <div class="frame-group">
              <div class="container-card-wrapper">
                <div class="container-card">
                  <div class="toggle-value">
                    <h1 class="container">container</h1>
                    <div class="togglebtn1-wrapper" data-roomIds="${room._id}">
                      <div class="togglebtn1">
                        <div class="on">ON</div>
                      </div>
                    </div>
                    <div class="downloadbtn" onclick="showPopup('popup2')" style="border: 0;">
                      <img class="downloadbtn-child" loading="lazy" alt="" src="./images/DownloadBtn.png" />
                      <div class="export">Export</div>
                    </div>
                  </div>
                  <div class="container-data-wrapper">
                    <div class="container-data">
                      <div class="line"></div>
                      <div class="reading-values-wrapper">
                        <div class="reading-values">
                          <div class="date">Date :</div>
                          <div class="reading-labels">
                            <div class="empty-k-w">${currentDate}</div>
                          </div>
                        </div>
                      </div>
                      <div class="line1"></div>
                      <div class="container-data-inner">
                        <div class="reading-time-parent">
                          <div class="reading-time">Reading_time :</div>
                          <div class="div1">${currentTime}</div>
                        </div>
                      </div>
                      <div class="line2"></div>
                      <div class="container-data-child">
                        <div class="reading-value-parent">
                          <div class="reading-value">Reading_value :</div>
                          <div class="kw">${lastReadingValue} kWh</div>
                        </div>
                      </div>
                      <div class="line3"></div>
                      <div class="frame-div">
                        <div class="last-reading-time-parent">
                          <div class="last-reading-time">Last_reading_time :</div>
                          <div class="wrapper">
                            <div class="div2">${lastReadingTime}</div>
                          </div>
                        </div>
                      </div>
                      <div class="line4"></div>
                      <div class="container-data-inner1">
                        <div class="last-reading-value-parent">
                          <div class="last-reading-value">Last_reading_value :</div>
                          <b class="kw1">${lastReadingValue} kWh</b>
                        </div>
                      </div>
                      <div class="line5"></div>
                      <div class="container-data-inner2">
                        <div class="last-reading-date-parent">
                          <div class="last-reading-date">Last_reading_date :</div>
                          <div class="frame">
                            <div class="div3">${lastReadingDate}</div>
                          </div>
                        </div>
                      </div>
                      <div class="line6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-container">
                <div class="execution-recommendation-patte-wrapper">
                  <h2 class="execution-recommendation-patte-container">
                    <p class="execution-recommendation">
                      Execution Recommendation
                    </p>
                    <p class="pattern">Pattern</p>
                  </h2>
                </div>
                <div class="frame-parent1">
                  <div class="group-div">
                    <div class="rectangle-div"></div>
                    <div class="graph-columns">
                      <div class="day-names-row">
                        <div class="sunday">Sunday</div>
                        <div class="graph-days">
                          <b class="june">10 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-12h">N/A</div>
                  </div>
                  <div class="vector-parent">
                    <img
                      class="rectangle-icon"
                      alt=""
                      src="./public/rectangle-32.svg"
                    />

                    <div class="frame-wrapper">
                      <div class="monday-parent">
                        <div class="monday">Monday</div>
                        <div class="june-wrapper">
                          <b class="june1">11 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h">N/A</div>
                  </div>
                  <div class="rectangle-parent1">
                    <div class="frame-child1"></div>
                    <div class="frame-wrapper1">
                      <div class="tuesday-parent">
                        <div class="tuesday">Tuesday</div>
                        <div class="june-container">
                          <b class="june2">13 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h1">N/A</div>
                  </div>
                  <div class="selected-date">
                    <div class="date-highlight"></div>
                    <b class="june3">14 June</b>
                    <div class="wednesday">Wednesday</div>
                    <div class="h-10h2">N/A</div>
                  </div>
                  <div class="calendar-grid">
                    <div class="calendar-grid-child"></div>
                    <div class="calendar-grid-inner">
                      <div class="thursday-parent">
                        <div class="thursday">Thursday</div>
                        <div class="june-frame">
                          <b class="june4">15 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h3">N/A</div>
                  </div>
                  <div class="calendar-grid1">
                    <div class="calendar-grid-item"></div>
                    <div class="calendar-grid-inner1">
                      <div class="friday-parent">
                        <div class="friday">Friday</div>
                        <div class="june-wrapper1">
                          <b class="june5">16 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-15h">N/A</div>
                  </div>
                  <div class="calendar-grid2">
                    <div class="calendar-grid-child1"></div>
                    <div class="calendar-grid-inner2">
                      <div class="saturday-parent">
                        <div class="saturday">Saturday</div>
                        <div class="june-wrapper2">
                          <b class="june6">17 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-18h">N/A</div>
                  </div>
                  <div class="calendar-grid3">
                    <div class="calendar-grid-child2"></div>
                    <div class="calendar-grid-inner3">
                      <div class="sunday-parent">
                        <div class="sunday1">Sunday</div>
                        <div class="june-wrapper3">
                          <b class="june7">18 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-12h1">N/A</div>
                  </div>
                  <div class="calendar-grid4">
                    <img
                      class="calendar-grid-child3"
                      alt=""
                      src="./public/rectangle-32.svg"
                    />

                    <div class="calendar-grid-inner4">
                      <div class="monday-group">
                        <div class="monday1">Monday</div>
                        <div class="june-wrapper4">
                          <b class="june8">19 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h4">N/A</div>
                  </div>
                  <div class="calendar-grid5">
                    <div class="calendar-grid-child4"></div>
                    <div class="calendar-grid-inner5">
                      <div class="tuesday-group">
                        <div class="tuesday1">Tuesday</div>
                        <div class="june-wrapper5">
                          <b class="june9">20 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h5">N/A</div>
                  </div>
                  <div class="calendar-grid6">
                    <div class="calendar-grid-child5"></div>
                    <div class="calendar-grid-inner6">
                      <div class="wednesday-parent">
                        <div class="wednesday1">Wednesday</div>
                        <div class="june-wrapper6">
                          <b class="june10">21 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h6">N/A</div>
                  </div>
                  <div class="calendar-grid7">
                    <div class="calendar-grid-child6"></div>
                    <div class="calendar-grid-inner7">
                      <div class="thursday-group">
                        <div class="thursday1">Thursday</div>
                        <div class="june-wrapper7">
                          <b class="june11">22 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-10h7">N/A</div>
                  </div>
                  <div class="calendar-grid8">
                    <div class="calendar-grid-child7"></div>
                    <div class="calendar-grid-inner8">
                      <div class="friday-group">
                        <div class="friday1">Friday</div>
                        <div class="june-wrapper8">
                          <b class="june12">23 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-15h1">N/A</div>
                  </div>
                  <div class="calendar-grid9">
                    <div class="calendar-grid-child8"></div>
                    <div class="calendar-grid-inner9">
                      <div class="saturday-group">
                        <div class="saturday1">Saturday</div>
                        <div class="june-wrapper9">
                          <b class="june13">24 June</b>
                        </div>
                      </div>
                    </div>
                    <div class="h-18h1">N/A</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-summary">
              <div class="usage-summary-parent">
                <div class="usage-summary">
                  <h1 class="percentage-usage">Percentage Usage</h1>
                </div>

                <!-- graph -->
                <div class="chart-content">
                  <div class="dash">
                    <h2 class="total-electricity-consumption">
                      Total electricity consumption
                    </h2>
                    <div class="chart-container">
                      <div class="chart">
                        <div class="chart-area">
                          <div class="chart-axis">
                            <div class="grid-label">1000</div>
                            <div class="horizontal-axis">
                              <div class="y-axis-label">750</div>
                            </div>
                            <div class="div4">500</div>
                            <div class="div5">250</div>
                            <div class="target-value">0</div>
                          </div>
                          <div class="data-visualization">
                            <div class="graph-axis">
                              <img
                                class="energy-bar-icon"
                                loading="lazy"
                                alt=""
                                src="./images/d.png"
                              />

                              <div class="weekday-label-parent">
                                <img
                                  class="weekday-label-icon"
                                  alt=""
                                  src="./images/d.png"
                                />

                                <div class="fourth-point">
                                  <img
                                    class="percentage-label-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./public/dc"
                                  />

                                  <img
                                    class="vector-icon"
                                    alt=""
                                    src="./public/dc"
                                  />

                                  
                                </div>
                                <img
                                  class="previous-bar-icon"
                                  loading="lazy"
                                  alt=""
                                  src="./images/d.png"
                                />

                                <img
                                  class="group-icon"
                                  loading="lazy"
                                  alt=""
                                  src="./images/grid.png"
                                />

                                <div class="remaining-data-points">
                                  <img
                                    class="weekdays-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon1"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon2"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon3"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon4"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon5"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon6"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon7"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon8"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon9"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon10"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="weekdays-icon11"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <img
                                    class="group-icon1"
                                    alt=""
                                    src="./images/bluedots.png"
                                  />
                                </div>
                                <img
                                  class="group-icon2"
                                  alt=""
                                  src="./images/reddots.png"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="chart-legend">
                          <div class="legend-items">
                            <div class="legend-values">
                              <div class="blank-placeholder">0</div>
                            </div>
                            <div class="blank-placeholder1">1</div>
                            <div class="blank-placeholder2">2</div>
                            <div class="blank-placeholder3">3</div>
                            <div class="blank-placeholder4">4</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="percentage-summary">
                    <div class="percentage">
                      <b class="percentage-number">${percentage}%</b>
                      <div class="togglebtn1-wrapper" data-roomIds="${room._id}">
                      <div class="togglebtn1">
                        <div class="on">ON</div>
                      </div>
                      </div>
                      <div class="price">
                        <b class="ghs-120">Gh₵${cost}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
  
          containerWrapper.appendChild(container);
          
           ///For container dropdown
          const rectangleParent = container.querySelector('.rectangle-parent');
        const chartSummary = container.querySelector('.chart-summary');
        chartSummary.style.display = 'none'; // Initially hide chart-summary
        rectangleParent.addEventListener('click', () => {
          chartSummary.style.display = chartSummary.style.display === 'none' ? 'block' : 'none';
        });
      });
          // Initialize toggles
          initializeToggles();

        // Update date and day elements
          updateDateAndDay();
      })
      .catch(error => console.error('Error fetching rooms:', error));
    });

  
  // Define tier rates for cost calculation
  const tierRates = [
      { upperLimit: 50, rate: 0.00 },     // Tier 1 (Lifeline)
      { upperLimit: 150, rate: 0.2460 },  // Tier 2
      { upperLimit: 300, rate: 0.3409 },  // Tier 3
      { upperLimit: 600, rate: 0.4642 },  // Tier 4
      { upperLimit: 1000, rate: 0.5693 }, // Tier 5
      { upperLimit: Infinity, rate: 0.6758 } // Tier 6
  ];
  
  // Function to calculate cost based on consumption
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
  
      return cost.toFixed(2); // Return as string formatted to two decimal places
  }
  

  // Function to update date and day elements
  const updateDateAndDay = () => {
    // Get today's date
    let today = new Date();

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
  };



   // Function to initialize toggles
   const initializeToggles = () => {
    const toggles = document.querySelectorAll('.togglebtn1-wrapper');

    toggles.forEach(toggle => {
        const roomIds = toggle.getAttribute('data-roomIds');
        let isOn = localStorage.getItem(`roomIds_${roomIds}_status`) !== 'OFF'; // Check local storage for saved state, default is ON
        toggle.classList.toggle('off', !isOn); // Initialize toggle state based on local storage
        toggle.querySelector('.on').textContent = isOn ? 'ON' : 'OFF'; // Set initial text

        toggle.addEventListener('click', function () {
            isOn = !isOn;
            localStorage.setItem(`roomIds_${roomIds}_status`, isOn ? 'ON' : 'OFF'); // Save state to local storage
            this.classList.toggle('off', !isOn); // Toggle class
            this.querySelector('.on').textContent = isOn ? 'ON' : 'OFF'; // Update text

            // Call the function to update the electricity status
            updateElectricityStatus(roomIds, !isOn); // Pass opposite of current state
        });
    });
};
  
  // Function to update electricity status
  const updateElectricityStatus = (roomIds, disconnect) => {
    fetch(`/api/updateElectricityStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomIds, disconnect })
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Electricity status for roomIds ${roomIds}: ${disconnect ? 'Disconnected' : 'Connected'}`);
    })
    .catch(error => {
      console.error('Error updating electricity status:', error);
    });
  };