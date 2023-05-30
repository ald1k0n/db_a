import React, {SetStateAction} from 'react';
import {HiOutlineUpload} from "react-icons/hi";

type UploadFileProps = {
    file: File | null,
    setFile: React.Dispatch<SetStateAction<File | null>>
}

export const UploadFile = (props: UploadFileProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files && event.target.files[0]
        if (!fileObj) {
            return;
        }
        props.setFile(fileObj)
        event.target.value = '';
    };

    return (
        <label
            htmlFor="file-upload"
            className="grow grid place-items-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg"
        >
            <div className="space-y-4">
                <HiOutlineUpload className="mx-auto h-12 w-12 text-gray-400"/>
                <p className="text-center text-sm font-medium">
                    Загрузить файл или перетащите
                    <br/>
                    <span className="text-xs text-gray-500">XSLX, XSL</span>
                </p>
                <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleChange}
                />
            </div>
        </label>
    );
};
