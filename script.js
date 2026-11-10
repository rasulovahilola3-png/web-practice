// 1. Логика для кнопки (Задание 2)
document.getElementById('myButton').addEventListener('click', function () {
    console.log("Кнопка нажата");

    const textElement = document.getElementById('text');
    textElement.textContent = "Текст был изменён после нажатия кнопки!";
});

// 2. Загрузка данных из Google Таблицы (Задание 3)
async function loadData() {
    // ВСТАВЬТЕ СЮДА ВАШУ ССЫЛКУ ИЗ GOOGLE ТАБЛИЦЫ
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGZZ4z877I6cujbs4RZjIIQuTN3EA3R7HH7Gxnt__iSmp1uODdDhVA08r5jlXZvtxvIwxoHcc6lwqm/pub?output=csv';

    try {
        const response = await fetch(url);

        // исправлено: добавлена проверка response.ok, чтобы отловить 404/500
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        // исправлено: учтён \r при разбиении строк для правильного парсинга CSV
        const rows = data.trim().split(/\r?\n/).map(row => row.split(','));

        let html = '<table border="1" style="border-collapse: collapse; width: 50%;"><thead>';
        // Первая строка - заголовки
        html += '<tr>' + rows[0].map(h => `<th>${h.trim()}</th>`).join('') + '</tr></thead><tbody>';

        // Остальные строки - данные
        for (let i = 1; i < rows.length; i++) {
            html += '<tr>' + rows[i].map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
        }
        html += '</tbody></table>';

        document.getElementById('output').innerHTML = html;

    } catch (error) {
        // исправлено: ошибка выводится на страницу, а не только в консоль
        document.getElementById('output').innerHTML = `<p style="color:red">Ошибка загрузки данных: ${error.message}</p>`;
        console.error('Ошибка:', error);
    }
}

// Запускаем загрузку данных при открытии страницы
loadData();