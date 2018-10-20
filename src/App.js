import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'
import ItemFood from './components/ItemFood';
import AddItem from './components/AddItem'

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
      order: {
        user: '',
        totalPrice: 0,
        items: []
      }
    }
  }

  componentDidMount() {
    db.collection('food').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        this.setState({
          food: doc.data()
        })
      });
    });
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
    e.target.name === 'breakfast' ?
      this.setState({
        typefood: 'breakfast'
      }) :
      this.setState({
        typefood: 'diner'
      })
  }

  handleAddItem = (name, priceI, idActual) => {
    const { order } = this.state;
    let sum = 0;

    if (order.items.find(({ id }) => id === idActual)) {
      order.items.forEach(item => {
        if (item.id === idActual) {
          item.count++
        }
      })
    } else {
      order.items.push({
        item: name,
        price: priceI,
        id: idActual,
        count: 1
      });

    }
    order.items.forEach(({ price, count }) => sum += price * count);
    order.totalPrice = sum;

    this.setState({
      order
    })
  }

  render() {
    const { typefood, food, order } = this.state;
    const size = Object.keys(food);
    return (
      <div>
        <header className="App-header bg-primary text-white">
          <h3 className="">Burger Queen</h3>
        </header>
        <button className="btn btn-info m-1" name="breakfast" onClick={this.handleChange}>Desayuno</button>
        <button className="btn btn-info m-1" name="diner" onClick={this.handleChange}>Resto del dia</button>
        <div className="row">
          <div className="col-7">
            {
              size.length ?
                typefood === 'breakfast' ?
                  food.breakfast.map(({ item, price }) => <ItemFood name={item} price={price} key={item} add={this.handleAddItem} />) :
                  food.diner.map(({ item, price }) => <ItemFood name={item} price={price} key={item} add={this.handleAddItem} />)
                : <span className="d-center">Cargando menu ...</span>
            }
          </div>
          <div className="col-5">
            <div className="card">
              {order.items.map(({ item, price, count }, i) => <AddItem name={item} price={price} key={i} count={count} />)}
              <div className="card-footer">Total: s/. {order.totalPrice}.00</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
