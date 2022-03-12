import React, { useState } from 'react';
import { View, Modal, Dimensions, StyleSheet, Text, Alert } from 'react-native';
import { PayFastWebView } from 'react-native-payfast-gateway';
import Button from './Button';
import { nowTheme } from '../constants';
const { width, height } = Dimensions.get('screen');

const Payfast = ({ setSuccess }) => {
  //const [success, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(false);

  let onceOffPayment = {
    merchant_id: '10000100',
    merchant_key: '46f0cd694581a',
    amount: '60.00',
    item_name: 'React Native Purchase',
  };

  function handleOnceOffPayment() {
    setPaymentData(onceOffPayment);
    setModalVisible(true);
    //paymentModal(false);
  }

  const handlePaymentCallback = (status) => {
    setSuccess(status);
    setPaymentStatus(status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>{paymentStatus ? 'Payment Complete' : 'Make Payment'}</Text>
      {paymentStatus ? null : (
        <Button color="info" onPress={() => handleOnceOffPayment()}>
          <Text style={styles.textStyle}>Proceed</Text>
        </Button>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <PayFastWebView
          sandbox={true}
          onClick={() => setModalVisible(false)}
          callback={handlePaymentCallback}
          signature={true}
          data={paymentData}
          title="Pay Now"
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 20,
  },
  btnWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 10,
  },
  createButton: {
    width: width * 0.5,
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

export default Payfast;
