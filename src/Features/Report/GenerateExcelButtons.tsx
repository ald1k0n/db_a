import { format } from "date-fns";
import { ReportResponse } from "Entities/History";
import React, { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import {
  getFullName,
  IPersonMinified,
  notificationMethod,
  StatusCode,
} from "Shared";
import {
  translateToRussianCallStatuses,
  translateToRussianSMSCodes,
} from "Shared/lib/const/statusCode";
import * as XLSX from "xlsx";

type GenerateExcel = {
  data: ReportResponse | any;
  reportData: any;
};

export const GenerateExcelButtons = ({ data, reportData }: GenerateExcel) => {
  const [sheetData, setSheetData] = useState<ReportResponse>(data);
  useEffect(() => {
    if (data) {
      const updatedSheetData = { ...data, people: reportData };
      setSheetData(updatedSheetData);
    }
  }, [data, reportData]);
  const handleGenerateExcel = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(generateExcel(sheetData));

    XLSX.utils.book_append_sheet(wb, ws, "Лист 1");
    XLSX?.writeFile(
      wb,
      `Отчет за ${format(
        new Date(data?.history?.createdAt),
        "dd MM yyyy"
      )}.xlsx`
    );
  };
  return (
    <button onClick={handleGenerateExcel}>
      <HiDownload className={"h-6 w-6"} />
    </button>
  );
};

const generateExcel = (data: ReportResponse): IPersonMinified[] => {
  let result: IPersonMinified[] = [];
  if (
    data?.history?.notificationMethod?.toString() ===
    notificationMethod?.both.toString()
  ) {
    data.people.forEach((person) => {
      result.push({
        ФИО: getFullName(person.firstName, person.lastName, person.middleName),
        телефон: person.telephone,
        //@ts-ignore
        "статус смс": translateToRussianSMSCodes(person.smsStatus),
        "дата отправки смс": person.smsSendingTime,
        "дата доставки смс": person.smsDeliveryTime.Valid
          ? person.smsDeliveryTime.Time
          : "--.--.-- / --:--",
        //@ts-ignore
        "статус звонка": translateToRussianCallStatuses(person.callStatus),
        "дата отправки звонка": person.callSendingTime,
        "дата доставки звонка": person.callDeliveryTime.Valid
          ? person.callDeliveryTime.Time
          : "--.--.-- / --:--",
      });
    });
  } else if (
    data?.history?.notificationMethod?.toString() ===
    notificationMethod?.call?.toString()
  ) {
    data.people.forEach((person) => {
      result.push({
        ФИО: getFullName(person.firstName, person.lastName, person.middleName),
        телефон: person.telephone,
        //@ts-ignore
        "статус звонка": translateToRussianCallStatuses(person.callStatus),
        "дата отправки звонка": person?.callSendingTime,
        //@ts-ignore
        "дата обновления статуса": person.callStatusUpdatetime.Valid
          ? //@ts-ignore
            person.callStatusUpdatetime?.Time
          : "--.--.-- / --:--",
      });
    });
  } else if (
    data?.history?.notificationMethod?.toString() ===
    notificationMethod?.sms?.toString()
  ) {
    data.people.forEach((person) => {
      result.push({
        ФИО: getFullName(person.firstName, person.lastName, person.middleName),
        телефон: person?.telephone,
        "статус смс": StatusCode(person.smsStatus)?.message,
        "дата отправки смс": person?.smsSendingTime,
        "дата доставки смс": person?.smsDeliveryTime?.Valid
          ? person?.smsDeliveryTime?.Time
          : "--.--.-- / --:--",
      });
    });
  }
  return result;
};
