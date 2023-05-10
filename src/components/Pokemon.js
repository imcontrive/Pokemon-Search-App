import React, { Component } from "react";
import Loading from "./Loading";
import Display from "./Display";

class Pokemon extends Component {
  constructor() {
    super();
    this.state = {
      pokemonData: [],
      loading: false,
      query: "",
    };
  }
  // handleSearch function for search bar
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };
  //  fetching data from APIS
  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500`)
      .then((res) => res.json())
      .then(({ results }) => {
        const data = results.map((poke, i) => ({
          name: poke.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            i + 1
          }.png`,
        }));
        return this.setState({ pokemonData: data, loading: false });
      });
  };

  render() {
    const { loading, pokemonData, query } = this.state;
    let dispayArr = [];
    if (query) {
      const regexp = new RegExp(query, "i");
      dispayArr = pokemonData.filter((poke) => regexp.test(poke.name));
    } else {
      dispayArr = pokemonData;
    }

    return (
      <div className="parent-wrapper">
        <div class="search-container">
          <input
            class="search-bar"
            type="text"
            placeholder="Search Pokemon by name"
            onChange={this.handleChange}
          />
          <i class="fa fa-search"></i>
        </div>
        <div className="pokemon-card">
          {
            query && dispayArr.length ===0 ? <h1>No Pokemon founds</h1>: null
          }
          {loading ? (
            <Loading />
          ) : (
            dispayArr.map((pName, img) => (
              <Display key={pName.name} {...pName} {...img} />
            ))
          )}
        </div>
      </div>
    );
  }
}
export default Pokemon;
