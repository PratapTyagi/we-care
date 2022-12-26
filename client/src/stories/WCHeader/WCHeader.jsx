import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle, MoreVert as MoreIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: 40,
  },
  icon: {
    cursor: "pointer",
  },
  title: {
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "inherit",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const WCHeader = ({ icon, title, ...props }) => {
  const classes = useStyles();
  const { links, menuOptions } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuOptions?.map(({ label, onClick }) => {
        return (
          <MenuItem key={label} onClick={onClick}>
            {label}
          </MenuItem>
        );
      })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {links?.map(({ label, icon, isAccount, onClick }) => {
        return (
          <MenuItem key={label} color="inherit" onClick={onClick}>
            {icon && (
              <IconButton edge="start" disabled={true} aria-label={label}>
                {icon}
              </IconButton>
            )}
            <Typography
              style={{
                color: isAccount ? "red" : "rgb(117, 212, 27)",
                ...(isAccount && { fontWeight: "bold" }),
              }}
            >
              {label}
            </Typography>
          </MenuItem>
        );
      })}

      {menuOptions.length > 0 && (
        <MenuItem
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Typography varient="body2">Profile</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  const GreenTextTypography = withStyles({
    root: {
      color: "rgb(117, 212, 27)",
    },
  })(Typography);

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {icon && (
            <IconButton edge="start" className={classes.icon} aria-label="logo">
              <Link to="/" className={classes.link}>
                {icon}
              </Link>
            </IconButton>
          )}
          {title && (
            <GreenTextTypography className={classes.title} variant="h4" noWrap>
              <Link to="/" className={classes.link}>
                {title}
              </Link>
            </GreenTextTypography>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {links?.map(({ label, icon, isAccount, onClick }) => {
              return (
                <MenuItem key={label} color="inherit" onClick={onClick}>
                  {icon && (
                    <IconButton edge="start" disabled={true} aria-label={label}>
                      {icon}
                    </IconButton>
                  )}
                  <GreenTextTypography
                    style={{
                      color: isAccount ? "red" : "rgb(117, 212, 27)",
                      ...(isAccount && { fontWeight: "bold" }),
                    }}
                  >
                    {label}
                  </GreenTextTypography>
                </MenuItem>
              );
            })}

            {menuOptions.length > 0 && (
              <MenuItem
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </MenuItem>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

WCHeader.defaultProps = {
  menuOptions: [],
};

export default WCHeader;
