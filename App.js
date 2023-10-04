import {useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Modal,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './components/Form';
import Pieza from './components/Pieza';

const App = () =>{
  const [cambios, setCambios] = useState([]);
  const [cambioSeleccionado, setCambioSelecciondo] = useState({
    pieza:'', marca:'', serie:'', precio:'', fecha:''
  });
  const [mostrarForm, guardarMostrarForm]= useState(false);
  const [modalDetallePieza, setModalDetallePieza] = useState(false);

  useEffect(() => {
    const obtenercambiosStorage = async () => {
      try{
        const cambiosStorage = await AsyncStorage.getItem('cambios');
        if(cambiosStorage){
          setCambios(JSON.parse(cambiosStorage));
        }
      }catch(error){
        console.log(error);
      }
    }
    obtenercambiosStorage();
  },[]);

  const eliminarPieza = id => {
    const cambiosFiltrados = cambios.filter(reserva => reserva.id !== id);
    setCambios(cambiosFiltrados);
    guardarCambiosStorage(JSON.stringify(cambiosFiltrados));
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  const guardarCambiosStorage = async (citasJSON) => {
    try{
      await AsyncStorage.setItem('cambios',citasJSON);
    }catch(error){
      console.log(error);
    }
  }

  return(
    <>
    <Modal transparent={true} animationType='slide' visible={modalDetallePieza}           onRequestClose={() => {
          alert('Modal has been closed');
        }}>
          <View style={styles.estiloModal}>
            <View style={styles.modal}>
              <Text style={styles.Title2}>Detalle de pieza</Text>
              <Text>Nombre de pieza: {cambioSeleccionado.pieza}</Text>
              <Text>Marca: {cambioSeleccionado.marca}</Text>
              <Text>Serie: {cambioSeleccionado.serie}</Text>
              <Text>Precio: ${cambioSeleccionado.precio}</Text>
              <Text>Fecha de cambio: {cambioSeleccionado.fecha}</Text>
              <Button style={{marginVertical:10}} title='Cerrar' onPress={() => {setModalDetallePieza(!modalDetallePieza)}} />
            </View>
          </View>
      </Modal>

    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View>
        <Text style={styles.Title}>Administrador Piezas</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              {mostrarForm ? 'Cancelar Cambio Pieza':'Crear Cambio Pieza'}
            </Text>
          </TouchableHighlight>
        </View>

        <View>
          {mostrarForm ? (
            <>
              <Text style={styles.Title2}>Nuevo Cambio de Pieza</Text>
              <Form
                cambios={cambios}
                setCambios={setCambios}
                guardarMostrarForm={guardarMostrarForm}
                guardarCambiosStorage={guardarCambiosStorage}
              />
            </>
          ):(
            <>
              <Text style={styles.Title2}>
                {cambios.length > 0 ? 'Tus cambios de piezas': 'No hay piezas, agregue una'}
              </Text>
              <FlatList
                data={cambios}
                renderItem={({item}) =><Pieza item={item} eliminarPieza={eliminarPieza} setCambioSelecciondo={setCambioSelecciondo} cambioSeleccionado={cambioSeleccionado} modalDetallePieza={modalDetallePieza} setModalDetallePieza={setModalDetallePieza} />}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>

    </>
  );

};

const styles = StyleSheet.create({
  Title:{
    fontSize: 22,
    margin: 'auto',
    paddingTop:50,
    paddingLeft:70,
    paddingRight:70,
    fontFamily:"Arial",
    fontWeight: 'bold'
  },
  Title2:{
    fontSize: 15,
    margin: 'auto',
    fontFamily:"Arial",
    fontWeight: 'bold',
    paddingHorizontal: 25
  },
  buttonContainer:{
    elevation: 8,
    backgroundColor:'#77C5F6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:"85%",
    marginHorizontal:25,
    marginVertical: 12
  },
  buttonText:{
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  estiloModal:{
    backgroundColor:'#000000aa',
    flex:1
  },
  modal:{
    backgroundColor:'#fff',
    margin:50,
    padding:40,
    borderRadius:10,
    flex:1
  }
});

export default App;