import { dateAdapter, emailAdapter, multiselectAdapter, numberAdapter, phoneAdapter, richTextAdapter, selectAdapter, titleAdapter } from "./adapters/notion.js"
import { PROCESSORS, SERVICESNOTION } from "./constants.js"
import { insertUser } from "./services/notion.js"
import { readInput, mainMenu, selectServices, pausa, selectProcessor } from "./utils/inquirer.js"


async function main(){
  let option 
  do{
    option = await mainMenu()
    switch(option){
      case 1:
        let properties={}
        const tramitesIds=await selectServices()
        const fullname=await readInput("Nombres:")
        const lastname=await readInput("Apellido:")
        const dni=await readInput("DNI:")
        const email=await readInput("Email:")
        const telefono=await readInput("Telefono:")
        const domicilio=await readInput("Domicilio:")
        const ganancia=parseInt(await readInput("Precio:"))
        const fechaCita= await readInput("Fecha de la cita:")
        const horaCita= await readInput("Hora de la cita:")
        const processor=await selectProcessor(PROCESSORS)
        const tramitesValues=tramitesIds.map(id=>({name:SERVICESNOTION[id]}))

        const values = await Promise.allSettled([
          titleAdapter("Nombres",fullname),
          richTextAdapter("Apellidos",lastname),
          richTextAdapter("DNI",dni),
          emailAdapter("Correo",email),
          phoneAdapter("Celular",telefono),
          richTextAdapter("Domicilio",domicilio),
          dateAdapter("Fecha de la cita",fechaCita),
          multiselectAdapter("Tramite",tramitesValues),
          numberAdapter("Ganancia",ganancia),
          selectAdapter("Medio de obtención",processor)
          ]
        )
        
        values.forEach(({value})=>{
          properties={...properties,...value}
        })

        await insertUser(properties)

        const tpData=tramitesIds.map(option=>{
          return {
            option,
            date:fechaCita,
            time:horaCita,
            FirstName:fullname,
            LastName:lastname,
            CustRef:dni,
            Email:email,
            ConfirmEmail:"",
            Phone:telefono,
            Notes:domicilio
            }
        })
        console.log("\nSE HA REGISTRADO EL USUARIO CON EXITO ".bgGreen.white)
        console.log(tpData)
        break;


      case 2:
        console("Consultar Citas")
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

