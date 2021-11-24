STATEMENT
  = AkaStatement 
  / Expression

// ----- 変数宣言 -----

AkaToken
  = _ "aka" _

AkaStatement
  = _ exp:Expression AkaToken name:id  EOS {
      return {
        type: "aka",
        name: name,
        value: exp
      };
    }


