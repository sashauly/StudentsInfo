// TODO Доработайте существующее приложение со списком студентов из предыдущего модуля.

// Добавьте возможность сохранения списка студентов на сервере.
// При запуске приложения должна быть выполнена проверка на наличие данных на сервере.
// Если данные есть, то нужно вывести список студентов на экран.

// Добавьте возможность удаления студентов из списка.

function createAppTitle() {
  const appTitle = document.createElement('h1');
  appTitle.classList.add('text-center');
  appTitle.textContent = 'Students Info';
  return appTitle;
}

function createFilterContent() {
  const filterContent = document.createElement('div');
  filterContent.classList.add('filter-content', 'mb-3');

  const row = document.createElement('div');
  row.classList.add('row', 'g-3');
  let filterName;
  let filterAdmission;
  let filterGraduation;
  let filterFaculty;

  const inputFilters = [
    filterName,
    filterAdmission,
    filterGraduation,
    filterFaculty,
  ];

  const inputProperties = [
    { id: 'filter-name', type: 'text', placeholder: 'Full Name' },
    { id: 'filter-start', type: 'year', placeholder: 'Years of study' },
    { id: 'filter-graduation', type: 'year', placeholder: 'Year of graduation' },
    { id: 'filter-faculty', type: 'text', placeholder: 'Faculty' },
  ];

  const labelAssoc = [
    'filter-name',
    'filter-start',
    'filter-graduation',
    'filter-faculty',
  ];

  const labelProperties = [
    { for: 'filter-name', textContent: 'Search by full name' },
    { for: 'filter-start', textContent: 'Search by year of study start' },
    { for: 'filter-graduation', textContent: 'Search by year of graduation' },
    { for: 'filter-faculty', textContent: 'Search by faculty' },
  ];

  for (let i = 0; i < inputFilters.length; i += 1) {
    const col = document.createElement('div');
    col.classList.add('col');

    const label = document.createElement('label');
    label.classList.add('label');
    label.setAttribute('for', labelAssoc[i]);
    Object.assign(label, labelProperties[i]);

    inputFilters[i] = document.createElement('input');
    inputFilters[i].classList.add('form-control');
    Object.assign(inputFilters[i], inputProperties[i]);

    col.appendChild(label);
    col.appendChild(inputFilters[i]);

    row.appendChild(col);
  }

  filterContent.appendChild(row);

  return {
    filterContent,
    inputFilters,
  };
}

function createAppTable() {
  const tableContent = document.createElement('div');
  tableContent.classList.add('table-content', 'mb-3');

  const table = document.createElement('table');
  table.classList.add('table');

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  const ths = [
    { id: 'name', scope: 'col', textContent: 'Full Name' },
    { id: 'birthday', scope: 'col', textContent: 'Date of Birth (age)' },
    { id: 'admission', scope: 'col', textContent: 'Years of study' },
    { id: 'faculty', scope: 'col', textContent: 'Faculty' },
  ];

  ths.forEach((th) => {
    const thElement = document.createElement('th');
    Object.assign(thElement, th);
    thElement.style.cursor = 'pointer';
    tr.append(thElement);
  });

  const tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tbody');

  thead.append(tr);
  table.append(thead, tbody);
  tableContent.append(table);
  return { tableContent, table, tbody };
}

function createAppForm() {
  const formContent = document.createElement('div');
  formContent.classList.add('form-content', 'mb-3');

  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Add new student';

  const form = document.createElement('form');
  form.classList.add('form');
  form.setAttribute('id', 'form');

  const firstNameInput = document.createElement('input');
  const lastNameInput = document.createElement('input');
  const patronimicInput = document.createElement('input');
  const birthdayInput = document.createElement('input');
  const admissionInput = document.createElement('input');
  const facultyInput = document.createElement('input');

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Add student';

  const inputGroup1 = document.createElement('div');
  inputGroup1.classList.add('input-group', 'mb-3');

  const inputGroupText = document.createElement('span');
  inputGroupText.classList.add('input-group-text');
  inputGroupText.textContent = 'Full Name';

  const inputGroup2 = document.createElement('div');
  inputGroup2.classList.add('row', 'mb-3');
  const col1 = document.createElement('div');
  const col2 = document.createElement('div');
  const col3 = document.createElement('div');

  col1.classList.add('col');
  col2.classList.add('col');
  col3.classList.add('col');

  const birthdayLabel = document.createElement('label');
  const admissionLabel = document.createElement('label');
  const facultyLabel = document.createElement('label');

  Object.assign(firstNameInput, {
    type: 'text',
    className: 'form-control',
    id: 'input-first-name',
    placeholder: 'First Name',
    pattern: '^[А-ЯЁA-Zа-яёa-z]+$',
    title: 'The name must contain only letters and start with a capital letter',
    required: true,
  });
  Object.assign(lastNameInput, {
    type: 'text',
    className: 'form-control',
    id: 'input-last-name',
    placeholder: 'Last Name',
    pattern: '^[А-ЯЁA-Zа-яёa-z]+$',
    title: 'The last name must contain only letters and start with a capital letter',
    required: true,
  });
  Object.assign(patronimicInput, {
    type: 'text',
    className: 'form-control',
    id: 'input-patronimic',
    placeholder: 'Patronimic',
    pattern: '^[А-ЯЁA-Zа-яёa-z]+$',
    title: 'The patronimic must contain only letters and start with a capital letter',
  });

  Object.assign(birthdayInput, {
    type: 'date',
    className: 'form-control',
    id: 'input-birthday',
    placeholder: 'Date of birth',
    required: true,
  });
  Object.assign(admissionInput, {
    type: 'date',
    className: 'form-control',
    id: 'input-admission',
    placeholder: 'Year of study start',
    required: true,
  });
  Object.assign(facultyInput, {
    type: 'text',
    className: 'form-control',
    id: 'input-faculty',
    placeholder: 'Faculty',
    pattern: '^[А-ЯЁA-Zа-яёa-zk]+$',
    title: 'The faculty must contain only letters and start with a capital letter',
    required: true,
  });

  const currentDate = new Date().toLocaleDateString();
  birthdayInput.setAttribute('min', new Date('1900-01-01').toLocaleDateString());
  birthdayInput.setAttribute('max', currentDate);

  admissionInput.setAttribute('min', new Date('2000-01-01').toLocaleDateString());
  admissionInput.setAttribute('max', currentDate);

  birthdayLabel.setAttribute('for', 'input-birthday');
  birthdayLabel.classList.add('form-label');
  birthdayLabel.textContent = 'Date of birth';

  admissionLabel.setAttribute('for', 'input-admission');
  admissionLabel.classList.add('form-label');
  admissionLabel.textContent = 'Year of study start';

  facultyLabel.setAttribute('for', 'input-faculty');
  facultyLabel.classList.add('form-label');
  facultyLabel.textContent = 'Faculty';

  inputGroup1.append(inputGroupText, firstNameInput, lastNameInput, patronimicInput);

  col1.append(birthdayLabel, birthdayInput);
  col2.append(admissionLabel, admissionInput);
  col3.append(facultyLabel, facultyInput);
  inputGroup2.append(col1, col2, col3);

  form.append(
    inputGroup1,
    inputGroup2,

    button,
  );

  return {
    form,
    firstNameInput,
    lastNameInput,
    patronimicInput,
    birthdayInput,
    admissionInput,
    facultyInput,
    button,
  };
}

