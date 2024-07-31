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
    const contentDiv = container.querySelector('.containers-inner');

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























// Main popup function
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
  const roomNumber = roomContainer.querySelector('.room-name').textContent;
  const month = roomContainer.querySelector('.month').textContent;
  const year = roomContainer.dataset.year;

  // Store room details in the popup for deletion
  roomDiv.dataset.roomNumber = roomNumber;
  roomDiv.dataset.month = month;
  roomDiv.dataset.year = year;

  console.log('Room Number:', roomNumber);
  console.log('Month:', month);
  console.log('Year:', year);

  if (!roomNumber || !month || !year) {
    console.error('Missing room number, month, or year in dataset');
    return;
  }


  overlay.onclick = function() {
    hide();
  };
}

// Function to hide the popup
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

// Add event listeners to the "Yes" and "No" buttons
document.addEventListener('DOMContentLoaded', () => {
  const yesButton = document.querySelector('.yes1');
  const noButton = document.querySelector('.no1');
  const closeButton = document.querySelector('.clo-icon');

  yesButton.addEventListener('click', async () => {
    const popup = document.getElementById('pop');
    const roomNumber = popup.dataset.roomNumber;
    const month = popup.dataset.month;
    const year = popup.dataset.year;
    const username = localStorage.getItem('username'); // Assuming the username is stored in local storage upon login

    try {
      const response = await fetch(`/api/deleteRoomHistory/${roomNumber}/${month}/${year}?username=${encodeURIComponent(username)}`, {
        method: 'DELETE'
      });

      console.log(roomNumber, month, year);

      if (response.ok) {
        const roomContainer = document.querySelector(`.containers .room-name:contains("${roomNumber}")`).closest('.containers');
        roomContainer.remove();
        hide();
      } else {
        console.error('Failed to delete room history');
      }
    } catch (error) {
      console.error('Error deleting room history:', error);
    }
  });

  noButton.addEventListener('click', hide);
  closeButton.addEventListener('click', hide);
});
































