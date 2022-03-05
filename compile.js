//we can't directly require in our contract as the compile.js is going to try to read it as a javascript code
//so what we do is read our coontract of our hard drive and this this we will be using two built-in standard
//library modules
const path=require('path');//help us build a path (directory path from compile.js to inbox.sol file) and we are
//this path module instead of just writing the path directly because by using the path module we are guaranted
//to get cross platform compatibility .i.e, if we try to run this on a windows based or a unix based system the
// path module will always generate a valid path
const fs=require('fs');
const solc=require('solc');// requiring in the solidity compiler

const inboxPath=path.resolve(__dirname,'contracts','Inbox.sol');
//__dirname is aconstant defined by node which is always set to the current working directory(root to inbox)
const source=fs.readFileSync(inboxPath,'utf8'); // helps us get all the source code from Inbox.sol

// console.log(solc.compile(source,1));
//we to give the solidity compiler two arguments one is the source code we generated
//and the other is the no of solidity files or contractys we wish to compile in this case only one

//solidity compiler can compile multiple compilers in one go but in our case we only compiled a single contract
//and on compilation of each contract the solidity compiler gives us two properties one is the bytecode: which we
//deploy on the etherum network .i.e, stored and executed on the blockchain and the other property is the interface
//which is our contracts ABI which is essentially the communication layer between the solidity world and the javascript world
module.exports=solc.compile(source,1).contracts[':Inbox'];
//this module.exports helps us export our compiled code and to be used in other programs/files and the.contracts[':Inbox']
//helps us access only the bytecode and interface from the Inbox object from our compiled contract
