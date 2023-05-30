import {IconType} from "react-icons";

export interface ILink {
    id: number,
    icon?: IconType,
    to: string,
    title: string,
    current: boolean,
}