function Main(Input) {
    let number = Input[0]

    if (number < 100)
    {
        console.log("Less than 100")
    }
    else if (number >= 100 && number <= 200)
    {
        console.log("Between 100 and 200")
    }
    else if (number > 200)
    {
        console.log("Greater than 200")
    }
}

Main(["200"])