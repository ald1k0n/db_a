import React from 'react';
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";
import {authApi} from "../../Entities/Auth";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Длина пароля не должно быть меньше 8 символов')
        .max(16, 'Длина пароля не должно быть больше 16 символов')
        .required('Обязательно'),
    login: Yup.string().required('Обязательно'),
});

export const AuthForm = () => {
    const [login] = authApi.useLoginMutation()

    return (
        <Formik
            initialValues={
                {
                    login: '',
                    password: '',
                }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                login(values)
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <div className={'overflow-hidden shadow rounded-3xl'}>
                        <div className={'bg-primary py-14 px-20 flex flex-col space-y-10 text-white'}>
                            <div className={''}>
                                <label
                                    htmlFor={"email"}
                                    className={"block font-medium leading-6"}
                                >
                                    Email
                                </label>
                                <input
                                    id="login"
                                    name="login"
                                    type="text"
                                    placeholder="Введите Логин"
                                    value={props.values.login}
                                    onChange={props.handleChange}
                                    className={'mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6'}
                                />
                                <ErrorMessage name={'login'}>
                                    {msg=>(
                                        <div className={'mt-2 text-muted text-red'}>
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <label
                                    htmlFor={"password"}
                                    className={"block font-medium leading-6"}
                                >
                                    Пароль
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Введите Пароль"
                                    value={props.values.password}
                                    onChange={props.handleChange}
                                    className={'mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6'}
                                />
                                <ErrorMessage name={'password'}>
                                    {msg=>(
                                        <div className={'mt-2 text-muted text-red'}>
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className={'flex justify-center'}>
                                <button
                                    className={"bg-secondary text-gray-900 py-2.5 px-4 rounded-lg "}
                                    type={"submit"}
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};