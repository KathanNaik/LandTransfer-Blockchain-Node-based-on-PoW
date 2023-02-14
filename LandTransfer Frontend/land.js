var app = angular.module('landApp', [])
 app.controller('landController', function() {              //contains our initial data
    var landList= this;

    landList.lands= [
        {
            name: 'Kathan Naik',
            password: 'kpnaik',
            hisland: [
                {
                    address: 'Gurgao West',
                    blockno: 396115,
                    area: 2500
                },
                {
                    address: 'Delhi Sarojini Nagar',
                    blockno: 442369,
                    area: 900
                },
                {
                    address: 'Navsari Ashabaug',
                    blockno: 678990,
                    area: 1200
                }
            ]

        },
        {
            name: 'Harshal Rathi',
            password: 'hnr@49',
            hisland: [
                {
                    address: 'Nasik Nagar Nigam',
                    blockno: 578786,
                    area: 5000
                },
                {
                    address: 'Lonawla HillVilla',
                    blockno: 987345,
                    area: 1150
                }
            ]

        },
        {
            name: 'Anurag Saxena',
            password: 'anurag@123',
            hisland: [
                {
                    address: 'Secunderabad, Hyderabad',
                    blockno: 333987,
                    area: 9000
                },
            ]

        },
        {
            name: 'Nikhil',
            password: 'nikhil@123',
            hisland: [
                {
                    address: 'Electronics City, Banglor',
                    blockno: 678543,
                    area: 1000
                },
            ]

        },

    ];

    landList.transections= [
        {
            seller: 'Anurag Saxena',
            buyer: 'Kathan Naik',
            blocknumber: 442369,
            price: 2200000
        }
    ];
    
    landList.addLand= function() {
        angular.forEach( landList.lands, function(owner){

        if(owner.name == landList.username && owner.password == landList.password){             //validations
            owner.hisland.push({address: landList.address, blockno: landList.blockno , area:landList.area})
        }
       })

       landList.address='';
       landList.blockno='';
       landList.area='';
    }

    landList.transferLand= function() {             //transfer land checking Criteria and functions
        var success= false;
        var foundseller= landList.lands.find(function(seller){ return seller.name==landList.username})

            if(foundseller.password == landList.password){
              
                angular.forEach (foundseller.hisland, function(land, lidx){
                    if(land.blockno == landList.blocknum){
                       
                        angular.forEach( landList.lands, function(buyer){

                            if(buyer.name == landList.buyer){
                                buyer.hisland.push({address: land.address, blockno: land.blockno , area: land.area})
                                landList.transections.push({buyer:landList.buyer, seller:landList.username, blocknumber:landList.blocknum, price:landList.price})
                                foundseller.hisland.splice(lidx, 1);

                                success=true;
                            }
                           })
                    }
                })            
            }
            if(success==true){
                var url= 'http://localhost:3000/api/mine';
                var a= document.getElementById('transfer');
                a.target="_blank"
                a.action= url;
                a.submit();

                landList.buyer='';
                landList.blocknum='';
                landList.price='';
            }
    };

    landList.addUser= function() {             // adding a user automatically
        var exist = false;      
        angular.forEach( landList.lands, function(owner){

            if(owner.name == landList.username){
               exist = true;
            }
           });
        if(exist==false){
            landList.lands.push({ name: landList.username,
            password: landList.password,
            hisland: [ ]
})
        }
    }
});