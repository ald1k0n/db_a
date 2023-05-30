import React from 'react';
import {RadioGroup, Disclosure} from "@headlessui/react"
import {MdCheck} from "react-icons/md";
import { classNames, ICommand } from 'Shared';

type CommandListProp = {
    command: ICommand  | null,
    commands: ICommand[] | undefined,
    setCommand: React.Dispatch<React.SetStateAction<ICommand | null>>
}

export const CommandsList = ({commands, command, setCommand}: CommandListProp) => {
    return (
        <RadioGroup value={command} onChange={setCommand} className={'overflow-y-scroll absolute top-0 left-0 bottom-0 right-0 flex flex-col space-y-1'}>
            {commands && commands.map((item) => {
                    return (
                        <div key={item.id} className={'flex flex-row items-center px-4'}>
                            <RadioGroup.Option value={item} className={'h-full'}>
                                {({checked})=> (
                                    <div className={'p-3.5'}>
                                        <MdCheck className={classNames('ring-gray-500 ring-2 rounded-full w-4 h-4', checked ? 'text-green' : 'text-transparent')}/>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <Disclosure as={'div'} className={'flex flex-col grow bg-white shadow rounded-lg divide-y hover:bg-gray-100'}>
                                <Disclosure.Button className={'text-gray-900 text-start px-4 py-2.5'}>
                                    <span className={'text-gray-500'}>Name:</span> {item.name === '' ? 'Empty Name' : item.name}
                                </Disclosure.Button>
                                <Disclosure.Panel className={'flex flex-col  px-4 py-2.5'}>
                                    {/*<div className={'grid grid-cols-4'}>
                                        <div className={'text-gray-500'}>ID:</div>
                                        <div className={'col-span-3'}>{item.id}</div>
                                    </div>*/}
                                    <div className={'grid grid-cols-4'}>
                                        <div className={'text-gray-500'}>Message:</div>
                                        <div className={'col-span-3'}>{item.message}</div>
                                    </div>
                                    <div className={'grid grid-cols-4'}>
                                        <div className={'text-gray-500'}>Description:</div>
                                        <div className={'col-span-3'}>{item.message}</div>
                                    </div>
                                </Disclosure.Panel>
                            </Disclosure>
                        </div>
                    )
                })
            }
        </RadioGroup>
    );
};