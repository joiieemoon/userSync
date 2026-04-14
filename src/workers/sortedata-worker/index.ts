self.onmessage = function (e) {
    const { data, sortField, sortOrder } = e.data;
    console.log("sorted as worker");
    if (!sortField) {
        postMessage(data);
        return;

    }
    const sorted = [...data].sort((a, b) => {
        const valA = String(a[sortField] || "").toLowerCase();
        const valB = String(b[sortField] || "").toLowerCase();

        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    postMessage(sorted);
}