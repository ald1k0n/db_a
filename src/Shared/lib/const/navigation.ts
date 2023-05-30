import {ILink} from "Shared";
import {MdListAlt, MdMailOutline} from "react-icons/md";

export const navigation: Array<ILink> = [
    {id: 1,to: '/mailing', title: 'Рассылка',  icon: MdMailOutline, current: true},
    {id: 2,to: '/history', title: 'Отчет', icon: MdListAlt, current: false}
]