import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from './Button';
const DateTimePicker = ({buttonColor, bookingOption, onConfirmDate}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerConfirmed, setDatePickerConfirmed] = useState(false);

  const showDatePicker = () => {
    if (buttonColor == 1) {
      setDatePickerVisibility(true);
    } else setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setDatePickerConfirmed(true);
    onConfirmDate(date, bookingOption);
  };

  const buttonColors = buttonColor == 1 ? 'primary' : 'default';
  return (
    <View>
      <Button
        shadowless
        onPress={showDatePicker}
        style={{
          width: 80,
          height: 44,
          elevation: 0,
          shadowRadius: 0,
          shadowOpacity: 0,
        }}
        textStyle={{fontSize: 14}}
        color={buttonColors}>
        {bookingOption}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        is24Hour={true}
        minuteInterval={15}
      />
    </View>
  );
};

export default DateTimePicker;
