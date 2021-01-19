import {v4 as uuid } from "uuid"

const generateState = ():string => {
    return uuid()
}

export default generateState