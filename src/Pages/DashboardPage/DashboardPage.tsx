import React from 'react';
import {useAppSelector} from "Shared/hooks";
import {selectCurrentUser} from "Entities/Auth";
import {NavLink} from "react-router-dom";
import {navigation} from "Shared";

export const DashboardPage = () => {
    const user = useAppSelector(selectCurrentUser)
    return (
        <section className="container mx-auto mt-2.5 grow flex flex-col justify-center items-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Hello {user?.firstName}</h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                {user && navigation.map((link)=>{
                    return (
                        <NavLink
                            key={link.id}
                            to={link.to}
                            className={'bg-secondary flex flex-row justify-center items-center rounded-md px-3 py-2'}
                        >
                            {link?.icon && <link.icon className={'h-6 w-6 mr-2.5'}/>}
                            <span>{link.title}</span>
                        </NavLink>
                    )
                })}
            </div>
        </section>
    );
};