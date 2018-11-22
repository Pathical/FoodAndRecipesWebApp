import {AppBar, Toolbar, Typography} from '@material-ui/core/';
// import purple from '@material-ui/core/colors/purple';
// import yellow from '@material-ui/core/colors/yellow';
import * as React from 'react';
// import { Nav, Navbar, NavItem } from 'react-bootstrap';
// import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';


export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>

                    {/* <IconButton  aria-label="Menu" color="inherit">
                        <MenuIcon aria-haspopup="true"/>
                    </IconButton> */}

                    <Typography variant="display2" color="default">
                        <Link style={{color: "yellow"}} to="/">Food And Recipes</Link>

                        {/* <Link style={{color: purple.A200}} to="/FirstComponent"> Page 1 </Link>
                        <Link style={{color: yellow.A200}} to="/SecondComponent"> Page 2 </Link> */}

                    </Typography>
                </Toolbar>
            </AppBar>
    );
}
// export const Header: React.StatelessComponent<{}> = () => {
//     return (
//         <Navbar>
//             <Navbar.Header>
//                 <Navbar.Brand>
//                     <Link to="/">dankNotDank</Link>
//                 </Navbar.Brand>
//             </Navbar.Header>
//             <Nav>
//                 <IndexLinkContainer to="/FirstComponent">
//                     <NavItem>Page 1</NavItem>
//                 </IndexLinkContainer>
//                 <IndexLinkContainer to="/SecondComponent">
//                     <NavItem>Page 2</NavItem>
//                 </IndexLinkContainer>
//             </Nav>
//         </Navbar>
//     );
// }