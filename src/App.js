import React, { Component } from 'react';
import firebase from 'firebase'
import ItemFood from './components/ItemFood';
import AddItem from './components/AddItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyDwB3qJRB-XpVaJIqAysxlPjL0bNpsKgd4",
  authDomain: "burger-queen-45463.firebaseapp.com",
  projectId: "burger-queen-45463"
})

const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: {},
      typefood: 'breakfast',
      newOrder: {
        user: '',
        totalPrice: 0,
        items: []
      },
      orders: []
    }
  }

  componentDidMount() {
    // db.collection('food').get().then(snap => {
    //   snap.forEach((doc) => {
    //     this.setState({
    //       food: doc.data()
    //     })
    //   });
    // });
  }

  handleClick = () => {
    db.collection("clients").add({

    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  handleChange = (e) => {
    this.setState({
      typefood: e.target.name
    })
  }

  sumTotalOrder = (newOrder) => {
    let sum = 0;
    newOrder.items.forEach(({ price }) => sum += price);
    newOrder.totalPrice = sum;

    this.setState({ newOrder })
  }

  addCount = (priceI, idActual) => {
    const { newOrder } = this.state;
    newOrder.items.forEach(item => {
      if (item.id === idActual) {
        item.price = priceI / item.count;
        item.count++;
        item.price = item.price * item.count;
      }
    })
  }

  handleAddItem = (name, priceI, idActual) => {
    const { newOrder } = this.state;

    if (newOrder.items.find(({ id }) => id === idActual)) {

    } else {
      newOrder.items.push({
        item: name,
        price: priceI,
        id: idActual,
        count: 1
      });

    }
    this.sumTotalOrder(newOrder);
  }

  handleRemove = (id) => {
    const { newOrder } = this.state;
    newOrder.items.splice(id, 1);
    this.sumTotalOrder(newOrder)
  }

  handleClient = () => {

  }

  render() {
    const { typefood, food, newOrder } = this.state;
    const size = Object.keys(food);
    return (
      <div>
        <header className="App-header bg-primary text-white">
          <h3 className="">Burger Queen</h3>
        </header>
        <button className="btn btn-info m-2" name="breakfast" onClick={this.handleChange}>Desayuno</button>
        <button className="btn btn-info m-2" name="diner" onClick={this.handleChange}>Resto del día</button>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                {
                  size.length ?
                    food[typefood].map(({ item, price }) =>
                      <ItemFood name={item} price={price} key={item}
                        add={this.handleAddItem} />
                    )
                    : <span className="ml-3">Cargando menú ...</span>
                }
              </div>
            </div>
            <div className="col-md-5">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Item</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {newOrder.items.map(({ item, price, count }, i) =>
                    <AddItem name={item} price={price} key={i} i={i} count={count}
                      add={this.addCount} remove={this.handleRemove} />
                  )}
                  <tr className="text-center table-active">
                    <th>Total</th>
                    <th className="text-center" >s/. {newOrder.totalPrice}</th>
                    <td colspan="2"></td>
                    {/* <td></td> */}
                  </tr>
                  <tr>
                    <td colspan="2"><input className="form-control" type="text" placeholder="Cliente" /></td>
                    <td colspan="2"><button className="btn btn-success">Enviar a cocina</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
