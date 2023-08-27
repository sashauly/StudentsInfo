const tbody = document.querySelector('tbody');

const filterSelect = document.querySelector('.filter-select');
const filterInput = document.querySelector('.filter-input');

const filterConfig = {
  name: {
    type: 'text',
    placeholder: 'Enter Name...'
  },
  start: {
    type: 'date',
    placeholder: 'Enter start study date...'
  },
  graduation: {
    type: 'date',
    placeholder: 'Enter Graduation Date...'
  },
  faculty: {
    type: 'text',
    placeholder: 'Enter Faculty Name...'
  }
};

const handleFilterChange = () => {
  const selectedFilter = filterSelect.value;
  const config = filterConfig[selectedFilter];
  filterInput.type = config.type;
  filterInput.placeholder = config.placeholder;
};

const handleFilterInput = () => {
  const filterValue = filterInput.value.toLowerCase();
  const rows = Array.from(tbody.getElementsByTagName('tr'));
  rows.forEach((row) => {
    const cells = Array.from(row.getElementsByTagName('td'));
    const match = cells.some((cell) =>
      cell.textContent.toLowerCase().includes(filterValue)
    );
    row.style.display = match ? '' : 'none';
  });
};

const createStudentRow = ({
  id,
  firstname,
  patronimic,
  lastname,
  birthday,
  admission,
  faculty
}) => {
  const currentDate = new Date();
  const dateBirth = new Date(birthday);
  const age = Math.floor((currentDate - dateBirth) / 3.154e10);
  const dateAdmission = new Date(admission);
  let checkGraduation = Math.ceil((currentDate - dateAdmission) / 3.154e10);
  checkGraduation =
    checkGraduation > 4 ? 'graduated' : `${checkGraduation} course`;

  return `
    <tr>
      <th scope="row">${id}</th>
      <td>${firstname} ${patronimic} ${lastname}</td>
      <td>${dateBirth.toLocaleDateString('ru-RU')} (${age} y.o.)</td>
      <td>${dateAdmission.getFullYear()} - ${
        dateAdmission.getFullYear() + 4
      } (${checkGraduation})</td>
      <td>${faculty}</td>
    </tr>
  `;
};

const renderStudentsTable = (students) => {
  tbody.innerHTML = students.map(createStudentRow).join('');
};

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const fetchStudents = () => {
  fetchData('http://localhost:3000/api/users')
    .then((students) => {
      renderStudentsTable(students);
    })
    .catch((error) => {
      console.error(error);
    });
};

const setInputMaxDates = () => {
  const today = new Date().toLocaleDateString();
  const birthdayInput = document.querySelector('#input-birthday');
  const admissionInput = document.querySelector('#input-admission');
  admissionInput.max = today;
  birthdayInput.max = today;
};

const successNotificationStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  zIndex: '9999'
};

const errorNotificationStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#dc3545',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  zIndex: '9999'
};

function createNotification(message, styles) {
  const notification = document.createElement('div');
  notification.textContent = message;
  Object.assign(notification.style, styles);
  return notification;
}

function showSuccessNotification() {
  const notification = createNotification(
    'User successfully added',
    successNotificationStyles
  );
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function showErrorNotification() {
  const notification = createNotification(
    'Error adding user',
    errorNotificationStyles
  );
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const student = Object.fromEntries(formData.entries());

  fetchData('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(student)
  })
    .then((data) => {
      tbody.insertAdjacentHTML('beforeend', createStudentRow(data.user[0]));
      form.reset();
      showSuccessNotification();
    })
    .catch((error) => {
      console.log(error);
      showErrorNotification();
    });
});

const headers = document.querySelectorAll('th');
const directions = Array.from(headers).map(() => '');
let order = 1;
const handleHeaderClick = (event) => {
  const th = event.target;
  const columnIndex = Array.from(th.parentNode.children).indexOf(th);
  fetchData(`http://localhost:3000/api/users`)
    .then((data) => {
      data.sort((rowA, rowB) => {
        let property;
        switch (columnIndex) {
          case 0:
            property = 'id';
            break;
          case 1:
            property = 'name';
            break;
          case 2:
            property = 'birthday';
            break;
          case 3:
            property = 'admission';
            break;
          case 4:
            property = 'faculty';
            break;
          default:
        }
        let cellA = rowA[property];
        let cellB = rowB[property];
        if (property === 'name') {
          cellA = `${rowA.firstname} ${rowA.patronimic} ${rowA.lastname}`;
          cellB = `${rowB.firstname} ${rowB.patronimic} ${rowB.lastname}`;
        }
        directions[columnIndex] = order === 1 ? 'asc' : 'desc';
        if (property === 'id') {
          return cellA - cellB > 0 ? -order : order;
        }
        return cellA.localeCompare(cellB) > 0 ? order : -order;
      });
      order *= -1;
      tbody.innerHTML = '';
      renderStudentsTable(data);
    })
    .catch((error) => {
      console.error(error);
    });
};
Array.from(document.querySelectorAll('th')).forEach((header) => {
  header.addEventListener('click', handleHeaderClick);
});

filterSelect.addEventListener('change', handleFilterChange);
filterInput.addEventListener('input', handleFilterInput);

// Initialization
fetchStudents();
setInputMaxDates();
