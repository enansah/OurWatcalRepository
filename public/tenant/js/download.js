document.addEventListener('DOMContentLoaded', function () {
    // Function to extract data
    function extractData() {
        return {
            date: document.querySelector('.empty-units').innerText,
            reading_time: document.querySelector('.div').innerText,
            reading_value: document.querySelector('.kw').innerText,
            last_reading_time: document.querySelector('.div1').innerText,
            last_reading_value: document.querySelector('.kw1').innerText,
            last_reading_date: document.querySelector('.div2').innerText,
            percentage: document.querySelector('.kwh').innerText,
            consumption_cost: document.querySelector('.ghs-120').innerText  // New line for consumption cost
        };
    }

    // CSV Download
    document.getElementById('downloadCsv').addEventListener('click', function () {
        const data = extractData();
        const csvData = [
            ['Label', 'Value'],
            ['Date', data.date],
            ['Reading Time', data.reading_time],
            ['Reading Value', data.reading_value],
            ['Last Reading Time', data.last_reading_time],
            ['Last Reading Value', data.last_reading_value],
            ['Last Reading Date', data.last_reading_date],
            ['Total Consumption', data.percentage],
            ['Consumption Cost', data.consumption_cost]  // New row for consumption cost
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
    });

    // PDF Download
    document.getElementById('downloadPdf').addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const data = extractData();

        const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACWCAYAAADTwxrcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABPUSURBVHgB7Z19cBTnfcd/u6eThF5PLyAkYVAMOkjaqWULt02bhItTPG2NHerGdnE7waaDaKeJ3Zrkj/aPSnLbcVrHBk8ykwBtgE4SXKeuoaiZ2JnWJzqddFrkiNZJ0AnBMQZJaCR0ktD73W2+v9OufDru/XVfns/Mzj67dxLi9nu/3/f5Pc8+K5GFaWlpcdjt9hY022RZrg4Ggx9Bu5pfkiSpRX2bQ90i8fGmKEpoj/dz+zrvcdyP3+dbWFjo93q9PrIoElkEFlJxcbELzfuwtalbXSAQGIGoBiCMO9iGcTyztLQ0Mj8/P8I/t7y8PAORzET+vtLS0koIs7KkpKTCZrNVQlTcbsS+CceNeAvvnfid/TjnxfElCM5tJcGZVlwsJgigDWLZi8NduMBb0fbwhgvcNzs765mZmRmmHFNfX+8sKipqwt/ihNjaVcEN4aVe/E1uCNltVrGZSlwsKESP/YhELKht2N/y+/1uRCHP2NhYH+mEhoaGdhYbROdiwUFsbgjtFITWC6F5ySQYXlzhgsIFakcaYzH1+ny+vmjpTG9wenU4HO1lZWUuiG0XhNanCu2c0SOaYcW1Y8cOF6c8XIj92A8hxR2fnp72GEFQ8di0adMefFk4orVBaGfxZek2ajQznLhUUXVylMK3+8zo6OgZowsqGjU1NU3l5eUPrFu37hAOBziaeTye02QgDCOu1tbWZ/ABd0JYExyl9OShco0azZ5GNLPjsNsoItO9uKwsqki4I1BRUdEBkdWSAUSmW3Fp6Q9GvdLqooqERVZVVdWFL90CamcHLl++7CYdojtxQVQtENVJNJ1TU1PdQlSx4XSperK39Wj8dSWu7du3P49I9SV8UN83q1HPBSjHdGD04Qk0X0Oq7CadoAtxwVfxUMwRToGIVN35qJybDe5d1tbWvgA/tgW96If0EMVsVGA4WqGe83V8ID+8du3aS9iLaJUGHOUnJyffQZqcR8/yGxh2qpiYmOilAlKwyKV5KxGtsg+iWDOi2Msw+zdhMQ4UKooVRFzcE4SoTiJKvYP/93ES5ATVi+3GZ33gypUrbsozeU+Lqml/FT3Bv75582YPCXIGj69ivPIqxi+/Vog0mVdxwbgfQSp8+tatW8/BH3hIkHNmZ2dH4GkvYGC8q66urvn27dtvU57IS1pUZ3y+C2HdGB4efkWUGPIPz75oamo6jN5kM3zY4/nwYTkXFxt3pMF3hb/SB5oPy0e5IqdpUQhLf7APq6ysrIHAXsT+HI5zNmcsZ+LShLW4uPjm9evXDTVVxOywwODBipAqv5JLgeVEXJqw5ubmTn/wwQdvkkB3TE9Pv88FVwjsSK4ElnVxhQvrxo0b50mgW3jmbi4FJlMWCfdYQljGANeph4fe4MH+A2a/hbJI1nqL6n2BPxbm3ZhwLxLlogdRpngoWzeGZC1yQVg8nPMjISxjwtcNwrqM6/gtyhJZ8VxOp5OnIT947dq1vyCBYcGQ3H87HI7fX79+fWM2hooyFpc6ZeY5DOl8WUyXMT7z8/MXqqqq/gZjkdDXxCXKgIzEpRr4vx8dHf1jMWXGHPj9/kV1LPJliOxsJj3ItD0XG3i1Z/hPQljmYnJy8ibGf7+n9iAd6f6etCMX8vJLUPkyjODXSWA6uMiK2tdm9CDb051JkVbk4nsJsXtyZGTkVRKYFtidE9g9tW3bNhelQcqRi30WdifxD/8JqvATJDAt7L8QuQZRxT+BKHYM9mshlZ9POXLBZ3VxoVT4LGuAKsBFXO8fQGR/SSmSkrhQz9qLnsRuvqeQBJYh3fSYauQ6gjrICTGT1FrgesPfT3fLsvytVHqPSYuLq/AYHvh/MSBtTcbGxt7DKMxtlCf+NNmfSUpcqol/Znx8/AQJLAnskIKSxIvYPZts9EpKXGziOWoJE29tuLgKHSRt7hOKi6MWm3gRtfIMT4b6IjmLjst7SEfA3L8uSdIfJjP3K6G41KjVI6JWHsFVKT4mP2r/A/mY5KAm0hFs7lGaeD2Z6BVXXFrUwui4uDM6X+CK2F+XO+gB6pRsVEk6RI1ev5soesUVlxq1ekXUyhMPUmXRealLupc6SMeERa/n470vprjUHuJ+RC1RMM017K8+R83Fr8nflRskXXmsWHD0wu7xeD3HmOJCTcOFqHVeRK0cs2Lctxe/IH+TiqmRDAJHL+jjv+LVvWKKi1dQFj1EsDOHvoeN+2l5X/Hn5e8YSVga/KQS7J6L9XpUcW3dunWvujS3paOW/R/lffYj8jHKBWzc35IP08foMBkUXgyZn14Sa8wxqrhsNtv+xcVFS/cQ7efkwxIuvLSOnFmPXr9MVfZ/l45JzbSPDAxX7f1+Pz99LWpZ4i5xqUZ+L1KimyyK/Q25I/zC2+7Nkrg0435U/o5UKbWTCbh169a/8aNyohn7u8SlGXkrz3yQypU1hUvpM3LmQoCwbJ200/5l+dtG9FexYGOP6HWhpKTkmcjXoqXF/fzcPxKsItVkKAbVuNv2yN/Ua2E0E2ZnZ8+jJvpY5Pk14uKUyCHu5s2bbhKsIlUq6YvLBMY9EVNTU4PRUuMacXFKxCYehxKBUkHbKR20ivt6xaUEFNPaDHT+ZqCb91Cx3xt+fo24oL7P4o0iJUYgFUvpRa7/pRn/I0rX0ieUR+m6ZNqRDu41QjduND8Vfj7Sc7kQ4kTkigQ+yfakvmYn6A1UFy4gOEWPXPz8HZiyMTHcEx3lV1HvEsSEUyMC2Lz6HKcQq+KSZZn91gAJomKrl01TPsgFnBp5Bg3rSDsnh724S5QgYgNTLiJXAlDvGmAdacfhnquN18gkQVSUUuG5EoF613vY3edyuULHIXGp9Yk64bdiI5VJInIlwOfzjWBX5/V6W/g4JK7S0tI2+C0RteLBlfWd5quuZxuuk2Io6D5uh8SFPCnElQS2j5tnTDAXsKmHjkbR/Agfa+LahU2kxARIvyinV6m3EGzqUdJaE7kc8/PzInIlQNooal2JWFhY8KCY+qG4cNAGcY2QID5likiLCUBa5DHU0AC2VopwiJ5iYqQK0WNMBHqM7LlauBwhqze+CmElgx21LtFjTAj0NMLlCI5cvNy3SIlJkrUpzyYGepqx2+2OrD5YygpkZcqz+RnBGOMWGQaMI5dIi0mS8ZRnk6OscAeaqhGRK0UymvJsMWSUIdjQC8+VJGlPebYQnAlZVyJypUjaU54tSBFZEJ6yLO2WH5A3KdHNeXWcG1YxgG3/ofRVyU+p3XBhwYhnSXEF3qBheiPUiemRu6hdvpecUiMEVUXtkk1KWGqQaiQXCRJiSXGFE+yiviBRH9xU6O4c2xcVp/yY1CEElDnCc0UQ+Bp5pCW6Q4JMUWT0FL1w9sKkpsKSMqxcpePKjNJn5ptd0wUF1Cbo6rrl02Ja2KSK5SeDKw+K5wVGvqA4pQfh1+DbpHIYd9GjZJQi1CR8UJoYL0sFbcrzRfQYlZVUirOekG9jsT2uNCm/Ts6i7ZJLqUJnYZ11ZlNIK2wMRS4Iy4uGuLMlRXjKc+BilHIEi+1N9EaxLZHi5lNFO5VKZQ85bffLEBuinEnW5kpEkc1m82F8sYIEqSCtTHkOJjV7188ivEh9AQquLJUgKbxWV7uUYgnEKLDnWl5e9hZdvnzZ63Q6ReRKEamBWildOLp1cflDLYFovu2XyCk3STuNnkq5g+gFmqH3VlZWNhV0Nio8TNEh2kU6QCmjRinRm8qzOIC91rf1hPs2aYoM1Rt1OBz8ufi4HRIXPJevpKSkAuKigoHUoWyh92wHpA4ywEL/K1OeFcoJYb6NDEZpaWkj9NTPbe0GjUs4WfCxL/5Alx5RugIvBR+jW4q+V5MWU56jUlxc7ISepritiau/qKhINzleE5m/J3gIBUvdTgcSU57vBlpqwubmdkhcfr/fi16j7gp/PO639GvKo8Efo6U/kUliyvNauMAFHTlRfbjExyFx4cCNk7r9oPwHqUePIhNTnu8GOmpFsPrQc6HXyO5+gnuMpGM0kfG4nh5EJlUqG0mwCnqKrJ8JVU9rZkX0V1dXGyLM87he4BXlUEhkBURMeV4LOoVc+7ukHa+KC+myV0+mPhFs+kMiK2DPUkx5Xsu6detcmplnVsWFAWy33W7XRREzFQpavhCrPK+iDli3QkerS5+uimtwcLAfL5YhtBmyex0uMp5nRXlCrPK8AvstmPkNrCPtXORM1HP19fUuMjChdPlp5VCeepaSWOV5hfLy8vuxW7Ng8xpxoWzvxjCQ4VJjNPJVvpDWK+kPYJsEzofQjQvNt8LPrxHX8vLyWa53GTU1RiPXIhOrPK8A3TywtLR0IfzcGnFxfQLRq6+qqsp0PiIksueUp7NdIxOrPBNt3LjRxbrhaTbh5++6+0eW5XPIn7qflZAWF2lGq5FlrWdp8VWeOSWiBLELu1ORr90lrsXFxVMoSbjMlBojyXb5wsqrPLNOUB99JDIlMrbIEz6fb6G2tvZhqLFyamrqfTIxys9oJvBdctOE0iM7EX3SW5ZSooD0frBHseSCxUiJDyMY+YaGho5Fvhb1pljkz26o0UUWIXyKjzKfukgymvJsYNRe4h7sTkZ7Paq4rly5wrMktm7YsMFSU0p4is/yJ5WnU+5ZlltzzS61cFo7MDDwr9Fej3c7/2tlZWUusiChnuUnki9fWHGVZ45aNTU1B9HsivWemOKCQTuKXPpJMxv7uARTEJkFpzxz1Ipl5DVssV5gY19XV7cF0et+tK37aGIFOushD/moV2qWZqQaim4Vfqr8i/ITY92pky4ctRoaGg6ibHXx6tWrp2O9L+4qN8inR4uLi/dZNnppqHfjLD+FGtlXopYvLDXlmaMWz6DBiM6L8d5ni/fi+Pi4D9FrO8oSH7V09ApD+SnKF2dQvriN8kVrWPligTzB7ymW+IxQftiHwHMtXtRiEq7PhdDXJaJXBBzJ/hnliz0oxCKSKZOK2ypTnmHimxG19iSKWowt0Rs4eqGo2mB57xUDjmTBb9M7VEMjyv/QBJkY9lqNjY0vIOD8X6KoxSS1siBU2gW1/rbeb+AoGB/ejm9q1B7iLyQTtZikxMWzJSDaf0BRtZMEliSsrnU6cvZDLJJeE5XrXjBxdVar2gtWaG5u3sNRy+PxdCf7M0mLi6NXMBh8trq6ulOYe2uBakEVtoOBQODPUvm5hIY+nNu3b3tRmtgMc/8pmPsfkcASbNq0aT+XHjDm/Hep/FzKS4WzuUdp4rdEerQGXHrA9d6drIkPJ2Vxqenxd0R6ND+cDuvr67+BZleyJj6clNKihkiP5od7h/fcc8+fo6b1n4ODgymlQ420n6ChpsePb9myZR8JTMfmzZv3oXf4MVznpHuHkaQtLk6PUPWnIbCnRHHVXKg+63MoP31GW7EmHdJKixrqwPZkRUXFkbm5uR6/379EAkPDwmKfhcDx1aGhobcpAzISFwP/1Y8/pgoC+8Lk5KS+1zEVxIV9VlNT08sQ1hkUS/+WMiThitjJ4nQ630IYnUcYfYUEhoOFBf/8AtJhKYT1OGWBrD0SD8J6FoPbH21paekggeGAsDogrF/BdTxAWSLjtKjB06JRWH0bIfWvYPAdYnqOcUBAOARh/YZq4EcpS2T1YZ78qBe1B/kwhgweJYHu4eukCuuhdAql8cha5NLgHuT69evPoUZyBBXe+enpaUveiWwEWFgohH8+F8Jisi4uJlxg6EXazL4sgBHh4je+/L+XK2ExWestRmPHjh0tGId8F/+Bd/D3F3TlZcGHcKeLB6NzKSwmJ5FLQ4tgwuTrh3wJi8lp5NLgCBYIBN5CBf/GyMjIKwsLC+Kh43mGZ7CgQHrYZrM1Y7zwoUyGdZIlL+LSaG1tPYrdE6Ojo39U0Gc7Wgwe0qmtreXK+/cHBwdTmk2aCTlNi5FgqOgH6lBRJ8y+Z3Z2VrdPJDMLjY2N7Q6H42VErNdSmf+eDfIauTS2bdvmwrfopDD6uUXzV+hUHeBlsSjPFERcjOrDTuI/3jQ2NvYlkSazB9JgE9JgJ77A0/BXB3Jt3GNRMHFpYMC7S1GUg/Pz8ydu3LhxngQZwfUrRKsnIKwjAwMDR6mAFFxcjFYPQyTzIoq9KqJY6uglWoWjC3FpcBTD7nl4sTeEF0sOLjHwqjN2u/039RCtwtGVuBg1inGq3C1SZXz44QIoTh9G87JeolU4uhOXhtajhMiK79y5043iq6juq3B5AQPOHfh8Znjl7UL0BJNBt+LSQOH1GUmSOuHHJubm5o5bWWSaqHgFZRx2o26VcBmjQqJ7cWmEiWxpcXHxjJXSpdFEpWEYcWmwyLDbj83JnmxqaqrPjL1Lzajzqo780CY9p79YGE5cGprxR/OziGb9iGa9Ro9mLCiUFJxqlNoKQZ3GdtZootIwrLg0MMThQDd8L5r7kTbb0Wtyo5TROzEx0WeE2RcsqLq6unZEqF38QC+OUjDqZ/FlOZ2PmQu5xPDiCkcdUnLRitBcaPf5/X4Wm0dPHQH2UBCTk5+vBCFtwKkhswgqHFOJKxyOaEgtfPFcOOTnAW6F2DwsOEQ3Dy7k8Pj4eM7n93PlHGnOiajUjr/HyRui0xBe6uWUB/H3m0lQ4ZhWXOF0dXXRqVOnHIgUbarY7sOFbYHg2lhwOB7GfgTnhnGxR+DlZiDAGZy7g07DTLT0yumMHxuothshGt4q+aZlbBX4d7bzObzMKzz345wbv/s6fqfbrGKKxBLiika44CAqjnKhPd94zHu8hduhvbpF4lM3foSgFzvepiCqaxDnFNr9EKjXKkKKxs8Bh5JV6ksjJBIAAAAASUVORK5CYII='; // Replace with your base64 image data

        // Rest of the PDF generation code remains unchanged
        const imageWidth = 50; // Width of the image in the PDF
        const imageHeight = 50; // Height of the image in the PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imageX = (pageWidth - imageWidth) / 2;
        const imageY = 10; // Y position of the image

        doc.addImage(base64String, 'PNG', imageX, imageY, imageWidth, imageHeight);

        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("Report", 92, 80);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text("Watcal User Details", 82, 90);

        const labels = ['Date', 'Reading Time', 'Reading Value', 'Last Reading Time', 'Last Reading Value', 'Last Reading Date', 'Totol Consumption', 'Consumption Cost']; // Added Consumption Cost label
        const values = [data.date, data.reading_time, data.reading_value, data.last_reading_time, data.last_reading_value, data.last_reading_date, data.percentage, data.consumption_cost]; // Added Consumption Cost value

        doc.setFontSize(12);
        labels.forEach((label, index) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${label}:`, 65, 105 + (index * 10));
            doc.setFont('helvetica', 'normal');
            doc.text(values[index], 125, 105 + (index * 10));
        });

        doc.save('report.pdf');
    });
});





