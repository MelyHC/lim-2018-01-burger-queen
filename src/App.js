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
firebase.firestore().settings(settings);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: {
        breakfast: [
          {
            price: 5,
            item: 'Cafe americano'
          },
          {
            price: 7,
            item: 'Cafe con leche'
          },
          {
            price: 10,
            item: 'Sandwich de jamón y queso'
          },
          {
            price: 7,
            item: 'Jugo natural'
          }
        ],
        diner: [
          {
            price: 10,
            item: 'Hamburguesa simple'
          },
          {
            price: 15,
            item: 'Hamburguesa doble'
          },
          {
            price: 5,
            item: 'Papas fritas'
          },
          {
            price: 5,
            item: 'Aros de cebolla'
          },
          {
            price: 5,
            item: 'Agua 500ml'
          },
          {
            price: 8,
            item: 'Agua 750ml'
          },
          {
            price: 7,
            item: 'Gaseosa 500ml'
          },
          {
            price: 10,
            item: 'Gaseosa 750ml'
          }
        ]
      },
      typefood: 'breakfast',
      order: {
        user: '',
        totalPrice: 0,
        items: []
      }
    }
  }

  componentDidMount() {
    // db.collection('food').get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data())

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
    e.target.name === 'breakfast' ?
      this.setState({
        typefood: 'breakfast'
      }) :
      this.setState({
        typefood: 'diner'
      })
  }

  handleAddItem = (name, price) => {
    const { order } = this.state;
    order.items.push({
      item: name,
      price
    })
    let sum = 0
    order.items.forEach(({ price }) => sum += price);
    order.totalPrice = sum;
    this.setState({
      order
    })
  }

  render() {
    const { typefood, food, order } = this.state;
    return (
      <div>
        <header className="App-header">
          <h3 className="text-center">Burger Queen</h3>

        </header>
        <button className="btn btn-info m-1" name="breakfast" onClick={this.handleChange}>Desayuno</button>
        <button className="btn btn-info m-1" name="diner" onClick={this.handleChange}>Resto del dia</button>
        <div className="row">
          <div className="col-7">
            {
              typefood === 'breakfast' ?
                food.breakfast.map(({ item, price }) => <ItemFood name={item} price={price} key={item} add={this.handleAddItem} />) :
                food.diner.map(({ item, price }) => <ItemFood name={item} price={price} key={item} add={this.handleAddItem} />)
            }
          </div>
          <div className="col-5">
            <div className="card">
              {order.items.map(({ item, price }) => <AddItem name={item} price={price} key={item} />)}
              <div className="card-footer">Total: s/. {order.totalPrice}.00</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
