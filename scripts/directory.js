const members = [
  {
    name: "Capital Tech Hub",
    address: "Wuse 2, Abuja",
    phone: "+234 801 111 2233",
    website: "#",
    level: "Gold",
    description: "Software training and digital business solutions."
  },
  {
    name: "Green Market Foods",
    address: "Garki, Abuja",
    phone: "+234 802 222 3344",
    website: "#",
    level: "Silver",
    description: "Fresh food supply and agricultural products."
  },
  {
    name: "Unity Logistics",
    address: "Utako, Abuja",
    phone: "+234 803 333 4455",
    website: "#",
    level: "Gold",
    description: "Business logistics and local delivery support."
  },
  {
    name: "Abuja Creative Studio",
    address: "Maitama, Abuja",
    phone: "+234 804 444 5566",
    website: "#",
    level: "Silver",
    description: "Branding, design, and media production."
  },
  {
    name: "Northgate Consulting",
    address: "Central Area, Abuja",
    phone: "+234 805 555 6677",
    website: "#",
    level: "Non-profit",
    description: "Business advisory and community support."
  },
  {
    name: "Prime Build Services",
    address: "Jabi, Abuja",
    phone: "+234 806 666 7788",
    website: "#",
    level: "Gold",
    description: "Construction, facility, and property support."
  }
];

const directory = document.querySelector('#directory');

function displayMembers(memberList) {
  if (!directory) return;

  directory.innerHTML = '';

  memberList.forEach((member) => {
    const card = document.createElement('article');
    card.classList.add('card', 'member-card');

    card.innerHTML = `
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership:</strong> ${member.level}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    directory.appendChild(card);
  });
}

displayMembers(members);

const gridView = document.querySelector('#gridView');
const listView = document.querySelector('#listView');

if (gridView && listView && directory) {
  gridView.addEventListener('click', () => {
    directory.classList.remove('list');
  });

  listView.addEventListener('click', () => {
    directory.classList.add('list');
  });
}
