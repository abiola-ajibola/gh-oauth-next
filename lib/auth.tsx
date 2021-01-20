import {v4 as uuid } from "uuid"
import * as crypto from "crypto"
 
// Generate a state for the requests
const generateState = ():string => {
    const hash = crypto.createHmac("sha512", uuid()).update(uuid()).digest("base64");
    return hash
}

export default generateState