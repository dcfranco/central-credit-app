import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from 'app'
import { EEntityKeys } from 'constants/entity'

function useStructure() {
  const { Entity } = useContext(AppContext)
  const selectedEntity = useSelector(({ user }) => user.get('data').getSelectedEntity())

  if (!selectedEntity) {
    return Entity[EEntityKeys.DEFAULT]
  }

  return Entity[selectedEntity.get('entidade_tipo')]
}

export default useStructure
