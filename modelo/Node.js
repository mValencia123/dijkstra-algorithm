class Node{
    constructor(value){
        this.value = value;
        this.final = 0;
        this.temporal = 0;
        this.visited = false;
        this.adjacent = [];
        this.father = null;
    }

    getFather(){
        return this.father;
    }

    setFather(node){
        this.father = node;
    }

    getValue(){
        return this.value;
    }

    getVisited(){
        return this.visited;
    }

    setVisited(visited){
        this.visited = visited;
    }

    getFinal(){
        return this.final;
    }
    
    setFinal(final){
        this.final = final;
    }

    getTemporal(){
        return this.temporal;
    }

    setTemporal(temporal){
        this.temporal = temporal;
    }

    getAdjacent(){
        return this.adjacent;
    }

    setAdjacent(node,distance){
        this.adjacent.push({node,distance});
    }
}

