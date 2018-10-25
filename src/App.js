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
    db.collection('food').get().then(snap => {
      snap.forEach((doc) => {
        this.setState({
          food: doc.data()
        })
      });
    });
  }

  handleClick = () => {
    const { user, items, totalPrice } = this.state.newOrder;
    db.collection("orders").add({
      user, items, totalPrice
    })
      .then(docRef => {
        this.setState({
          newOrder: {
            user: '',
            totalPrice: 0,
            items: []
          }
        })
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
        if (item.price === priceI) {
          priceI = priceI / item.count;
        }
        item.count++;
        item.price = priceI * item.count;
      }
    })
    this.sumTotalOrder(newOrder);
  }

  reduceCount = (priceI, idActual, i) => {
    const { newOrder } = this.state;

    newOrder.items.forEach(item => {
      if (item.id === idActual) {
        item.price = priceI / item.count;
        item.count--;
        item.price = item.price * item.count;
        if (item.count === 0) {
          this.handleRemove(i);
        }
      }
    })
    this.sumTotalOrder(newOrder);

  }

  handleAddItem = (name, priceI, idActual) => {
    const { newOrder } = this.state;

    if (newOrder.items.find(({ id }) => id === idActual)) {
      this.addCount(priceI, idActual);
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

  handleRemove = (index) => {
    const { newOrder } = this.state;
    newOrder.items.splice(index, 1);
    this.sumTotalOrder(newOrder)
  }

  handleClient = (e) => {
    this.setState({
      newOrder: {
        ...this.state.newOrder,
        user: e.target.value
      }
    })

  }

  render() {
    const { typefood, food, newOrder } = this.state;
    const size = Object.keys(food);
    return (
      <div>
        <header className="App-header bg-primary text-white">
          <h3 className="">Burger Queen</h3>
        </header>
        <button className="btn btn-primary m-2" name="breakfast" onClick={this.handleChange}>Desayuno</button>
        <button className="btn btn-primary m-2" name="diner" onClick={this.handleChange}>Almuerzo/Cena</button>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                {
                  size.length ?
                    food[typefood].map(({ item, price }) =>
                      <ItemFood name={item} price={price} key={item}
                        add={this.handleAddItem} />)
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
                      add={this.addCount} remove={this.handleRemove} reduce={this.reduceCount} />
                  )}
                  <tr className="text-center table-active">
                    <th>Total</th>
                    <th className="text-center" >s/. {newOrder.totalPrice}</th>
                    <td colSpan="2"></td>
                  </tr>
                  <tr>
                    <td colSpan="2"><input className="form-control" type="text" placeholder="Cliente" onChange={this.handleClient} value={newOrder.user} /></td>
                    <td colSpan="2"><button className="btn btn-success" onClick={this.handleClick}>Enviar a cocina</button></td>
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
