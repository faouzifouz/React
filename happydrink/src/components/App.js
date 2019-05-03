// Fichier : ./src/components/App.js
import React, { Component } from 'react';
import logo                 from '../assets/logo.svg';
import '../css/App.css';
import { establishments }     from './establishments/fixtures';
import Establishment           from'./establishments/establishments'


// Le paramètre title est ajouté aux props que nous fournit la classe Component
class App extends Component {
    constructor(props) {
        // Ne pas oublier d'appeler le constructeur père ! (Obligatoire)
        super(props);
        // On définit le state de notre component que l'on hérite de la classe "Component"
        // Cela remplace la fonction "getInitialState"
        this.state = {
            pseudo  : "Inconnu",
            //Ici se trouve la valeur de l'input
            searchStringerUser:"",
        }
    }
    //Fonction qui récupère l'event de l'input et récupère sa valeur pour la mettre dans le state
    handleChange(e){
        this.setState({searchStringerUser: e.target.value});

    }
     // On définit la fonction appelée lors d'un clic sur le lien "Changer le pseudo !"
    // la syntaxe  " nomFonction = () => {} " nous permet de conserver le contexte `this` du scope courant. (Ici, la classe App)
    randomPseudo = () => {
        // On s'amuse un peu ;)
        let randomPseudo    = ""
        const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        const size          = Math.floor(Math.random() * 10) + 5
        for( let i=0; i < size; i++ ){
            randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        // On met à jour le state via la fonction "setState" héritée de la classe Component
        this.setState({
            pseudo : randomPseudo
        })
    }

    

render() {

    const establishmentFilter = establishments.filter((searchText)=>{
    let search = searchText.name + " " + searchText.description;
    return search.toLowerCase().match(this.state.searchStringerUser);

    })
  const listEstablishment = establishmentFilter.map( (establishment) => {
      return (

          // L'attribut "key" permet à React d'identifier les éléments.
          // Cela améliore les performances lors de l'ajout,
          // la modification et la suppression d'un élément.
          <Establishment
              key = { establishment.id }
          establishment={establishment}
          />
      )
  })

  return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome"{ this.state.pseudo }" to { this.props.title }</h2>
          </header>
          <div className="App-intro">
            <p><a onClick={ this.randomPseudo}>Changer le pseudo !</a></p>
            <div>
                <input
                    // l'input contient deux attribut spéciaux :
                        // - value (vous avez compris ce que ça vaut maintenant)
                        // - onChange ( fonction qui va être lancée à chaque changement de l'input. Cette fonction en appel un autre qui recupère donc la value et la modifie dans le state)
                   type="text"
                   placeholder="search"
                   value={this.state.searchStringerUser}    
                   onChange={this.handleChange.bind(this)}
                   /> 
            </div>
            <section>
              { listEstablishment }
            </section>
          </div>

      </div>
  );
}
}
export default App
