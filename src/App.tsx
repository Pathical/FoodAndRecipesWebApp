
import * as React from 'react';
import Modal from 'react-responsive-modal';
import FoodItemCard from './components/FoodItemCard';
import FoodItemsList from './components/FoodItemsList';
import { Grid, Button } from '@material-ui/core';

interface IState {
    currentFoodItem: any,
    foodItems: any[],
    open: boolean,
    uploadFileList: any,
    authenticated: boolean,

}

export default class App extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            currentFoodItem: { "id": 0, "name": "Chocolate Cake", "url": "", "tags": "cake", "uploaded": "", "description": "", "ingredients": "", "instructions": "", "width": "0", "height": "0" },
            foodItems: [],
            open: false,
            uploadFileList: null,
            authenticated: true
        }
        this.fetchFoodItems = this.fetchFoodItems.bind(this)
        this.fetchFoodItems("")
        this.selectNewFood = this.selectNewFood.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
		this.uploadFood = this.uploadFood.bind(this)
    }

    public render() {
        const { open } = this.state;
        return (
            <div style={{ backgroundColor: "#fffdba" }}>
                <Grid container={true} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "100vh" }} spacing={40}>
                    <Grid item={true} xs={9} md={3}>
                        <FoodItemCard currentFood={this.state.currentFoodItem} />
                    </Grid>
                    <Grid item={true} xs={9} md={3}>
                        <Grid container={true} >
                            <Grid item={true} xs={12} style={{ marginBottom: "20px" }}>
                                <Button onClick={this.onOpenModal} style={{ color: "#fffb2d", backgroundColor: "#4286f4", fontSize: "25px" }} fullWidth={true} >
                                    Add new food
                                </Button>
                            </Grid>
                            <Grid item={true} xs={12}>
                                <FoodItemsList foods={this.state.foodItems} selectNewFood={this.selectNewFood} searchByTag={this.fetchFoodItems} />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Name of the Food</label>
                            <input type="text" className="form-control" id="food-name-input" placeholder="Enter a Name (REQUIRED)" />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Tag</label>
                            <input type="text" className="form-control" id="food-tag-input" placeholder="Enter Tag (REQUIRED)" />
                            <small className="form-text text-muted">Tag is used for searching</small>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" id="food-description-input" placeholder="Enter some description for the food" />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Ingredients</label>
                            <input type="text" className="form-control" id="food-ingredients-input" placeholder="Enter the ingredients" />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Instructions</label>
                            <input  type="text" className="form-control" id="food-instructions-input" placeholder="Enter the instructions" />
                            <small className="form-text text-muted">You can edit any food/recipe later</small>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="meme-image-input" />
                        </div>
                        <button type="button" className="btn" onClick={this.uploadFood}>Upload</button>
                    </form>
                </Modal>


            </div>

        );
    }


    // get all the food items
    private fetchFoodItems(tag: any) {
        let url = "https://foodandrecipesapi.azurewebsites.net/api/Food"

        if (tag !== "") { // if the user wants to search by tag
            url += "/tags/" + tag // append the tag onto the url
        }

        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                let currentFoodItem = json[0]
                if (currentFoodItem === undefined) {
                    currentFoodItem = { "id": 0, "name": "No Foods/Recipes", "url": "", "tags": "Try a different tag", "uploaded": "", "description": "", "ingredients": "", "instructions": "", "width": "0", "height": "0" }
                }
                this.setState({
                    currentFoodItem,
                    foodItems: json
                })
            });
    }

    // Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};

    private selectNewFood(newFood: any) {
        this.setState({
            currentFoodItem: newFood
        })
    }

    private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
    }
    
    private uploadFood() {
		const nameInput = document.getElementById("food-name-input") as HTMLInputElement
        const tagInput = document.getElementById("food-tag-input") as HTMLInputElement
        const descriptionInput = document.getElementById("food-description-input") as HTMLInputElement
        const ingredientsInput = document.getElementById("food-ingredients-input") as HTMLInputElement
        const instructionsInput = document.getElementById("food-instructions-input") as HTMLInputElement
		const imageFile = this.state.uploadFileList[0]
	
		if (nameInput === null || tagInput === null || imageFile === null) {
			return;
		}
	
		const name = nameInput.value
        const tag = tagInput.value
        const description = descriptionInput.value
        const ingredients = ingredientsInput.value
        const instructions = instructionsInput.value
		const url = "https://foodandrecipesapi.azurewebsites.net/api/food/upload"
	
		const formData = new FormData()
		formData.append("Name", name)
        formData.append("Tags", tag)
        formData.append("Description", description)
        formData.append("Ingredients", ingredients)
        formData.append("Instructions", instructions)
		formData.append("image", imageFile)
	
		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'POST'
		})
		.then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				// location.reload()
			}
		})
	}




}