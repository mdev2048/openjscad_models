// title: SpiralCoinRail
// author: mdev1024 
// license: Creative Commons CC BY
// revision: 0.003
// tags: coin counter

coin_diameter_list = [17.91,
            19.05, 
            21.21, 
            24.26,
            26.49,
            30.61];
coin_diameter_list = coin_diameter_list.reverse();
            
min_coin_d = 17.91;
max_coin_d = 30.61;
max_coin_thickness = 2.15+1;
coin_dia_gap = 1.0;


function rail(setBlocker,outerRailHeight) {
    var stack = [];
    stack.push(scale([max_coin_thickness,2,2],cube()).translate([-max_coin_thickness/2,-1,0]));
    //inner rail
//    stack.push(scale([2,2,4],cube()).translate([-max_coin_thickness/2-2,-1,0]));
    //outer rail
    if(setBlocker==true) {
        stack.push(scale([2,2,outerRailHeight],cylinder({r: 0.5, h: 1})  ).translate([max_coin_thickness/2,-1,0]));
    } else {
        stack.push(
            scale([2,2,4],cylinder({r: 0.5, h: 1}) ).translate([max_coin_thickness/2,-1,0]));
        stack.push(
            scale([2,2,4],cylinder({r: 0.5, h: 1}) ).translate([max_coin_thickness/2,-1,outerRailHeight + 2]));
    }
    return stack;  
}
function rail_spiral() {
    var stack = [];
    var curCoin = coin_diameter_list[0];
    for(var i=0;i<360;i+=20) {
        curCoin = coin_diameter_list[(i-(i%60))/60];
        stack.push(
            translate([0,0,i*(max_coin_d*1.5)/360],
                rotate([10,0,i],
                    translate([15+i*(max_coin_d+4)/360,0,0],
                        rotate([0,30,0],
                        i%60===0 ? rail(true,curCoin+2) : rail(false,curCoin - 0.2 + ((i%60)/60))
                        )
                    )
                )
            )    
        );
        if(i%40===0) {
            stack.push(
                translate([0,0,-5],
                    rotate([0,0,i],
                        translate([15+i*(max_coin_d+4)/360,0,0],
                            scale([1,1,5.5+i*(max_coin_d*1.5)/360],
                                cylinder({r:2,h:1})
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

