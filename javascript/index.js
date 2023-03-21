
//convert code into array of tokens
// i.e. parse
function tokenize(str) {
    let res = "";
    str.split('').forEach(element => {
        if(element === '(')
            res+=" ( ";
        else if(element === ')')    
            res+=" ) ";
        else
            res+=element
    });
    return res.split(' ');
}

/// (a b )  ->    (a b)
/// ((a b) c) ->  ()
function createAST(listOfTokens) {
    let first = listOfTokens.shift();
    
    if(!validSyntax())
        throw new Error("invalid expression");

    if (first == '(') {
        let res = [];
        //listOfTokens.pop();
        res.concat(createAST(listOfTokens));
        return res;
    }
    
    return parseAtom(first);
}

function parseAtom(token) {
    return "atom";
}

function validSyntax(listOfTokens){
    if(listOfTokens.shift()=== ')')
        return false
    
    //count opening closing ()

    return true;
}

console.log(tokenize("(+ (* 62 7) 8)"));
console.log(createAST(tokenize("(+ (* 62 7) 8)")));