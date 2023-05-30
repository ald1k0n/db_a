import { format } from 'date-fns';
import { ReportResponse } from 'Entities/History';
import React, {useEffect, useState } from 'react';
import { HiDownload } from 'react-icons/hi';
import {getFullName, IPersonMinified, notificationMethod, StatusCode} from 'Shared';
import * as XLSX from 'xlsx';

type GenerateExcel = {
    data: ReportResponse,
}

export const GenerateExcelButtons = ({data}: GenerateExcel) => {
    const [sheetData, setSheetData] = useState<ReportResponse>(data)
    useEffect(()=>{
        setSheetData(data);
    }, [data])
    const handleGenerateExcel = () => {
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(generateExcel(sheetData))

        XLSX.utils.book_append_sheet(wb, ws, 'Лист 1')
        XLSX.writeFile(wb, `Отчет за ${format(new Date(data.history.createdAt), 'dd MM yyyy')}.xlsx`)
    }
    return (
        <button onClick={handleGenerateExcel}>
            <HiDownload className={'h-6 w-6'}/>
        </button>
    );
}

const generateExcel = (data: ReportResponse) : IPersonMinified[] => {
    let result: IPersonMinified[] = []
    if(data.history.notificationMethod.toString() === notificationMethod.both.toString()){
        data.people.forEach(person=>{
            result.push({
                "ФИО": getFullName(person.firstName, person.lastName, person.middleName),
                "телефон": person.telephone,
                "статус смс": StatusCode(person.smsStatus).message,
                "дата отправки смс": person.smsSendingTime,
                "дата доставки смс": person.smsDeliveryTime.Valid ? person.smsDeliveryTime.Time : '--.--.-- / --:--',
                "статус звонка": StatusCode(person.callStatus).message,
                "дата отправки звонка": person.callSendingTime,
                "дата доставки звонка": person.callDeliveryTime.Valid ? person.callDeliveryTime.Time : '--.--.-- / --:--',
            })
        })
    } else if (data.history.notificationMethod.toString() === notificationMethod.call.toString()){
        data.people.forEach(person=>{
            result.push({
                "ФИО": getFullName(person.firstName, person.lastName, person.middleName),
                "телефон": person.telephone,
                "статус звонка": StatusCode(person.callStatus).message,
                "дата отправки звонка": person.callSendingTime,
                "дата доставки звонка": person.callDeliveryTime.Valid ? person.callDeliveryTime.Time : '--.--.-- / --:--',
            })
        })
    } else if (data.history.notificationMethod.toString() === notificationMethod.sms.toString()){
        data.people.forEach(person=>{
            result.push({
                "ФИО": getFullName(person.firstName, person.lastName, person.middleName),
                "телефон": person.telephone,
                "статус смс": StatusCode(person.smsStatus).message,
                "дата отправки смс": person.smsSendingTime,
                "дата доставки смс": person.smsDeliveryTime.Valid ? person.smsDeliveryTime.Time : '--.--.-- / --:--',
            })
        })
    }
    return result
}
