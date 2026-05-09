const details = document.querySelector('#application-details');

if (details) {
  const params = new URLSearchParams(window.location.search);

  const membershipNames = {
    nonprofit: 'Non-profit Membership',
    silver: 'Silver Membership',
    gold: 'Gold Membership'
  };

  const firstName = params.get('fname') || 'Not provided';
  const lastName = params.get('lname') || 'Not provided';
  const email = params.get('email') || 'Not provided';
  const phone = params.get('phone') || 'Not provided';
  const business = params.get('business') || 'Not provided';
  const description = params.get('description') || 'Not provided';
  const membership = params.get('membership') || 'Not provided';
  const timestamp = params.get('timestamp') || 'Not provided';

  details.innerHTML = `
    <h2>Application Details</h2>

    <div class="application-info">
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business Name:</strong> ${business}</p>
      <p><strong>Membership Package:</strong> ${membershipNames[membership] || membership}</p>
      <p><strong>Business Description:</strong> ${description}</p>
      <p><strong>Submitted:</strong> ${timestamp}</p>
    </div>
  `;
}