import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, TextInput, View , Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';


export default function Main() {
    const [viewSearch, setViewSearch]= useState(false)

    return (
        <ImageBackground blurRadius={70} style={{flex:1}} source={require('../assets/bg-image.png')}>
            <ScrollView>
                <View style={{marginTop:Constants.statusBarHeight, alignItems:"center",paddingVertical:10}}>
                    <View style={{paddingHorizontal:15, width:"100%", zIndex:2}}>
                        <TextInput
                            onFocus={()=>setViewSearch(true)}
                            onBlur={()=>setViewSearch(false)}
                            placeholder='Enter location'
                            placeholderTextColor={"white"}
                            style={{fontSize:16, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius:20, padding:15, color:"white"}}
                        />
                        {viewSearch ?
                            <View style={{position:"absolute", borderRadius:20, overflow:"hidden", width:"100%", marginHorizontal:15, top:55, margin:5}}>
                                <View style={{backgroundColor:"#DCDCDC"}}>
                                    <Text style={{padding:15}}>London, United Kingdom</Text>
                                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                                </View>
                                <View style={{backgroundColor:"#DCDCDC"}}>
                                    <Text style={{padding:15}}>London, United Kingdom</Text>
                                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                                </View>
                                <View style={{backgroundColor:"#DCDCDC"}}>
                                    <Text style={{padding:15}}>London, United Kingdom</Text>
                                    <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                                </View>
                            </View>
                        :
                            null
                        }
                    </View>
                    <View style={{paddingVertical:25}}>
                        <Text style={{color:"white", fontSize:22 , fontWeight:600}}>Singapore, 
                            <Text style={{fontSize:17, color:"#DCDCDC"}}>
                                {'\u0020'}Singapore
                            </Text>
                        </Text>
                    </View>
                    <View>
                        <Image style={{width:180, height:180, zIndex:1}} source={require('../assets/partlycloudy.png')}></Image>
                    </View>
                    <View style={{paddingVertical:25}}>
                        <Text style={{color:"white", fontSize:45 , fontWeight:700, alignSelf:"center", marginBottom:5}}>33{'\u00B0'}</Text>
                        <Text style={{color:"white", fontSize:18 }}>Partly cloudy</Text>
                    </View>
                        <View style={{flexDirection:"row", width:"100%", padding:15, justifyContent:"space-between"}}>
                            <View style={{flexDirection:"row"}}>
                                <Image style={styles.icons} source={require('../assets/wind.png')}></Image>    
                                <Text style={{color:"white", fontSize:17, fontWeight:600 }}>
                                    11.2km
                                </Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <Image style={styles.icons} source={require('../assets/drop.png')}></Image>
                                <Text style={{color:"white", fontSize:17, fontWeight:600 }}>
                                    53%
                                </Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <Image style={styles.icons} source={require('../assets/sun.png')}></Image>
                                <Text style={{color:"white", fontSize:17, fontWeight:600 }}>
                                    06:56 AM
                                </Text>
                            </View>
                        </View>
                        <View style={{alignSelf:"flex-start"}}>
                            <View style={{flexDirection:"row", alignItems:"center", paddingHorizontal:15, paddingVertical:10}}>
                                <Image style={styles.icons} source={require('../assets/calender.png')}></Image>
                                <Text style={{color:"white", fontSize:18, fontWeight:600, marginLeft:5}}>Daily forecast</Text>
                            </View>
                            <ScrollView horizontal>
                                <View style={{flexDirection:"row"}}>
                                    <View style={styles.dailyBox}>
                                        <Image style={{width:50, height:50}} source={require('../assets/partlycloudy.png')}></Image>
                                        <Text style={{color:"white", alignSelf:"center"}}>Friday</Text>
                                        <Text style={{color:"white", alignSelf:"center", fontSize:17, fontWeight:600}}>29.8{'\u00B0'}</Text>
                                    </View>
                                    <View style={styles.dailyBox}>                                
                                        <Image style={{width:50, height:50}} source={require('../assets/partlycloudy.png')}></Image>
                                        <Text style={{color:"white"}}>Friday</Text>
                                        <Text style={{color:"white", fontSize:17, fontWeight:600}}>29.8{'\u00B0'}</Text>
                                    </View>
                                    <View style={styles.dailyBox}>                                
                                        <Image style={{width:50, height:50}} source={require('../assets/partlycloudy.png')}></Image>
                                        <Text style={{color:"white" }}>Friday</Text>
                                        <Text style={{color:"white", fontSize:17, fontWeight:600}}>29.8{'\u00B0'}</Text>
                                    </View>
                                    <View style={styles.dailyBox}>                                
                                        <Image style={{width:50, height:50}} source={require('../assets/partlycloudy.png')}></Image>
                                        <Text style={{color:"white"}}>Friday</Text>
                                        <Text style={{color:"white", fontSize:17, fontWeight:600}}>29.8{'\u00B0'}</Text>
                                    </View>
                                    <View style={styles.dailyBox}>                                
                                        <Image style={{width:50, height:50}} source={require('../assets/partlycloudy.png')}></Image>
                                        <Text style={{color:"white"}}>Friday</Text>
                                        <Text style={{color:"white", fontSize:17, fontWeight:600}}>29.8{'\u00B0'}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                    </View>
                    <StatusBar style="inverted" />
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    icons: {
        width:25,
        height:25,
        marginRight:7
    },
    dailyBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        alignSelf:"flex-start", 
        borderRadius:15, 
        paddingVertical:12, 
        paddingHorizontal:20, 
        marginHorizontal:10
    }
});
