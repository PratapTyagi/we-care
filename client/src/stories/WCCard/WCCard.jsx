import React from "react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardWrap: {
    padding: " 1.25rem 1rem 1rem 1.25rem",
    minHeight: " fit-content",
    maxHeight: " 100%",
    width: "21rem",
    boxSizing: " border-box",
    boxShadow: " 0px 0.25rem 4rem rgba(109, 109, 109, 0.2) !important",
    borderRadius: " 1rem !important",
    backgroundColor: "whitesmoke",
    position: " relative",
    marginBottom: " 2rem !important",
    marginRight: " 2rem !important",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: green[500],
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

function WCCard(props) {
  const classes = useStyles();
  const { description, title, imageSrc, avatar, createdAt } = props;

  return (
    <Card className={classes.cardWrap}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={createdAt}
      />
      <CardMedia className={classes.media} image={imageSrc} title={title} />
      {description && (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary">
            More Details
          </Button>
        </ThemeProvider>
      </CardActions>
    </Card>
  );
}

WCCard.defaultProps = {
  description: "Startup",
  title: "WCCard",
  avatar: "WC",
};

export default WCCard;
