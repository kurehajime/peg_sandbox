// https://github.com/pegjs/pegjs/blob/master/examples/json.pegjs
{{
  function lit(value){
    return { type: "lit", value: value };
  }
  function key_value(name,value){
    return { type:"key_value",
            name:name, value: value };
  }
  function hash(key_values){
    return { type:"hash",
            members:key_values };
  }
  function arr(values){
    return { type:"array",
            members:values };
  }
}}


ROOT
  = _ value:value _ { return value; }