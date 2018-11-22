
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { CardMedia, CardHeader, CardActions, Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


interface IState {
    expanded: any
}

export default class FoodItemCard extends React.Component<{ foodItem: any } , IState> {

    constructor(props: any) {
        super(props)
        this.state = {
          expanded: false
        }
        this.handleExpandClick=this.handleExpandClick.bind(this);
    }


    public handleExpandClick(){
      this.setState({expanded: !this.state.expanded})
    };

    // This method gets the image which represents the food item
    public getIcon(): string {
        return this.props.foodItem.url ;
    }

    // Takes a string representation of a date (from the RESTful api)
    // Creates a new Date object
    // Take only the necessary parts of the Date object
    public convertDate(arg: string): string{
        const converted = new Date(arg);        const splitted = converted.toDateString().split(' ');
        return splitted[0] + ' ' + splitted[2] + ' ' + splitted[1] + ' ' + splitted[3];
    }

    // This render function helps create a Card from material UI
    // Shows weather information for a particular date
    public render() {
        return (
            <Card  style={{ maxWidth: 400 }}>
                <CardHeader 
                    title="Name of the food"
                    subheader = "date of when the food was posted"
                />
                <CardMedia
                    style={{ height: 0, paddingTop: '56.25%' }}
                    image="/static/images/cards/paella.jpg"
                    title="Name of the food"
                />
                <CardContent>
                    <Typography component="p" style={{fontSize: "1em"}}>
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>

                <CardActions style={{ display: 'flex'}}>
                    <IconButton
                        style={this.state.expanded ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}}

                        onClick={this.handleExpandClick}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
                    <CardContent>
                        <Typography paragraph={true}>Method:</Typography>
                        <Typography paragraph={true} style={{fontSize: "1em"}}>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                        </Typography>
                        <Typography paragraph={true} style={{fontSize: "1em"}}>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph={true} style={{fontSize: "1em"}}>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                        to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                        cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography style={{fontSize: "1em"}}>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            


            </Card>
        );
    }
}
