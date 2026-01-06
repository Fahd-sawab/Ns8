// الحصول على العناصر من HTML
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task");
const taskTableBody = document.querySelector("#task-table tbody");
const completedTasks = document.getElementById("completed-tasks");

// مصفوفة لتخزين المهام
let tasks = [];

// إضافة مهمة جديدة
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if(taskText === "") return; // ما تضيف مهمة فارغة

  const task = {
    id: Date.now(),
    text: taskText,
    date: new Date().toLocaleDateString("ar-EG"),
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
});

// دالة عرض المهام في الجدول
function renderTasks() {
  // مسح الجدول الحالي
  taskTableBody.innerHTML = "";

  tasks.forEach(task => {
    const row = document.createElement("tr");

    // المهمة
    const taskCell = document.createElement("td");
    taskCell.textContent = task.text;
    row.appendChild(taskCell);

    // تاريخ الإضافة
    const dateCell = document.createElement("td");
    dateCell.textContent = task.date;
    row.appendChild(dateCell);

    // حالة المهمة
    const statusCell = document.createElement("td");
    statusCell.textContent = task.completed ? "منجزة ✅" : "قيد التنفيذ ⏳";
    row.appendChild(statusCell);

    // الإجراءات
    const actionsCell = document.createElement("td");

    // زر إنهاء المهمة
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.style.marginRight = "5px";
    completeBtn.addEventListener("click", () => completeTask(task.id));
    actionsCell.appendChild(completeBtn);

    // زر حذف المهمة
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    actionsCell.appendChild(deleteBtn);

    row.appendChild(actionsCell);
    taskTableBody.appendChild(row);
  });

  renderCompletedTasks();
}

// إنهاء المهمة → نقلها للأرشيف
function completeTask(id) {
  tasks = tasks.map(task => {
    if(task.id === id) task.completed = true;
    return task;
  });
  renderTasks();
}

// حذف المهمة
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// عرض المهام المنجزة في الأرشيف
function renderCompletedTasks() {
  completedTasks.innerHTML = "";
  tasks.filter(task => task.completed).forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.text} (${task.date})`;
    completedTasks.appendChild(li);
  });
}

// عرض أي مهام موجودة عند بداية التحميل
renderTasks();
