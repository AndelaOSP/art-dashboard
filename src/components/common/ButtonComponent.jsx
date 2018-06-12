import React from 'react'
import { Button } from 'semantic-ui-react'

export default ({buttonName, color, onClick}) => {
  if (color === "primary") {
    return <Button primary onClick={onClick}>{buttonName}</Button>
  }
  return <Button secondary onClick={onClick}>{buttonName}</Button>
}
