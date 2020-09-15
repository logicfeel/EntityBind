let obj: string;




interface Labels {
    color: string,
    width: number
}

interface Labels2 {
    width: number
}


let arrObj :Labels;



arrObj.color = "11";
arrObj.width = 100;


let arrObj2: [Labels, Labels2];



arrObj2[0].color = "11";
arrObj2[1].width = 100;



interface abcd {
    bac: string;
    width: number;
    abcd(p: string): string;
}


class DDD implements abcd {

    abcd() {
        return "AA";
    }

    bac = "A";
    width = 10;
}


