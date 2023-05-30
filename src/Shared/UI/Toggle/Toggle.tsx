import React from 'react';
import {Switch} from '@headlessui/react'

type toggleProps = {
    checked: boolean,
    onChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const Toggle = (props: toggleProps) => {
    return (
        <Switch
            checked={props.checked}
            onChange={props.onChange}
            className={`${props.checked ? 'bg-secondary' : 'bg-gray-500'} relative inline-flex h-6 w-11 items-center rounded-full`}
        ><span className={`${props.checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
        </Switch>
    );
};