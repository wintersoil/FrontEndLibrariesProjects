var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js');
document.head.appendChild(jQueryScript);

class NumberButton extends React.Component
{
  constructor(props)
  {
    super(props);
    this.sendData = this.sendData.bind(this);
  }

  sendData(){
    this.props.functioning(this.props.number);
  }
  
  render()
  {
    return(
      <div id={this.props.id} className="numberButt" onClick={this.sendData}>
        {this.props.number}
      </div>
    );
  }
}

class Board extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {result : 0, number1: 0, operation: "", number2: 0, position: 0, power: 0, reachedResult : false, enteredNumber1 : false, enteredNumber2: false, outputString: "", outputDisplay:0, decimalString: 0,   hasDecimalNumber1: false, hasDecimalNumber2: false, decimalPosition: 1};
    this.update = this.update.bind(this);
  }
  
    update(val)
  {
    if((val == "+" || val == "-" || val == "*" || val == "/") && this.state.enteredNumber2 == false && this.state.operation != "")
      {
        this.setState({operation: val, outputDisplay: val});
      }
    else if(this.state.enteredNumber1 == true && val == "." && this.state.hasDecimalNumber1 == true)
      {}
    else if(this.state.enteredNumber2 == true && val == "." && this.state.hasDecimalNumber2 == true)
            {
            }
    else if(this.state.enteredNumber1 == true && val == "." && this.state.hasDecimalNumber1 == false)
       {
        console.log("Heera");
        this.setState({decimalString: parseFloat(this.state.number1 + "." + 0), hasDecimalNumber1: true }, () => this.setState({number1: this.state.decimalString}, () => console.log(this.state)));
       }
    else if(this.state.enteredNumber2 == true && val == "." && this.state.hasDecimalNumber2 == false)
      {
        console.log("Heera");
        this.setState({decimalString: parseFloat(this.state.number2 + "." + 0), hasDecimalNumber2: true }, () => this.setState({number2: this.state.decimalString}, () => console.log(this.state)));
      }
    else if(this.state.enteredNumber2 == true && (val == "+" || val == "-" || val == "*" || val == "/"))
      {
        if(this.state.operation == "+")
          {
            this.setState({ number1: this.state.number1 + this.state.number2}, ()=> this.setState({number2: 0, result: this.state.number1, operation: val, position: 2, power: 0, enteredNumber1: false, enteredNumber2: false, outputString: this.state.number1 + " " + val, outputDisplay: val, decimalPosition: 1, hasDecimalNumber1: false, hasDecimalNumber2: false}));
          }
                if(this.state.operation == "-")
          {
            this.setState({ number1: this.state.number1 - this.state.number2}, ()=> this.setState({number2: 0, result: this.state.number1, operation: val, position: 2, power: 0, enteredNumber1: false, enteredNumber2: false, outputString: this.state.number1 + " " + val, outputDisplay: val, decimalPosition: 1, hasDecimalNumber1: false, hasDecimalNumber2: false}));
          }
        if(this.state.operation == "/")
          {
            this.setState({ number1: this.state.number1 / this.state.number2}, ()=> this.setState({number2: 0, result: this.state.number1, operation: val, position: 2, power: 0, enteredNumber1: false, enteredNumber2: false, outputString: this.state.number1 + " " + val, outputDisplay: val, decimalPosition: 1, hasDecimalNumber1: false, hasDecimalNumber2: false}));
          }
        if(this.state.operation == "*")
          {
            this.setState({ number1: this.state.number1 * this.state.number2}, ()=> this.setState({number2: 0, result: this.state.number1, operation: val, position: 2, power: 0, enteredNumber1: false, enteredNumber2: false, outputString: this.state.number1 + " " + val, outputDisplay: val, decimalPosition: 1, hasDecimalNumber1: false, hasDecimalNumber2: false}));
          }

      }
    else if(this.state.reachedResult == true && (this.state.position == 0 || this.state.position == 2) && this.state.enteredNumber1 == false && (val == "+" || val == "-" || val == "*" || val == "/"))
      {
        this.setState({number1: this.state.result, operation:val, position: 2}, () => this.setState({outputString: this.state.number1 + " " + this.state.operation, outputDisplay: this.state.operation, decimalPosition: 1}, () => console.log(this.state) ));
      }
    else if(val == "AC")
      {
        this.setState({result: 0, number1: 0, operation: "", number2: 0, position: 0, power: 0, reachedResult: false, outputString: "", outputDisplay:0, enteredNumber1: false, enteredNumber2: false,
                       hasDecimalNumber1: false,
                       hasDecimalNumber2: false, decimalPosition: 1}, () => console.log(this.state));
      }
    else if(this.state.position == 2 && val == "=")
      {
        console.log("equals");
        if(this.state.operation == "+")
          {
            this.setState({ result: this.state.number1 + this.state.number2 , position: 0, enteredNumber2: false}, () => this.setState({ outputString: this.state.number1 + " + " + this.state.number2 + " = " + this.state.result, outputDisplay: this.state.result }, () => this.setState({ number1: 0, number2: 0, operation: "", power: 0, reachedResult : true,
            hasDecimalNumber1: false, hasDecimalNumber2: false, decimalPosition: 1}, () => console.log(this.state) )));
            
          }
        else if(this.state.operation == "-")
          {
            this.setState({ result: this.state.number1 - this.state.number2 , position: 0, enteredNumber2: false},() => this.setState({ outputString: this.state.number1 + " - " + this.state.number2 + " = " + this.state.result, outputDisplay: this.state.result }, () => this.setState({ number1: 0, number2: 0, operation: "", power: 0, reachedResult : true,
            hasDecimalNumber1: false, hasDecimalNumber2: false, decimalPosition: 1}, () => console.log(this.state) )));
          }
        else if (this.state.operation == "/")
          {
            this.setState({ result: this.state.number1 / this.state.number2 , position: 0, enteredNumber2: false}, () => this.setState({ outputString: this.state.number1 + " / " + this.state.number2 + " = " + this.state.result, outputDisplay: this.state.result }, () => this.setState({ number1: 0, number2: 0, operation: "", power: 0, reachedResult : true,
            hasDecimalNumber1: false, hasDecimalNumber2: false, decimalPosition: 1}, () => console.log(this.state) )));
          }
        else if (this.state.operation == "*")
          {
            this.setState({ result: this.state.number1 * this.state.number2 , position: 0, enteredNumber2: false}, () => this.setState({ outputString: this.state.number1 + " * " + this.state.number2 + " = " + this.state.result, outputDisplay: this.state.result }, () => this.setState({ number1: 0, number2: 0, operation: "", power: 0, reachedResult : true, hasDecimalNumber1: false, hasDecimalNumber2: false, decimalPosition: 1}, () => console.log(this.state) )));
            
          }
      }
    else if((val == "+" || val == "-" || val == "*" || val == "/") && (this.state.position == 0) )
      {
        console.log("operation");
        this.setState({...this.state, operation: val, position: this.state.position + 2, power: 0, outputString: this.state.number1 + " " + val, outputDisplay: val, decimalPosition: 1}, () => console.log(this.state));
      }
    else if(this.state.position == 0)
      {
        if(this.state.hasDecimalNumber1 == false)
          {
                    console.log("meelo");
        this.setState({...this.state, number1: this.state.number1*10 + val, enteredNumber1: true},() => this.setState({...this.state, power: this.state.power + 1, outputString: this.state.number1, outputDisplay: this.state.number1}, () => console.log(this.state)));
          }
        else if(this.state.hasDecimalNumber1 == true)
          {
             console.log("milo");
        this.setState({...this.state, outputDisplay: (this.state.number1 + Math.pow(0.1, this.state.decimalPosition)*val).toFixed(this.state.decimalPosition), number1: parseFloat((this.state.number1 + Math.pow(0.1, this.state.decimalPosition)*val).toFixed(this.state.decimalPosition)), enteredNumber1: true},() => this.setState({...this.state, power: this.state.power + 1, outputString: this.state.number1}, () => this.setState({decimalPosition: this.state.decimalPosition + 1}, () => console.log(this.state))));
          }
        
      }
    else if(this.state.position == 2)
      {
        if(this.state.hasDecimalNumber2 == false)
          {
                    console.log("neelo");
        this.setState({...this.state, number2: this.state.number2*10 + val, enteredNumber1: false, enteredNumber2: true}, () => this.setState({...this.state, power: this.state.power + 1, outputString: this.state.number1 + " " + this.state.operation + " " + this.state.number2, outputDisplay: this.state.number2}, () => console.log(this.state) ));
          }
else if(this.state.hasDecimalNumber2 == true)
  {
     console.log("numbering");
        this.setState({...this.state, outputDisplay: (this.state.number2 + Math.pow(0.1, this.state.decimalPosition)*val).toFixed(this.state.decimalPosition), number2: parseFloat((this.state.number2 + Math.pow(0.1, this.state.decimalPosition)*val).toFixed(this.state.decimalPosition)), enteredNumber1: false, enteredNumber2: true}, () => this.setState({...this.state, power: this.state.power + 1, outputString: this.state.number1 + " " + this.state.operation + " " + this.state.number2, decimalPosition: this.state.decimalPosition + 1}, () => console.log(this.state) ));
  }
        
      }
  }
  
  render()
  {
    return(
      <div className="calculator">
        <div id="display">
          {this.state.outputDisplay}
        </div>
        <div className="stringOutput1">
          {this.state.outputString}
        </div>
        <NumberButton id="clear" number="AC" functioning={this.update}/>
        <NumberButton id="divide" number="/" functioning={this.update}/>
        <NumberButton id="multiply" number="*" functioning={this.update}/>        
        <NumberButton id="seven" number={7} functioning={this.update}/>
        <NumberButton id="eight" number={8} functioning={this.update}/>
        <NumberButton id="nine" number={9} functioning={this.update}/>
        <NumberButton id="subtract" number="-" functioning={this.update}/>
        
        <NumberButton id="four" number={4} functioning={this.update}/>
        <NumberButton id="five" number={5} functioning={this.update}/>
        <NumberButton id="six" number={6} functioning={this.update}/>
        <NumberButton id="add" number="+" functioning={this.update}/>
        
        <NumberButton id="one" number={1} functioning={this.update}/>
        <NumberButton id="two" number={2} functioning={this.update}/>
        <NumberButton id="three" number={3} functioning={this.update}/>
        <NumberButton id="equals" number="=" functioning={this.update}/>
        
        <NumberButton id="zero" number={0} functioning={this.update}/>
        <NumberButton id="decimal" number="." functioning={this.update}/>
        </div>
    );
  }
}

ReactDOM.render(<Board/>, document.getElementById("container"));
