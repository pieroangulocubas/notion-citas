import { inputDataForTamperAndNotion } from "./utils/input.js"
import {insertUser} from "./services/notion.js"
export async function add_user(){
    try{
        const {propertiesForNotion,dataForTamper}=await inputDataForTamperAndNotion()
        await insertUser(propertiesForNotion)
        return {dataForTamper}
    }catch(error){
        console.error(error)
    }
}