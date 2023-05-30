import { Header } from "Widgets";
import { Outlet } from "react-router-dom";
import { authApi, selectCurrentToken } from "Entities/Auth";
import { Loading, useAppSelector } from "Shared";

export const LayoutPage = () => {
  const userToken = useAppSelector(selectCurrentToken);
  const { isFetching, isLoading } = authApi.useRefreshQuery(userToken);
  return (
    <>
      {isLoading || isFetching ? (
        <div className={"flex flex-col h-full"}>
          <Loading />
        </div>
      ) : (
        <div className={"flex flex-col h-full"}>
          <Header />
          <Outlet />
        </div>
      )}
    </>
  );
};
