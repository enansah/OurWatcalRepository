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
      const response = await fetch('/api/getProfile');
      const tenant = await response.json();


      document.getElementById('username').value = tenant.username;
      document.getElementById('email').value = tenant.email;
      document.getElementById('dateOfBirth').value = tenant.dateOfBirth;
      document.getElementById('meterSerialNumber').value = tenant.meterSerialNumber;
      document.getElementById('houseAddress').value = tenant.houseAddress;
      document.getElementById('meterType').value = tenant.meterType;
  } catch (error) {
      console.error('Error fetching profile:', error);
  }
});


// update user profile
// Function to handle form submission

  document.getElementById('profileForm').addEventListener('submit', async function(event) {
  event.preventDefault();


      // Basic client-side validation
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const dateOfBirth = document.getElementById('dateOfBirth').value;
      const meterSerialNumber = document.getElementById('meterSerialNumber').value;
      const houseAddress = document.getElementById('houseAddress').value;
      const meterType = document.getElementById('meterType').value;




      try {
          const response = await fetch('/api/updateTenant', {
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
                  meterType
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


   

  document.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById('username','email','dateOfBirth','meterSerialNumber','houseAddress','meterType');

    input.addEventListener('input', function() {
      this.style.backgroundColor = '#1A1A1A';
    });

    input.addEventListener('change', function() {
      this.style.backgroundColor = '#1A1A1A';
    });
  });