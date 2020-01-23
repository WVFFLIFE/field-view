import React from 'react';
import {
    StyledList,
} from './styled-components';
import navigationConfig from './navigation-config';
import Navigation from '../navigation';

const NavBar = () => {
    return (
        <StyledList component="nav">
            {navigationConfig.map(list => (
                <Navigation 
                    component="div"
                    key={list.title}
                    pages={list.pages}
                    title={list.title}
                />
            ))}
        </StyledList>
    )
}

export default NavBar;