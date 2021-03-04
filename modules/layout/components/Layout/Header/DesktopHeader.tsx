import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import classes from './Header.module.scss';
import { IHeaderItem } from './header.type';
import { Badge } from "@material-ui/core";
import {useSelector} from "react-redux";

interface IDesktopHeaderPros {
  headerMenu: Array<IHeaderItem>
}

export default function DesktopHeader({ headerMenu } :IDesktopHeaderPros) {
  const cartItemCount = useSelector((state) => state.cartState.cartItems.length);
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.desktopHeader}>
      <Grid item container className={classes.leftContent}>
        <Grid item>
          <Link href="/">
            <img src="/images/header-icon.png" alt="app logo" />
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3} alignItems="center">
          {headerMenu.map((menuItem) => (
            <Grid item key={menuItem.title} className={!menuItem.display ? 'hidden' : ''}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Badge badgeContent={cartItemCount} color="primary">
                <Button
                  onClick={menuItem.onClick}
                  component="button"
                  color="inherit"
                >
                  {menuItem.icon}
                  &nbsp;
                  {menuItem.title}
                </Button>
              </Badge>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
