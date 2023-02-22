import DateTimePicker from "@react-native-community/datetimepicker";
import { useRef, useState } from "react";
import { View, Button, Text, Platform } from "react-native";

export const Calendar = () => {
  return (
    Platform.OS === 'android' ?
      <CalendarAndroid/>
    :
      <CalendarIOS/>
  )
};

const CalendarAndroid = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const onChange = (event:any, selectedDate?:Date) => {
    if(selectedDate) {
      console.log(selectedDate.getFullYear());
      console.log(selectedDate.getMonth());
      console.log(selectedDate.getDate());
      console.log(selectedDate.getHours());
      console.log(selectedDate.getMinutes());
      console.log(selectedDate.getSeconds());
      const currentDate = selectedDate;
      setDate(currentDate);
      setShow(false);
    }

  };

  const showMode = (currentMode:any) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    else {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          // testID="dateTimePicker"
          style={{ width: 100, height: 100 }}
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const CalendarIOS = () => {
  return null;
}