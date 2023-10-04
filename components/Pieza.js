import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

const Pieza = ({item, eliminarPieza,cambioSeleccionado, setCambioSelecciondo,
modalDetallePieza, setModalDetallePieza}) => {
  const dialogoEliminar = id => {
    console.log('eliminando...',id);
    eliminarPieza(id);
  }

  const accionMostrarModal = valor => {
    setModalDetallePieza(valor)
    setCambioSelecciondo(item)
  }

  return(
    <View>
    
      <View>
      <TouchableHighlight onPress={() => accionMostrarModal(true)}>
        <Text style={styles.Title}>Nombre: {item.pieza}</Text>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.Title}>Cantidad personas: {item.fecha}</Text>
      </View>
      
      <View>
        <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  Title:{
    fontSize: 17,
    margin: 'auto',
    fontFamily:"Arial",
    paddingHorizontal: 25
  },
  buttonContainer:{
    elevation: 8,
    backgroundColor:'#D72C20',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:"25%",
    marginHorizontal:25,
    marginVertical:5
  },
  buttonText:{
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default Pieza;