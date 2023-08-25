// TODO Доработайте существующее приложение со списком студентов из предыдущего модуля.

// Добавьте возможность сохранения списка студентов на сервере.
// При запуске приложения должна быть выполнена проверка на наличие данных на сервере.
// Если данные есть, то нужно вывести список студентов на экран.

// Добавьте возможность удаления студентов из списка.

const filterName = document.querySelector('#filter-name');
const filterAdmission = document.querySelector('#filter-start');
const filterGraduation = document.querySelector('#filter-graduation');
const filterFaculty = document.querySelector('#filter-faculty');

const inputFilters = [
  filterName,
  filterAdmission,
  filterGraduation,
  filterFaculty
];

const form = document.querySelector('form');

const firstNameInput = document.querySelector('input');
const lastNameInput = document.querySelector('input');
const patronimicInput = document.querySelector('input');
const facultyInput = document.querySelector('input');

const birthdayInput = document.querySelector('#input-birthday');
const admissionInput = document.querySelector('#input-admission');

const currentDate = new Date().toLocaleDateString();
birthdayInput.setAttribute('min', new Date('1900-01-01').toLocaleDateString());
birthdayInput.setAttribute('max', currentDate);

admissionInput.setAttribute('min', new Date('2000-01-01').toLocaleDateString());
admissionInput.setAttribute('max', currentDate);

function getStudentItem(studentObj) {
  const row = document.createElement('tr');
  const id = document.createElement('td');
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

const tbody = document.querySelector('tbody');

function renderStudentsTable(studentsArray) {
  studentsArray.forEach((student) => {
    tbody.append(getStudentItem(student));
  });
}

fetch('http://localhost:3000/api/users', { method: 'GET' })
  .then((res) => res.json())
  .then((data) => {
    renderStudentsTable(data);
  })
  .catch((error) => {
    console.log(error);
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();

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

// FILTER
inputFilters.forEach((filterInput) => {
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
});
