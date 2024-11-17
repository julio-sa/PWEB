// Importar módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
firebase.firestore.setLogLevel('debug');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9oem5o974MwI3P2FEhsDOQ8lO38Zr-lY",
  authDomain: "kanban-software-developing.firebaseapp.com",
  projectId: "kanban-software-developing",
  storageBucket: "kanban-software-developing.firebasestorage.app",
  messagingSenderId: "539193088436",
  appId: "1:539193088436:web:c8af470e793bf0b6bafae1",
  measurementId: "G-3111J01BGH"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Adiciona a tarefa ao clicar no botão
document.getElementById('addTaskBtn').addEventListener('click', addTask);

async function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const priority = document.getElementById('taskPriority').value;
  const dueDate = document.getElementById('taskDueDate').value;

  if (!title || !description || !dueDate) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "tarefas"), {
      title,
      description,
      priority,
      dueDate,
      timestamp: new Date()
    });
    console.log("Tarefa adicionada com ID: ", docRef.id);
    const task = createTask(docRef.id, title, description, priority, dueDate);
    document.querySelector('#backlog .tasks').appendChild(task);
    clearFields();
  } catch (error) {
    console.error("Erro ao adicionar tarefa: ", error);
  }
}

// Função para criar uma tarefa no DOM
function createTask(id, title, description, priority, dueDate) {
  const task = document.createElement('div');
  task.classList.add('task', priority.toLowerCase());
  task.setAttribute('draggable', true);
  task.setAttribute('id', id);

  const dueDateObject = new Date(dueDate);
  const currentDate = new Date();
  const timeDiff = dueDateObject - currentDate;
  const oneDay = 24 * 60 * 60 * 1000; // Um dia em milissegundos

  if (timeDiff < oneDay) {
    task.classList.add('due-soon'); // Para tarefas que estão prestes a vencer
  }

  task.innerHTML = 
    `<h4 contenteditable="false">${title}</h4>
    <p contenteditable="false">${description}</p>
    <small contenteditable="false">Vencimento: ${dueDate}</small>
    <select class="priority-select">
      <option value="Baixa">Baixa</option>
      <option value="Média">Média</option>
      <option value="Alta">Alta</option>
    </select>
    <button class="edit-btn">Editar</button>
    <button class="delete-btn">Excluir</button>`;

  const prioritySelect = task.querySelector('.priority-select');
  prioritySelect.value = priority;
  prioritySelect.addEventListener('change', (e) => {
    const newPriority = e.target.value;
    task.classList.remove('baixa', 'media', 'alta');
    task.classList.add(newPriority.toLowerCase());
    updateTask(id, { priority: newPriority });
  });

  task.querySelector('.delete-btn').addEventListener('click', () => {
    deleteTask(id);
    task.remove();
  });

  task.querySelector('.edit-btn').addEventListener('click', () => {
    const editBtn = task.querySelector('.edit-btn');
    if (editBtn.textContent === 'Editar') {
      editBtn.textContent = 'Salvar';
      task.querySelector('h4').setAttribute('contenteditable', 'true');
      task.querySelector('p').setAttribute('contenteditable', 'true');
      task.querySelector('small').setAttribute('contenteditable', 'true');
    } else {
      editBtn.textContent = 'Editar';
      task.querySelector('h4').setAttribute('contenteditable', 'false');
      task.querySelector('p').setAttribute('contenteditable', 'false');
      task.querySelector('small').setAttribute('contenteditable', 'false');
      updateTask(id, {
        title: task.querySelector('h4').textContent,
        description: task.querySelector('p').textContent,
        dueDate: task.querySelector('small').textContent.replace("Vencimento: ", "")
      });
    }
  });

  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);

  return task;
}

// Limpar os campos após adicionar tarefa
function clearFields() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskPriority').value = 'Baixa';
  document.getElementById('taskDueDate').value = '';
}

// Funções para interagir com Firestore
async function updateTask(id, updatedFields) {
  try {
    await updateDoc(doc(db, "tarefas", id), updatedFields);
    console.log("Tarefa atualizada com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar tarefa: ", error);
  }
}

async function deleteTask(id) {
  try {
    await deleteDoc(doc(db, "tarefas", id));
    console.log("Tarefa excluída com sucesso");
  } catch (error) {
    console.error("Erro ao excluir tarefa: ", error);
  }
}

async function listTasks() {
  try {
    const tasksQuery = query(collection(db, "tarefas"), orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(tasksQuery);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const task = createTask(doc.id, data.title, data.description, data.priority, data.dueDate);
      document.querySelector('#backlog .tasks').appendChild(task);
    });
  } catch (error) {
    console.error("Erro ao listar tarefas: ", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  listTasks();
});

// Funções de arrastar e soltar
function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.target.classList.add('dragging');
}

function dragEnd(event) {
  event.target.classList.remove('dragging');
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('text/plain');
  const task = document.getElementById(taskId);
  event.target.closest('.tasks').appendChild(task);
  task.classList.remove('dragging');
}

// Tornar funções globais para o HTML
window.allowDrop = allowDrop;
window.dragStart = dragStart;
window.dragEnd = dragEnd;
window.drop = drop;

document.querySelectorAll('.column').forEach(column => {
  column.addEventListener('drop', (event) => {
    const taskId = event.dataTransfer.getData('text/plain');
    const task = document.getElementById(taskId);
    column.querySelector('.tasks').appendChild(task);
    task.classList.remove('backlog', 'development', 'done');
    task.classList.add(column.id);
  });
});
