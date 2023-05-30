import {useState} from "react";
import {NavLink} from "react-router-dom";
import { Listbox, Disclosure, Transition } from '@headlessui/react'
import {HiBars3, HiXMark} from "react-icons/hi2";
import {logout, selectCurrentUser} from "Entities/Auth";
import {languages, navigation, useAppDispatch, useAppSelector} from "Shared";

export const Header = () => {
    const user = useAppSelector(selectCurrentUser)
    const title: string = 'DABYL'
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const dispatch = useAppDispatch()
    return (
        <Disclosure as={'nav'} className={'bg-primary text-white'}>
            {({open})=>
                <header className={'container mx-auto py-5 px-2 sm:px-6 lg:px-8'}>
                    <div className={'relative flex items-center justify-between'}>
                        <div className="flex items-center md:hidden">
                            <Disclosure.Button
                                className="inline-flex items-center justify-center rounded-md p-2"
                            >
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Disclosure.Button>
                        </div>
                        <NavLink to="/history" className={'flex flex-shrink-0'}>
                            {title}
                        </NavLink>
                        <div className={'hidden sm:ml-6 md:flex space-x-6 text-gray-900'}>
                            {user && navigation.map((link)=>{
                                return (
                                    <NavLink
                                        key={link.id}
                                        to={link.to}
                                        className={({ isActive }) => isActive ? 'bg-secondary flex flex-row justify-center items-center rounded-md px-3 py-2' : 'bg-white hover:bg-gray-100 flex flex-row justify-center items-center rounded-md px-3 py-2'}
                                    >
                                        {link?.icon && <link.icon className={'h-6 w-6 mr-2.5'}/>}
                                        <span>{link.title}</span>
                                    </NavLink>
                                )
                            })}
                        </div>
                        <div className={'flex flex-row justify-center items-center space-x-6'}>
                            {/*<Listbox
                                as={'div'}
                                value={selectedLanguage}
                                onChange={setSelectedLanguage}
                                className={'relative text-gray-900 w-20'}
                            >
                                <Listbox.Button
                                    className="rounded-md bg-white px-3 py-2 w-full hover:bg-gray-100"
                                >
                                    {selectedLanguage.locale}
                                </Listbox.Button>
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Listbox.Options
                                        className="absolute mt-2 rounded-md bg-secondary text-white w-full"
                                    >
                                        {languages.map((language) => (
                                            <Listbox.Option
                                                key={language.id}
                                                value={language}
                                                disabled={language.unavailable}
                                                className={"w-full px-3 py-2 text-center"}
                                            >
                                                {language.locale}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </Listbox>*/}
                            {user &&
                                <div className={'flex space-x-2 justify-center items-center flex-row'}>
                                    <button
                                        onClick={()=>{dispatch(logout())}}
                                    >
                                        Выйти
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 text-gray-900">
                            {user && navigation.map((link)=>{
                                return (
                                    <NavLink
                                        key={link.id}
                                        to={link.to}
                                        className={({ isActive }) => isActive ? 'bg-secondary flex flex-row justify-center items-center rounded-md px-3 py-2' : 'bg-white flex flex-row justify-center items-center rounded-md px-3 py-2'}
                                    >
                                        {link?.icon && <link.icon className={'h-6 w-6 mr-2.5'}/>}
                                        <span>{link.title}</span>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </Disclosure.Panel>
                </header>
            }
        </Disclosure>
    )
}