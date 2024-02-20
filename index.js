import { add_user } from "./uses-cases.js"
import { mainMenu, pausa } from "./utils/inquirer.js"


async function main(){
  let option 
  do{
    option = await mainMenu()
    switch(option){
      case 1:
          try{
            const {dataForTamper} = await add_user()
            console.log("\nSE HA REGISTRADO EL USUARIO CON EXITO ".bgGreen.white)
            console.log(dataForTamper)
          }catch(error){
            console.log(error)
          }
        break;
      case 2:
        console("Consultar citas")
        break;
      case 0:
        console.log("Saliste")
        break
      default:
        console.log("Opcion no valida")
    }
    if(option!==0) await pausa()
  }while(option!==0)
}

main()

