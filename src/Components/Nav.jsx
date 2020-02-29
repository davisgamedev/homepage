import React from 'react';

import Header from "../common/components/Header/Header.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "common/components/CustomButtons/Button.js";

import './Components.css'

import { makeStyles } from "@material-ui/core/styles";
import styles from "common/assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);


export default function Nav() { 
    const classes = useStyles();
    return (
        <Header brand="Transparent" color="transparent" rightLinks={
            <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button color="transparent" className={ classes.navLink }>Projects</Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button color="transparent" className={ classes.navLink }>Blog</Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button color="transparent" className={ classes.navLink }>Contact</Button>
            </ListItem>
            </List>
        }
        />
)};

