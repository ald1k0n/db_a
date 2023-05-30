import React from 'react';
import {AuthForm} from "Features";

export const AuthPage = () => {
    return (
        <section className={'container mx-auto grow mt-2.5 grid lg:grid-cols-3 md:grid-cols-5 items-center grow'}>
            <div className={'md:col-start-2 md:col-span-3 lg:col-span-1 lg:col-start-2 py-2.5 px-2.5'}>
                <AuthForm/>
            </div>
        </section>
    );
};