import React from 'react';
import { connect } from "react-redux";
import { getData , getUpdatedData  } from '../src/redux/GetAction' ;
import { GET_DATA_SUCCESS } from "./redux/actiontypes"
import TableRow from "./TableRow";


class Table extends React.Component {

    constructor(props) {
      super(props); 
      this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        this.props.onGetData() ;
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        if((document.documentElement.offsetHeight * 0.9)  <= window.innerHeight + window.scrollY ){
            if(this.props.MsgStatus === GET_DATA_SUCCESS ){
                this.props.onGetData(this.props.NextKey) ;
            }
        }else if(document.documentElement.offsetHeight * 0.1 > window.scrollY ){
            if(this.props.vIndex !== 0 ){
                this.props.onUpdateData() ;
            }
        }
    }

    render() {
        if(this.props.MsgData.length){           
            return (
                <div className="table">
                    {
                        this.props.MsgData.map((data , index) => {
                            return(<TableRow key={data.id} index={index} data={data}/>);
                        })
                    }
                </div>
            );
        }else{
            return (
                <div className="loader">
                    Loading.....
                </div>
            );
        }
    }
}

const mapStateToProps = (state)=> {
    return {
      MsgData: state.DATA.visibleMsg ,
      MsgStatus : state.DATA.status,
      NextKey : state.DATA.pageToken ,
      vIndex : state.DATA.vIndex
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetData : (key) => {
      dispatch(getData(key));
    },

    onUpdateData : () => {
        dispatch(getUpdatedData());
    },
  };
};


export default connect(mapStateToProps ,mapDispatchToProps)(Table);

