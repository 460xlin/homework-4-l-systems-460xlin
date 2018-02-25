

class Rule{

    prob: number;
    successorString: string;
    constructor(probability : number, nextStr: string)
    {
        this.prob = probability;
        this.successorString = nextStr;
    }
};

class LinkedList
{
    head: myNode;
    tail: myNode;
    constructor(node1: myNode, node2: myNode){
        this.head = node1;
        this.tail = node2;
    }
};

function linkNodes(node1: myNode, node2: myNode)
{
    node1.nex = node2;
    node2.prev = node1;
}

class myNode
{

    sym: string;
    nex: myNode;
    prev: myNode;


    constructor(previous: myNode, next: myNode, symbol: string)
    {
        this.sym = symbol;
        this.prev = previous;
        this.nex = next;
    }
};

function findReplace(currNode: myNode, myLinkedList: LinkedList, grammer: any) : any
{
   var currGram = grammer.get(currNode.sym);

   var rand = Math.random();
   var totalRulesLength = currGram.length;
   var accumulatedProb = 0.0;

   var chosenRule = currGram.charAt(0);

   for(let i = 0; i < currGram.length; i++)
   {
       if(rand > accumulatedProb && rand <= accumulatedProb + currGram[i].prob){
           chosenRule = currGram[i];
           
       }
       accumulatedProb += currGram[i].probability;
   }

   return chosenRule.successorString;

}

function replaceNode(myLinkedList: LinkedList, node: myNode, replacementString: string) 
{
    var subLinkedList = stringToLinkedList(replacementString);

    if(myLinkedList.head === myLinkedList.tail)
    {
        myLinkedList.head = subLinkedList.head;
    }
    else{
        var curr = myLinkedList.head;
        while(curr)
        {
            if(curr === node)
            {
                if(curr !== myLinkedList.head)
                {
                    curr.prev.nex = subLinkedList.head;

                }
            }
            curr = curr.nex;
        }
    }
}
export function stringToLinkedList(inputString: string) : any
{
    if(inputString !== null)
    {
        var headNode = new myNode(null, null, inputString.charAt(0));
        var prev = headNode;
        var tailNode = headNode;
        for(let i = 1; i < inputString.length; i++)
        {
            var newNode = new myNode(null, null, inputString.charAt(i));
            tailNode = newNode;
            prev.nex = newNode;
            prev = newNode;
        }

    }
    var ll = new LinkedList(headNode, tailNode);
    return ll;
}

export function LinkedListToString(inputLL : LinkedList) : any
{
    var result = "";
    var currNode = inputLL.head;
    while(currNode)
    {
        result += currNode.sym;
        currNode = currNode.nex;
    }

    return result;
}


class Lsystem{
    axiom: string;
    grammer: any;
    iteration: number;

    constructor()
    {
        this.iteration = 0;
        this.axiom = "FY";
        this.grammer = new Map();
        this.initialGrammer();
    }

    initialGrammer()
    {
        var ruleArray1 = new Array<Rule>();
        ruleArray1.push(new Rule(1.0, "[-FX][+FX]"));
        this.grammer.set("X", ruleArray1);


        var ruleArray2 = new Array<Rule>();
        ruleArray2.push(new Rule(0.55, 'S[D]FY'));
        ruleArray2.push(new Rule(0.1, 'S[D][JBW]FY'));
        ruleArray2.push(new Rule(0.1, 'S[D][KBE]FY'));
        ruleArray2.push(new Rule(0.1, 'S[D][+BP]FY'));
        ruleArray2.push(new Rule(0.1, 'S[D][-BP]FY'));
        ruleArray2.push(new Rule(0.05, 'S[D][LAY]Y'));
        this.grammer.set("Y", ruleArray2);

        var ruleArray3 = new Array<Rule>();
        ruleArray3.push(new Rule(1.0, 'S[D]FA'));
        this.grammer.set("A", ruleArray3);
    }

    doIteration(iterTimes: number) : any
    {
        var origString = this.axiom;
        var lsystemLL = stringToLinkedList(origString); 
        // this.iteration = iterTimes;
        // var tempString = "";
        // for(let j = 0; j < this.iteration; j++)
        // {
        //     for(let i = 0; i < origString.length; i++)
        //     {
        //         tempString += this.grammer.get(origString.charAt(i));
        //     }
        //     origString =tempString;
        //     tempString = "";
        // }

        if(iterTimes === 0){}
        else{
            for(let i = 0; i < iterTimes; i++)
            {
                var currNode = lsystemLL.head;
                while(currNode)
                {
                    if(this.grammer.get(currNode.sym)){
                        var replacementString = findReplace(currNode, lsystemLL, this.grammer);                       
                        replaceNode(lsystemLL, currNode, replacementString)
                    }
                    currNode = currNode.nex;
                }
            }
        }


        return lsystemLL;
    }
}; 

export default Lsystem;
