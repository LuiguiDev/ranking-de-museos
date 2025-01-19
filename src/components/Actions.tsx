interface ActionsProps {
  manageTogleTable: () => void
  setModalActive: (param: boolean) => void
}

const Actions = ({manageTogleTable, setModalActive}: ActionsProps) => {
  return (
    <div className="actions">
      <button
        onClick={manageTogleTable}
      >
        Toggle Table
      </button>
      <button onClick={() =>setModalActive(true)}>
        Add Museum
      </button>
    </div>
  )
} 

export default Actions