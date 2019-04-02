import React, {Component} from 'react'
import ImportComponent from './components/Import'

import TranslateContainer from './containers/TranslateContainer'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <ImportComponent />
        </header>
        <TranslateContainer from='ITA' to='EN' />
      </div>
    )
  }
}

export default App
