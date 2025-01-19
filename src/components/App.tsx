import { useEffect, useState } from 'react';
import '../styles/app.css'
import { MuseumType } from '../types';
import AppHeader from './AppHeader';
//import MuseumsList from './MuseumsList'
import EvaluationCriteria from './EvaluationCriteria';
import MuseumsList from './MuseumsList';
import AddMuseumModal from './AddMuseumModal';
import Actions from './Actions';

const DATA_SOURCE = '../../backend/database/museums_list.json'

async function getData () {
  return await fetch(DATA_SOURCE)
    .then(res => {
      if(!res.ok){
        throw new Error("Kaput");
      }
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      console.error('There was a problem with the fetch operation:', err)
    })
}

function getGeneralEvaluation(museum: MuseumType) {
  const sum = Object.values(museum.evaluation).reduce((acc, curr) => {
    return acc + curr
  }, 0)

  return Math.round(sum / 6)
}

function addGeneralEvaluation (museums: MuseumType[]) {
  return museums.map(museum => {
    const evaluaiton = getGeneralEvaluation(museum)
    return {...museum, general_evaluation: evaluaiton}
  })
}

function museumsFilteredByEvaluaiton(museums: MuseumType[]) {
  const museumsSorted = addGeneralEvaluation(museums)

  return museumsSorted.sort((a, b) => {
    return b.general_evaluation - a.general_evaluation
  })
}

const App = () => {  
  const [museums, setMuseums] = useState<MuseumType[]>([])
  const [toggleTable, setToggleTable] = useState<boolean>(true)
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [activeClass, setActiveClass] = useState<boolean>(false)

  function manageTogleTable() {
    setActiveClass(!activeClass)

    setTimeout(() => {
      setToggleTable(!toggleTable)
    }, 500);
  }

  function addMuseum(newMuseum: MuseumType) {
    let prevState = structuredClone(museums)
    prevState = [...prevState, newMuseum]

    const newState = museumsFilteredByEvaluaiton(prevState)

    setMuseums(newState)
  }

  function manageModal(newState: boolean) {
    setModalActive(newState)
  }
  
  useEffect(() => {
    getData()
      .then(res => {
        setMuseums(museumsFilteredByEvaluaiton(res.museums))
      })
  }, [])

  return(
    <>
      { modalActive && 
        <AddMuseumModal 
          addMuseum={addMuseum}
          manageModal={manageModal}
        />
      }

      <AppHeader />
      <div className="content_container">
        <Actions
          manageTogleTable={manageTogleTable}
          setModalActive={setModalActive} />
          
        {
          toggleTable
            ? <MuseumsList 
                museums={museums}
                active={activeClass}/>
            : <EvaluationCriteria 
                museums={museums} />
        }
      </div>
    </>
  )
}

export default App