import React from 'react';
import {CgSpinnerAlt} from "react-icons/cg";

export const Loading = () => {
    return (
        <div className={'h-full w-full flex justify-center items-center'}>
            <CgSpinnerAlt className={'animate-spin w-10 h-10'}/>
        </div>
    );
};
