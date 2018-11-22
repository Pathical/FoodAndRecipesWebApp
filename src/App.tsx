
import * as React from 'react';
import FoodItemCard from './components/FoodItemCard';

interface IState {
  currentFoodItem: any,
  foodItems: any[],
  open: boolean,
  uploadFileList:any,
  authenticated: boolean,

}

export default class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      currentFoodItem: { "id":0,"name":"Chocolate Cake","url":"","tags":"cake","uploaded":"","description":"","ingredients":"","instructions":"","width":"0","height":"0" },
      foodItems: [],
      open: false,
      uploadFileList: null,
      authenticated: true
    }
  }

  public render() {
    return (
      <div>
        <FoodItemCard foodItem={this.state.currentFoodItem} />

      </div>
    );
  }

  /*
  // get all the food items
  private fetchFoodItems(tag: any){
    let url = "https://foodandrecipesapi.azurewebsites.net/api/Food"

    if(tag !== "") { // if the user wants to search by tag
      url += "/tag?=" + tag // append the tag onto the url
    }

    fetch(url, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(json => {
      let currentFoodItem = json[0]
      if (currentFoodItem === undefined) {
        currentFoodItem = { "id":0,"name":"No Foods/Recipes","url":"","tags":"Try a different tag","uploaded":"","description":"","ingredients":"","instructions":"","width":"0","height":"0" }
      }
      this.setState({
        currentFoodItem,
        foodItems: json
      })
    });
  }
  */
}