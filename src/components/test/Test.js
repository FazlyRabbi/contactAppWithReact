import React, { Component, useState, useEffect, useReducer } from 'react';
class CounterClass extends Component {
  state = {
    count: 0,
    counting: true
  };
  componentDidMount() {
    //side effect
    document.title = `You clicked ${this.state.count} times`;
    console.log('calling First time');
  }
  componentDidUpdate() {
    console.log('calling during every updates');
    document.title = `You clicked ${this.state.count} times`;
  }
  handleIncrement = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  };
  handleDecrement = () => {
    this.setState(prevState => {
      return {
        count: prevState.count - 1
      };
    });
  };
  handleDisableCounting = () => {
    this.setState(prevState => {
      return {
        counting: !prevState.counting
      };
    });
  };
  render() {
    const { count, counting } = this.state;
    return (
      <div className='container'>
        <p>
          {count} {counting ? 'Counting..' : 'Not counting...'}
        </p>
        <button disabled={!counting} onClick={this.handleIncrement}>
          Increment
        </button>
        <button disabled={!counting} onClick={this.handleDecrement}>
          Decrement
        </button>
        <button onClick={this.handleDisableCounting}>Disable counting</button>
      </div>
    );
  }
}

const CounterFunc = () => {
  // state = {
  //   count: 0,
  //   counting: true
  // };

  const [count, setCount] = useState(0);
  const [counting, setCounting] = useState(true);
  useEffect(() => {
    console.log('calling');
    document.title = `You clicked ${count} times`;
  }, [count]);
  return (
    <div className='container'>
      <p>
        {count} {counting ? 'Counting..' : 'Not counting...'}
      </p>
      <button disabled={!counting} onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button disabled={!counting} onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCounting(!counting)}>Disable counting</button>
    </div>
  );
};
export default CounterFunc;
