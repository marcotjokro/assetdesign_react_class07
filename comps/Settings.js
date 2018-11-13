import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput, Image, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { ChangePage } from '.././redux/actions';
import { ChangeItems } from '.././redux/actions';

import Ghibli from './Ghibli';

class Settings extends React.Component {
	
	state = {
		text: "Hi",
		nyanImg: "",
		doggoImg: "",
		shibaImg: [],
		ghibli: [],
		stockRange: []
	}
	
	componentWillMount=async()=>{
		try {
			var name = await AsyncStorage.getItem("Name");
			this.setState({
				text: name
			})
		} catch (error) {
			alert(error);
		} 
	}
	
	handleGetItems=async()=>{
		var resp = await fetch("http://testserver1234.herokuapp.com/getItems");
		var arrays = await resp.json();
		console.log(arrays);

		/*
			No Async/Await:
			fetch("http://testserver1234.herokuapp.com/getItems").then((resp)=>{
				return resp.json();
			}).then((json)=>{
				console.log(json);
			})
		*/
		
		//Updating UI with Information
		this.props.dispatch(ChangeItems(arrays));
		
		/*
			this.setState({
				items: arrays
			})
		*/
		
	}
	
	handleTextInput=async(text)=>{
		try {
			await AsyncStorage.setItem("Name", text);
		} catch (error) {
			alert(error);
		}
	}
	
	handleRandNyan=async()=>{
		var resp = await fetch("https://aws.random.cat/meow");
		var json = await resp.json();
		console.log(json);
		this.setState({
			nyanImg: json.file
		})
	}
	
	handleRandDoggo=async()=>{
		var resp = await fetch("https://random.dog/woof.json");
		var json = await resp.json();
		console.log(json);
		this.setState({
			doggoImg: json.url
		})
	}
	
	handleRandShiba=async()=>{
		var resp = await fetch("http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true");
		var json = await resp.json();
		console.log(json);
		this.setState({
			shibaImg: json
		})
	}
	
	handleGhibli=async()=>{
		var resp = await fetch("https://ghibliapi.herokuapp.com/films", {
			header:{
				"Content-Type":"application/json"
			}
		});
		var json = await resp.json();
		console.log(json);
		this.setState({
			ghibli: json
		})
	}
	
	handleStock=async()=>{
		var resp = await fetch("https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10");
		var json = await resp.json();
		console.log(json);
		this.setState({
			stockRange: json
		})
	}
	
	render() {
    
		var allItems = this.props.mainItems.map((obj, index)=>{
			return (
				<View key={index}>
					<Text>{obj.title} - {obj.desc}</Text>
					<Text>{obj.x} - {obj.y}</Text>
				</View>
			)
		})
		
		var shiba = this.state.shibaImg.map((obj, index)=>{
			return (
				<Image 
					source={{uri:obj}}
					key={index}
					style={{flex: 1, flexDirection: 'row', width: 200, height: 200}}
					resizeMode='cover'
					/>
			)
		});
		
		var ghiblis = this.state.ghibli.map((obj, index)=>{
			return (
				<Ghibli obj={obj} />
			)
		});
		
		if (this.state.stockRange.chart){
			var showStock = this.state.stockRange.chart.map((obj)=>{
			return (
				<View style={{margin: 10}}>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Date:</Text> {obj.date}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Open:</Text> {obj.open}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>High:</Text> {obj.high}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Low:</Text> {obj.low}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Close:</Text> {obj.close}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Volume:</Text> {obj.volume}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Unadjusted Volume:</Text> {obj.unadjustedVolume}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Change:</Text> {obj.change}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Change %:</Text> {obj.changePercent}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Vwap:</Text> {obj.vwap}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Label:</Text> {obj.label}
					</Text>
					<Text>
						<Text style={{fontWeight: 'bold'}}>Change Overtime:</Text> {obj.changeOverTime}
					</Text>
				</View>
			)
		});
			
		}
		
		if (this.state.stockRange.quote){
			var Quote =(
				<Text> {this.state.stockRange.quote.companyName}</Text>
			)
		}

		
		return (
      <View style={{flex: 1, position: 'relative', top: 30}}>
				<ScrollView>
					<TextInput
						placeholder="Name"
						onChangeText={this.handleTextInput}
						/>
					<Button 
						title="Get Items"
						onPress={this.handleGetItems}
						/>
					<Text>{this.state.text}</Text>
					{allItems}
					<Button
						title="Get Nyan"
						onPress={this.handleRandNyan}
						/>
					<Image
						source={{uri:this.state.nyanImg}}
						style={{width: 200, height: 200}}
						resizeMode="cover"
						/>
					<Button
						title="Get Doggo"
						onPress={this.handleRandDoggo}
						/>
					<Image
						source={{uri:this.state.doggoImg}}
						style={{width: 200, height: 200}}
						resizeMode="cover"
						/>
					
					<Button
						title="Get Ghibli"
						onPress={this.handleGhibli}
						/>
						{ghiblis}
					
					<Button
						title="Get Shiba"
						onPress={this.handleRandShiba}
						/>
						{shiba}
					
					<Button
						title="Get Stock"
						onPress={this.handleStock}
						/>
					{Quote}
					{showStock}
					
				</ScrollView>
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

export default connect(grabVar)(Settings);