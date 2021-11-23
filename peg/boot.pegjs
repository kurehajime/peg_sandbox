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
  function buildBinaryExpression(head, tail) {
    return tail.reduce(function(result, element) {
      return {
        type: "Expression",
        operator: element[1],
        left: result,
        right: element[3]
      };
    }, head);
  }
}}


ROOT
  = (_ value:STATEMENT _ { return value; })*