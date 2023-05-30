import React from 'react';
import {NavLink, useRouteError} from "react-router-dom";
import {Header} from "Widgets";

export const ErrorPage = () => {
    const error: any = useRouteError();
    return (
        <div className={'flex flex-col h-full'}>
            <Header />
            <section className="container mx-auto mt-2.5 grow flex flex-col justify-center items-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{error.status} {error.statusText}</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Извините, мы не смогли найти страницу, которую вы ищете.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink to="/"
                             className="rounded-md bg-secondary text-white px-10 py-2.5 font-semibold">
                        Вернутся домой
                    </NavLink>
                    <NavLink to="/support" className="text-sm font-semibold text-gray-900">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};