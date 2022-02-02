const formGarmet = document.getElementById('form-garmet');
const nameGarmet = document.getElementById('name');
const sizeGarmet = document.getElementById('size');
const brandGarmet = document.getElementById('brand');
const quantityGarmet = document.getElementById('quantity');
const containerButtons = document.getElementById('container-buttons');
const addGarmet = document.getElementById('add');
const tableGarmets = document.querySelector('#table-garmets tbody');

let garmetIndex = undefined;
let formText = 'create';

let currentGarmet = {
  name: '',
  size: '',
  brand: '',
  quantity: '',
};

nameGarmet.addEventListener('input', (event) => {
  currentGarmet.name = event.target.value;
});
sizeGarmet.addEventListener('input', (event) => {
  currentGarmet.size = event.target.value;
});
brandGarmet.addEventListener('input', (event) => {
  currentGarmet.brand = event.target.value;
});
quantityGarmet.addEventListener('input', (event) => {
  currentGarmet.quantity = event.target.value;
});

// botones
containerButtons.addEventListener('click', accionForm);

// lista
function listGarmets() {
  tableGarmets.innerHTML = '';

  garmets.forEach((garmet, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th>${index + 1}</th>
      <td>${garmet.name}</td>
      <td>${garmet.size}</td>
      <td>${garmet.brand}</td>
      <td>${garmet.quantity}</td>
      <td>
        <button 
            type="button"
            onclick="loadGarmetForm(${index})"
        >
        Actualizar
        </button>
        <button
            type="button"
            onclick="showGarmet(${index})"
        >
        Mirar
        </button>
        <button
            type="button"
            onclick="deleteGarmet(${index})"
        > 
        Eliminar
        </button>
      </td>
      `;
    tableGarmets.appendChild(row);
  });
}

// crear prendas
function createGarmet() {
  garmets.push(Object.assign({}, currentGarmet));
  listGarmets();
  formGarmet.reset();
}

// texto del botton dependiendo del tipo de formulario
function nameButtonText() {
  switch (formText) {
    case 'create':
      addGarmet.innerText = 'Crear';
      break;
    case 'update':
      addGarmet.innerText = 'Actualizar';
      break;

    default:
      break;
  }
}

// acción del formulario
function accionForm() {
  switch (formText) {
    case 'create':
      createGarmet();
      break;
    case 'update':
      updateGarmet();
      break;
    default:
      break;
  }
}

// acción del botón de cancelar
function cancelButtonAccion() {
  switch (formText) {
    case 'create':
      document.getElementById('cancel-button').remove();
      break;
    case 'update':
      if (document.getElementById('cancel-button')) {
        return;
      }

      const cancelButton = document.createElement('button');
      cancelButton.id = 'cancel-button';
      cancelButton.innerText = 'Cancelar';
      cancelButton.addEventListener('click', () => {
        cancelButton.remove();
        formText = 'create';
        formGarmet.reset();
        accionForm();
      });
      containerButtons.appendChild(cancelButton);
      break;
    default:
      break;
  }
}

// actualizar
function updateGarmet() {
  garmets[garmetIndex] = Object.assign({}, currentGarmet);
  listGarmets();
  formGarmet.reset();
  formText = 'create';
  nameButtonText();
  cancelButtonAccion();
}

function loadGarmetForm(index) {
  formText = 'update';
  garmetIndex = index;
  currentGarmet = Object.assign({}, garmets[index]);
  nameGarmet.value = currentGarmet.name;
  sizeGarmet.value = currentGarmet.size;
  brandGarmet.value = currentGarmet.brand;
  quantityGarmet.value = currentGarmet.quantity;
  nameButtonText();
  cancelButtonAccion();
}

// eliminar
function deleteGarmet(index) {
  garmets = garmets.filter((_, i) => {
    return i !== index;
  });
  listGarmets();
}

// mirar
const modalHtmlElement = document.getElementById('view-garmet');
const bootstrapModal = new bootstrap.Modal(modalHtmlElement);

function showGarmet(index) {
  const modalTitle = document.querySelector('#view-garmet .modal-title');
  const modalBody = document.querySelector('#view-garmet .modal-body');
  bootstrapModal.show();
  modalBody.innerHTML = `
  <ul>
    <li><b>Nombre: </b>${garmets[index].name}</li>
    <li><b>Talla: </b>${garmets[index].size}</li>
    <li><b>Marca: </b>${garmets[index].brand}</li>
    <li><b>Cantidad: </b>${garmets[index].quantity}</li>
  </ul>
  `;
  modalTitle.innerText = garmets[index].name;
}

// llamado de funciones
listGarmets();
