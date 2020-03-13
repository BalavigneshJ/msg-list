import React from 'react';
import moment from "moment" ;
import { connect } from "react-redux";
import { removeData  } from '../src/redux/GetAction' ;

class TableRow extends React.Component {

    constructor(props) {
      super(props);
      this.state = {id : props.data.id } ;
      this.showButton = this.showButton.bind(this);
      this.hideButton = this.hideButton.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    showButton(ev){
        let target = ev.currentTarget ;
        let button = target.getElementsByClassName("msg-delete")[0];
        button.classList.remove("hide");
    }

    hideButton(ev){
        let target = ev.currentTarget ;
        let button = target.getElementsByClassName("msg-delete")[0];
        button.classList.add("hide");
    }

    handleClick(id){
        this.props.onDelete(id) ;
    }

    getTime(time){
        return moment(time).fromNow() ;
    }

    shouldComponentUpdate(nextProps, nextState){
       if(nextProps.data.id === this.state.id){
           return false ;
       }
       return true ;
    }

    render() {
        let data = this.props.data ;
        return (
            <div className="table-row" onMouseEnter={this.showButton} onMouseLeave={this.hideButton}>
                <button className="msg-delete hide" onClick={() => this.handleClick(this.props.index)}>Delete</button>
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

const mapDispatchToProps = dispatch => {
    return {
      onDelete : (i) => {
        dispatch(removeData(i));
      }
    };
  };



export default connect(null ,mapDispatchToProps)(TableRow) ;

