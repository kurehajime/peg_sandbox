// ----- Objects -----

object
  = begin_object
    members:(
      head:member
      tail:(value_separator m:member { return m; })*
      {
        return hash([head].concat(tail));
      }
    )?
    end_object
    { return members !== null ? members: hash([]); }

member
  = name:string name_separator value:value {
      return key_value(name,value);
    }
  / name:id name_separator value:value {
      return key_value(name,value);
    }

// ----- Arrays -----

array
  = begin_array
    values:(
      head:value
      tail:(value_separator v:value { return v; })*
      { return arr([head].concat(tail)); }
    )?
    end_array
    { return values !== null ? values : arr([]); }
