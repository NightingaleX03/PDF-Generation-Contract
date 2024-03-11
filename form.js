const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to serve HTML form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tenant Information Form</title>
    </head>
    <body>
        <h1>Tenant Information</h1>
        <form action="/" method="post">
            <label for="landlord_name">Landlord's Legal Name:</label>
            <input type="text" id="landlord_name" name="landlord_name"><br>
            <label for="retail_unit">Retail Unit:</label>
            <input type="text" id="retail_unit" name="retail_unit"><br>
            <label for="street_number">Street Number:</label>
            <input type="text" id="street_number" name="street_number"><br>
            <label for="street_name">Street Name:</label>
            <input type="text" id="street_name" name="street_name"><br>
            <label for="city_town">City/Town:</label>
            <input type="text" id="city_town" name="city_town"><br>
            <label for="province">Province:</label>
            <input type="text" id="province" name="province"><br>
            <label for="postal_code">Postal Code:</label>
            <input type="text" id="postal_code" name="postal_code"><br>
            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
  `);
});

// Route to handle form submission
app.post('/', (req, res) => {
  const landlordName = req.body.landlord_name;
  const retailUnit = req.body.retail_unit;
  const streetNumber = req.body.street_number;
  const streetName = req.body.street_name;
  const cityTown = req.body.city_town;
  const province = req.body.province;
  const postalCode = req.body.postal_code;
  res.send(`
    <h2>Tenant Information Received</h2>
    <p>Landlord's Legal Name: ${landlordName}</p>
    <p>Retail Unit: ${retailUnit}</p>
    <p>Street Number: ${streetNumber}</p>
    <p>Street Name: ${streetName}</p>
    <p>City/Town: ${cityTown}</p>
    <p>Province: ${province}</p>
    <p>Postal Code: ${postalCode}</p>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
