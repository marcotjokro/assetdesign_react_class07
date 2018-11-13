import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { ChangePage } from '.././redux/actions';
import { ChangeItems } from '.././redux/actions';

class Ghibli extends React.Component {
	
	state={
		modal: false
	}
	
	handleModal=()=>{
		this.setState({
			modal: true
		})
	}

	render() {
    
		var modal = null;
		if(this.state.modal === true){
			modal = (
				<View style={{position: 'absolute', top: 100, left: 0, backgroundColor: 'gray'}}>
					<Text style={{fontWeight: 'bold'}}>{this.props.obj.title}</Text>
					<Text style={{fontWeight: 'bold'}}>Description:</Text><Text> {this.props.obj.description}</Text>
					<Text style={{fontWeight: 'bold'}}>Director:</Text><Text> {this.props.obj.director}</Text>
					<Text style={{fontWeight: 'bold'}}>Producer:</Text><Text> {this.props.obj.producer}</Text>
					<Text style={{fontWeight: 'bold'}}>Score:</Text><Text> {this.props.obj.rt_score}</Text>
				</View>
			)
		}
		
		return (
      <View style={{margin: 10}}>
				<TouchableOpacity onPress={this.handleModal}>
					<Text style={{fontWeight: 'bold'}}>{this.props.obj.title}</Text>
				</TouchableOpacity>
				<Text style={{fontWeight: 'bold'}}>Description:</Text><Text> {this.props.obj.description}</Text>
				<Text style={{fontWeight: 'bold'}}>Director:</Text><Text> {this.props.obj.director}</Text>
				<Text style={{fontWeight: 'bold'}}>Producer:</Text><Text> {this.props.obj.producer}</Text>
				<Text style={{fontWeight: 'bold'}}>Score:</Text><Text> {this.props.obj.rt_score}</Text>
				{modal}
			</View>
    );
  }
}

function grabVar(state){
	return {
		mainPage: state.Settings.page,
		mainItems: state.Settings.items
	}
}

export default connect(grabVar)(Ghibli);