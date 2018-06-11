import React from 'react'
import { Button } from 'semantic-ui-react'

export default ({buttonName, color}) => {
  if (color === "primary") {
    return <Button primary>{buttonName}</Button>
  }
  return <Button secondary>{buttonName}</Button>
}
