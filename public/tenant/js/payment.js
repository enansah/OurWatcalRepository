function processMtnPayment() {
  const phoneNumber = document.getElementById('mtnPhoneNumber').value;
  const amount = document.getElementById('mtnAmount').value;
  const meterNumber = document.getElementById('mtnMeterNumber').value;

  if (!phoneNumber || !amount || !meterNumber) {
    alert('Please fill all the fields');
    return;
  }

  const paymentData = {
    phoneNumber,
    amount,
    meterNumber
  };

  fetch('/process-mtn-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Payment successful');
    } else {
      alert('Payment failed: ' + data.message);
    }
  })
  .catch(error => {
    alert('Error processing payment: ' + error.message);
  });
}



function processVodafonePayment() {
  const phoneNumber = document.getElementById('vodafonePhoneNumber').value;
  const amount = document.getElementById('vodafoneAmount').value;
  const meterNumber = document.getElementById('vodafoneMeterNumber').value;

  if (!phoneNumber || !amount || !meterNumber) {
    alert('Please fill all the fields');
    return;
  }

  const paymentData = {
    phoneNumber,
    amount,
    meterNumber
  };

  fetch('/process-vodafone-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Payment successful');
    } else {
      alert('Payment failed: ' + data.message);
    }
  })
  .catch(error => {
    alert('Error processing payment: ' + error.message);
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const prepaidOption = document.getElementById("prepaidOption");
  const postpaidOption = document.getElementById("postpaidOption");
  const paymentForm = document.getElementById("paymentForm");
  const paymentTypeHeader = document.getElementById("paymentTypeHeader");

  prepaidOption.addEventListener("click", function (event) {
    event.preventDefault();
    animateButton(prepaidOption);
    togglePaymentForm("PREPAID");
  });

  postpaidOption.addEventListener("click", function (event) {
    event.preventDefault();
    animateButton(postpaidOption);
    togglePaymentForm("POSTPAID");
  });

  function togglePaymentForm(type) {
    paymentTypeHeader.textContent = type;
    if (!paymentForm.classList.contains("show")) {
      paymentForm.classList.add("show");
    } else {
      paymentForm.classList.remove("show");
      setTimeout(() => {
        paymentForm.classList.add("show");
      }, 10); // Brief delay to restart the animation
    }
  }

  function animateButton(button) {
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 100); // Animation duration (must match the CSS transition duration)
  }
});




function goBack() {
  window.history.back();
}


document.addEventListener('DOMContentLoaded', () => {
  const totalConsumptionCost = localStorage.getItem('totalConsumptionCost');
  if (totalConsumptionCost) {
      const consumptionElement = document.querySelector('.gh-2400000');
      consumptionElement.textContent = totalConsumptionCost;
  } else {
      console.error('Total consumption cost not found in localStorage');
  }
});