import {useState} from "react";
import {Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'react-id-generator';

const Form = ({cambios, setCambios, guardarMostrarForm, guardarCambiosStorage}) => {
  const [pieza,guardarPieza] = useState('');
  const [marca,guardarMarca] = useState('');
  const [serie,guardarSerie] = useState('');
  const [precio,guardarPrecio] = useState('');
  const [fecha,guardarFecha] = useState('');
  const [isDatePickerVisible,setDatePickerVisibility] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {year:'numeric', month:'long', day:"2-digit"};
    guardarFecha(date.toLocaleDateString('es-SV',opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const crearNuevoCambio = () => {
    if(pieza.trim() === '' || marca.trim() === '' || serie.trim() === '' || fecha.trim() === '' || precio.trim() === ''){
      mostrarAlerta();
      return;
    }

    const cambioPieza = {pieza, marca, serie, precio, fecha};
    cambioPieza.id = shortid();

    const nuevoCambioPieza = [...cambios, cambioPieza];
    setCambios(nuevoCambioPieza);

    guardarCambiosStorage(JSON.stringify(nuevoCambioPieza));

    guardarMostrarForm(false);

    guardarPieza('');
    guardarMarca('');
    guardarSerie('');
    guardarPrecio('');
    guardarFecha('');
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Todos los campos son obligatorios',
      [{
        text:'OK'
      }]
    )
  }

return(
    <>
      <ScrollView>
        <View>
          <Text style={styles.Title}>Pieza:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPieza(texto)}/>
        </View>

        <View>
          <Text style={styles.Title}>Marca:</Text>
          <TextInput
              style={styles.input}
              onChangeText={texto => guardarMarca(texto)}/>
        </View>

        <View>
          <Text style={styles.Title}>Número de Serie:</Text>
          <TextInput
              style={styles.input}
              onChangeText={texto => guardarSerie(texto)}/>
        </View>

        <View>
          <Text style={styles.Title}>Precio:</Text>
          <TextInput
              style={styles.input}
              onChangeText={texto => guardarPrecio(texto)}
              keyboardType='numeric'/>
        </View>

        <View>
          <Text style={styles.Title}>Fecha: {fecha}</Text>
          <Button title="Seleccionar Fecha"
                  onPress={showDatePicker} 
                  style={styles.buttonContainer}
          />
          <DateTimePickerModal 
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            local='es_SV'
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
        </View>

        <View>
          <TouchableHighlight 
            style={styles.buttonContainer}
            onPress={() => crearNuevoCambio()}>
            <Text style={styles.buttonText}>Guardar Pieza</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    </>
  );


};

const styles = StyleSheet.create({
  input:{
    borderColor: "gray",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft:15,
    marginRight:15,
    marginVertical:12
  },
  buttonContainer:{
    elevation: 8,
    backgroundColor:'#898EEB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:"85%",
    marginHorizontal:25,
    marginVertical:20
  },
  buttonText:{
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  Title:{
    fontSize: 15,
    margin: 'auto',
    fontFamily:"Arial",
    paddingHorizontal: 25
  }
});

export default Form;