// Filter(search) by column
const filterSelect = document.querySelector('.filter-select');
const filterInput = document.querySelector('.filter-input');

filterSelect.addEventListener('change', () => {
  switch (filterSelect.value) {
    case '1':
      filterInput.type = 'text';
      filterInput.placeholder = 'Enter Full Name';
      break;
    case '2':
      filterInput.type = 'date';
      filterInput.placeholder = 'Enter Start Study Date';
      break;
    case '3':
      filterInput.type = 'date';
      filterInput.placeholder = 'Enter Graduation Date';
      break;
    case '4':
      filterInput.type = 'text';
      filterInput.placeholder = 'Enter Faculty Name';
      break;
    default:
      filterInput.type = 'text';
      filterInput.placeholder = '';
  }
});

filterInput.addEventListener('input', () => {
  const rows = Array.from(document.querySelectorAll('tbody tr'));
  const filter = filterInput.value.toLowerCase();

  for (let i = 0; i < rows.length; i += 1) {
    const td = rows[i].getElementsByTagName('td');
    let found = false;

    for (let j = 0; j < td.length; j += 1) {
      if (td[j].innerHTML.toLowerCase().indexOf(filter) > -1) {
        found = true;
        break;
      }
    }

    if (found) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
});

// Render one student
function getStudentItem(studentObj) {
  const row = document.createElement('tr');
  const id = document.createElement('th');
  const name = document.createElement('td');
  const birthday = document.createElement('td');
  const admission = document.createElement('td');
  const faculty = document.createElement('td');

  const currentDate = new Date();
  const dateBirth = new Date(studentObj.birthday);
  const age = Math.floor((currentDate - dateBirth) / 3.154e10);
  const dateAdmission = new Date(studentObj.admission);
  let checkGraduation = Math.ceil((currentDate - dateAdmission) / 3.154e10);
  if (checkGraduation > 4) {
    checkGraduation = 'graduated';
  } else {
    checkGraduation += ' course';
  }
  id.textContent = studentObj.id;
  id.setAttribute('scope', 'row');
  name.textContent = `${studentObj.firstname} ${studentObj.patronimic} ${studentObj.lastname}`;
  birthday.textContent = `${dateBirth.toLocaleDateString(
    'ru-RU'
  )} (${age} y.o.)`;
  admission.textContent = `${dateAdmission.getFullYear()} - ${
    dateAdmission.getFullYear() + 4
  } (${checkGraduation})`;
  faculty.textContent = studentObj.faculty;
  row.append(id, name, birthday, admission, faculty);
  return row;
}

// Render all students
const tbody = document.querySelector('tbody');

function renderStudentsTable(studentsArray) {
  studentsArray.forEach((student) => {
    tbody.append(getStudentItem(student));
  });
}

// Render all students for the first time
fetch('http://localhost:3000/api/users', { method: 'GET' })
  .then((res) => res.json())
  .then((data) => {
    renderStudentsTable(data);
  })
  .catch((error) => {
    console.log(error);
  });

// Add new user
const form = document.querySelector('form');

const birthdayInput = document.querySelector('#input-birthday');
const admissionInput = document.querySelector('#input-admission');

birthdayInput.setAttribute('max', new Date().toLocaleDateString());
admissionInput.setAttribute('max', new Date().toLocaleDateString());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstNameInput = document.querySelector('#input-first-name');
  const lastNameInput = document.querySelector('#input-last-name');
  const patronimicInput = document.querySelector('#input-patronimic');
  const facultyInput = document.querySelector('#input-faculty');

  const studentObj = {
    firstname: firstNameInput.value,
    lastname: lastNameInput.value,
    patronimic: patronimicInput.value,
    birthday: birthdayInput.value,
    admission: admissionInput.value,
    faculty: facultyInput.value
  };

  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(studentObj)
  })
    .then((res) => {
      if (!res.ok) {
        console.log('ERROR!');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data.message);
      tbody.append(getStudentItem(data.user[0]));
    })
    .catch((error) => {
      console.log(error);
    });

  const inputFields = [
    firstNameInput,
    lastNameInput,
    patronimicInput,
    birthdayInput,
    admissionInput,
    facultyInput
  ];
  inputFields.forEach((inputField) => {
    inputField.value = '';
  });
});

// SORTING
const headers = document.querySelectorAll('th');
const directions = Array.from(headers).map(() => '');
let order = 1;

headers.forEach((header) => {
  header.addEventListener('click', () => {
    const columnIndex = Array.from(headers).indexOf(header);
    fetch('http://localhost:3000/api/users', { method: 'GET' })
      .then((res) => res.json())
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
        console.log(error);
      });
  });
});
