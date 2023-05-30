import React, { useEffect, useState } from "react";
import {
  commandsAPI,
  CommandsList,
  UploadFile,
  executeCommandRequest,
} from "Entities/Command/";
import {
  classNames,
  downloadExampleExcel,
  Heading,
  ICommand,
  Loading,
  notificationMethod,
  Toggle,
} from "Shared";
import {
  HiDotsHorizontal,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineVolumeUp,
} from "react-icons/hi";

export const Command = () => {
  const {
    data: commands,
    isFetching,
    isSuccess,
    isError,
  } = commandsAPI.useFetchCommandsQuery();

  const [upload] = commandsAPI.useExecuteCommandMutation();

  const [isValid, setValid] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [command, setCommand] = useState<ICommand | null>(null);
  //const [cost, setCost] = useState<string | null>(null);
  const [sms, setSms] = useState(false);
  const [call, setCall] = useState(false);

  const [commandError, setCommandError] = useState("");
  const [notificaionError, setNotificationError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleSubmit = () => {
    if (!!file && !!command) {
      const formData = new FormData();
      formData.append("file", file);
      let request: executeCommandRequest = {
        id: command.id,
        body: formData,
        params: {
          cost: "3",
        },
      };
      if (sms && call) {
        request.params.notificationMethod = notificationMethod.both;
      } else if (sms && !call) {
        request.params.notificationMethod = notificationMethod.sms;
      } else if (!sms && call) {
        request.params.notificationMethod = notificationMethod.call;
      }
      upload(request);
      setIsAlertVisible(true);
      setCall(false);
      setSms(false);
      setCommand(null);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }
  };
  useEffect(() => {
    if (!sms && !call) {
      setNotificationError("At least one option is required");
    } else if (sms || call) {
      setNotificationError("");
    }
  }, [sms, call]);
  useEffect(() => {
    if (!command) {
      setCommandError("Required");
    } else if (command) {
      setCommandError("");
    }
  }, [command]);
  useEffect(() => {
    if (!file) {
      setFileError("Required");
    } else if (!!file) {
      setFileError("");
    }
  }, [file]);

  useEffect(() => {
    if (
      commandError.length === 0 &&
      notificaionError.length === 0 &&
      fileError.length === 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [commandError, notificaionError, fileError]);
  return (
    <>
      <div className={"grow grid grid-cols-2 gap-4"}>
        <div className={"flex flex-col space-y-4"}>
          <div className={"py-5"}>
            <Heading
              className={"uppercase text-center"}
              lineHeight={"2px"}
              color={"bg-gray-500"}
            >
              Тип сигнала и способ оповещения
            </Heading>
          </div>
          <div className={"flex flex-col grow"}>
            <div className={"relative grow"}>
              {isFetching && <Loading />}
              {isSuccess && (
                <CommandsList
                  command={command}
                  setCommand={setCommand}
                  commands={commands}
                />
              )}
            </div>
          </div>
        </div>
        <div className={"flex flex-col space-y-4"}>
          <div className={"py-5"}>
            <Heading
              className={"uppercase text-center"}
              lineHeight={"2px"}
              color={"bg-gray-500"}
            >
              СПИСКИ ДЛЯ РАССЫЛКИ
            </Heading>
          </div>
          <UploadFile file={file} setFile={setFile} />
          <button
            onClick={downloadExampleExcel}
            className="border-2 border-green text-green rounded-lg flex flex-row justify-center items-center space-x-2 py-2 hover:bg-gray-100"
          >
            <HiOutlineDownload className="h-6 w-6" />
            <h1 className="font-medium">Скачать Шаблон Рассылки</h1>
          </button>
        </div>
      </div>
      <div>
        <div className={"py-5"}>
          <Heading
            className={"uppercase text-center"}
            lineHeight={"2px"}
            color={"bg-gray-500"}
          >
            ПРОВЕРКА ОПОЕЩЕНИЯ ПЕРЕД ОТПРАВКОЙ
          </Heading>
        </div>
        <div className={"grid grid-cols-4 gap-4"}>
          <div className={"grid grid-rows-3 gap-4 place-items-center"}>
            <div className={"w-full"}>Способ оповещения:</div>
            <div className={"w-full"}>Категория оповещения:</div>
            <div className={"w-full"}>Выбранные списки:</div>
          </div>
          <div className={"col-span-2"}>
            <div className={"grid grid-rows-3 gap-4"}>
              <div
                className={"flex flex-row items-center space-x-4 py-4 px-2.5"}
              >
                <div className={"flex flex-row justify-end space-x-4"}>
                  {/* <div className={"flex flex-row space-x-2 items-center"}> */}
                  {/* <span className={"text-sm"}>SMS</span> */}
                  {/* <Toggle checked={sms} onChange={setSms} /> */}
                  {/* </div> */}
                  <div className={"flex flex-row space-x-2 items-center"}>
                    <span className={"text-sm"}>Звонок</span>
                    <Toggle checked={call} onChange={setCall} />
                  </div>
                </div>
                <h1
                  className={classNames(
                    notificaionError.length === 0
                      ? "text-transparent"
                      : "text-danger",
                    "grow text-sm font-medium"
                  )}
                >
                  {notificaionError}
                </h1>
              </div>
              <div
                className={
                  "bg-secondary py-4 px-2.5 rounded-lg flex flex-row items-center space-x-4"
                }
              >
                <h1 className={"grow h-full"}>{command?.name}</h1>
                <p
                  className={classNames(
                    commandError.length === 0
                      ? "text-transparent"
                      : "text-danger",
                    "grow text-end text-sm font-medium"
                  )}
                >
                  {commandError}
                </p>
                <div className={"flex flex-row space-x-4 item-center h-full"}>
                  <HiOutlineVolumeUp className={"h-full w-full"} />
                  <HiOutlineEye className={"h-full w-full"} />
                </div>
              </div>
              <div
                className={
                  "bg-secondary py-4 px-2.5 rounded-lg flex flex-row space-x-4 items-center"
                }
              >
                <h1 className={"grow h-full"}>{file?.name}</h1>
                <p
                  className={classNames(
                    fileError.length === 0 ? "text-transparent" : "text-danger",
                    "grow text-end text-sm font-medium"
                  )}
                >
                  {fileError}
                </p>
                <div className={"flex flex-row space-x-4 item-center h-full"}>
                  <HiOutlineTrash
                    className={"h-full w-full"}
                    onClick={() => setFile(null)}
                  />
                  <HiDotsHorizontal className={"h-full w-full"} />
                </div>
              </div>
            </div>
          </div>
          <div className={"grid grid-rows-3 gap-4"}>
            <div
              className={classNames(
                isAlertVisible
                  ? "grid place-items-center text-white"
                  : "hidden",
                isSuccess && "bg-success",
                isError && "bg-danger",
                "h-full w-full rounded-xl"
              )}
            >
              {isSuccess && <h1 className={""}>Рассылка была проведена</h1>}
              {isError && <h1 className={""}>Рассылка НЕ была проведена</h1>}
            </div>
            <button
              className={
                "row-start-2 row-span-2 bg-green hover:bg-darkreen h-full w-full rounded-xl disabled:bg-gray-700"
              }
              disabled={!isValid}
              onClick={handleSubmit}
            >
              <span className={"text-white font-medium text-white uppercase"}>
                Оповестить
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
