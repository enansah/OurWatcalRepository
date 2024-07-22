document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://your-api-endpoint.com/getData'; // Replace with your API endpoint
  
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    function getCurrentDateTime() {
      const now = new Date();
      const date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
      const time = now.toTimeString().split(' ')[0]; // HH:MM:SS format
      return { date, time };
    }
  
    document.getElementById('downloadCsv').addEventListener('click', async function () {
      const data = await fetchData();
      const { date, time } = getCurrentDateTime();
  
      const csvData = data.map(item => [
        date,
        time,
        item.reading_value,
        item.last_reading_time,
        item.last_reading_value,
        item.last_reading_date,
        item.percentage,
      ]);
  
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Date,Reading Time,Reading Value,Last Reading Time,Last Reading Value,Last Reading Date,Percentage\r\n";
      csvData.forEach(rowArray => {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  
    document.getElementById('downloadPdf').addEventListener('click', async function () {
      const data = await fetchData();
      const { date, time } = getCurrentDateTime();
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Add title
      doc.setFontSize(22);
      doc.text("Reports", 10, 20);
  
      // Add table header
      doc.setFontSize(12);
      doc.text("Date", 10, 30);
      doc.text("Reading Time", 40, 30);
      doc.text("Reading Value", 80, 30);
      doc.text("Last Reading Time", 120, 30);
      doc.text("Last Reading Value", 160, 30);
      doc.text("Last Reading Date", 200, 30);
      doc.text("Percentage", 240, 30);
  
      // Add table rows
      let y = 40;
      data.forEach(item => {
        doc.text(date, 10, y);
        doc.text(time, 40, y);
        doc.text(item.reading_value, 80, y);
        doc.text(item.last_reading_time, 120, y);
        doc.text(item.last_reading_value, 160, y);
        doc.text(item.last_reading_date, 200, y);
        doc.text(item.percentage, 240, y);
        y += 10;
      });
  
      doc.save('report.pdf');
    });
  });
  