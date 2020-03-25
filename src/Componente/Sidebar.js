import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link, BrowserRouter} from 'react-router-dom';


function Sidebar({items}) {

    const isLoggedIn  = localStorage.getItem('isLoggedIn');

    return (
        <div>
        { isLoggedIn ?
        <div className="sidebar">
            <List disablePadding dense>
                {items.map(({label, name, items: subItems, ...rest}) => {
                    return (
                        <>
                        <React.Fragment key={name}>
                            <div className="element_lista">
                                <Link to={`/${name}`}>
                                    <ListItem style={{paddingLeft: 18}} button {...rest}>
                                        <ListItemText>{label}</ListItemText>
                                    </ListItem>
                                </Link>
                            </div>


                            {Array.isArray(subItems) ? (
                                <List disablePadding dense>
                                    {subItems.map((subItem) => {
                                        return (
                                            <Link to={`/${subItem.name}`}
                                                  style={{color: '#FFFFFF', textDecoration: 'none'}}>
                                                <ListItem
                                                    key={subItem.name}
                                                    style={{paddingLeft: 36}}
                                                    button
                                                    dense
                                                >

                                                    <ListItemText>
                         <span className="sidebar-subitem-text">
                            {subItem.label}
                          </span>
                                                    </ListItemText>
                                                </ListItem>
                                            </Link>
                                        )
                                    })}
                                </List>
                            ) : null}
                        </React.Fragment>

                        </>
                    )
                })}
            </List>
        </div> : <></> }
        </div>
    )
}

export default Sidebar


