import { Component, Fragment } from 'react'
import './App.css';
import { Main } from './Components/Main'
import { SideBar } from './Components/SideBar'
import { SignIn } from './Components/SignIn'
import { SignUp } from './Components/SignUp'
import { ForgotPassword } from './Components/ForgotPassword'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      at: 'signin'
    }
  }
  navigateTo = (path) => {
    window.location.assign(`${path}`)
  }
  componentDidMount() {
    let at = window.location.pathname.split('/')
    at.shift()
    if (localStorage.getItem('userId') !== null) {
      let userInfo = {
        userId: localStorage.getItem('userId'),
        avatar: localStorage.getItem('avatar'),
        name: localStorage.getItem('name')
      }
      this.setState({ at: 'home', userInfo: userInfo })
    } else {
      if (at[0] === 'home') {
        this.navigateTo('signin')
        at[0] = ''
      }
      this.setState({
        at: at[0] || 'signin'
      })
    }
  }
  render() {
    console.log('render')
    let option = {
      'signin': <SignIn navigateToHome={() => this.navigateTo('home')} navigateToForgotPassword={() => this.navigateTo('forgot')} navigateToSignUp={() => this.navigateTo('signup')} />,
      'signup': <SignUp navigateToSignIn={() => this.navigateTo('signin')} />,
      'forgot': <ForgotPassword navigateToSignIn={() => this.navigateTo('signin')} navigateToSignUp={() => this.navigateTo('signup')} />,
      'home': (
        <Fragment>
          <SideBar userInfo={this.state.userInfo} />
          <Main userInfo={this.state.userInfo} />
        </Fragment>
      )
    }

    return (
      <div className="container row">
        {option[this.state.at]}
      </div>
    )
  }
}
export default App;
