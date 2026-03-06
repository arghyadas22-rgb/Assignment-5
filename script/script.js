
document.getElementById("login-btn").addEventListener("click" , function(){
    // 1...get admin input

    const adminInput = document.getElementById("input-number");
    const userAdmin = adminInput.value;
    console.log(userAdmin);

    // 2...get pin input

    const pinInput = document.getElementById("input-pin");
    const pinNumber = pinInput.value;
    console.log(pinNumber);

    // 3...match userid & admin pin

    if(userAdmin === "admin" && pinNumber === "admin123"){

        // 4...true alert -- 
        alert("login Success")
    }else{

        // 5... false >> alart >> return
        alert("login Failed")
        return;
    }
});