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
        <title>Rental Information Form</title>
    </head>
    <body>
        <h1>Rental Information Form</h1>
        <form action="/" method="post">

            <h3>LandLord Information</h3>
            <label for="landlord_name">Landlord's Legal Name:</label>
            <input type="text" id="landlord_name" name="landlord_name"><br>
            
            <h3>Rentee Information</h3>
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name"><br>
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name"><br>
            
            <h3>Rental Unit Information</h3>
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

            <h3>Tenant Contact Information</h3>
            <label for="tenant_retail_unit">Retail Unit:</label>
            <input type="text" id="tenant_retail_unit" name="tenant_retail_unit"><br>
            <label for="tenant_street_number">Street Number:</label>
            <input type="text" id="tenant_street_number" name="tenant_street_number"><br>
            <label for="tenant_street_name">Street Name:</label>
            <input type="text" id="tenant_street_name" name="tenant_street_name"><br>
            <label for="tenant_PO_box">PO Box:</label>
            <input type="text" id="tenant_PO_box" name="tenant_PO_box"><br>
            <label for="tenant_city_town">City/Town:</label>
            <input type="text" id="tenant_city_town" name="tenant_city_town"><br>
            <label for="tenant_province">Province:</label>
            <input type="text" id="tenant_province" name="tenant_province"><br>
            <label for="tenant_postal_code">Postal Code:</label>
            <input type="text" id="tenant_postal_code" name="tenant_postal_code"><br>
            
        <h3>Contact Notices</h3>
        <p>Both the landlord and tenant agree to receive notices and documents by email, where allowed by the Landlord and Tenant Board’s Rules of Procedure.</p>
        <label for="email_agreement">Agreement:</label>
        <input type="checkbox" id="email_agreement" name="email_agreement" value="yes">
        <label for="email_agreement">Yes</label>
        <input type="checkbox" id="no_email_agreement" name="email_agreement" value="no">
        <label for="email_agreement">No</label>
        
        <div id="email_address_container" style="display: none;">
            <label for="email_address">Email Address:</label>
            <input type="text" id="email_address" name="email_address">
        </div>

        <p>The landlord is providing phone and/or email contact information for emergencies or day-to-day communications:</p>
        <label for="phone_agreement">Agreement:</label>
        <input type="checkbox" id="phone_agreement" name="phone_agreement" value="yes">
        <label for="phone_agreement">Yes</label>
        <input type="checkbox" id="no_phone_agreement" name="phone_agreement" value="no">
        <label for="phone_agreement">No</label>
        
        <div id="phone_container" style="display: none;">
            <label for="tenant_phone_number">Phone Number:</label>
            <input type="text" id="tenant_phone_number" name="tenant_phone_number">
        </div>
        
        <button type="submit">Submit</button>

        </form>

        <script>
        const emailAgreementCheckbox = document.getElementById('email_agreement');
        const emailAddressContainer = document.getElementById('email_address_container');

        emailAgreementCheckbox.addEventListener('change', function() {
            if (this.checked) {
                emailAddressContainer.style.display = 'block';
            } else {
                emailAddressContainer.style.display = 'none';
            }
        });

        const phoneAgreementCheckbox = document.getElementById('phone_agreement');
        const phoneAddressContainer = document.getElementById('phone_container');

        phoneAgreementCheckbox.addEventListener('change', function() {
            if (this.checked) {
                phoneAddressContainer.style.display = 'block';
            } else {
                phoneAddressContainer.style.display = 'none';
            }
        });

        </script>
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

  const renteeFirstName = req.body.first_name;
  const RenteeLastName = req.body.last_name;

  const tenant_landlordName = req.body.tenant_landlord_name;
  const tenant_retailUnit = req.body.tenant_retail_unit;
  const tenant_streetNumber = req.body.tenant_street_number;
  const tenant_streetName = req.body.tenant_street_name;
  const tenant_POBox = req.body.tenant_POBox;
  const tenant_cityTown = req.body.tenant_city_town;
  const tenant_province = req.body.tenant_province;
  const tenant_postalCode = req.body.tenant_postal_code;

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
