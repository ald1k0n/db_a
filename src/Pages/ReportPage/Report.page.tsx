import React, { useEffect, useRef, useState } from "react";
import { redirect, useParams } from "react-router";
import { historyAPI } from "../../Entities/History";
import { Loading } from "../../Shared";
import { HiOutlinePrinter, HiOutlineXCircle } from "react-icons/hi";
import { GenerateExcelButtons } from "../../Features/Report/GenerateExcelButtons";
import ReactToPrint from "react-to-print";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import { Report } from "../../Features";

export const ReportPage = () => {
  let { reportID } = useParams();

  const printRef = useRef(null);

  const [trigger, result] = historyAPI.useLazyFetchHistoryByIDQuery();

  useEffect(() => {
    if (reportID) {
      trigger({
        id: reportID,
      });
    } else {
      redirect("/history");
    }
  }, [reportID, trigger]);

  const [reportData, setReportData] = useState<any[] | null>(null);

  return (
    <section className={"grow flex flex-col"}>
      {result.isLoading && <Loading />}
      {result.isSuccess && result.data && (
        <>
          <div className={"bg-primary"}>
            <div
              className={
                "container py-2.5 mx-auto grow flex flex-row items-center justify-between text-white"
              }
            >
              <div className={"flex flex-row items-center space-x-2"}>
                {/*<button onClick={()=>trigger({id: reportID})}>
                                    <HiRefresh className={'h-6 w-6'}/>
                                </button>*/}
                <GenerateExcelButtons
                  reportData={reportData}
                  data={result.data}
                />
                <ReactToPrint
                  trigger={() => (
                    <button>
                      <HiOutlinePrinter className={"h-6 w-6"} />
                    </button>
                  )}
                  content={() => printRef.current}
                  documentTitle={`Отчет за ${format(
                    new Date(result.data.history.createdAt),
                    "dd MM yyyy"
                  )}`}
                />
              </div>
              <div>
                Подробный отчет за{" "}
                {format(new Date(result.data.history.createdAt), "dd MM yyyy")}
              </div>
              <div className={"flex flex-row items-center space-x-2"}>
                <NavLink to={"/history"}>
                  <HiOutlineXCircle className={"h-6 w-6"} />
                </NavLink>
              </div>
            </div>
          </div>
          <Report
            setReportData={setReportData}
            report={result.data}
            count={result?.data?.people?.length}
          />
        </>
      )}
    </section>
  );
};
