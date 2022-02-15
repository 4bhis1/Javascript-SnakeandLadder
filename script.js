// UI work

let addRowsColumn = () => {
    let container=document.getElementById("gridContainer")
    let count=100;
    for(let i=1;i<=10;i++){

        if(i%2===1){
            for(let j=0;j<10;j++){
                let item=document.createElement("div")

                if(count%2==0){
                    item.style.backgroundColor="greenYellow"
                }
                else{
                    item.style.backgroundColor="yellowgreen"
                }
                item.appendChild(document.createTextNode(count+""));
                count--
                container.appendChild(item)
            }
        }
        else{
            count-=10
            let countVar=count+1
            for(let j=0;j<10;j++){
                let item=document.createElement("div")

                if(countVar%2==0){
                    item.style.backgroundColor="greenYellow"
                }
                else{
                    item.style.backgroundColor="yellowgreen"
                }

                item.appendChild(document.createTextNode(countVar+""));
                countVar++
                container.appendChild(item)
            }
        }
    }
}

addRowsColumn()


// game work

const ladder = [
    {to: 13 , from: 82},
    {to: 42 , from: 96},
    {to: 3 , from: 73}
]

const snake = [
    {from: 72, to: 25},
    {from: 99, to: 16},
]

let playerCounter=0

let players = [
    {color : "Red" , score : 0, six : false, top : 729+30, left : 60},
    {color : "Green" , score : 0, six : false, top : 729+30, left : 30},
    {color : "Yellow" , score : 0, six : false, top : 729+60, left : 30},
    {color : "Blue" , score : 0, six : false, top : 729+60, left : 60}
]



let diceButton = () => {
    let randNumber = Math.ceil(Math.random()*6)
    
    
    let diceChance = document.getElementById("chance")
    let diceScore = document.getElementById("score")
    let commentDiv = document.getElementById("comment")
    let diceShow = document.getElementById("diceButton")

    let redDiv = document.getElementById("redPlayerCoin")
    let greenDiv = document.getElementById("greenPlayerCoin")
    let yellowDiv = document.getElementById("yellowPlayerCoin")
    let blueDiv = document.getElementById("bluePlayerCoin")
    

    diceChance.removeChild(diceChance.firstChild)
    diceScore.removeChild(diceScore.firstChild)

    if(commentDiv.firstChild)
        commentDiv.removeChild(commentDiv.firstChild)

    if(diceShow.firstChild)
        diceShow.removeChild(diceShow.firstChild)

    diceShow.style.background = `url("Images/${randNumber}.jpg")`
    diceShow.style.backgroundSize = "150px 150px"

    let index = playerCounter%4

    if(players[index].six){

        if(players[index].score + randNumber <= 100)
            players[index].score += randNumber

        if(players[index].score === 100){
            alert(`${players[index].color} player win !!!`)
            players[index].score +=1
        }

        for(let i=0; i<4; i++){

            for(let k of ladder){
                if(k.to === players[i].score){
                    players[i].score=k.from      
                    commentDiv.appendChild(document.createTextNode(`${players[index].color} player got ladder`))
                    console.log(`${players[index].color} player got ladder`)
                }
            }

            for(let k of snake){
                if(k.from === players[i].score){
                    players[i].score=k.to
                    commentDiv.appendChild(document.createTextNode(`${players[index].color} player Bitten by snake`))
                    console.log(`${players[index].color} player Bitten by snake`)
                }
            }

        }

        let k=players[index].score

        if((k>10 && k<20) || (k>30 && k<40) || (k>50 && k<60) || (k>70 && k<80) || (k>90 && k<100)) 
            players[index].left = (10-Math.floor(players[index].score%10))*81
        else if((k/10)%2 === 0)
            players[index].left = (Math.floor(players[index].score%10))*81
        else if((k/10)%2 === 1)
            players[index].left = (9-Math.floor(players[index].score%10))*81
        else
            players[index].left = (Math.floor(players[index].score%10)-1)*81

        players[index].top = (Math.floor((players[index].score-1)/10))*81



        if(index==0){
            redDiv.style.top=759-players[0].top + "px"
            redDiv.style.left=60+players[0].left + "px"
        }
        else if(index==1){
            greenDiv.style.top=759-players[1].top + "px"
            greenDiv.style.left=30+players[1].left + "px"
        }
        else if(index==2){
            yellowDiv.style.top=789-players[2].top + "px"
            yellowDiv.style.left=30+players[2].left + "px"
        }
        else{
            blueDiv.style.top=789-players[3].top + "px"
            blueDiv.style.left=60+players[3].left + "px"
        }

    }
    else if(!players[index].six && randNumber===6){
        players[index].six=true
        commentDiv.appendChild(document.createTextNode(`${players[index].color} player got 6 & unlocked its button`))
    }


    diceChance.append(document.createTextNode("Chance : "+players[index].color))
    diceScore.append(document.createTextNode("Score : "+players[index].score))
    console.log(players)
    
    playerCounter++
}




