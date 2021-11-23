STATEMENT
  = Expression
  / _ value:value _ { return value; } 
