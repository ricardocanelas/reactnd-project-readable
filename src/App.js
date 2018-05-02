// External Dependecies
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

// Our Depedencies
import './sycn.js'
import history from './history'
import routes from './config/routes'
import Auth from './views/auth/Auth'
import Error404 from './views/errors/404'
import HeaderApp from './components/layout/Header'
import FooterApp from './components/layout/Footer'
import Notification from "./components/notification/Notification"

// Styles
const WrapperPage = styled.div``
const MainContent = styled.div`
padding-bottom: 30px;
`

class App extends React.Component {

    getStatus() {
        const status = this.props.status

        if (!status.user.checked) return "CHECKING-AUTHENTICATION"
        if (!status.user.authenticated) return "NOT-AUTHENTICATE"

        if (status.categories.loaded && status.comments.loaded && status.posts.loaded) {
            return 'AUTHENTICATED-AND-HAS-LOADED-DATA'
        } else {
            return 'LOADING-DATA'
        }
    }

    render() {
        const status = this.getStatus()

        return (
            <Router history={history}>
                <React.Fragment>
                    <Notification />

                    {(status === 'CHECKING-AUTHENTICATE' || status === 'LOADING-DATA') &&
                        <Dimmer active inverted>
                            <Loader>
                                {status === 'CHECKING-AUTHENTICATE' && 'Checking authentication..'}
                                {status === 'LOADING-DATA' && 'Loading data...'}
                            </Loader>
                        </Dimmer>
                    }

                    {status === 'NOT-AUTHENTICATE' && <Auth />}

                    {status === 'AUTHENTICATED-AND-HAS-LOADED-DATA' && (
                        <WrapperPage>
                            <HeaderApp />
                            <MainContent>
                                <Switch>
                                    {routes.map(route => <Route key={ route.path } { ...route } />)}
                                    <Route component={Error404} />
                                </Switch>
                            </MainContent>
                            <FooterApp />
                        </WrapperPage>
                    )}
                </React.Fragment>
            </Router>
        )
    }
}

const mapState = (state) => ({
    status: state.status
})


export default connect(mapState, null)(App)
