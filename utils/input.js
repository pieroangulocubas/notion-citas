import { PROCESSORS, SERVICES_NOTION } from "../constants.js"
import { readInput, selectProcessor, selectServices } from "./inquirer.js"
import {titleAdapter,richTextAdapter,emailAdapter,phoneAdapter,dateAdapter,numberAdapter,multiselectAdapter,selectAdapter} from '../adapters/notion.js'

export async function inputDataForTamperAndNotion(){
    let propertiesForNotion={}

    // Solicitamos los datos que se necesitan para registrar un usuario nuevo en la base de datos
    const tramitesIds=await selectServices()
    const fechaCita= await readInput("Fecha de la cita:")
    const horaCita= await readInput("Hora de la cita:") // Solo para Tampermonkey
    const fullname=await readInput("Nombres:")
    const lastname=await readInput("Apellido:")
    const dni=await readInput("DNI:")
    const email=await readInput("Email:")
    const telefono=await readInput("Telefono:")
    const domicilio=await readInput("Domicilio:")
    const ganancia=parseInt(await readInput("Precio:")) // Solo para Notion
    const processor=await selectProcessor(PROCESSORS) // Solo para Notion
    
    // Generamos una lista con los nombres de lo trámites, como se estan llamando en Notion
    const tramitesValues=tramitesIds.map(id=>({name:SERVICES_NOTION[id]}))


    const date = new Date();
    // Obtener el año, mes y día
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    // Crear la cadena de fecha en el formato deseado
    const currentDate = `${year}-${month}-${day}`;


    // Adaptamos las respuestas al formato que acepta la API de Notion para insertar un registro, con uno o varios campos, en la Base de datos 'Lista de clientes'
    // Documentación: https://developers.notion.com/reference/page-property-values
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
      selectAdapter("Medio de obtención",processor),
      dateAdapter("Fecha de tramitacion",currentDate)
      ]
    )
    
    values.forEach(({value})=>{
        propertiesForNotion={...propertiesForNotion,...value}
    })


    // Creamos un objeto listo para ser colocado en el codigo de Tampermonkey
    const dataForTamper=tramitesIds.map(procedureId=>{
        return {
            OPTION:procedureId,
            DATE:fechaCita,
            TIME:horaCita,
            SELECT_DEFAULT_TIME:true,
            FirstName:fullname,
            LastName:lastname,
            CustRef:dni,
            Email:email,
            ConfirmEmail:email,
            Phone:telefono,
            Notes:domicilio
            }
        })
    
    return {
        propertiesForNotion,
        dataForTamper
    }
    
}