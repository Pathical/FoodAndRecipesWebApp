
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { CardMedia, CardActions, Collapse, IconButton, Icon } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from 'react-responsive-modal';

interface IProps {
    currentFood: any
}

interface IState {
    open: boolean,
    expanded: any,
    uploadFileList: any
}

export default class FoodItemCard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            open: false,
            expanded: false,
            uploadFileList: null
        }
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.editFood = this.editFood.bind(this)
    }

    public handleExpandClick() {
        this.setState({ expanded: !this.state.expanded })
    };

    // This method gets the image which represents the food item
    public getIcon(): string {
        return this.props.currentFood.url;
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
    };

    // Modal Close
    private onCloseModal = () => {
        this.setState({ open: false });
    };

    // Takes a string representation of a date (from the RESTful api)
    // Creates a new Date object
    // Take only the necessary parts of the Date object
    public convertDate(arg: any): string {
        const converted = new Date(arg);
        const splitted = converted.toDateString().split(' ');
        return splitted[0] + ' ' + splitted[2] + ' ' + splitted[1] + ' ' + splitted[3];
    }

    private handleFileUpload(fileList: any) {
        this.setState({
            uploadFileList: fileList.target.files
        })
    }

    private deleteFood(id: any) {
        const url = "https://foodandrecipesapi.azurewebsites.net/api/Food/" + id

        fetch(url, {
            method: 'DELETE'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error Response
                    alert(response.statusText)
                }
                else {
                    location.reload()
                }
            })
    }

    // This render function helps create a Card from material UI
    // Shows weather information for a particular date
    public render() {
        const currentFood = this.props.currentFood
        const { open } = this.state;
        return (
            <div>
                <Card style={{ maxWidth: 400 }}>
                    <Typography style={{ fontSize: "2em", marginLeft: "10px" }}>
                        {currentFood.name}
                    </Typography>
                    <Typography style={{ fontSize: "1em", marginLeft: "10px" }}>

                        {currentFood.uploaded}
                    </Typography>
                    <CardMedia
                        style={{ height: 0, paddingTop: '56.25%' }}
                        image={currentFood.url}
                        title={currentFood.name}
                    />
                    <CardContent>
                        <Typography component="p" style={{ fontSize: "1em" }}>
                            {currentFood.description}
                        </Typography>
                    </CardContent>

                    <CardActions style={{ display: 'flex' }}>
                        <IconButton
                            style={this.state.expanded ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}

                            onClick={this.handleExpandClick}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>

                        <IconButton onClick={this.onOpenModal}>
                            <Icon className="far fa-edit" />
                        </IconButton>

                        <IconButton onClick={this.deleteFood.bind(this, currentFood.id)}>
                            <Icon className="far fa-trash-alt" />
                        </IconButton>

                    </CardActions>

                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
                        <CardContent>
                            <Typography paragraph={true} style={{ fontSize: "1.5em" }}>Ingredients:</Typography>
                            <Typography paragraph={true} style={{ fontSize: "1em" }}>
                                {currentFood.ingredients}
                            </Typography>
                            <Typography paragraph={true} style={{ fontSize: "1.5em" }}> Instructions:</Typography>
                            <Typography paragraph={true} style={{ fontSize: "1em" }}>
                                {currentFood.instructions}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>

                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Name of the Food</label>
                            <input type="text" className="form-control" id="food-edit-name-input" value={currentFood.Name} />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <input type="text" className="form-control" id="food-edit-tag-input" value={currentFood.Tag} />
                            <small className="form-text text-muted">Tag is used for searching</small>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" id="food-edit-description-input" value={currentFood.Description} />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Ingredients</label>
                            <input type="text" className="form-control" id="food-edit-ingredients-input" value={currentFood.Ingredients} />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Instructions</label>
                            <input type="text" className="form-control" id="food-edit-instructions-input" value={currentFood.Instructions} />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <button type="button" className="btn" onClick={this.editFood}>Upload</button>
                    </form>
                </Modal>
            </div>
        );
    }

    private editFood() {
        const nameInput = document.getElementById("food-edit-name-input") as HTMLInputElement
        const tagInput = document.getElementById("food-edit-tag-input") as HTMLInputElement
        const descriptionInput = document.getElementById("food-edit-description-input") as HTMLInputElement
        const ingredientsInput = document.getElementById("food-edit-ingredients-input") as HTMLInputElement
        const instructionsInput = document.getElementById("food-edit-instructions-input") as HTMLInputElement

        if (nameInput === null || tagInput === null) {
            return;
        }

        const url = "https://foodandrecipesapi.azurewebsites.net/api/food/" + this.props.currentFood.id
        const updatedName = nameInput.value
        const updatedTag = tagInput.value
        const updatedDescription = descriptionInput.value
        const updatedIngredients = ingredientsInput.value
        const updatedInstructions = instructionsInput.value

        let dataBody = {}
        if (this.state.uploadFileList != null) {
            const imageFile = this.state.uploadFileList[0]
            dataBody = {
                FoodItemId: this.props.currentFood.id,
                Name: updatedName,
                Tags: updatedTag,
                Description: updatedDescription,
                Ingredients: updatedIngredients,
                Instructions: updatedInstructions,
                image: imageFile
            }
        } else {
            dataBody = {
                FoodItemId: this.props.currentFood.id,
                Name: updatedName,
                Tags: updatedTag,
                Description: updatedDescription,
                Ingredients: updatedIngredients,
                Instructions: updatedInstructions
            }
        }



        fetch(url, {
            body: JSON.stringify(dataBody),
            headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
            method: 'PUT'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText + " " + url)
                } else {
                    location.reload()
                }
            })
    }
}
