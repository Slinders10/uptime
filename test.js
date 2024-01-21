let time = 5000;
let workOn = true;


function sayMstf(){
    console.log("Windes");
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
   while(workOn){
        let min = 2*60*1000
        let addition = Math.ceil(Math.random() * 3*60*1000);
        let time = min+addition;
        sayMstf();
        await sleep(time);
    }
    console.log('Done');
}

demo();

