import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'

import { DatabaseConnection } from '../src/Database/Database'

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  const [flatlistItems, setFlatListItems] =useState([])

  useEffect(()=>{
    db.transaction(function(tx){
      tx.executeSql(
        'SELECT * from table_user',
        [],
        (tx, results)=>{
          var temp = [];
          for(let i=0;i<results.rows.length;i++){
            temp.push(results.rows.item(i))
          }
          setFlatListItems(temp)
        }
      )
    })
  }, [])


  const listViewItems = (item) =>{
    return(
      <ScrollView>
      <View style={{
        borderWidth:2,
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:15,
        backgroundColor:'lightgreen',
        padding:10
      }}>
        <Text style={{
          fontSize:25
        }}>User id is:{item.user_id}</Text>
        <Text>User Name:{item.user_name}</Text>
        <Text>User Address:{item.user_address}</Text>
      </View>
      </ScrollView>
    )
  }

  return (
    <View>
      <FlatList
      data={flatlistItems} 
      keyExtractor={(item, index)=>index.toString()}
      renderItem={({item})=>listViewItems(item)}/>
    </View>
  )
}

export default ViewUser

const styles = StyleSheet.create({})