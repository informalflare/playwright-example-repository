import {UserFormData} from "@interfaces";

export const USER_0_DATA: UserFormData = {
    name:"Rob",
    email:"rob@gmail.com",
    curAdr: "str1",
    permAdr:"str2"
};

//the type of the USER_LIST is an array of UserFormData objects
export const USERS_LIST: UserFormData[] = [
    {
        name:"Tom",
        email:"ThomasCat@nn.nl",
        curAdr: "SunStreet Drive 17",
        permAdr:"Hollywood 13"

    },
    { //notice that Jerry does not have an address
        name:"Jerry",
        curAdr: "SunStreet Drive 17",
    },
    { //all we know that his name is Billy
        name:"Bill",
    },
    USER_0_DATA
]


