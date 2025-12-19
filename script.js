/* ROLE SELECTION */
function selectRole(role) {
  localStorage.setItem("role", role);
  window.location.href = "signup.html";
}

/* SIGNUP */
function signup() {
  const role = localStorage.getItem("role");
  const name = su_name.value;
  const email = su_email.value;
  const password = su_password.value;

  if (!name || !email || !password) {
    alert("All fields required");
    return;
  }

  const user = { name, email, password, role };
  localStorage.setItem(role + "_user", JSON.stringify(user));

  alert("Account created");
  window.location.href = "login.html";
}

/* LOGIN */
function login() {
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem(role + "_user"));

  if (!user ||
      user.email !== li_email.value ||
      user.password !== li_password.value) {
    alert("Invalid login");
    return;
  }

  localStorage.setItem("loggedIn", "true");

  if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  } else {
    window.location.href = "worker-dashboard.html";
  }
}

/* LOGOUT */
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

/* WORKER MANAGEMENT (ADMIN) */
function addWorker() {
  const workers = JSON.parse(localStorage.getItem("workers")) || [];

  workers.push({
    name: name.value,
    dept: dept.value,
    shift: shift.value,
    overtime: 0,
    leave: "None",
    salary: salary.value
  });

  localStorage.setItem("workers", JSON.stringify(workers));
  showWorkers();
}

function showWorkers() {
  const table = document.getElementById("table");
  if (!table) return;

  table.innerHTML = "";
  const workers = JSON.parse(localStorage.getItem("workers")) || [];

  workers.forEach((w, index) => {
    table.innerHTML += `
      <tr>
        <td>${w.name}</td>
        <td>${w.dept}</td>
        <td>${w.shift}</td>
        <td>${w.overtime}</td>
        <td>${w.leave}</td>
        <td>₹${Number(w.salary) + w.overtime * 100}</td>
        <td>
          <button onclick="removeWorker(${index})">❌ Remove</button>
        </td>
      </tr>
    `;
  });
}
function removeWorker(index) {
  let workers = JSON.parse(localStorage.getItem("workers")) || [];

  if (confirm("Are you sure you want to remove this worker?")) {
    workers.splice(index, 1);
    localStorage.setItem("workers", JSON.stringify(workers));
    showWorkers();
  }
}


showWorkers();

/* WORKER LEAVE */
function applyLeave() {
  alert("Leave request submitted (simulated)");
}
function loadMyDetails() {
  const user = JSON.parse(localStorage.getItem("worker_user"));
  const workers = JSON.parse(localStorage.getItem("workers")) || [];

  if (!user) return;

  const worker = workers.find(w => w.name === user.name);
  if (!worker) return;

  document.getElementById("w_name").value = worker.name;
  document.getElementById("w_dept").value = worker.dept;
  document.getElementById("w_shift").value = worker.shift;
  document.getElementById("w_salary").value = worker.salary;

  document.getElementById("salaryInfo").innerText =
    `Base Salary: ₹${worker.salary}
     | Overtime: ${worker.overtime} hrs
     | Final Salary: ₹${Number(worker.salary) + worker.overtime * 100}`;
}

function updateMyDetails() {
  const user = JSON.parse(localStorage.getItem("worker_user"));
  let workers = JSON.parse(localStorage.getItem("workers")) || [];

  const newName = document.getElementById("w_name").value;

  workers = workers.map(w => {
    if (w.name === user.name) {
      w.name = newName;
    }
    return w;
  });

  user.name = newName;
  localStorage.setItem("worker_user", JSON.stringify(user));
  localStorage.setItem("workers", JSON.stringify(workers));

  alert("Details updated successfully");
}
loadMyDetails();

function saveMyDetails() {
  const user = JSON.parse(localStorage.getItem("worker_user"));
  let workers = JSON.parse(localStorage.getItem("workers")) || [];

  const newName = document.getElementById("w_name").value;

  workers = workers.map(w => {
    if (w.name === user.name) {
      w.name = newName;
    }
    return w;
  });

  user.name = newName;

  localStorage.setItem("worker_user", JSON.stringify(user));
  localStorage.setItem("workers", JSON.stringify(workers));

  document.getElementById("w_name").disabled = true;
  alert("Details saved successfully");

  loadMyDetails();
}
function applyLeave() {
  const status = document.getElementById("leaveStatus").value;
  const user = JSON.parse(localStorage.getItem("worker_user"));
  let workers = JSON.parse(localStorage.getItem("workers")) || [];

  workers = workers.map(w => {
    if (w.name === user.name) {
      w.leave = status;
    }
    return w;
  });

  localStorage.setItem("workers", JSON.stringify(workers));
  alert("Leave status updated");
}
loadMyDetails();
