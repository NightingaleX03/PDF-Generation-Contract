const express = require('express');
const pdf = require('html-pdf');
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

        <style>
        .header-section {
            background-color: lightgrey;
        }
        </style>

    </head>
    <body>
        <h1>Rental Information Form</h1>
        <form action="/" method="post">

            <h2>Parties to the Agreement</h2>
            <div class="header-section">
            <h3>LandLord Information</h3>
            </div>

            <label for="landlord_name">Landlord's Legal Name:</label>
            <input type="text" id="landlord_name" name="landlord_name"><br>
          
            <div class="header-section">
            <h3>Rentee Information</h3>
            </div>

            <div id="rentees">
            <!-- Initial rentee fields -->
            <div class="rentee">
                <label for="first_name">First Name:</label>
                <input type="text" class="first_name" name="first_name[]">
                <label for="last_name">Last Name:</label>
                <input type="text" class="last_name" name="last_name[]">
                <button type="button" class="remove_rentee">Remove Rentee</button>
            </div>
            </div>
        
            <button type="button" id="add_rentee">Add Rentee</button>
            
            <div class="header-section">
            <h3>Rental Unit Information</h3>
            </div>

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

            <div class="header-section">
            <h3>Tenant Contact Information</h3>
            </div>

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
            
            <div class="header-section">
            <h3>Contact Notices</h3>
            </div>

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
        
            <div class="header-section">
            <h3>Tenancy Occupancy Timings</h3>
            </div>
            
            <label for="tenancy_start_date">This tenancy starts on:</label>
            <input type="date" id="tenancy_start_date" name="tenancy_start_date">

            <p>This tenancy agreement is for: (select an option below and fill in details as needed)</p>

            <label for="tenancy_end_date">a fixed length of time ending on:</label>
            <input type="date" id="tenancy_end_date" name="tenancy_end_date">

            <div class="header-section">
            <h3>Services and Utilities</h3>
            </div>

            <p>The following services are included in the lawful rent for the rental unit, as specified:</p>
            
            <label for="gas">Gas:</label>
            <input type="radio" id="gas_yes" name="gas" value="Yes">
            <label for="gas_yes">Yes</label>
            <input type="radio" id="gas_no" name="gas" value="No">
            <label for="gas_no">No</label><br>

            <label for="air_conditioning">Air conditioning:</label>
            <input type="radio" id="ac_yes" name="air_conditioning" value="Yes">
            <label for="ac_yes">Yes</label>
            <input type="radio" id="ac_no" name="air_conditioning" value="No">
            <label for="ac_no">No</label><br>

            <label for="additional_storage">Additional storage space:</label>
            <input type="radio" id="storage_yes" name="additional_storage" value="Yes">
            <label for="storage_yes">Yes</label>
            <input type="radio" id="storage_no" name="additional_storage" value="No">
            <label for="storage_no">No</label><br>

            <label for="on_site_laundry">On-Site Laundry:</label>
            <input type="radio" id="laundry_yes" name="on_site_laundry" value="Yes">
            <label for="laundry_yes">Yes</label>
            <input type="radio" id="laundry_no" name="on_site_laundry" value="No">
            <label for="laundry_no">No</label><br>

            <label for="guest_parking">Guest Parking:</label>
            <input type="radio" id="parking_yes" name="guest_parking" value="Yes">
            <label for="parking_yes">Yes</label>
            <input type="radio" id="parking_no" name="guest_parking" value="No">
            <label for="parking_no">No</label><br>


            <div class="header-section">
            <h3>Responsibility of Utilities</h3>
            </div>

            <p>The following utilities are the responsibility of: </p>
            <label for="electricity_responsibility">Electricity:</label>
            <input type="radio" id="electricity_landlord" name="electricity_responsibility" value="Landlord">
            <label for="electricity_landlord">Landlord</label>
            <input type="radio" id="electricity_tenant" name="electricity_responsibility" value="Tenant">
            <label for="electricity_tenant">Tenant</label><br>

            <label for="heat_responsibility">Heat:</label>
            <input type="radio" id="heat_landlord" name="heat_responsibility" value="Landlord">
            <label for="heat_landlord">Landlord</label>
            <input type="radio" id="heat_tenant" name="heat_responsibility" value="Tenant">
            <label for="heat_tenant">Tenant</label><br>

            <label for="water_responsibility">Water:</label>
            <input type="radio" id="heat_landlord" name="water_responsibility" value="Landlord">
            <label for="water_landlord">Landlord</label>
            <input type="radio" id="heat_tenant" name="water_responsibility" value="Tenant">
            <label for="water_tenant">Tenant</label><br>

            <div class="header-section">
            <h3>Terms and Conditions</h3>
            </div>

            <label for="terms_and_conditions">Please read and agree to the terms and conditions:</label><br>
            <textarea id="terms_and_conditions" name="terms_and_conditions" rows="5" cols="50"></textarea><br>
            
            <button type="submit">Submit</button>

          </form>

        <script>

        document.getElementById('add_rentee').addEventListener('click', function() {
          const renteeDiv = document.createElement('div');
          renteeDiv.classList.add('rentee');

          renteeDiv.innerHTML = 
            '<label for="first_name">First Name:</label>' +
            '<input type="text" class="first_name" name="first_name[]">' +
            '<label for="last_name">Last Name:</label>' +
            '<input type="text" class="last_name" name="last_name[]">' +
            '<button type="button" class="remove_rentee">Remove Rentee</button>';
          document.getElementById('rentees').appendChild(renteeDiv);
      });
       

        const emailAgreementCheckbox = document.getElementById('email_agreement');
        const emailAddressContainer = document.getElementById('email_address_container');

        document.addEventListener('click', function(event) {
          if (event.target.classList.contains('remove_rentee')) {
              event.target.parentNode.remove();
          }
      });

      function getRenteeNames() {
        const renteeFirstNames = [];
        const renteeLastNames = [];
        const renteeInputs = document.querySelectorAll('.rentee');
        renteeInputs.forEach(rentee => {
            const firstName = rentee.querySelector('.first_name').value;
            const lastName = rentee.querySelector('.last_name').value;
            renteeFirstNames.push(firstName);
            renteeLastNames.push(lastName);
        });
    }

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

  const renteeFirstNames = Array.isArray(req.body.first_name) ? req.body.first_name : [req.body.first_name];
  const renteeLastNames = Array.isArray(req.body.last_name) ? req.body.last_name : [req.body.last_name];

  const tenantRetailUnit = req.body.tenant_retail_unit;
  const tenantStreetNumber = req.body.tenant_street_number;
  const tenantStreetName = req.body.tenant_street_name;
  const tenantPOBox = req.body.tenant_POBox;
  const tenantCityTown = req.body.tenant_city_town;
  const tenantProvince = req.body.tenant_province;
  const tenantPostalCode = req.body.tenant_postal_code;

  const emailAgreement = req.body.email_agreement;
  const emailAddress = req.body.email_address;

  const phoneAgreement = req.body.phone_agreement;
  const tenantPhoneNumber = req.body.tenant_phone_number;

  const tenancyStartDate = req.body.tenancy_start_date;
  const tenancyEndDate = req.body.tenancy_end_date;

  const termsAndConditions = req.body.terms_and_conditions;

  const gas = req.body.gas;
  const airConditioning = req.body.air_conditioning;
  const additionalStorage = req.body.additional_storage;
  const onSiteLaundry = req.body.on_site_laundry;
  const guestParking = req.body.guest_parking;

  const electricity = req.body.electricity_responsibility;
  const heat = req.body.heat_responsibility;
  const water = req.body.water_responsibility;

  const htmlContent = `

  <style>
    body{
      padding:50px;
    }

    .header-section {
        background-color: lightgrey;
    }

    .box{
      margin-left:50px;
      padding:1px;
      border: 1px solid black;
      width: 1000px;
    }
    .gap {
      margin-right: 450px;
    }

    p{
      font-size: 1.17em;
    }

    table{
      border-collapse: collapse;
      width:100%;
    }
    td{
      font-size: 1.17em;
      padding: 1px;
      text-align: left;
    }

    
  </style>
  
    <h1>Residential Tenancy Agreement</h1>
    
    <h3>This Residential Lease Agreement (“Agreement”) made on <span id="datePlaceholder"></span> is between:</h3>
    
      <script>
        const today = new Date();
        const formattedDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        document.getElementById('datePlaceholder').textContent = formattedDate;
      </script>

    <h3>Landlord Information:</h3>
    <div class="box">
      <p><strong>Landlord's Legal Name: </strong> ${landlordName}</p>
    </div>
    
    <h3>Rentee Information:</h3>

    <p>In the event there is more than one Tenant, each reference to "Tenant" shall apply to each of them, jointly and severally. Each Tenant is jointly and severally liable to Landlord for payment of rent and performance in accordance with all other terms of this Agreement. Each Landlord and Tenant may be referred to individually as a "Party" and collectively as the "Parties."
    
    ${renteeFirstNames.map((firstName, index) => `
    ${renteeFirstNames.length > 1 ? `<p><strong>Rentee ${index + 1}:</strong></p>` : ''}
      <div class="box">
        <p><strong>First Name: </strong> ${firstName} <span class="gap"></span> <strong>Last Name: </strong> ${renteeLastNames[index]}</p>
      </div>
    `).join('')}
     
    <div class="header-section">
    <h3>A. Rental Unit Information:</h3>
    </div>

    <p>PREMISES LEASED: The landlord, in consideration of the rent to be paid, and covenants and agreements to be to be performed by the Tenant, does hereby lease the following described premises located at ${retailUnit}, ${streetNumber} ${streetName}, ${cityTown} ${province}, ${postalCode} (hereinafter referred to as the "Premises"). The Premises shall include the following personal property owned by the Landlord: ${landlordName}</p>
    

    <div class="header-section">
    <h3>B. Tenant Contact Information:</h3>
    </div>

    <p>Address for Giving Notices or Documents to the Tenant</p>
    
    <table>
      <tr>
          <td><strong>Retail Unit:</strong> ${tenantRetailUnit}</td>
          <td><strong>Street Number:</strong>${tenantStreetNumber}</td>
          <td colspan="2"><strong>Street Name:</strong>${tenantStreetName}</td>
      </tr>
      <tr>
          <td><strong>PO Box:</strong>${tenantPOBox}</td>
          <td><strong>City/Town:</strong>${tenantCityTown}</td>
          <td><strong>Province:</strong>${tenantProvince}</td>
          <td><strong>Postal Code:</strong>${tenantPostalCode}</td>
      </tr>
    </table>

    <div class="header-section">
    <h3>C. Landloard Contact Information:</h3>
    </div>

    <p>Address for Giving Notices or Documents to the Landlord</p>
    
    <table>
      <tr>
          <td><strong>Retail Unit:</strong> 123 </td>
          <td><strong>Street Number:</strong> 43</td>
          <td colspan="2"><strong>Street Name:</strong> Royal Crown Street</td>
      </tr>
      <tr>
          <td><strong>PO Box:</strong> 123456 </td>
          <td><strong>City/Town:</strong> North York</td>
          <td><strong>Province:</strong> Ontario</td>
          <td><strong>Postal Code:</strong>L4E 1S4</td>
      </tr>
    </table>

    <div class="header-section">
    <h3>Contact Notices:</h3>
    </div>

    <p>Email Agreement: ${emailAgreement}</p>
    <p>Email Address: ${emailAddress}</p>
    <p>Phone Agreement: ${phoneAgreement}</p>
    <p>Phone Number: ${tenantPhoneNumber}</p>
    
    <div class="header-section">
    <h3>Tenancy Occupancy Timings:</h3>
    </div>

    <p>This tenancy starts on: ${tenancyStartDate}</p>
    <p>a fixed length of time ending on:</p>
    <p>This tenancy starts on: ${tenancyEndDate}</p>

    <div class="header-section">
    <h3>Services and Utilities</h3>
    </div>

    <p>The following services are included in the lawful rent for the rental unit, as specified:</p>
    <p>Gas: ${gas}</p>
    <p>Air Conditioning: ${airConditioning}</p>
    <p>Additional Storage Space: ${additionalStorage}</p>
    <p>On-Site Laundry: ${onSiteLaundry}</p>
    <p>Guest Parking: ${guestParking}</p>

    <div class="header-section">
    <h3>Responsibility of Utilities</h3>
    </div>

    <p>The following utilities are the responsibility of: </p>
    <p>Electricity: ${electricity}</p>
    <p>Heat: ${heat}</p>
    <p>Water: ${water}</p>

    <div class="header-section">
    <h2>Terms and Conditions Received</h2>
    </div>

    <p>${termsAndConditions}</p>

  `;

  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).send('Error generating PDF');
    } else {
      // Send the PDF as a response
      res.contentType('application/pdf').send(buffer);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
