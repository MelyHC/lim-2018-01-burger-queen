import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'
import ItemFood from './components/ItemFood';

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
        price: 0,
        items: {}
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

  render() {
    const { typefood, food } = this.state;
    return (
      <div>
        <header className="App-header">
          <h3 className="text-center">Burger Queen</h3>

        </header>
        {/* <form className="form-inline my-2" >
            <input type="text" />
          </form> */}
        {/* <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">Active</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
        </ul> */}
        <button className="btn btn-info m-1" name="breakfast" onClick={this.handleChange}>Desayuno</button>
        <button className="btn btn-info m-1" name="diner" onClick={this.handleChange}>Resto del dia</button>
        <div className="row">
          <div className="col-7">
            {
              typefood === 'breakfast' ?
                food.breakfast.map(({ item, price }) => <ItemFood name={item} price={price} key={item} />) :
                food.diner.map(({ item, price }) => <ItemFood name={item} price={price} key={item} />)
            }
          </div>
          <div className="col-5">
            <div className="card">
              {}
              <div className="card-footer">Total: s/.{}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
