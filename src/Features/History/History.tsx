import React, { useEffect, useState } from "react";
import { HistoryList, historyAPI } from "Entities/History";
import { Loading, Heading, Calendar } from "Shared";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { format } from "date-fns";

import { useAppSelector } from "Shared";

export const History = () => {
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

  const [date, setDate] = useState<Date | null>(null);

  const [trigger, result] = historyAPI.useLazyFetchHistoryQuery();

  const [data, setData] = useState<any[] | null>(null);

  const { userToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    function hist() {
      if (userToken)
        trigger("")
          .then(({ data }) => {
            setData(data!);
          })
          .catch((err) => console.error(err));
    }
    hist();
  }, [trigger, data, userToken]);

  const clickHandler = () => {
    if (date) {
      trigger(format(date, "yyyy-MM-dd"));
    } else {
      trigger("");
    }
  };

  return (
    <>
      <Heading>ИСТОРИЯ ОПОВЕЩЕНИЯ</Heading>
      <div className={"grid grid-cols-4 gap-10 mt-2.5 grow"}>
        <div className={"col-span-3"}>
          <div className={"flex flex-col h-full"}>
            <div className={"grid grid-cols-4 gap-4 text-center px-4 py-2.5"}>
              <div>Дата / Время</div>
              <div>Категория сигнала</div>
              <div>Список</div>
              <div>Способ оповещения</div>
            </div>
            <div className={"relative grow"}>
              {result.isLoading ? <Loading /> : null}
              {result.isSuccess && <HistoryList list={data!} />}
            </div>
          </div>
        </div>
        <div className={"col-start-4"}>
          <div
            className={
              "flex flex-row justify-center py-2.5 items-center space-x-4 leading-6"
            }
          >
            <MdOutlineCalendarMonth className={"h-6 w-6"} />
            <h1>Выберите дату рассылки</h1>
          </div>
          <div>
            <Calendar
              value={date}
              setValue={setDate}
              className={
                "block w-full p-6 bg-white border border-gray-200 rounded shadow"
              }
              titleClassName={"leading-6 text-xl"}
              buttonClassName={
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-300"
              }
              hoverClassName={"hover:bg-gray-200"}
              todayClassName={"text-secondary"}
              selectedClassName={"bg-secondary text-white"}
              currentMonthClassName={"text-gray-900"}
            />
          </div>
          <div className={"flex flex-col justify-center mt-2.5"}>
            <button
              className={
                "bg-green hover:bg-darkGreen mx-auto text-white py-2.5 px-10 rounded-lg"
              }
              onClick={clickHandler}
            >
              Найти
            </button>
            {!date && (
              <div className={"border-l-2 border-gray-900 mt-2.5"}>
                <p className={"p-2.5"}>
                  Дата не выбрана!
                  <br />
                  Показаны списки за всю историю оповещений
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
