import { MuseumsListType } from '../types'
import '../styles/table.css'
import criteriaKeys from '../constants/evaluation'

const EvaluationCriteria = ({museums}: MuseumsListType) => {

  return(
    <table>
      <thead>
        <tr>
          <th></th>
          {
            museums.map(museum => {
              return(
                <th key={crypto.randomUUID()}>{museum.acronym}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(criteriaKeys).map(key => {
            return(
              <tr>
                <th>{criteriaKeys[key]}</th>
                {
                  museums.map(museum => {
                    return(
                      <td key={museum.acronym}>{museum.evaluation[key]}</td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          {
            museums.map(museum => {
              return(
                <td>
                  <h4>{museum.general_evaluation}</h4>
                </td>
              )
            })
          }
        </tr>
      </tfoot>
    </table>
  )
}

export default EvaluationCriteria