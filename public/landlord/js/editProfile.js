
function goBack() {
  window.history.back();
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
  




// get user profile
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/getProfileLandlord');
        const landlord = await response.json();


        document.getElementById('username').value = landlord.username;
        document.getElementById('email').value = landlord.email;
        document.getElementById('dateOfBirth').value = landlord.dateOfBirth;
        document.getElementById('meterSerialNumber').value = landlord.meterSerialNumber;
        document.getElementById('houseAddress').value = landlord.houseAddress;
        document.getElementById('meterType').value = landlord.meterType;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
});


// update user profile
// Function to handle form submission
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.addroombtn').addEventListener('click', function(event) {
        event.preventDefault();
        addRoom();
    });

    let roomIndex = 1;

    function addRoom() {
        const container = document.createElement('div');
        container.className = 'room-container';

        // Room label and input
        const roomLabel = document.createElement('label');
        roomLabel.className = 'add-room-label';
        roomLabel.innerText = `Room ${roomIndex}`;

        const roomInput = document.createElement('input');
        roomInput.className = 'room-input';
        roomInput.type = 'text';
        roomInput.name = `room${roomIndex}`; // Give each input a unique name
        roomInput.placeholder = `Enter room name`;

        // Email label and input
        const emailLabel = document.createElement('label');
        emailLabel.className = 'add-room-label';
        emailLabel.innerText = `Email`;

        const emailInput = document.createElement('input');
        emailInput.className = 'room-input';
        emailInput.type = 'email';
        emailInput.name = `email${roomIndex}`; // Give each input a unique name
        emailInput.placeholder = `Enter tenant email`;

        // Container for room and email inputs
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';

        inputContainer.appendChild(roomLabel);
        inputContainer.appendChild(roomInput);
        inputContainer.appendChild(emailLabel);
        inputContainer.appendChild(emailInput);

        container.appendChild(inputContainer);
        document.querySelector('.add-room-container').appendChild(container);

        roomIndex++;
    }







    document.getElementById('profileForm').addEventListener('submit', async function(event) {
    event.preventDefault();


        // Basic client-side validation
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const meterSerialNumber = document.getElementById('meterSerialNumber').value;
        const houseAddress = document.getElementById('houseAddress').value;
        const meterType = document.getElementById('meterType').value;

        

        // Collect room names
        const inputs = document.querySelectorAll('.room-container .input-container');
        const roomsData = [];

        inputs.forEach(inputContainer => {
            const roomInput = inputContainer.querySelector('input[name^="room"]');
            const emailInput = inputContainer.querySelector('input[name^="email"]');
            
            if (roomInput && emailInput) {
                roomsData.push({
                    room: roomInput.value,
                    email: emailInput.value
                });
            }
        });



        try {
            const response = await fetch('/api/updateLandlord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username,
                    email,
                    dateOfBirth,
                    houseAddress,
                    meterSerialNumber,
                    meterType,
                    roomsData // Include rooms in the request body
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Registration failed');
            }
            console.log("update successful");
            document.getElementById('message').innerHTML = `<p style="color: green;">${data.msg}</p>`;

        } catch (error) {
            document.getElementById('message').innerHTML = `<p style="color: red;">${error.message}</p>`;
            console.log("Signup failed");
        }
    });

});



document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById('username','email','dateOfBirth','meterSerialNumber','houseAddress','meterType');

    input.addEventListener('input', function() {
      this.style.backgroundColor = '#1A1A1A';
    });

    input.addEventListener('change', function() {
      this.style.backgroundColor = '#1A1A1A';
    });
  });