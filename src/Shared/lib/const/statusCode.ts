export interface SMSStatus {
    message: string,
    color: string,
}

export const StatusCode = (code: number): SMSStatus => {
    switch (code) {
        case -3:
            return {color: 'text-warning', message: 'Сообщение не найдено'}
        case -2:
            return {color: 'text-warning', message: 'Остановлено'}
        case -1:
            return {color: 'warning', message: 'Ожидает отправки'}
        case 0:
            return {color: 'text-info', message: 'Передано оператору'}
        case 1:
            return {color: 'text-success', message: 'Доставлено'}
        case 2:
            return {color: 'text-success', message: 'Прочитано'}
        case 3:
            return {color: 'text-success', message: 'Просрочено'}
        case 4:
            return {color: 'text-success', message: 'Нажата ссылка'}
        case 20:
            return {color: 'text-danger', message: 'Невозможно доставить'}
        case 22:
            return {color: 'text-danger', message: 'Неверный номер'}
        case 23:
            return {color: 'text-danger', message: 'Запрещено'}
        case 24:
            return {color: 'text-danger', message: 'Недостаточно средств'}
        case 25:
            return {color: 'text-danger', message: 'Недоступный номер'}
        default:
            return {color: 'text-warning', message: 'No Status'}
    }
}
