var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js');
document.head.appendChild(jQueryScript);

const initial = "# Welcome to my React Markdown Previewer!\n## This is a sub-heading...\n### And here's some other cool stuff:\n- there is no one there.\nHeres some code, `<div></div>`, between 2 backticks.\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\nYou can also make text **bold**... whoa!\n**_~~wjkj~~_**\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\nThere's also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n- Some are bulleted.\n- With different indentation levels.\n- That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let's not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)";

class MyApp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {textString: ""};
  }
  componentWillReceiveProps(nextProps){
    let updated = false;
    let strea = nextProps.textin;
    let regex = /```\n*((?:.*\n)+)```|```(.*)```/gm;
    let result = regex.test(strea);
    if(result == true)
    {
      let arr1 = strea.match(regex);
      let firstOccurrence = arr1[0].indexOf("\n");
      let lastOccurrence = arr1[0].lastIndexOf("\n");
      let prefix = arr1[0].substring(0, firstOccurrence);
      let suffix = arr1[0].substring(lastOccurrence+1);
      let str2 = arr1[0].substring(firstOccurrence+1,lastOccurrence).replace(/\n/g, "<br>");
      str2 = prefix + str2 + suffix;
      str2 = str2.substring(3,str2.length-3);
      str2 = str2.replace(/`/g, '&#96');
      str2 = "```" + str2 + "```";
      strea = strea.replace(/```\n*((?:.*\n)+)```|```(.*)```/, str2);
      let str1 = strea.replace(/```\n*((?:.*\n)+)```|```(.*)```/, '<pre><code>$1$2</pre></code>');
      this.setState({
        textString: str1
      });

      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /(?:\d+\..*\n)+(?:(?:-\s.*\n)+)?(?:(?:\*\s.*\n)+)?/g;
    result = regex.test(strea);
    if(result == true)
    {
      let reading = strea.match(/(?:\d+\..*\n)+(?:(?:-\s.*\n)+)?(?:(?:\*\s.*\n)+)?/g);
      for(let i = 0; i < reading.length; i++)
        {
          let combination = "\n<ol>";
          let arr2 = reading[i].split("\n");
          for(let i = 0; i < arr2.length-1; i++)
          {
            let arr1 = arr2[i].replace(/^[\d-*].?(.*)$/gm, '$1');
            arr1 = arr1.trim();
            combination += "<li>"+arr1+"</li>";
          }
          combination += "</ol>";
          let str1 = strea.replace(/(?:\d+\..*\n)+(?:(?:-\s.*\n)+)?(?:(?:\*\s.*\n)+)?/, combination);

          this.setState({
            textString: str1
          });
          strea = str1;
          str1 = "";
          updated=true;
        }


    }
    
    regex = /[ \-a-zA-Z,?\.]+(?:\|[\-, a-zA-Z?\.]+)+(?:\n[ \-a-zA-Z,?\.]+(?:\|[\-, a-zA-Z?\.]+)+)+/;
    result = regex.test(strea);
    if(result == true)
    {
      let arr = strea.match(/[ \-a-zA-Z,?\.]+(?:\|[\-, a-zA-Z?\.]+)+(?:\n[ \-a-zA-Z,?\.]+(?:\|[\-, a-zA-Z?\.]+)+)+/);
      let rows = arr[0].split("\n");
      let combination = "<table>";
      arr = rows[0].split("|");
      combination += "<tr>";
      for(let i = 0; i < arr.length; i++)
      {
        combination += "<th>" + arr[i].trim() + "</th>";
      }
      combination += "</tr>"
      
      for(let j = 1; j < rows.length; j++)
      {
        arr = rows[j].split("|");
        combination += "<tr>";
        for(let i = 0; i < arr.length; i++)
        {
          combination += "<td>" + arr[i].trim() + "</td>";
        }
        combination += "</tr>"
      }
      combination += "</table>";
      let str1 = strea.replace(regex, combination);

      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    
    regex = /-\s(.*)/gi;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<ul><li>$1</li></ul>');

      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /[^`]`([a-zA-Z<>\/()\s0-9!={}"\.]+)`/gi;
    result = strea.match(regex);
    let str1 = "";
    let str2 = "";
    if(result != null)
      {
      for(let i = 0; i < result.length; i++)
      {
        let index = result[i].indexOf("`");
        index++;
        while(result[i][index]!= '`')
          {
            if(result[i][index] != '<' && result[i][index] != '>')
                str1 += result[i][index];
            else if(result[i][index] == '<')
                str1 += '&lt;';
            else if(result[i][index] == '>')
                str1 += '&gt;';
            index++;
          }
          str2 = strea.replace(/[^`]`([a-zA-Z<>\/()\s0-9!={}"\.]+)`/, '<div class="whitecode">'+str1+'</div>');
        this.setState({
        textString: str2
      });
        updated=true;
        strea = str2;
        str1="";
      }
      }
    
    regex = /^> (.*)$/gm;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<blockquote>$1</blockquote>');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }

    regex = /!\[(.*?)\]\((.*?)\)/gi;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<img src=$2 alt=$1></img>');
      
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /\[(\w+)\]\(([^)]+)\)/gi;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<a href=$2 target="_blank">$1</a>');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /~~([^~]+)~~/gi;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<s>'+'$1'+'</s>');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /^(.*)\*\*(.*)\*\*(.*)/gm;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(/^(.*)\*\*(.*)\*\*(.*)/gm, '<p>$1<strong>'+'$2'+'</strong>$3</p>\n');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    } 
    regex = /_(.*?)_/gi;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<em>'+'$1'+'</em>');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    
    regex = /^###\s(.+)$/gim;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(regex, '<h3>$1</h3>');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /^##\s(.+)$/gim;
    result = regex.test(strea);
    if(result == true)
    {
      let wording = strea.match(/^##\s(.+)$/gm);
      wording[0] = wording[0].trim();
      wording[0] = wording[0].substring(3);
      let str1 = strea.replace(/^##\s(.+)$/gm, `<h2>${wording[0]}</h2>`);
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /^#\s(.+)$/gm;
    result = regex.test(strea);
    if(result == true)
    {
      let wording = strea.match(/^#\s(.+)$/gm);
      wording[0] = wording[0].trim();
      wording[0] = wording[0].substring(2)
      let str1 = strea.replace(/^#\s(.+)$/gm, `<h1>${wording[0]}</h1>`);
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /^(\w+.*)/gm;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(/^(\w+.*)/gm, '<p>$1</p>\n');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    regex = /(^(?!<p>.*$).*)\n/gm;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(/(^(?!<p>.*$).*)\n/gm, '$1');
      this.setState({
        textString: str1
      });
      strea = str1;
      str1 = "";
      updated=true;
    }
    /*regex = /\r\n/gm;
    result = regex.test(strea);
    if(result == true)
    {
      let str1 = strea.replace(/\r\n/gm, '<br>');
      this.setState({
        textString: str1
      });
      strea = str1;
      console.log(strea);
      str1 = "";
      updated=true;
    }*/
    


    if(updated==false)
      {
        this.setState({
          textString: strea
        });
      }
  }
  render()
  {
    return(
        <div id="preview" dangerouslySetInnerHTML={{__html: this.state.textString}} />
    );
  }
}




class MarkDown extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { texti: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount()
  {
    this.setState({
      texti: initial
    });
  }
  handleChange(event){
    this.setState({
      texti: event.target.value,
    });
  }
  render()
  {
    return(
      <div>
      <div className="wrapper">
      <div className="markdown">
        <div className="head-markdown">
          <i className="fab fa-free-code-camp"></i> <strong>&nbsp;&nbsp;Editor</strong>
        </div>
        <div className="editor" id="markdown1">
        
      <textarea id="editor" onChange={this.handleChange} value={this.state.texti}></textarea>
          
       </div>
      </div>
      <div className="previewer">
        <div className="head-markdown">
          <i className="fab fa-free-code-camp"></i><strong>&nbsp;&nbsp;Previewer</strong>
        </div>
          <div>
            <MyApp textin={this.state.texti}/>
          </div>
      </div>
    </div>
        
        
      </div>
    );
  }
}
ReactDOM.render(<MarkDown />, document.getElementById("body1"));

