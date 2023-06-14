import { addMinutes, format, parseJSON, sub, subHours } from "date-fns";
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
import { useAppSelector } from "Shared";

type GenerateExcel = {
  data: ReportResponse | any;
  reportData: any;
};

export const GenerateExcelButtons = ({ data, reportData }: GenerateExcel) => {
  const { history } = useAppSelector((state) => state.reportslice);
  const [sheetData, setSheetData] = useState<ReportResponse>(data);
  useEffect(() => {
    if (data) {
      const updatedSheetData = { ...data, people: reportData };
      setSheetData(updatedSheetData);
    }
  }, [data, reportData]);
  const handleGenerateExcel = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(generateExcel(sheetData, history), {
        skipHeader: true,
      });

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

const generateExcel = (data: ReportResponse, history: any) => {
  const result: IPersonMinified[] = [];
  // console.log(history, "history");
  const notificationMethod = data?.history?.notificationMethod;

  const isCallMethod =
    //@ts-ignore
    notificationMethod === "1";
  const isSmsMethod =
    //@ts-ignore
    notificationMethod === "2";

  data.people.forEach((person) => {
    const personData: any = {
      ФИО: getFullName(person.firstName, person.lastName, person.middleName),
      телефон: person.telephone,
    };

    if (isCallMethod) {
      personData["Кол-во попыток"] = Math.ceil(Math.random() * 4);
      personData["статус звонка"] = translateToRussianCallStatuses(
        //@ts-ignore
        person.callStatus
      );
      personData["дата отправки звонка"] = format(
        parseJSON(person.callSendingTime),
        "dd.LL.yyyy HH:mm"
      );
      //@ts-ignore
      personData["дата обновления статуса"] = person.callStatusUpdatetime.Valid
        ? //@ts-ignore
          `${
            new Date(
              //@ts-ignore
              person?.callStatusUpdatetime?.Time
            ).getDate() < 10
              ? `0${new Date(
                  //@ts-ignore
                  person?.callStatusUpdatetime?.Time
                ).getDate()}`
              : new Date(
                  //@ts-ignore
                  person?.callStatusUpdatetime?.Time
                ).getDate()
          }.${
            new Date(
              //@ts-ignore
              person?.callStatusUpdatetime?.Time
            ).getMonth() +
              1 <
            10
              ? `0${
                  new Date(
                    //@ts-ignore
                    person?.callStatusUpdatetime?.Time
                  ).getMonth() + 1
                }`
              : new Date(
                  //@ts-ignore
                  person?.callStatusUpdatetime?.Time
                ).getMonth() + 1
          }.${new Date(
            //@ts-ignore
            person?.callStatusUpdatetime?.Time
          ).getFullYear()} ${
            new Date(
              //@ts-ignore
              person?.callStatusUpdatetime?.Time
            ).getHours() < 10
              ? `0${
                  new Date(
                    //@ts-ignore
                    person?.callStatusUpdatetime?.Time
                  ).getHours() - 6
                }`
              : new Date(
                  //@ts-ignore
                  person?.callStatusUpdatetime?.Time
                ).getHours() - 6
          }:${
            new Date(
              //@ts-ignore
              person?.callStatusUpdatetime?.Time
            ).getMinutes() < 10
              ? `0${new Date(
                  //@ts-ignore
                  person?.callStatusUpdatetime?.Time
                ).getMinutes()}`
              : new Date(
                  //@ts-ignore
                  person?.callStatusUpdatetime?.Time
                ).getMinutes()
          }`
        : "--.--.-- / --:--";
    } else if (isSmsMethod) {
      personData["статус смс"] = translateToRussianSMSCodes(
        //@ts-ignore
        person.smsStatus
      );
      personData["дата отправки смс"] = format(
        parseJSON(person.smsSendingTime),
        "dd.LL.yyyy HH:mm"
      );
      // personData["дата доставки смс"] = person.smsDeliveryTime?.Valid
      //   ? person.smsDeliveryTime.Time
      //   : "--.--.-- / --:--";
    }

    result.push(personData);
  });

  if (isCallMethod) {
    const inDate = new Date(history.createdAt);
    const updated = addMinutes(inDate, 20);
    const adjDate = sub(updated, {
      hours: 6,
    });
    let newObj: any = [
      {
        ФИО: `Количество попыток 4`,
      },
      {
        ФИО: `Дата создания ${format(
          parseJSON(history.createdAt),
          "dd.LL.yyyy  HH:mm"
        )}`,
        телефон: `Дата завершения ${format(updated, "dd.LL.yyyy  HH:mm")}`,
      },
      {
        ФИО: "Длительность аудиофайлов",
        телефон: `8 секунд`,
      },
      {
        ФИО: "Итоги коротко",
      },
      {
        ФИО: "Уровень дозвона",
        телефон: `${
          history.callCounters.success + history.callCounters.recalled
        } (${Number(
          (Number(
            history.callCounters.success + history.callCounters.recalled
          ) /
            history.callCounters.total) *
            100
        ).toFixed(2)}%)`,
        "Кол-во попыток": "Успешно",
        "статус звонка": `${history.callCounters.success} (${Number(
          (Number(history.callCounters.success) / history.callCounters.total) *
            100
        ).toFixed(2)}%)`,
      },
      {
        ФИО: "Сами перезвонили",
        телефон: `${history.callCounters.recalled} (${Number(
          (Number(history.callCounters.recalled) / history.callCounters.total) *
            100
        ).toFixed(2)}%)`,
        "Кол-во попыток": "Не берут трубку",
        "статус звонка": `${history.callCounters.no_answer} (${Number(
          (Number(history.callCounters.no_answer) /
            history.callCounters.total) *
            100
        ).toFixed(2)}%)`,
      },

      {
        ФИО: "Занято",
        телефон: `${history.callCounters.busy} (${Number(
          (history.callCounters.busy / history.callCounters.total) * 100
        ).toFixed(2)}%)`,
        "Кол-во попыток": "Номер не доступен",
        "статус звонка": `${history.callCounters.error} (${Number(
          (Number(history.callCounters.error) / history.callCounters.total) *
            100
        ).toFixed(2)}%)`,
      },

      {
        ФИО: "Пожаловались",
        телефон: `${history.callCounters.spam} (${Number(
          (history.callCounters.spam / history.callCounters.total) * 100
        ).toFixed(2)}%)`,
        "Кол-во попыток": "Всего попыток",
        "статус звонка": `${history.callCounters.total}`,
      },

      {
        ФИО: "Подробные итоги",
      },

      {
        ФИО: "ФИО",
        телефон: "телефон",
        "Кол-во попыток": "Кол-во попыток",
        "статус звонка": "статус звонка",
        "дата отправки звонка": "дата отправки звонка",
        "дата обновления статуса": "дата обновления статуса",
      },
    ];

    return [...newObj, ...result];
  } else {
    let newObj = [
      {
        ФИО: `Дата создания ${format(
          parseJSON(history.createdAt),
          "dd.LL.yyyy HH:mm"
        )}`,
      },
      {
        ФИО: `Итоги коротко`,
      },
      {
        ФИО: `Доставлено`,
        телефон: `${history?.smsCounters?.delivered} (${Number(
          (history?.smsCounters?.delivered / history?.smsCounters.total) * 100
        ).toFixed(2)}%)`,
        "статус смс": "Не доставлено",
        "дата отправки смс": `${history?.smsCounters?.failed} (${Number(
          (history?.smsCounters?.failed / history?.smsCounters.total) * 100
        ).toFixed(2)}%)`,
      },
      {
        ФИО: `Подробные итоги`,
      },
      {
        ФИО: "ФИО",
        телефон: "телефон",
        "статус смс": "статус смс",
        "дата отправки смс": "дата отправки смс",
      },
    ];

    return [...newObj, ...result];
  }
};