document.addEventListener('DOMContentLoaded', function() {
  
    const currentYear = new Date().getFullYear();
    const months = [
        { name: 'January', class: 'janbtn' },
        { name: 'February', class: 'febbtn' },
        { name: 'March', class: 'marbtn' },
        { name: 'April', class: 'aprbtn' },
        { name: 'May', class: 'maybtn' },
        { name: 'June', class: 'junbtn' },
        { name: 'July', class: 'julbtn' },
        { name: 'August', class: 'augbtn' },
        { name: 'September', class: 'sepbtn' },
        { name: 'October', class: 'octbtn' },
        { name: 'November', class: 'nvobtn' },
        { name: 'December', class: 'decbtn' }
    ];

    const monthButtonsContainer = document.getElementById('month-buttons');

    // Generate month buttons
    months.forEach(({ name, class: monthClass }) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = monthClass;

        const monthButton = document.createElement('b');
        monthButton.className = `${name.toLowerCase()}-${currentYear}`;
        monthButton.textContent = `${name}, ${currentYear}`;
        monthButton.addEventListener('click', () => {
            fetchRoomDataForMonth(name, currentYear);
        });

        monthDiv.appendChild(monthButton);
        monthButtonsContainer.appendChild(monthDiv);
    });

    // Function to fetch and display room data for the selected month
    async function fetchRoomDataForMonth(month, year) {
      const username = localStorage.getItem('username'); // Assuming the username is stored in local storage upon login
      try {
          const response = await fetch(`/api/totalReadingCost/${month}/${currentYear}?username=${encodeURIComponent(username)}`);
          const roomData = await response.json();
  
          displayRoomData(roomData, month, year);
      } catch (error) {
          console.error('Error fetching room data:', error);
      }
  }
  
  // Function to display room data
  function displayRoomData(data, month, year) {
      const containers = document.getElementById('containers');
      containers.innerHTML = ''; // Clear existing data
  
      data.forEach(room => {
          const roomDiv = document.createElement('div');
          roomDiv.className = 'containers';
  
          // Add data attributes to the container
          roomDiv.dataset.roomNumber = room.roomNumber;
          roomDiv.dataset.month = month;
          roomDiv.dataset.year = year;
  
          // Debugging statements
          console.log('Room Number:', roomDiv.dataset.roomNumber);
          console.log('Month:', roomDiv.dataset.month);
          console.log('Year:', roomDiv.dataset.year);
  
          // Populate the roomDiv with room data
          roomDiv.innerHTML = `
           <div class="room-name-parent">
              <b class="room-name">${room.roomNumber}</b>
              <div class="june-wrapper">
                <div class="month">${month}</div>
              </div>
              <div class="frame-group">
                <div class="rectangle-parent"  onclick="toggleInfo(this)">
                  <div class="frame-item"></div>
                  <img
                    class="eye-regular-1-icon"
                    loading="lazy"
                    alt=""
                    src="./images/look.svg"
                  />
                </div>
                <div class="rectangle-group"  onclick="showPopup('popup2')">
                  <div class="frame-inner"></div>
                  <img
                    class="download-solid-1-icon"
                    loading="lazy"
                    alt=""
                    src="./images/download.svg"
                  />
                </div>
                <div class="rectangle-container" onclick="mainpop(this)">
                  <div class="rectangle-div"></div>
                  <img
                    class="trash-can-regular-1-icon"
                    loading="lazy"
                    alt=""
                    src="./images/del.svg"
                  />
                </div>
              </div>
            </div>
            <div class="containers-inner">
              <div class="frame-container">
                <div class="container-data-parent">
                  <div class="container-data">
                    <div class="container-parent">
                      <h3 class="container">container</h3>
                      <button class="downloadbtn" onclick="showPopup('popup2')" style="border: 0;">
                        <img
                          class="downloadbtn-child"
                          alt=""
                          ./images/DownloadBtn.png
                        />

                        <div class="export">Export</div>
                      </button>
                      <div class="reading-headers-parent">
                        <div class="reading-headers"></div>
                        <div class="reading-headers1">
                          <div class="reading-header-labels">
                            <div class="date">Date :</div>
                            <div class="reading-header-units">
                              <div class="empty-k-w">${room.date}</div>
                            </div>
                          </div>
                        </div>
                        <div class="reading-headers2"></div>
                        <div class="reading-headers3">
                          <div class="reading-time-parent">
                            <div class="reading-time">Reading_time :</div>
                            <div class="div1">${room.time}</div>
                          </div>
                        </div>
                        <div class="reading-headers4"></div>
                        <div class="reading-headers5">
                          <div class="reading-value-parent">
                            <div class="reading-value">Reading_value :</div>
                            <div class="kw">${room.value}kWh</div>
                          </div>
                        </div>
                        <div class="reading-headers6"></div>
                        <div class="reading-headers7">
                          <div class="last-reading-time-parent">
                            <div class="last-reading-time">
                              Last_reading_time :
                            </div>
                            <div class="wrapper">
                              <div class="div2">N/A</div>
                            </div>
                          </div>
                        </div>
                        <div class="reading-headers8"></div>
                        <div class="reading-headers9">
                          <div class="last-reading-value-parent">
                            <div class="last-reading-value">
                              Last_reading_value :
                            </div>
                            <b class="kw1">N/A</b>
                          </div>
                        </div>
                        <div class="reading-headers10"></div>
                        <div class="reading-headers11">
                          <div class="last-reading-date-parent">
                            <div class="last-reading-date">
                              Last_reading_date :
                            </div>
                            <div class="frame">
                              <div class="div3">N/A</div>
                            </div>
                          </div>
                        </div>
                        <div class="reading-headers12"></div>
                      </div>
                    </div>
                  </div>
                  <div class="frame-div">
                    <div class="execution-recommendation-patte-wrapper">
                      <div class="execution-recommendation-patte-container">
                        <p class="execution-recommendation">
                          Consumption & Recommendation
                        </p>
                        <p class="pattern">Pattern</p>
                      </div>
                    </div>
                    <div class="frame-parent1">
                      <div class="group-div">
                        <div class="frame-child1"></div>
                        <div class="schedule-days">
                          <div class="schedule-hours">
                            <div class="sunday">Sunday</div>
                            <div class="day-labels">
                              <b class="june1">10 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-12h">N/A</div>
                      </div>
                      <div class="vector-parent">
                        <img
                          class="rectangle-icon"
                          alt=""
                        />

                        <div class="frame-wrapper">
                          <div class="monday-parent">
                            <div class="monday">Monday</div>
                            <div class="june-container">
                              <b class="june2">11 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h">N/A</div>
                      </div>
                      <div class="rectangle-parent1">
                        <div class="frame-child2"></div>
                        <div class="frame-wrapper1">
                          <div class="tuesday-parent">
                            <div class="tuesday">Tuesday</div>
                            <div class="june-frame">
                              <b class="june3">13 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h1">N/A</div>
                      </div>
                      <div class="current-day-background-parent">
                        <div class="current-day-background"></div>
                        <b class="june4">14 June</b>
                        <div class="wednesday">Wednesday</div>
                        <div class="h-10h2">N/A</div>
                      </div>
                      <div class="week-schedule">
                        <div class="week-schedule-child"></div>
                        <div class="week-schedule-inner">
                          <div class="thursday-parent">
                            <div class="thursday">Thursday</div>
                            <div class="june-wrapper1">
                              <b class="june5">15 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h3">N/A</div>
                      </div>
                      <div class="week-schedule1">
                        <div class="week-schedule-item"></div>
                        <div class="week-schedule-inner1">
                          <div class="friday-parent">
                            <div class="friday">Friday</div>
                            <div class="june-wrapper2">
                              <b class="june6">16 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-15h">N/A</div>
                      </div>
                      <div class="week-schedule2">
                        <div class="week-schedule-child1"></div>
                        <div class="week-schedule-inner2">
                          <div class="saturday-parent">
                            <div class="saturday">Saturday</div>
                            <div class="june-wrapper3">
                              <b class="june7">17 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-18h">N/A</div>
                      </div>
                      <div class="week-schedule3">
                        <div class="week-schedule-child2"></div>
                        <div class="week-schedule-inner3">
                          <div class="sunday-parent">
                            <div class="sunday1">Sunday</div>
                            <div class="june-wrapper4">
                              <b class="june8">18 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-12h1">N/A</div>
                      </div>
                      <div class="week-schedule4">
                        <img
                          class="week-schedule-child3"
                          alt=""
                        />

                        <div class="week-schedule-inner4">
                          <div class="monday-group">
                            <div class="monday1">Monday</div>
                            <div class="june-wrapper5">
                              <b class="june9">19 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h4">N/A</div>
                      </div>
                      <div class="week-schedule5">
                        <div class="week-schedule-child4"></div>
                        <div class="week-schedule-inner5">
                          <div class="tuesday-group">
                            <div class="tuesday1">Tuesday</div>
                            <div class="june-wrapper6">
                              <b class="june10">20 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h5">N/A</div>
                      </div>
                      <div class="week-schedule6">
                        <div class="week-schedule-child5"></div>
                        <div class="week-schedule-inner6">
                          <div class="wednesday-parent">
                            <div class="wednesday1">Wednesday</div>
                            <div class="june-wrapper7">
                              <b class="june11">21 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h6">N/A</div>
                      </div>
                      <div class="week-schedule7">
                        <div class="week-schedule-child6"></div>
                        <div class="week-schedule-inner7">
                          <div class="thursday-group">
                            <div class="thursday1">Thursday</div>
                            <div class="june-wrapper8">
                              <b class="june12">22 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-10h7">N/A</div>
                      </div>
                      <div class="week-schedule8">
                        <div class="week-schedule-child7"></div>
                        <div class="week-schedule-inner8">
                          <div class="friday-group">
                            <div class="friday1">Friday</div>
                            <div class="june-wrapper9">
                              <b class="june13">23 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-15h1">N/A</div>
                      </div>
                      <div class="week-schedule9">
                        <div class="week-schedule-child8"></div>
                        <div class="week-schedule-inner9">
                          <div class="saturday-group">
                            <div class="saturday1">Saturday</div>
                            <div class="june-wrapper10">
                              <b class="june14">24 June</b>
                            </div>
                          </div>
                        </div>
                        <div class="h-18h1">N/A</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="main-wrapper">
                 <div class="main">
                  <h1 class="total-monthy-consumption-nak">
                    Total_Monthy_Consumption: N/AkWh
                  </h1>
                  <div class="cost-ghs-000">Monthly_Cost: GHs 0.00</div>
                 </div>
                </div>
                <div class="frame-wrapper2">
                  <div class="frame-parent2">
                    <div class="percentage-usage-wrapper">
                      <h3 class="percentage-usage">Percentage Usage</h3>
                    </div>
                    <div class="dash-parent">
                      <div class="dash">
                        <div class="total-electricity-consumption">
                          Total electricity consumption
                        </div>
                        <div class="chart-visualization">
                          <div class="chart">
                            <div class="chart-grid">
                              <div class="yaxis-label-parent">
                                <div class="yaxis-label">1000</div>
                                <div class="y-axis-value-wrapper">
                                  <div class="y-axis-value">750</div>
                                </div>
                                <div class="vertical-grid-values">500</div>
                                <div class="vertical-grid-values1">250</div>
                                <div class="date-label-three">0</div>
                              </div>
                              <div class="horizontal-grid-wrapper">
                                <div class="horizontal-grid">
                                  <img
                                    class="vector-icon"
                                    loading="lazy"
                                    alt=""
                                    src="./images/d.png"
                                  />

                                  <div class="horizontal-grid-label">
                                    <div class="x-axis-label-parent">
                                      <img
                                        class="x-axis-label"
                                        alt=""
                                        src="./images/d.png"
                                      />

                                      <div class="x-axis-values">
                                        <img
                                          class="date-label-one"
                                          loading="lazy"
                                          alt=""
                                        />

                                        <img
                                          class="date-label-two"
                                          alt=""
                                        />

                                        
                                      </div>
                                      <img
                                        class="date-label-four"
                                        loading="lazy"
                                        alt=""
                                        src="./images/d.png"
                                      />

                                      <img
                                        class="group-icon"
                                        alt=""
                                        src="./images/grid.png"
                                      />

                                      <div class="data-bars-one-parent">
                                        <img
                                          class="data-bars-one"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one1"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one2"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one3"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one4"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one5"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one6"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one7"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one8"
                                          loading="lazy"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one9"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one10"
                                          alt=""
                                          src="./images/d.png"
                                        />

                                        <img
                                          class="data-bars-one11"
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
                                    <div class="chart-legend">
                                      <div class="legend-items">
                                        <div class="legend-values">0</div>
                                        <div class="legend-values1">1</div>
                                        <div class="legend-values2">2</div>
                                        <div class="legend-values3">3</div>
                                        <div class="legend-values4">4</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="frame-wrapper3">
                        <div class="percentage-wrapper">
                          <div class="percentage">
                            <b class="percentage-number">${room.percentage}%</b>
                            <div class="price">
                              <b class="ghs-120"> ${room.price}</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;

            containers.appendChild(roomDiv);

            
        });
       
    }
});

















