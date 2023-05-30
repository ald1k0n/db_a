export const getFullName = (firstname: string, lastName: string, middleName?: string) =>{
    if(typeof  middleName !== 'undefined'){
        return firstname + ' ' + middleName + ' ' + lastName
    }
    return firstname + ' ' + lastName
}