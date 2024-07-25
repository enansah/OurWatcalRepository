const axios = require('axios');
const parseString = require('xml2js').parseString;
const Reading = require('../models/Reading');

const parseAndSaveXML = async (url) => {
    try {
        // Fetch XML data from the remote server
        const response = await axios.get(url);
        const data = response.data;

        // Parse the XML data
        parseString(data, (err, result) => {
            if (err) {
                console.error(`Failed to parse XML data from URL ${url}:`, err);
                return;
            }

            const slaveInfo = result.MBusData.SlaveInformation[0];
            const dataRecords = result.MBusData.DataRecord.map((record) => {
                return {
                    function: record.Function[0],
                    storageNumber: record.StorageNumber[0],
                    tariff: record.Tariff ? record.Tariff[0] : null,
                    device: record.Device ? record.Device[0] : null,
                    unit: record.Unit[0].trim(),
                    quantity: record.Quantity ? record.Quantity[0].trim() : null,
                    value: parseFloat(record.Value[0])
                };
            });

            const reading = new Reading({
                id: slaveInfo.Id[0],
                manufacturer: slaveInfo.Manufacturer[0],
                version: slaveInfo.Version[0],
                productName: slaveInfo.ProductName[0],
                medium: slaveInfo.Medium[0],
                accessNumber: slaveInfo.AccessNumber[0],
                status: slaveInfo.Status[0],
                signature: slaveInfo.Signature[0],
                dataRecords: dataRecords
            });

            reading.save()
                .then(() => console.log(`Data from ${url} saved successfully`))
                .catch(err => console.error(`Failed to save data from ${url}`, err));
        });
    } catch (err) {
        console.error(`Failed to fetch data from ${url}:`, err);
    }
};

const readMetersSequentially = async (urls, interval, delayBetweenReadings) => {
    const processUrls = async (index) => {
        if (index >= urls.length) {
            // After all URLs are processed, wait for the interval period
            setTimeout(() => processUrls(0), interval - (urls.length * delayBetweenReadings));
            return;
        }

        // Wait for the XML parsing and saving to complete
        await parseAndSaveXML(urls[index]);

        // Delay before processing the next URL
        setTimeout(() => processUrls(index + 1), delayBetweenReadings);
    };

    // Start processing URLs
    processUrls(0);
};


module.exports = {
    parseAndSaveXML,
    readMetersSequentially
};
