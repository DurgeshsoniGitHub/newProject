const bcrypt=require('bcrypt');

async function convert(){
    const myPassword="123456";
    const hashPassword=await bcrypt.hash(myPassword,10);
    console.log('Original PWD:',myPassword);
    console.log('Hash Pasword:',hashPassword);

    const match=await bcrypt.compare(myPassword,hashPassword);
    if(match){
        console.log('Password Matched');
        
    }else{
        console.log('Invalid Password');
    }
}
convert();