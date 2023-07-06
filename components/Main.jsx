import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View , Image, ScrollView, ActivityIndicator , TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';


export default function Main() {
    const [dataLocation, setDataLocation] = useState([])
    const [dataClimate, setDataClimate] = useState([])
    const [dataForecastDay, setDataForecastDay] = useState([])
    const [viewSearch, setViewSearch]= useState(false)
    const [dataSearch, setDataSearch] = useState([])
    const [loading, setLoading] = useState(true)
    const [textInputValue, setTextInputValue]= useState('London')

    useEffect(()=> {
        callApi(textInputValue);
    },[]);

    const handleChangeText = (textInput) => {
        autoComplete(textInput)
        setTextInputValue(textInput)
    }

    const handleEnterPress = () => {
        setViewSearch(false)
        callApi(textInputValue);
    }

    const callApi = (location) => {
        setLoading(true)
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=77cf88c548be4730914194407230407&q=${location}&days=3&aqi=no&alerts=no`)
            .then(response=> response.json())
            .then(data=> {
                setDataLocation(data.location)
                setDataClimate(data.current)
                setDataForecastDay(data.forecast.forecastday)
                setLoading(false)
            })
    }

    const autoComplete = (textInput) => {
        if(textInput.trim()) {
            fetch(`http://api.weatherapi.com/v1/search.json?key=77cf88c548be4730914194407230407&q=${textInput}`)
                .then(response=> response.json())
                .then(data=> {
                    setDataSearch(data)
            })
        }
    }

    return (
        <ImageBackground blurRadius={70} style={{flex:1}} source={require('../assets/bg-image.png')}>
            {loading ? 
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color='white'/>
                </View>
            :
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{paddingHorizontal:15, width:"100%", zIndex:2}}>
                            <TextInput
                                onFocus={()=>setViewSearch(true)}
                                onChangeText={handleChangeText}
                                onSubmitEditing={handleEnterPress}
                                value={textInputValue}
                                placeholder='Enter location'
                                placeholderTextColor={"white"}
                                style={styles.searcherBox}
                            />
                            {viewSearch ?
                                <View style={styles.searchSugeretionBox}>
                                    {dataSearch?.map((search, index)=> (
                                    <TouchableOpacity key={index} onPress={()=> {setTextInputValue(search.name +", "+ search.country),setViewSearch(false),callApi(search.name +", "+ search.country)}} style={{backgroundColor:"#DCDCDC"}}>
                                        <View style={{flexDirection:"row", alignItems:"center", padding:16}}>
                                            <Image source={require('../assets/location-icon.png')}/>
                                            <Text style={{fontWeight:500}}>{search.name}, {search.country}</Text>
                                        </View>
                                        <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                                    </TouchableOpacity>
                                    ))}
                                </View>
                            :
                                null
                            }
                        </View>
                        <View style={{paddingVertical:25}}>
                                <Text style={styles.textCity}>
                                    {dataLocation?.name},
                                    <Text style={styles.textCountry}>
                                        {'\u0020'}{dataLocation?.country}
                                    </Text>
                                </Text>
                        </View>
                        <View>
                            <Image style={{width:180, height:180, zIndex:1}} source={{uri:"https://"+dataClimate?.condition?.icon}}></Image>
                        </View>
                        <View style={{paddingVertical:25}}>
                            <Text style={styles.textTemp}>
                                {dataClimate?.temp_c}{'\u00B0'}
                                </Text>
                            <Text style={styles.textCondition}>{dataClimate?.condition?.text}</Text>
                        </View>
                            <View style={styles.statsBox}>
                                <View style={{flexDirection:"row"}}>
                                    <Image style={styles.icons} source={require('../assets/wind.png')}></Image>    
                                    <Text style={styles.textStats}>
                                        {dataClimate?.wind_mph} km
                                    </Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Image style={styles.icons} source={require('../assets/drop.png')}></Image>
                                    <Text style={styles.textStats}>
                                        {dataClimate?.humidity}%
                                    </Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Image style={styles.icons} source={require('../assets/sun.png')}></Image>
                                    <Text style={styles.textStats}>
                                        {dataClimate?.last_updated.split(" ")[1]} 
                                        {dataClimate?.last_updated.split(" ")[1].slice(0, -3) > 11 && dataClimate?.last_updated.split(" ")[1].slice(0, -3) < 24 ?
                                            <Text>PM</Text>                                
                                            :
                                            <Text>AM</Text>   
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={{alignSelf:"flex-start"}}>
                                <View style={{flexDirection:"row", alignItems:"center", paddingHorizontal:15, paddingVertical:10}}>
                                    <Image style={styles.icons} source={require('../assets/calender.png')}></Image>
                                    <Text style={styles.dailyTitle}>Daily forecast</Text>
                                </View>
                                <ScrollView horizontal>
                                    <View style={{flexDirection:"row"}}>
                                        {dataForecastDay.length > 0 ?
                                            dataForecastDay?.map((item, index)=> (
                                                    <View key={index} style={styles.dailyBox}>
                                                        <Image style={{width:50, height:50}} source={{uri:"https://"+item.day?.condition?.icon}}></Image>
                                                        <Text style={styles.dailyText}>{(new Date(item.date).toLocaleDateString("en-US", {weekday: "long"})).split(',')[0]}</Text>
                                                        <Text style={[styles.dailyText,{fontSize:17, fontWeight:600}]}>{item.day?.avgtemp_c}{'\u00B0'}</Text>
                                                    </View>
                                            ))
                                            :
                                            <ActivityIndicator></ActivityIndicator>
                                        }
                                    </View>
                                </ScrollView>
                        </View>
                        <StatusBar style="inverted" />
                    </View>
                </ScrollView>
            }
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    icons: {
        width: 25,
        height: 25,
        marginRight: 7
    },
    container: {
        marginTop: Constants.statusBarHeight, 
        alignItems: "center",
        paddingVertical: 10
    },
    searcherBox: {
        fontSize: 16, 
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        borderRadius: 20, 
        padding: 15, 
        color: "white"
    },
    searchSugeretionBox: {
        position: "absolute", 
        borderRadius: 20, 
        overflow: "hidden", 
        width: "100%", 
        marginHorizontal: 15, 
        top: 55, 
        margin: 5
    },
    textCity: {
        color: "white", 
        fontSize: 22, 
        fontWeight: 600
    },
    textCountry: {
        fontSize: 17, 
        color: "#DCDCDC"
    },
    textTemp: {
        color: "white", 
        fontSize: 45 , 
        fontWeight: 700, 
        alignSelf: "center", 
        marginBottom: 5
    },
    textCondition: {
        color: "white", 
        fontSize: 18, 
        alignSelf: "center" 
    },
    statsBox: {
        flexDirection: "row", 
        width: "100%", 
        padding: 15, 
        justifyContent: "space-between"
    },
    textStats: {
        color: "white", 
        fontSize: 17, 
        fontWeight: 600 
    },
    dailyTitle: {
        color: "white", 
        fontSize: 18, 
        fontWeight: 600, 
        marginLeft: 5
    },
    dailyBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        alignSelf: "flex-start", 
        borderRadius: 15, 
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        marginHorizontal: 10
    },
    dailyText: {
        color: "white", 
        alignSelf: "center"
    }
});
