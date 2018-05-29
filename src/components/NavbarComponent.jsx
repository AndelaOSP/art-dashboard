import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class NavbarComponent extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu borderless>
                <Menu.Item name='analytics' active={activeItem === 'analytics'} onClick={this.handleItemClick} />
                <Menu.Menu position='right'>
                    <Menu.Item name='Winnie Pooh' active={activeItem === 'Winnie Pooh'} onClick={this.handleItemClick} icon="user circle outline"/>
                </Menu.Menu>
            </Menu>
        )
    }
};