function getStudentItem(studentObj) {
  const row = document.createElement('tr');
  const name = document.createElement('td');
  const birthday = document.createElement('td');
  const admission = document.createElement('td');
  const faculty = document.createElement('td');

  const currentDate = new Date();
  const dateBirth = new Date(studentObj.birthday);
  const age = Math.floor((currentDate - dateBirth) / 3.154e+10);
  const dateAdmission = new Date(studentObj.admission);
  let checkGraduation = Math.ceil((currentDate - dateAdmission) / 3.154e+10);
  if (checkGraduation > 4) {
    checkGraduation = 'graduated';
  } else {
    checkGraduation += ' course';
  }

  name.textContent = `${studentObj.firstname} ${studentObj.patronimic} ${studentObj.lastname}`;
  birthday.textContent = `${dateBirth.toLocaleDateString('ru-RU')} (${age} y.o.)`;
  admission.textContent = `${dateAdmission.getFullYear()} - ${dateAdmission.getFullYear() + 4} (${checkGraduation})`;
  faculty.textContent = studentObj.faculty;
  row.append(name, birthday, admission, faculty);
  return row;
}

const container = document.createElement('div');
container.classList.add('container');

const appTitle = createAppTitle();
const formContent = createAppForm();
const tableContent = createAppTable();
const filterContent = createFilterContent();

container.append(
  appTitle,
  filterContent.filterContent,
  formContent.form,
  tableContent.tableContent,
);
document.body.appendChild(container);

function renderStudentsTable(studentsArray) {
  studentsArray.forEach((student) => {
    tableContent.tbody.append(getStudentItem(student));
  });
}

fetch('http://localhost:3000/api/users', { method: 'GET' })
  .then((res) => res.json())
  .then((data) => {
    renderStudentsTable(data);
  }).catch((error) => {
    console.log(error);
  });

formContent.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const studentObj = {
    firstname: formContent.firstNameInput.value,
    lastname: formContent.lastNameInput.value,
    patronimic: formContent.patronimicInput.value,
    birthday: formContent.birthdayInput.value,
    admission: formContent.admissionInput.value,
    faculty: formContent.facultyInput.value,
  };

  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(studentObj),
  })
    .then((res) => {
      if (!res.ok) {
        console.log('ERROR!');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data.message);
      tableContent.tbody.append(getStudentItem(data.user[0]));
    }).catch((error) => {
      console.log(error);
    });

  const inputFields = [
    formContent.firstNameInput,
    formContent.lastNameInput,
    formContent.patronimicInput,
    formContent.birthdayInput,
    formContent.admissionInput,
    formContent.facultyInput,
  ];
  inputFields.forEach((input) => {
    input.value = '';
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
            case 1:
              property = 'birthday';
              break;
            case 2:
              property = 'admission';
              break;
            case 3:
              property = 'faculty';
              break;
            default:
          }
          let cellA = rowA[property];
          let cellB = rowB[property];
          if (!property) {
            cellA = `${rowA.firstname} ${rowA.patronimic} ${rowA.lastname}`;
            cellB = `${rowB.firstname} ${rowB.patronimic} ${rowB.lastname}`;
          }
          directions[columnIndex] = order === 1 ? 'asc' : 'desc';
          return cellA.localeCompare(cellB) > 0 ? order : -order;
        });
        order *= -1;
        tableContent.tbody.innerHTML = '';
        renderStudentsTable(data);
      }).catch((error) => {
        console.log(error);
      });
  });
});

// FILTER
filterContent.inputFilters.forEach((filterInput) => {
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
