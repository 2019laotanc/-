import baseValue from './baseValue'



let type = value => {
    if (baseValue.type[value] != null) {
      return baseValue.type[value]
    } else {
      return value
    }
  }

  let gys = value => {
    if (baseValue.gys[value] != null) {
      return baseValue.gys[value]
    } else {
      return value
    }
  }


  export { type, gys}