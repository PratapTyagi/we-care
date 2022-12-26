import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cardWrap: {
    cursor: "pointer",
    position: "relative",
    minHeight: " 100%",
    maxHeight: " 100%",
    width: "40vw",
    boxSizing: " border-box",
    boxShadow: " 0.5rem 0.5rem 4rem rgba(109, 109, 109, 0.3) !important",
    borderRadius: " .5rem !important",
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
    paddingTop: "60.5%", // 16:9
  },
  avatar: {
    backgroundColor: "#2a2a2a",
    color: "var(--theame-color)",
    position: "absolute",
    top: "2%",
    left: "2%",
  },
}));

function WCCard(props) {
  const classes = useStyles();
  const { description, title, imageSrc, avatar, createdAt } = props;

  return (
    <Card className={classes.cardWrap}>
      <Avatar className={classes.avatar}>{avatar}</Avatar>
      <CardMedia className={classes.media} image={imageSrc} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1">
          {title}
        </Typography>
        {description && (
          <Typography variant="p" color="textSecondary" component="p">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

WCCard.defaultProps = {
  description: "Startup",
  title: "WCCard",
  avatar: "WC",
};

export default WCCard;
