import { MuseumType } from "../types"

const MuseumsList = ({museums, active}: {museums: MuseumType[], active: boolean}) => {
  return (
    <table className={active ? 'active' : ''}>
      <thead>
        <tr>
          <th className="align_left"><h2>#</h2></th>
          <th><h2>Museo</h2></th>
          <th className="align_right"><h2>Rating</h2></th>
        </tr>
      </thead>
      <tbody>
        {
          museums.map((e,i) => {
            return(
              <tr key={crypto.randomUUID()}>
                <td className="align_left">
                  <h4>{i + 1}</h4>
                </td>
                <td><p className={active ? 'a' : ''}>{e.name}</p></td>
                <td className="align_right">
                  <p>{e.general_evaluation}</p>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default MuseumsList