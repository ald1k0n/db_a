import React, { ChangeEvent, useEffect, useState } from "react";
import { format, parseJSON } from "date-fns";
import { RadioGroup } from "@headlessui/react";
import { ReportResponse } from "../../Entities/History";
import {
  classNames,
  getFullName,
  Heading,
  notificationMethod,
  StatusCode,
} from "../../Shared";
import { HiCheck } from "react-icons/hi";
import {
  translateToRussianCallStatuses,
  translateToRussianSMSCodes,
} from "Shared/lib/const/statusCode";

import { useAppDispatch, useAppSelector } from "../../Shared";
import { setHistory } from "App/reportslice";

type ReportProp = {
  history: any;
  report: ReportResponse;
  count: Number;
  setReportData: React.Dispatch<React.SetStateAction<any[] | null>>;
};

export const Report = (props: ReportProp) => {
  const dispatch = useAppDispatch();

  const report = props.report;
  const [smsStatus, setSmsStatus] = useState<any>("all");
  const [callStatus, setCallStatus] = useState<any>("all");
  const [query, setQuery] = useState("");

  let filteredPersons = report.people;
  useEffect(() => {
    dispatch(setHistory(props.history));
  }, [dispatch, props.history]);
  //NOTE - ДЛЯ ТОГО ЧТО БЫ РАБОТАЛО НУЖНО ЧЕКАТЬ СТРИНГИ
  filteredPersons = filteredPersons.filter((person) => {
    return (
      person.firstName.toLowerCase().includes(query.toLowerCase()) ||
      person.middleName.toLowerCase().includes(query.toLowerCase()) ||
      person.lastName.toLowerCase().includes(query.toLowerCase()) ||
      person.telephone.toLowerCase().includes(query.toLowerCase())
    );
  });
  filteredPersons = filteredPersons.filter((person) => {
    if (smsStatus === "delivered") {
      //@ts-ignore
      return person.smsStatus === "delivered";
    } else if (smsStatus === "all") {
      return person;
    } else if (smsStatus !== "delivered") {
      //@ts-ignore
      return person.smsStatus !== "delivered";
    }
  });
  filteredPersons = filteredPersons.filter((person) => {
    if (callStatus === "success") {
      //@ts-ignore
      return person.callStatus === "success";
    } else if (callStatus === "all") {
      return person;
    } else if (smsStatus !== "success") {
      //@ts-ignore
      return person.callStatus !== "success";
    }
  });

  useEffect(() => {
    props.setReportData(filteredPersons);
  }, [smsStatus, callStatus]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  return (
    <>
      <div className={"container py-2.5 mx-auto grow flex flex-col space-y-4"}>
        <div className={"grid grid-cols-5 gap-4"}>
          <div
            className={classNames(
              "col-span-3 grid grid-rows-3",
              report.history.notificationMethod.toString() !==
                notificationMethod.both.toString() && "col-span-4"
            )}
          >
            <div className={"flex flex-row justify-between font-bold"}>
              <h1>Комманда: {report.command.name}</h1>
              <h1>СПИСОК: {report.history.historyNumber}</h1>
            </div>
            <div
              className={classNames(
                "grid-cols-4 grid text-sm items-center px-4"
              )}
            >
              <h1 className={"col-start-2"}>{`Всего в списке:  `}</h1>
              <h1>Доставлено:</h1>

              <h1>Не доставлено:</h1>
            </div>
            {(report.history.notificationMethod.toString() ===
              notificationMethod.both.toString() ||
              report.history.notificationMethod.toString() ===
                notificationMethod.call.toString()) && (
              <div className={"grid grid-cols-4 items-center px-4 bg-gray-100"}>
                <div>Звонок</div>

                <div>{`${props?.history?.callCounters.total}`}</div>
                <div>
                  {props?.history?.callCounters?.success} (
                  {(
                    (props?.history?.callCounters?.success /
                      Number(props.count)) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
                <div>
                  {`${
                    Number(props.count) - props?.history?.callCounters?.success
                  }`}{" "}
                  (
                  {(
                    ((Number(props.count) -
                      props?.history?.callCounters?.success) /
                      Number(props.count)) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            )}
            {report.history.notificationMethod.toString() === "2" && (
              <div className={"grid grid-cols-4 items-center px-4 bg-gray-100"}>
                <div>SMS</div>
                <div>{`${props?.history?.smsCounters.total}`} </div>
                <div>
                  {props?.history?.smsCounters?.delivered} (
                  {(
                    (props?.history?.smsCounters?.delivered /
                      Number(props.count)) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
                <div>
                  {props?.history?.smsCounters?.rejected} (
                  {(
                    (props?.history?.smsCounters?.rejected /
                      Number(props.count)) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            )}
          </div>
          {(report.history.notificationMethod.toString() ===
            notificationMethod.both.toString() ||
            report.history.notificationMethod.toString() ===
              notificationMethod.sms.toString()) && (
            <div className={""}>
              <Heading>SMS</Heading>
              <RadioGroup
                as={"div"}
                value={smsStatus}
                onChange={setSmsStatus}
                //ANCHOR ДЛЯ ФИЛЬТРОВ СМС
                className={"grid grid-rows-3"}
              >
                <RadioGroup.Option value={"all"} className={"space-x-2"}>
                  {({ checked }) => (
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "ring-2 ring-secondary rounded-full m-2 w-4 h-4"
                        }
                      >
                        {checked && <HiCheck className={"text-secondary"} />}
                      </div>
                      <span>Все</span>
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value={"delivered"} className={"space-x-2"}>
                  {({ checked }) => (
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "ring-2 ring-secondary rounded-full m-2 w-4 h-4"
                        }
                      >
                        {checked && <HiCheck className={"text-secondary"} />}
                      </div>
                      <span>Доставленные</span>
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value={"error"} className={"space-x-2"}>
                  {({ checked }) => (
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "ring-2 ring-secondary rounded-full m-2 w-4 h-4"
                        }
                      >
                        {checked && <HiCheck className={"text-secondary"} />}
                      </div>
                      <span>Не доставленные</span>
                    </div>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            </div>
          )}
          {(report.history.notificationMethod.toString() ===
            notificationMethod.both.toString() ||
            report.history.notificationMethod.toString() ===
              notificationMethod.call.toString()) && (
            <div>
              <Heading>Звонок</Heading>
              <RadioGroup
                as={"div"}
                value={callStatus}
                onChange={setCallStatus}
                // ANCHOR ДЛЯ ФИЛЬТРОВ ЗВОНКОВ
                className={"grid grid-rows-3"}
              >
                <RadioGroup.Option value={"all"} className={"space-x-2"}>
                  {({ checked }) => (
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "ring-2 ring-secondary rounded-full m-2 w-4 h-4"
                        }
                      >
                        {checked && <HiCheck className={"text-secondary"} />}
                      </div>
                      <span>Все</span>
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value={"success"} className={"space-x-2"}>
                  {({ checked }) => (
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "ring-2 ring-secondary rounded-full m-2 w-4 h-4"
                        }
                      >
                        {checked && <HiCheck className={"text-secondary"} />}
                      </div>
                      <span>Доставленные</span>
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value={"error"} className={"space-x-2"}>
                  {({ checked }) => (
                    <div className={"flex flex-row items-center"}>
                      <div
                        className={
                          "ring-2 ring-secondary rounded-full m-2 w-4 h-4"
                        }
                      >
                        {checked && <HiCheck className={"text-secondary"} />}
                      </div>
                      <span>Не доставленные</span>
                    </div>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            </div>
          )}
        </div>
        <div>
          <input
            onChange={handleChange}
            id="text"
            name="text"
            type="text"
            placeholder="Поиск"
            className={
              "block w-full rounded-md text-gray-900 focus:ring-primary focus:border-primary active:ring-primary"
            }
          />
        </div>
        {report.people.length !== 0 ? (
          <div className={"grow flex flex-col py-5 space-y-2"}>
            <div
              className={classNames(
                "grid gap-4 place-items-center",
                report.history.notificationMethod.toString() ===
                  notificationMethod.both.toString()
                  ? "grid-cols-8"
                  : "grid-cols-6"
              )}
            >
              <h1>ID</h1>
              <h1>ФИО</h1>
              <h1>Телефон</h1>
              {(report.history.notificationMethod.toString() ===
                notificationMethod.both.toString() ||
                report.history.notificationMethod.toString() ===
                  notificationMethod.call.toString()) && (
                <div
                  className={
                    "w-full col-span-3 place-items-center grid grid-cols-3 grid-rows-2"
                  }
                >
                  <h1 className={"col-span-3"}>ЗВОНОК</h1>
                  <h1 className={""}>Статус</h1>
                  <h1 className={""}>Время отправки</h1>
                  <h1 className={"text-center"}>Время обновления статуса</h1>
                </div>
              )}
              {(report.history.notificationMethod.toString() ===
                notificationMethod.both.toString() ||
                report.history.notificationMethod.toString() ===
                  notificationMethod.sms.toString()) && (
                <div
                  className={
                    "w-full col-span-3 place-items-center grid grid-cols-3 grid-rows-2"
                  }
                >
                  <h1 className={"col-span-3"}>СМС</h1>
                  <h1 className={""}>Статус</h1>
                  <h1 className={""}>Время отправки</h1>
                  <h1 className={"text-center"}>Время изменения статуса</h1>
                </div>
              )}
            </div>
            <hr className={"border-gray-900"} />
            {filteredPersons.map((person, idx) => {
              return (
                <div key={person.id}>
                  <div
                    className={classNames(
                      "grid gap-4 place-items-center py-2.5 text-center",
                      report.history.notificationMethod.toString() ===
                        notificationMethod.both.toString()
                        ? "grid-cols-8"
                        : "grid-cols-6"
                    )}
                  >
                    <div>{idx + 1}</div>
                    <div>
                      {getFullName(
                        person.firstName,
                        person.lastName,
                        person.middleName
                      )}
                    </div>
                    <div>{person.telephone}</div>
                    {(report.history.notificationMethod.toString() ===
                      notificationMethod.both.toString() ||
                      report.history.notificationMethod.toString() ===
                        notificationMethod.call.toString()) && (
                      <>
                        <div>
                          <h1
                            className={`${StatusCode(person.callStatus).color}`}
                          >
                            {translateToRussianCallStatuses(
                              //@ts-ignore
                              person?.callStatus
                            )}
                          </h1>
                        </div>

                        <div>
                          <h1>
                            {/* ANCHOR Проверить потм  */}

                            {format(
                              parseJSON(person.callSendingTime),
                              "dd.MM.yyyy / HH:mm"
                            )}
                          </h1>
                        </div>

                        <div>
                          <h1>
                            {
                              //@ts-ignore
                              person.callStatusUpdatetime?.Valid ? (
                                <>
                                  {`${
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
                                  }`}
                                  {"."}
                                  {new Date(
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
                                      ).getMonth() + 1}
                                  {"."}
                                  {new Date(
                                    //@ts-ignore
                                    person?.callStatusUpdatetime?.Time
                                  ).getFullYear()}
                                  {" / "}{" "}
                                  {new Date(
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
                                      ).getHours() - 6}
                                  {":"}
                                  {new Date(
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
                                      ).getMinutes()}
                                </>
                              ) : (
                                "--.--.-- / --:--"
                              )
                            }
                          </h1>
                        </div>
                      </>
                    )}
                    {(report.history.notificationMethod.toString() ===
                      notificationMethod.both.toString() ||
                      report.history.notificationMethod.toString() ===
                        notificationMethod.sms.toString()) && (
                      <>
                        <div>
                          <h1
                            className={`${StatusCode(person.callStatus).color}`}
                          >
                            {translateToRussianSMSCodes(
                              //@ts-ignore
                              person?.smsStatus
                            )}
                          </h1>
                        </div>
                        <div>
                          <h1>
                            {format(
                              parseJSON(person.smsSendingTime),
                              "dd.MM.yyyy / HH:mm"
                            )}
                          </h1>
                        </div>
                        <div>
                          {/* ANCHOR хз мб вот это и есть ответ */}
                          <h1>
                            {
                              //@ts-ignore
                              person?.smsStatusUpdatetime?.Time
                                ? format(
                                    parseJSON(
                                      //@ts-ignore
                                      person?.smsStatusUpdatetime?.Time
                                    ),
                                    "dd.MM.yyyy / HH:mm"
                                  )
                                : "--.--.-- / --:--"
                            }
                          </h1>
                        </div>
                      </>
                    )}
                  </div>
                  <hr className={"bg-gray-600"} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={"grow flex flex-col items-center justify-center"}>
            <h1
              className={
                "text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              }
            >
              No Data
            </h1>
          </div>
        )}
      </div>
    </>
  );
};
