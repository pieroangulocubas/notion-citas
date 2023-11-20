export async function titleAdapter(fieldName,fieldValue){
  return {
     [fieldName]: {
      title: [
        {
          text: {
            content: fieldValue
          },
        }
      ]
    }
  }
}

export async function emailAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      email: fieldValue
    }
  }
}

export async function richTextAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      rich_text: [
        {
          text: {
            content: fieldValue
          },
        },
      ]
    }
  }
}

export async function dateAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      date: {
        start: fieldValue
      }
    }
  }
}

export async function numberAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      number: fieldValue
    }
  }
}

export async function checkboxAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      checkbox: fieldValue
    }
  }
}

export async function selectAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      select: {
        name: fieldValue
      }
    }
  }
}
export async function multiselectAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      multi_select: fieldValue
    }
  }
}
export async function phoneAdapter(fieldName,fieldValue){
  return {
    [fieldName]: {
      phone_number: fieldValue
    }
  }
}