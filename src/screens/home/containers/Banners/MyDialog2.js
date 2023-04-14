import React, { useState } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, ActivityIndicator,Pressable ,TouchableOpacity,Image} from 'react-native';
import axios from 'axios';
import {Row,Col} from 'src/containers/Gird';
import Input from 'src/containers/input/Input';

const MyDialog2 = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonPress = () => {
    setIsDialogVisible(true);
  }

  const handleTextChange = (text) => {
    setInputValue(text);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://your-api-endpoint.com', { input: inputValue });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsDialogVisible(false);
    
  }
  const toggleModal = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  return (
    
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.dialogButton}
          onPress={handleButtonPress} 
          ><Image source={{uri: 'https://hardware.marvytech.co.in/wp-content/uploads/2022/12/booking-2.png'}}
        style={{width: 36, height: 36,center:true}} />
           <Text> Book A Service </Text>
        </TouchableOpacity>
      <Modal visible={isDialogVisible} 
          animationType="slide"
          transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{textAlign:'center'}}>Book A Service</Text>
          <Input
                    label="Username"
                    value={inputValue}
                    onChangeText={handleTextChange}
                    keyboardType="email-address"
                  />
                  <Input
                    label="Mobile Number"
                    value={inputValue}
                    onChangeText={handleTextChange}
                    keyboardType="email-address"
                  />
                  <Input
                    label="Email Id"
                    value={inputValue}
                    onChangeText={handleTextChange}
                    keyboardType="email-address"
                  />
                  <Input
                    label="Address"
                    value={inputValue}
                    onChangeText={handleTextChange}
                    keyboardType="email-address"
                  />
                  <Input
                    label="Description"
                    value={inputValue}
                    onChangeText={handleTextChange}
                    keyboardType="email-address"
                  />

          <Row style={{alignSelf: 'flex-end'}}>
          <Button title="Close" style={[styles.button, styles.buttonClose]}
            onPress={toggleModal} />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit"  style={[styles.button, styles.buttonClose]} onPress={handleSubmit} />
           
          )}
          </Row>
          
          
          </View>
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dialogButton: {
    padding: 10,
    borderRadius:40,
    margin:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2r196F3',
    marginLeft:20,
    marginRight:20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MyDialog2;