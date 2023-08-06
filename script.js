const jsonData = ('data/transaksi.json');

const data = JSON.parse(jsonData);

// Inisialisasi objek untuk menyimpan total berdasarkan menu dan bulan
const totalsByMenuAndMonth = {};

// Mengelompokkan data berdasarkan menu dan bulan serta menjumlahkan totalnya
data.forEach(item => {
    const tanggal = item.tanggal;
    const menu = item.menu;
    const total = item.total;

    const bulan = new Date(tanggal).toLocaleString('default', { month: 'long' });

    const key = `${menu}|${bulan}`;
    if (totalsByMenuAndMonth[key]) {
        totalsByMenuAndMonth[key] += total;
    } else {
        totalsByMenuAndMonth[key] = total;
    }
});

// Membuat tabel dan mengisi datanya
const tableBody = document.getElementById('table-body');
const menus = Array.from(new Set(data.map(item => item.menu)));

menus.forEach(menu => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${menu}</td>`;

    Object.entries(totalsByMenuAndMonth).forEach(([key, total]) => {
        const [menuName, bulan] = key.split('|');
        if (menuName === menu) {
            const cell = document.createElement('td');
            cell.textContent = total.toLocaleString('id-ID');
            row.appendChild(cell);
        }
    });

    tableBody.appendChild(row);
});
