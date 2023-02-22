import { Div } from "@local_modules/tags";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
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
  const [date, setDate] = useState(new Date());
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
    <View>
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
  return <Div style={{ backgroundColor: 'white', alignItems: 'center' }}>
  <LinearGradient
    // Background Linear Gradient
    start={{ x: 0.5, y: 0 }} end={{ x: 1, y: 1 }}
    colors={['#4c669f', '#6a3119']}
    style={{ width: 400, height: 200 }}
  />
  {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 200, height: 200 }} colors={['#711BD9', '#FF7171']}></LinearGradient> */}
</Div>;
}