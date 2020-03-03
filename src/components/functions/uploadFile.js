import React, {Component} from 'react'
import FileUploader from "react-firebase-file-uploader"; 
import firebase from '../../config/fbConfig'

class uploadFile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isUploading: false, progress: 0, avatarURL: ''
        }
    }

    handleChangeUsername = event =>
    this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
    };
    handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("pdf")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
    };

    render(){
        return(
            <div>
               <FileUploader
                        accept="pdf/*"
                        name="avatar"
                        randomizeFilename
                         storageRef={firebase.storage().ref("pdf")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
            </div>
        )
    }
}

export default uploadFile