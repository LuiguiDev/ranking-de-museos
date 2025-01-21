export type criteriaKeysTypes = 'colection' | 'temporary_exhibitions' | 'cultural_activities' | 'service' | 'cost'

interface CriteriaKeysType {
  colection: string,
  temporary_exhibitions: string,
  cultural_activities: string,
  infrastructure: string,
  service: string,
  cost: string
}

const criteriaKeys: CriteriaKeysType = {
  colection: 'Colección permanente',
  temporary_exhibitions: 'Exposiciones temporales',
  cultural_activities: 'Actividades culturales',
  infrastructure: 'Infraestructura',
  service: 'Servicio',
  cost: 'Costo'
}

export default criteriaKeys 