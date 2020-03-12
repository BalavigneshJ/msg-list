import React from 'react';
import moment from "moment" ;

class TableRow extends React.Component {

    constructor(props) {
      super(props);
      this.state = {id : props.data.id }
    }

    getTime(time){
        return moment(time).fromNow() ;
    }

    shouldComponentUpdate(nextProps, nextState){
       if(nextProps.index === this.props.index){
           return false ;
       }
       return true ;
    }

    render() {
        let data = this.props.data ;
        return (
            <div className="table-row">
                <div className="msg-title">
                    <img className="img-size" src={"http://message-list.appspot.com" + data.author.photoUrl}></img>
                    <div className="msg-author">{data.author.name}</div>
                    <div className="msg-time">{this.getTime(data.updated)}</div>
                </div>
                <div className="msg-content">{data.content}</div>
            </div>
        );
    }
}



export default TableRow ;

