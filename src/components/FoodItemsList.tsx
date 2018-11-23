
import MediaStreamRecorder from 'msr';
import * as React from 'react';
import { List, ListItem, Table, TableCell, TableRow } from '@material-ui/core';


interface IProps {
    foods: any[],
    selectNewFood: any,
    searchByTag: any
}

export default class FoodItemsList extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props)
        this.searchTagByVoice = this.searchTagByVoice.bind(this)
        this.searchByTag = this.searchByTag.bind(this)

    }

    // creates an array of WeatherForADay objects
    public createList = () => {
        const list = []
        for (let i = 0; i < this.props.foods.length; i++) {

            list.push(<ListItem button={true} onClick={this.selectRow.bind(this, i)}><Table><TableRow>
                
                <TableCell>{this.props.foods[i].name}</TableCell>
                <TableCell>  {this.props.foods[i].tags} </TableCell>

            </TableRow></Table></ListItem>)
        }
        return list
    }

    public render() {
        return (
            <div>
                <form onSubmit={this.searchByTag}>
                <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
                <div style={{marginTop: "20px"}} className="input-group-append" >
                    <div style={{backgroundColor: "#4286f4", marginRight:"20px"}} className="btn  search-button" onClick={this.searchByTag}>Search</div>
                    <div style={{backgroundColor: "#4286f4"}} className="btn" onClick={this.searchTagByVoice}><i className="fa fa-microphone" /></div>
                </div>
                </form>

                <List >

                    {this.createList()}

                </List>
            </div>
        );
    }


    // Meme selection handler to display selected foodItem in details component
    private selectRow(index: any) {
        const selectedFood = this.props.foods[index]
        if (selectedFood != null) {
            this.props.selectNewFood(selectedFood)
        }
    }



    private searchByTag(event:any) {
        event.preventDefault();
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        console.log(textBox.value)
        const tag = textBox.value
        this.props.searchByTag(tag)
    }

    private searchTagByVoice() {
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

        function onMediaError(e: any) {
            console.error('media error', e);
        }
    }

    private postAudio(blob: any) {
        let accessToken: any;
        fetch('[ISSUE TOKEN END POINT]', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });

        // posting audio
        fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
            body: blob, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer' + accessToken,
                'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                'Ocp-Apim-Subscription-Key': 'd540f77acd43487ea1cda63823d67cc9'
            },
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            console.log(res)
            const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
            textBox.value = (res.DisplayText as string).slice(0, -1)
        }).catch((error) => {
            console.log("Error", error)
        });
    }


}