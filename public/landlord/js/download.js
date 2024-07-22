document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Function to extract data
    function extractData() {
        try {
            const data = {
                date: document.querySelector('.empty-k-w').innerText,
                reading_time: document.querySelector('.div1').innerText,
                reading_value: document.querySelector('.kw').innerText,
                last_reading_time: document.querySelector('.div2').innerText,
                last_reading_value: document.querySelector('.kw1').innerText,
                last_reading_date: document.querySelector('.div3').innerText,
                percentage: document.querySelector('.percentage-number').innerText,
                price: document.querySelector('.ghs-120').innerText
            };
            console.log("Data extracted:", data);
            return data;
        } catch (error) {
            console.error("Error extracting data:", error);
            return {};
        }
    }

    // CSV Download
    document.querySelector('.csvbtn').addEventListener('click', function () {
        console.log("CSV download initiated");
        const data = extractData();
        const csvData = [
            ['Label', 'Value'],
            ['Date', data.date],
            ['Reading Time', data.reading_time],
            ['Reading Value', data.reading_value],
            ['Last Reading Time', data.last_reading_time],
            ['Last Reading Value', data.last_reading_value],
            ['Last Reading Date', data.last_reading_date],
            ['Percentage Consumption', data.percentage],
            ['Price', data.price] // Add price to CSV data
        ];

        let csvContent = "data:text/csv;charset=utf-8,";
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
        console.log("CSV download completed");
    });

    // PDF Download
    document.querySelector('.R').addEventListener('click', function () {
        console.log("PDF download initiated");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const data = extractData();
        if (Object.keys(data).length === 0) {
            console.error("No data to download");
            return;
        }

        // Add background image
        const imageUrl = 'data:image/png;base64,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'; // Replace with your base64 image data
        const imageWidth = 150; // Width of the image in the PDF
        const imageHeight = 150; // Height of the image in the PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imageX = (pageWidth - imageWidth) / 2;
        const imageY = (pageHeight - imageHeight) / 2;

        try {
            doc.addImage(imageUrl, 'PNG', imageX, imageY, imageWidth, imageHeight);
            console.log("Image added to PDF");
        } catch (error) {
            console.error("Error adding image to PDF:", error);
        }

        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("Summary Report", 10, 35);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text("WatCal User Consumption", 10, 45);

        const labels = ['Date', 'Reading Time', 'Reading Value', 'Last Reading Time', 'Last Reading Value', 'Last Reading Date', 'Percentage Consumption', 'Consumption Cost'];
        const values = [data.date, data.reading_time, data.reading_value, data.last_reading_time, data.last_reading_value, data.last_reading_date, data.percentage, data.price];

        doc.setFontSize(12);
        labels.forEach((label, index) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${label}:`, 10, 60 + (index * 10));
            doc.setFont('helvetica', 'normal');
            doc.text(values[index], 65, 60 + (index * 10));
        });

        doc.save('report.pdf');
        console.log("PDF download completed");
    });
});










