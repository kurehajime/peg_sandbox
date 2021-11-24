STATEMENT
  = AkaStatement 
  / EqualStatement
  / Expression

// ----- 変数宣言 -----

AkaToken
  = _ "aka" _

AkaStatement
  = _ exp:Expression AkaToken name:id _ EOS {
      return {
        type: "aka",
        name: name,
        value: exp
      };
    }

// ----- 代入 -----
EqualToken
  = _ "=" _

EqualStatement
  = _ name:id EqualToken exp:Expression _  EOS {
      return {
        type: "equal",
        name: name,
        value: exp
      };
    }

