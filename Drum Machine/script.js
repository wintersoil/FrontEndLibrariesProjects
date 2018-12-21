var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js');
document.head.appendChild(jQueryScript);

class Button extends React.Component{
  constructor(props)
  {
    super(props);
    this.checkKey = this.checkKey.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }
  componentDidMount()
  {
            document.addEventListener("keydown", this.checkKey);
       document.addEventListener("keyup", this.removeColor);
        let elt = document.getElementById(this.props.collec.buttonid);
        elt.addEventListener("click", this.playMusic);
  }
  componentDidUpdate()
  {
    if(this.props.powerState == false)
      {
        document.removeEventListener("keydown", this.checkKey);
        document.removeEventListener("keyup", this.removeColor);
        let elt = document.getElementById(this.props.collec.buttonid);
        elt.removeEventListener("click", this.playMusic);
      }
    else if(this.props.powerState == true)
      {
        document.addEventListener("keydown", this.checkKey);
       document.addEventListener("keyup", this.removeColor);
        let elt = document.getElementById(this.props.collec.buttonid);
        elt.addEventListener("click", this.playMusic);
      }
  }
  removeColor(event)
  {
    if(event.keyCode == this.props.collec.codee)
     {
       document.getElementById(this.props.collec.buttonid).style.backgroundColor = "darkgrey";
       document.getElementById(this.props.collec.buttonid).style.boxShadow = "5px 5px 5px black";
     } 
  }
  checkKey(event)
{
  if(event.keyCode == this.props.collec.codee)
    {
document.getElementById(this.props.collec.buttonid).style.backgroundColor = "orange";
             document.getElementById(this.props.collec.buttonid).style.boxShadow = "0px 0px 0px black";

      let music1 = document.getElementById(this.props.collec.letter);
      music1.load();
      music1.play();
     this.props.functionn(this.props.collec.id); 
    }
}
  playMusic()
  {
    let music = document.getElementById(this.props.collec.letter);
    music.load();
    music.play();
    this.props.functionn(this.props.collec.id);
  }
  render()
  {
    return(
      <div style={{display: 'inline'}}>
        <button className="drum-pad" id={this.props.collec.buttonid}>{this.props.collec.letter}
        <audio class="clip" id={this.props.collec.letter} src={this.props.collec.location}>
          <source src={this.props.collec.location} type="audio/mpeg" />
        </audio>
        </button>
      </div>
    );
  }
}

class Board extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { bankPanel: 0, power: true, diplayin: "" }
    this.bank = this.bank.bind(this);
    this.powerChange = this.powerChange.bind(this);
    this.forDisplay = this.forDisplay.bind(this);
  }
  forDisplay(val)
  {
    this.setState({
      ...this.state, displayin: val
    });
  }
  powerChange()
  {
        this.setState({...this.state, power: !this.state.power});
  }
  bank(){
    if(this.state.bankPanel == 0)
      {
        this.setState({ ...this.state, bankPanel: 1 });
      }
    else if(this.state.bankPanel == 1)
      {
        this.setState({ ...this.state, bankPanel: 0 });
      }
  }
  render()
  {
    let mappings;
    if(this.state.bankPanel == 0)
      {
    mappings = [
      {letter:"Q", location:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", id:"Heater1", codee:81, buttonid: "QButton"},
      {letter:"W", location:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", id:"Heater2", codee:87, buttonid: "WButton"},
      {letter:"E", location:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", id:"Heater3", codee:69, buttonid:"EButton"},
      {letter:"A", location:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", id:"Heater4", codee:65, buttonid:"AButton"},
      {letter:"S", location:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", id:"Clap", codee:83, buttonid:"SButton"},
      {letter:"D", location:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", id:"Open HH", codee:68, buttonid:"DButton"},
      {letter:"Z", location:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", id:"Kick n' Hat", codee:90, buttonid:"ZButton"},
      {letter:"X", location:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", id:"Kick", codee:88, buttonid:"XButton"},
      {letter:"C", location:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", id:"Closed HH", codee:67, buttonid:"CButton"}
      
    ];
      }
    else if(this.state.bankPanel == 1)
      {
        mappings = [
      {letter:"Q", location:"https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", id:"QAudio1", codee:81, buttonid: "QButton1"},
      {letter:"W", location:"https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", id:"WAudio1", codee:87, buttonid: "WButton1"},
      {letter:"E", location:"https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", id:"EAudio1", codee:69, buttonid:"EButton1"},
      {letter:"A", location:"https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", id:"AAudio1", codee:65, buttonid:"AButton1"},
      {letter:"S", location:"https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", id:"SAudio1", codee:83, buttonid:"SButton1"},
      {letter:"D", location:"https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", id:"DAudio1", codee:68, buttonid:"DButton1"},
      {letter:"Z", location:"https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", id:"ZAudio1", codee:90, buttonid:"ZButton1"},
      {letter:"X", location:"https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", id:"XAudio1", codee:88, buttonid:"XButton1"},
      {letter:"C", location:"https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", id:"CAudio1", codee:67, buttonid:"CButton1"}
    ];
      }
    return(
      <div className="overall" id="drum-machine">
        <div className="keyPad">
        <div>
          <Button className="drum-pad" collec={mappings[0]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
          <Button className="drum-pad" collec={mappings[1]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
          <Button className="drum-pad" collec={mappings[2]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
        </div>
        <div>
          <Button collec={mappings[3]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
          <Button collec={mappings[4]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
          <Button collec={mappings[5]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
        </div>
        <div>
          <Button collec={mappings[6]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
          <Button collec={mappings[7]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
          <Button collec={mappings[8]} bank2={this.state.bankPanel} powerState={this.state.power} functionn={this.forDisplay}/>
        </div>
        </div>
        <div className="toggles">
          <div>
        <p>Bank</p>
        <label className = "switch"><input type="checkbox" onClick={this.bank}/>
          <span className="slider"></span>
        </label>
          </div>
          <div>
        <p>Power</p>
        <label className = "switch">
          <input type="checkbox" onClick={this.powerChange}/>
            <span className="slider"></span>
        </label>
          </div>
          <div>
        <div className="displaying" id="display">{this.state.displayin}</div>
          </div>
        </div>
        
       </div>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById("container"));
