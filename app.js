let products = [];

fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    render(products);
  });

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

searchInput.addEventListener("input", applyFilter);
typeFilter.addEventListener("change", applyFilter);

function applyFilter() {
  const search = searchInput.value.toLowerCase();
  const type = typeFilter.value;

  const filtered = products.filter(p => {
    const matchSearch =
      p.code.toLowerCase().includes(search) ||
      p.name.toLowerCase().includes(search);

    const matchType = !type || p.type === type;

    return matchSearch && matchType;
  });

  render(filtered);
}
tableBody.innerHTML += `
<tr>
  <td data-label="Code / Name">
    <div class="mobile-title">
      <span>${p.code}</span>
      <span>${p.name}</span>
    </div>
  </td>

  <td data-label="Type">${p.type}</td>

  <td data-label="Download">
    <div class="download-icon">
      <a href="${p.pdf}" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/724/724933.png">
      </a>
    </div>
  </td>
</tr>
`;


function render(list) {
  const tbody = document.getElementById("productTable");
  tbody.innerHTML = "";

  list.forEach(p => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.code}</td>
      <td>${p.name}</td>
      <td>${p.colour}</td>
      <td>
        <a href="${p.pdf}" class="download-btn" target="_blank">
          Download TC
        </a>
      </td>
    `;

    tbody.appendChild(row);
  });
}

