async function loadExpenses() {
    const res = await fetch("/api/expenses");
    const data = await res.json();

    document.getElementById("list").innerHTML = "";
    let total = 0;

    data.forEach(exp => {
        let li = document.createElement("li");
        li.innerHTML = `<span class="title">${exp.title}</span>
        <span class="amount">₹${exp.amount}</span>
        <button class="del" onclick="del(${exp.id})">Delete</button>`;
        document.getElementById("list").appendChild(li);
        const amt = Number(exp.amount);
        if (!Number.isNaN(amt)) total += amt;
    });

    const totalEl = document.getElementById("total");
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
}

async function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: parseFloat(amount) })
    });

    // reset inputs
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("title").focus();

    loadExpenses();
}

async function del(id) {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    loadExpenses();
}

loadExpenses();
