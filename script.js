const formClothing = document.getElementById('form-clothing');
const nameClothing = document.getElementById('name');
const sizeClothing = document.getElementById('size');
const brandClothing = document.getElementById('brand');
const quantityClothing = document.getElementById('quantity');
const containerButtons = document.getElementById('container-buttons');
const addClothing = document.getElementById('add');
const tableClothings = document.querySelector('#table-clothings tbody');

let clothingIndex = undefined;
let formText = 'create';

let currentClothing = {
  name: '',
  size: '',
  brand: '',
  quantity: '',
};

nameClothing.addEventListener('input', (event) => {
  currentClothing.name = event.target.value;
});
sizeClothing.addEventListener('input', (event) => {
  currentClothing.size = event.target.value;
});
brandClothing.addEventListener('input', (event) => {
  currentClothing.brand = event.target.value;
});
quantityClothing.addEventListener('input', (event) => {
  currentClothing.quantity = event.target.value;
});

// botones
addClothing.addEventListener('click', accionForm);

// lista
function listClothings() {
  tableClothings.innerHTML = '';

  clothings.forEach((clothing, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th>${index + 1}</th>
      <td>${clothing.name}</td>
      <td>${clothing.size}</td>
      <td>${clothing.brand}</td>
      <td>${clothing.quantity}</td>
      <td>
        <button 
            type="button"
            onclick="loadClothingForm(${index})"
        >
        Actualizar
        </button>
        <button
            type="button"
            onclick="showClothing(${index})"
        >
        Mirar
        </button>
        <button
            type="button"
            onclick="deleteClothing(${index})"
        > 
        Eliminar
        </button>
      </td>
      `;
    tableClothings.appendChild(row);
  });
}

// crear prendas
function createClothing() {
  clothings.push(Object.assign({}, currentClothing));
  listClothings();
  formClothing.reset();
}

// texto del botton dependiendo del tipo de formulario
function nameButtonText() {
  switch (formText) {
    case 'create':
      addClothing.innerText = 'Crear';
      break;
    case 'update':
      addClothing.innerText = 'Actualizar';
      break;

    default:
      break;
  }
}

// acción del formulario
function accionForm() {
  switch (formText) {
    case 'create':
      createClothing();
      break;
    case 'update':
      updateClothing();
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
      if (document.getElementById('cancel-button') !== null) {
        return;
      }

      const cancelButton = document.createElement('button');
      cancelButton.id = 'cancel-button';
      cancelButton.innerText = 'Cancelar';
      cancelButton.addEventListener('click', () => {
        cancelButton.remove();
        formText = 'create';
        formClothing.reset();
        nameButtonText();
      });
      containerButtons.appendChild(cancelButton);
      break;
    default:
      break;
  }
}

// actualizar
function updateClothing() {
  clothings[clothingIndex] = Object.assign({}, currentClothing);
  listClothings();
  formClothing.reset();
  formText = 'create';
  nameButtonText();
  cancelButtonAccion();
}

function loadClothingForm(index) {
  formText = 'update';
  clothingIndex = index;
  currentClothing = Object.assign({}, clothings[index]);
  nameClothing.value = currentClothing.name;
  sizeClothing.value = currentClothing.size;
  brandClothing.value = currentClothing.brand;
  quantityClothing.value = currentClothing.quantity;
  nameButtonText();
  cancelButtonAccion();
}

// eliminar
function deleteClothing(index) {
  clothings = clothings.filter((_, i) => {
    return i !== index;
  });
  listClothings();
}

// mirar
const modalHtmlElement = document.getElementById('view-clothing');
const bootstrapModal = new bootstrap.Modal(modalHtmlElement);

function showClothing(index) {
  const modalTitle = document.querySelector('#view-clothing .modal-title');
  const modalBody = document.querySelector('#view-clothing .modal-body');
  bootstrapModal.show();
  modalBody.innerHTML = `
  <ul>
    <li><b>Nombre: </b>${clothings[index].name}</li>
    <li><b>Talla: </b>${clothings[index].size}</li>
    <li><b>Marca: </b>${clothings[index].brand}</li>
    <li><b>Cantidad: </b>${clothings[index].quantity}</li>
  </ul>
  `;
  modalTitle.innerText = clothings[index].name;
}

// llamado de funciones
listClothings();
