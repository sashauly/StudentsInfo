// TODO Доработайте существующее приложение со списком студентов из предыдущего модуля.

// Добавьте возможность сохранения списка студентов на сервере.
// При запуске приложения должна быть выполнена проверка на наличие данных на сервере.
// Если данные есть, то нужно вывести список студентов на экран.

// Добавьте возможность удаления студентов из списка.

const studentsList = [
  {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    patronimic: 'Ivanovich',
    birthday: '02.01.2003',
    startStudy: '05.01.2010',
    faculty: 'Mechanics',
  },
  {
    firstName: 'Anatoly',
    lastName: 'Vanukin',
    patronimic: 'Stepanovich',
    birthday: '11.23.1985',
    startStudy: '02.07.2005',
    faculty: 'Architecture',
  },
  {
    firstName: 'Petr',
    lastName: 'Petrov',
    patronimic: 'Petrovich',
    birthday: '11.03.1998',
    startStudy: '09.02.2016',
    faculty: 'Physics',
  },
];

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
  let filterStartStudy;
  let filterGraduation;
  let filterFaculty;

  const inputFilters = [
    filterName,
    filterStartStudy,
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

  for (let i = 0; i < inputFilters.length; i++) {
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
    { id: 'start-study', scope: 'col', textContent: 'Years of study' },
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
  const startStudyInput = document.createElement('input');
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
  const startStudyLabel = document.createElement('label');
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
  Object.assign(startStudyInput, {
    type: 'date',
    className: 'form-control',
    id: 'input-start-study',
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

  startStudyInput.setAttribute('min', new Date('2000-01-01').toLocaleDateString());
  startStudyInput.setAttribute('max', currentDate);

  birthdayLabel.setAttribute('for', 'input-birthday');
  birthdayLabel.classList.add('form-label');
  birthdayLabel.textContent = 'Date of birth';

  startStudyLabel.setAttribute('for', 'input-start-study');
  startStudyLabel.classList.add('form-label');
  startStudyLabel.textContent = 'Year of study start';

  facultyLabel.setAttribute('for', 'input-faculty');
  facultyLabel.classList.add('form-label');
  facultyLabel.textContent = 'Faculty';

  inputGroup1.append(inputGroupText, firstNameInput, lastNameInput, patronimicInput);

  col1.append(birthdayLabel, birthdayInput);
  col2.append(startStudyLabel, startStudyInput);
  col3.append(facultyLabel, facultyInput);
  inputGroup2.append(col1, col2, col3);

  form.append(inputGroup1,
    inputGroup2, button);

  return {
    form,
    firstNameInput,
    lastNameInput,
    patronimicInput,
    birthdayInput,
    startStudyInput,
    facultyInput,
    button,
  };
}

function getStudentItem(studentObj) {
  const row = document.createElement('tr');
  const name = document.createElement('td');
  const birthday = document.createElement('td');
  const startStudy = document.createElement('td');
  const faculty = document.createElement('td');

  const currentDate = new Date();
  const dateBirth = new Date(studentObj.birthday);
  const age = Math.floor((currentDate - dateBirth) / 31557600000);
  const dateStartStudy = new Date(studentObj.startStudy);
  let checkGraduation = Math.floor((currentDate - dateStartStudy) / 31557600000);
  if (checkGraduation >= 4) {
    checkGraduation = 'graduated';
  } else {
    checkGraduation += ' course';
  }

  name.textContent = `${studentObj.firstName} ${studentObj.patronimic} ${studentObj.lastName}`;
  birthday.textContent = `${dateBirth.toLocaleDateString('ru-RU')} (${age} y.o.)`;
  startStudy.textContent = `${dateStartStudy.getFullYear()} - ${dateStartStudy.getFullYear() + 4} (${checkGraduation})`;
  faculty.textContent = studentObj.faculty;
  row.append(name, birthday, startStudy, faculty);
  return row;
}

const container = document.createElement('div');
container.classList.add('container');

const appTitle = createAppTitle();
const formContent = createAppForm();
const tableContent = createAppTable();
const filterContent = createFilterContent();

container.append(appTitle,
  filterContent.filterContent,
  tableContent.tableContent,
  formContent.form);
document.body.appendChild(container);

function renderStudentsTable(studentsArray) {
  studentsArray.forEach((student) => {
    tableContent.tbody.append(getStudentItem(student));
  });
}

renderStudentsTable(studentsList);

formContent.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const studentObj = {
    firstName: formContent.firstNameInput.value,
    lastName: formContent.lastNameInput.value,
    patronimic: formContent.patronimicInput.value,
    birthday: formContent.birthdayInput.value,
    startStudy: formContent.startStudyInput.value,
    faculty: formContent.facultyInput.value,
  };

  const inputFields = [
    formContent.firstNameInput,
    formContent.lastNameInput,
    formContent.patronimicInput,
    formContent.birthdayInput,
    formContent.startStudyInput,
    formContent.facultyInput,
  ];
  inputFields.forEach((input) => {
    input.value = '';
  });

  studentsList.push(studentObj);
  tableContent.tbody.append(getStudentItem(studentObj));
});

// SORTING
let order = 1;
const headers = document.querySelectorAll('th');
const rows = Array.from(document.querySelectorAll('tbody tr'));
const directions = Array.from(headers).map(() => '');
headers.forEach((header) => {
  header.addEventListener('click', () => {
    const columnIndex = Array.from(headers).indexOf(header);

    rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex].textContent;
      const cellB = rowB.cells[columnIndex].textContent;
      directions[columnIndex] = order === 1 ? 'asc' : 'desc';
      return cellA.localeCompare(cellB) > 0 ? order : -order;
    });
    order *= -1;

    rows.forEach((row) => tableContent.tbody.appendChild(row));
  });
});

// FILTER
filterContent.inputFilters.forEach((filterInput) => {
  filterInput.addEventListener('input', () => {
    const filter = filterInput.value.toLowerCase();

    for (let i = 0; i < rows.length; i++) {
      const td = rows[i].getElementsByTagName('td');
      let found = false;

      for (let j = 0; j < td.length; j++) {
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
