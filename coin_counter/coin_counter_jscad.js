// title: SpiralCoinRail
// author: mdev1024 
// license: Creative Commons CC BY
// revision: 0.003
// tags: coin counter


min_coin_d = 17.91;
max_coin_d = 30.61;
max_coin_thickness = 2.15+1;
coin_dia_gap = 1.0;


function rail() {
    var stack = [];
    stack.push(scale([max_coin_thickness,2,2],cube()).translate([-max_coin_thickness/2,-1,0]));
    //inner rail
//    stack.push(scale([2,2,4],cube()).translate([-max_coin_thickness/2-2,-1,0]));
    //outer rail
    stack.push(scale([2,2,4],cube()).translate([max_coin_thickness/2,-1,0]));
    return stack;  
}
function rail_spiral() {
    var stack = [];
    for(var i=0;i<361;i+=10) {
        stack.push(
            translate([0,0,i*(max_coin_d+4)/360],
                rotate([10,0,i],
                    translate([15+i*(max_coin_d+4)/360,0,0],
                        rotate([0,30,0],
                        rail()
                        )
                    )
                )
            )    
        );
        if(i%20===0) {
            stack.push(
                translate([0,0,-5],
                    rotate([0,0,i],
                        translate([15+i*(max_coin_d+4)/360,0,0],
                            scale([4,1,5.5+i*(max_coin_d+4)/360],
                                cube()
                            )
                        )
                    )
                )
            );
        }

    }
    return stack;
}
function main() {
    return translate([0,0,10],rail_spiral());
}

