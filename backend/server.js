import { readFile, writeFile } from 'fs'

const namesEs = {
  colection: "Colección permanente",
  temporary_exhibitions: 'Exposiciones temporales',
  cultural_activities: 'Actividades culturales',
  infrastructure: 'Infraestructura',
  service: 'Servicio',
  cost: 'Costo'
}

const namesEn = {
  colection: 'Permanent exhibition',
  temporary_exhibitions: 'Temporary exhibitions',
  cultural_activities: 'Cultural activities',
  infrastructure: 'Infrastructure',
  service: 'Service',
  cost: 'Cost'
}

let newMuseumsList = []

function getNewStructure(originalEv) {
  const newEv = {}
  for (const key in originalEv) {
    if (Object.hasOwnProperty.call(originalEv, key)) {
      const v = originalEv[key];
      
      newEv[key] = {value: v, nameEs: namesEs[key]}
    }
  }
  return newEv
}

readFile('./database/museums_list.json', (err, data) => {
  if(err) {
    console.error('Error al leer el archivo', err)
    return
  }

  try {
    const obj = JSON.parse(data)
    
    // code to edit museum.evaluation structure
    newMuseumsList = obj.museums.map(museum => {
      const newEvStructure = getNewStructure(museum.evaluation)
      museum.evaluation = newEvStructure
      return {...museum}
    })

    //code to create a new JSON
    const dataJSON = JSON.stringify({museums: obj}, null, 2)

    writeFile('museums_list_v2', dataJSON, (err) => {
      if(err) {
        console.error('Error al escribir el archivo', err)
        return
      }else {
        console.log('Archivo guardado')
      }
    })
  } catch (parseError) {
    console.error('Error al parsear JSON', parseError)
  }
})

