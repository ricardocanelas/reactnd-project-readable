import React from 'react'
import styled from 'styled-components'
import { Container, Icon } from 'semantic-ui-react'

const WrapperFooter = styled.footer`
height: 120px;
background-color: #272727;
text-align: center;
padding-top: 30px;
&&&.ui.container{
    text-align: center
}
`
const Icons = styled.div`
color: white;
padding: 0 0 16px 0;
margin: 0 10px 0 0;
`
const Author = styled.div`
font-size: 11px;
color: darkgrey;
`

const IconLink = ({ url, icon }) => (
    <a href={url} rel="noopener noreferrer" target="_blank">
         <Icon name={icon} circular inverted />
    </a>
)

const Footer = (props) => {
    return (
        <WrapperFooter>
            <Container>
                <Icons>
                    <IconLink url="https://github.com/ricardocanelas" icon="github" />
                    <IconLink url="https://www.linkedin.com/in/canelas/" icon="linkedin" />
                    <IconLink url="http://ricardocanelas.com" icon="desktop" />
                </Icons>
                <Author>
                    By Ricardo Canelas
                </Author>
            </Container>
        </WrapperFooter>
    )
}

export default Footer