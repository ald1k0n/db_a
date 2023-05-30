import {redirect} from "react-router";

export const useRedirect = (isAllowed: boolean, redirectPath: string) =>{
    if(!isAllowed){
        return redirect(redirectPath)
    }
}