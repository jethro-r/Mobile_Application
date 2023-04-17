import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'

const Person = [
    {
        id:'1',
        name:'Pinal'
    },
    {
        id:'2',
        name:'Johny'
    },
    {
        id:'3',
        name:'Shagun'
    },
    {
        id:'4',
        name:'Pinal'
    },
    {
        id:'5',
        name:'Johny'
    },
    {
        id:'6',
        name:'Shagun'
    },
    {
        id:'7',
        name:'Pinal'
    },
    {
        id:'8',
        name:'Johny'
    },
    {
        id:'9',
        name:'Shagun'
    }
]

const FunList = () => {
  return (
      <ScrollView>
    <View>
      <Text style={{
        fontFamily:'monospace',
        fontSize:30,
        fontWeight:'900',
        textAlign:'center',
        textDecorationLine:'underline'
      }}>List of Persons!</Text>

      {/* //1. One way of displaying list on the screen!
      <FlatList 
      data={Person}
      renderItem={({item})=><Text>{item.name}</Text>}
      keyExtractor={(item)=>item.id}/> */}


      {
        Person.map((persons)=>{
            return(
              
                <View style={{
                    marginVertical:35,
                    borderWidth:3,
                    borderRadius:25,
                    paddingLeft:15,
                    backgroundColor:'lightgreen'
                }}>
                    <Text>{persons.name}</Text>
                </View>
               
            )
        })
      }
    </View>
     </ScrollView>
  )
}

export default FunList

const styles = StyleSheet.create({})