export interface IPerson {
        id: string,
        historyId: string,
        firstName: string,
        lastName: string,
        middleName: string,
        email: string,
        telephone: string,
        isactive: boolean,
        serverSmsStatusCode: number,
        smsId: number,
        smsStatus: number,
        smsSendingTime: string,
        smsDeliveryTime: {
                Time: string,
                Valid: boolean
        }
        serverCallStatusCode: number,
        callId: number,
        callStatus: number,
        callSendingTime: string,
        callDeliveryTime: {
                Time: string,
                Valid: boolean
        }
}

export interface IPersonMinified {
        "ФИО": string,
        "телефон": string,
        "статус смс"?: string,
        "дата отправки смс"?: string,
        "дата доставки смс"?: string,
        "статус звонка"?: string,
        "дата отправки звонка"?: string,
        "дата доставки звонка"?: string,
}