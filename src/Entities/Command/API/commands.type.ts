import {notificationMethod} from "../../../Shared";
import {voiceType} from "../../../Shared/lib/const/voiceType";

export interface executeCommandRequest {
    body: FormData,
    id: string,
    params: {
        cost: string,
        notificationMethod?: notificationMethod,
        sender?: string,
        time?: string,
        sheetName?: string
        voice?: voiceType,
    }
}