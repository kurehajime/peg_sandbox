STATEMENT
  = AkaStatement 
  / EqualStatement
  / Expression

// ----- 変数宣言 -----

AkaToken
  = _ "aka" _

AkaStatement
  = _ exp:Expression AkaToken name:RefExpression _ EOS {
      return aka(name,exp);
    }

// ----- 代入 -----
EqualToken
  = _ "=" _

EqualStatement
  = _ name:RefExpression EqualToken exp:Expression _  EOS {
      return equal(name,exp);
    }

