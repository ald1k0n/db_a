import * as XLSX from "xlsx";

export const downloadExampleExcel = () => {
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet([
            {
                "Имя": "Имя",
                "Фамилия": "Фамилия",
                "Отчество": "Отчество",
                "Телефон": "+7 777 777 77 77",
            }
        ])

    XLSX.utils.book_append_sheet(wb, ws, 'Лист 1')
    XLSX.writeFile(wb, `Шаблон Рассылки.xlsx`)
}