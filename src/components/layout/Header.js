// External Depedencies
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Container, Menu, Icon } from 'semantic-ui-react'

// Internal Depedencies
import menuList from '../../config/menu'
import { auth } from '../../config/firebase'

// Styled
const WrapperHeader = styled.header`
background-color: gold;
margin-bottom: 30px;
padding: 30px 0 36px;
.menu .item {
    &.active {
        color: white !important;
        background-color: orangered !important;
        border-bottom: 1px solid rgb(223, 60, 1) !important;
        border-radius: 4px !important;
    }
}
`
const Logo = styled.div`
padding: 0 !important;
margin-right: 20px !important;
margin-left: 0;
a {
    font-family: 'Lobster', cursive;
    font-size: 40px;
    color: orangered;
    &:hover {
        color: orangered;
    }
}
`

const Header = (props) => {

    const logout = () => {
        auth.signOut()
    }

    const renderMenu = () => {
        const path = props.location.pathname

        return menuList.map((item, index) => {
            let isActive = false
            const className = ['item']

            if (Array.isArray(item.activeIn)) {
                for( const cond of item.activeIn){
                    if (cond instanceof RegExp && cond.test(path)) {
                        isActive = true
                    } else if (cond === path) {
                        isActive = true
                    }
                }
            } else {
                if (path === item.activeIn) {
                    isActive = true
                }
            }

            if (isActive) className.push('active')

            return (
                <Link
                    key={index}
                    to={item.to}
                    className={className.join(' ')}>
                    {item.label}
                </Link>
            )
        })
    }

    return (
        <WrapperHeader>
            <Container>
                <Menu secondary >
                    <Logo className="item">
                        <Link to="/">Readable</Link>
                    </Logo>
                    {renderMenu()}
                    <Menu.Menu position="right">
                        <a className="item" onClick={logout}>
                            Logout <Icon name="sign out" style={{marginLeft: "10px"}} />
                        </a>
                    </Menu.Menu>
                </Menu>
            </Container>
        </WrapperHeader>
    )
}

export default withRouter(Header)

