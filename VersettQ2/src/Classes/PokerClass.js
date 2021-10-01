class Deck { 
    constructor(){ 
        this.deck = [];
        this.createDeck();
        this.fiveChosen = [];
    }
    
    createDeck = () =>{
        let suits = ["hearts","diamonds","spades","clubs"];
        let cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        suits.forEach(suit=>{
            for(let i=0;i<cards.length;i++){
                this.deck.push(cards[i]+ " of "+ suit)
            }
        })
    }

    shuffle = () =>{
        //Fisher-Yates Shuffle Alg
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
          }
    }

    fiveCards = ()=>{

        for(let i=0;i<5;i++){
            let card = this.deck[i].split(" ");
            if(card[0]=='J')card[0]=10;
            if(card[0]=='Q')card[0]=11;
            if(card[0]=='K')card[0]=12;
            if(card[0]=='A')card[0]=13;

            this.fiveChosen[i] = {
                value: parseInt(card[0]),
                suit: card[2]
            }
            //sort it for easier calculations later
            this.fiveChosen.sort((a, b) => a.value - b.value);

        }
    }

    pokerHand = () =>{
        let sameSuite = true;

        let tempSuite = this.fiveChosen[0].suit;
        for(let i =1;i<5;i++){
            if(tempSuite != this.fiveChosen[i].suit){
                sameSuite = false
            }
        }

        if(sameSuite){
           if(this.royalFlush()){
               console.log("Royal Flush!")
                return; 
            }
          //Straightflush
          if(this.straight()){
            console.log("Straight Flush!")
            return; 
          }
        }
        

        if(this.fourKind()){
            console.log("Four of a kind!")
            return; 
        }

        if(this.fullHouse()){
            console.log("Full House")
            return; 
        }
          

        if(sameSuite){
            console.log("Flush!")
            return; 
        }
        
        //straight
        if(this.straight()){
            console.log("Straight!")
            return; 
        }

        if(this.threeKind()){
            console.log("Three of a kind!")
            return; 
        }
        if(this.twoPair()){
            console.log("Two Pairs!")
            return; 
         }

        if(this.pair()){
            console.log("Pair!")
            return; 
         }

        console.log("High card!")
        
    }


    /*Royal Flush - Ace, king, queen, jack, ten (same suit)*/
    royalFlush = ()=>{
        let counter =0;
        for(let i=0;i<5;i++){
            if(this.fiveChosen[i].value==i+10){
                counter++;
            }
        }
        return counter ==5;
    }
   
    // Four of a kind - four of the same cards (different suits)
    fourKind = ()=>{
        let count =0;
        let storeIndex =-1;
        for(let i=0;i<4;i++){
            //benifit of sorting it beforehand
            if(this.fiveChosen[i].value == this.fiveChosen[i+1].value){
                if(storeIndex ==-1 ){
                    count++;
                    storeIndex = i;
                }else if(storeIndex ==i-1){
                    count++;
                    storeIndex++;
                }  
            }
         }
         return count==3;  
    }

    /*full house - 3 of the same cards and 2 of the same cards (different suits)*/
    fullHouse = () =>{
        let count =0;
        for(let i=0;i<4;i++){
            if(this.fiveChosen[i].value !== this.fiveChosen[i+1].value){
                 count++;
            }
         }
         return count<2;
    }


     // Straight - sequential rank (same suit)  & Straigh flush when faces are tsuite is the same
    straight = () =>{
        let count =1;
        let increment= 0;
        for(let i=0;i<5;i++){
            if(increment ==0){
              increment = this.fiveChosen[i].value -i;
            }else if(increment==this.fiveChosen[i].value -i){
            count++;
            }
        }
        return count ==5;
    }


    // three of a kind - 3 of the same cards
    threeKind = () =>{
        let count =0;
        let storeIndex =-1;
        for(let i=0;i<4;i++){
            //benifit of sorting it beforehand
            if(this.fiveChosen[i].value == this.fiveChosen[i+1].value){
                if(storeIndex ==-1 ){
                    count++;
                    storeIndex = i;
                }else if(storeIndex ==i-1){
                    count++;
                    storeIndex++;
                }  
            }
         }
         return count==2;   
    }

    
    // two pair - two cards of one rank, two cards of the other
    twoPair = () =>{
        let count =0;
        for(let i=0;i<4;i++){
            if(this.fiveChosen[i].value == this.fiveChosen[i+1].value){
                 count++;
            }
         }
         return count==2;

    }
    // one pair - two cards of the same rank
    

    pair = ()=>{
        //since it sorted

        for(let i=0;i<4;i++){
           if(this.fiveChosen[i].value == this.fiveChosen[i+1].value){
                return true
           }
        }
        return false
    }
}
module.exports = Deck
