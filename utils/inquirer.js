import 'colors';
import inquirer from 'inquirer';
import { PROCESSORS, SERVICES } from '../constants.js';



const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Añadir Usuario`
      },
      {
        value: 2,
        name: `${'2.'.green} Consultar Citas`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      }
    ]
  }
]



const mainMenu = async () => {
  console.clear()
  console.log('=========================='.green)
  console.log('  Seleccione una opción'.white)
  console.log('==========================\n'.green)

  const { opcion } = await inquirer.prompt(preguntas)

  return opcion
}


const selectServices = async () => {
  const servicesNames = Object.keys(SERVICES)
  const choices = servicesNames.map(serviceName => (
    {
      value: SERVICES[serviceName].tpId,
      name: serviceName,
      checked: false
    }
  ))

  const pregunta = [
    {
      type: 'checkbox',
      name: 'servicesSelected',
      message: 'Seleccione uno o mas tramites',
      choices
    }
  ]

  const { servicesSelected } = await inquirer.prompt(pregunta)
  return servicesSelected
}



const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ]

  console.log('\n')
  console.log('\n')
  await inquirer.prompt(question)
}


const processorsListOptions=(processorsList)=>{
  const choices = processorsList.map((service,index)=>{
    const order = `${index+1}.`.green;
    return {value:service, name:`${order} ${service}`}
  })
  const options=[
   {
    type: 'list',
    name: 'opcion',
    message: '¿Cuál fue tu medio de obtención?',
    choices
  }
]
  return options
}


const selectProcessor=async (processorsList)=>{
  const { opcion } = await inquirer.prompt(processorsListOptions(processorsList))
  return opcion
}


const datesOptions=(dates)=>{
  const choices = dates.map(({date},index)=>{
    const order = `${index+1}.`.green;
    return {value:date,name:`${order} ${date}`}
  })
  const options =[
   {
    type: 'list',
    name: 'opcion',
    message: 'Seleccione una fecha',
    choices
  }
]
  return options
}


const datesMenu= async (dates)=>{
  const { opcion } = await inquirer.prompt(datesOptions(dates))
  return opcion
}


const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}








const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const mostrarListadoChecklist = async (times = []) => {
  const choices = times.map(({time}, i) => (
    {
      value: time,
      name: ` ${time}`,
      checked: false
    }
  ))

  const pregunta = [
    {
      type: 'checkbox',
      name: 'timesSelected',
      message: 'Seleccione uno o mas horarios',
      choices
    }
  ]

  const { timesSelected } = await inquirer.prompt(pregunta)
  return timesSelected
}

export {
  confirmar, 
  datesMenu, 
  mainMenu, 
  readInput, 
  pausa, 
  selectProcessor,
  selectServices
};
