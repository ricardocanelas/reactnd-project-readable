// External Depedencies
import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

// Style
const WrapperHeaderPage = styled.div`
h1, h2, h3, h4 {
  display: inline;
  margin: 0 12px 0 0;
}
.right{
    float: right;
}
.sortby{
    padding-top: 16px;
    font-size: 12px;
    color: #929292
}
`

const HeaderPage = (props) => {

    const style = {
        margin: props.margin,
        padding: props.padding,
        borderBottom: props.borderBottom
    }

    return (
        <WrapperHeaderPage style={style}>
            {props.children}
        </WrapperHeaderPage>
    )
}

// PropTypes
HeaderPage.propTypes = {
    title: PropTypes.string.isRequired,
    margin: PropTypes.string,
    padding: PropTypes.string,
    borderBottom: PropTypes.string
}

// DefaultProps
HeaderPage.defaultProps = {
    title: 'MyTitle',
    margin: '0 0 24px 0',
    padding: '0 0 10px 0',
    borderBottom: '1px dotted #dededf'
}


export default HeaderPage