PlusMinus
  = $("+" ![+=])
  / $("-" ![-=])

MultiDiv
  = $("*" !"=")
  / $("/" !"=")
  / $("%" !"=")

Factor
  = "(" _ exp:Expression _ ")"{return exp;}
  / value
  / RefExpression

Expression
  = PlusMinusExpression

PlusMinusExpression 
  = head:MultiDivExpression tail:(_ PlusMinus _ MultiDivExpression)* { 
      return buildBinaryExpression(head, tail);
    }
    
MultiDivExpression 
  = head:Factor tail:(_ MultiDiv _ Factor)* {
      return buildBinaryExpression(head, tail);
    }

RefExpression
  = name:id {
    return ref(name);
  }