const expensesList = document.getElementById("expenses");
const totalAmount = document.getElementById("total");

// Load expenses
async function loadExpenses() {
    const res = await fetch("/api/expenses");
    const data = await res.json();

    expensesList.innerHTML = "";
    let total = 0;

    data.data.forEach(exp => {
        const id = String(exp._id);
        const title = String(exp.title ?? "");
        const amountNum = Number(exp.amount);
        total += isNaN(amountNum) ? 0 : amountNum;

        const li = document.createElement("li");

        const titleEl = document.createElement("span");
        titleEl.className = "title";
        titleEl.textContent = title;

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.alignItems = "center";
        right.style.gap = "12px";

        const amountEl = document.createElement("span");
        amountEl.className = "amount";
        amountEl.textContent = `₹${(isNaN(amountNum) ? 0 : amountNum).toFixed(2)}`;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn--primary";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editExpense(id, title, amountNum));

        const delBtn = document.createElement("button");
        delBtn.className = "del";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => deleteExpense(id));

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        right.appendChild(amountEl);
        right.appendChild(actions);
        li.appendChild(titleEl);
        li.appendChild(right);
        expensesList.appendChild(li);
    });

    totalAmount.innerText = Number(total.toFixed(2));
}

// Add expense
async function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount })
    });

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    loadExpenses();
}

// Delete
async function deleteExpense(id) {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    loadExpenses();
}

// Update
async function editExpense(id, oldTitle, oldAmount) {
    const newTitle = prompt("New Title", oldTitle);
    const newAmount = prompt("New Amount", oldAmount);

    if (!newTitle || !newAmount) return;

    await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, amount: newAmount })
    });

    loadExpenses();
}

loadExpenses();
