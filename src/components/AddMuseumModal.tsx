import { useState } from 'react';
import criteriaKeys, { criteriaKeysTypes } from '../constants/evaluation';
import '../styles/modal.css'
import { EvaluationType, MuseumType } from '../types';

interface InputRangeProps {
  type: criteriaKeysTypes,
  index: number,
  setNewState: (params: EvaluationType) => void
  prevState: EvaluationType
}

function getGeneralEvaluation(values:number[]) {
  const sum = values.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  return Math.round(sum / 6)
}

const InputRange = ({ type, setNewState, prevState }: InputRangeProps) => {
  function handleRangeChange(e:React.ChangeEvent<HTMLInputElement>) {
    const validateValue = (v: number) => {
      if (v >= 0 || v <= 100) {
        return v
      }else {
        console.log('error: evaluaicón inválida')
        return 0
      }
    } 
    const value = validateValue(Number(e.target.value ))
    const newState = structuredClone(prevState)

    if (value >= 0 || value < 100) {      
      newState[type] = value
    }else {
      console.log('error: evualuación inválida')
    }


    setNewState(newState)
  }

  return (
    <div className={`evaluation ${type}`}>
      <div className="info">
        <label htmlFor="rangeInput">
          {criteriaKeys[type]}
        </label>
        <span>{prevState[type]}</span>
      </div>
      <input
        name={type}
        id="rangeInput"
        type="range"
        min={0}
        max={100}
        step={5}
        value={prevState[type]}
        onChange={handleRangeChange}
      />
    </div>
  )
}

interface modalProps {
  addMuseum: (newMuseum: MuseumType) => void,
  manageModal: (newState: boolean) => void
}

const AddMuseumModal = ({addMuseum, manageModal}: modalProps) => {
  const [rangeValues, setRangeValues] = useState<EvaluationType>({
    "colection": 50,
    "temporary_exhibitions": 50,
    "cultural_activities": 50,
    "infrastructure": 50,
    "service": 50,
    "cost": 50
  })
  const [museum, setMuseum] = useState<MuseumType>({
    name: '',
    acronym: '',
    evaluation: rangeValues,
    general_evaluation: 0
  })

  function handleSetNewState (newState: EvaluationType) {
    setRangeValues(newState)
    setMuseum({
      ...museum,
      evaluation: newState,
      general_evaluation: getGeneralEvaluation(Object.values(newState))
    })
  }

  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target

    setMuseum({
      ...museum,
      [name]: value,
    })
  } 

  function manageAddMuseum(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    addMuseum(museum)
    manageModal(false)
  }

  return(
    <div className="modal_container">
      <form onSubmit={manageAddMuseum}>
        <div className="modal_header">
          <div className="museum name">
            <label htmlFor="name">Nombre del museo</label>
            <input
              name="name"
              type="text"
              placeholder="Museo de Arte Moderno"
              className='input_text_modal'
              onChange={handleInputChange}
            />
          </div>
          <div className="museum acronym">
            <label htmlFor="acronym">Acrónimo</label>
            <input
              name='acronym'
              type="text"
              placeholder="MAM"
              className='input_text_modal'
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="evaluation">
          <h4>Añade calificaciones a este museo</h4>
          {
            Object.keys(criteriaKeys).map((key, index) => {
              return(
                <InputRange
                                    
                  type={key as criteriaKeysTypes}
                  index={index}
                  setNewState={handleSetNewState}
                  prevState = {rangeValues}
              />
              )
            })
          }
        </div>

        <div className="total">
          <h4>Evaluación general: {getGeneralEvaluation(Object.values(rangeValues))}</h4>
        </div>

        <div className="modal_buttons">
          <button className='cancel_btn'>Cancelar</button>
          <button
            type='submit'
            className='add_btn'>
            Añadir Museo
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMuseumModal