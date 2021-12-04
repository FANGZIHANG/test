app.controller('cartController',function ($scope,cartService) {
    $scope.findCartList=function () {
        cartService.findCartList().success(
            function (response) {
                $scope.cartList=response;
                //调用求总数量的方法
                $scope.sum($scope.cartList);
            }
        )
    }
    
    $scope.sum=function (cartList) {
        $scope.totalValue={'totalNum':0,totalMoney:0.00};
        for(var i=0;i<cartList.length;i++){
            var cart=cartList[i];
            for(var j=0;j<cart.orderItemList.length;j++){
                var orderItem=cart.orderItemList[j];
                $scope.totalValue.totalNum+=orderItem.num;  //累计求购物车商品数量
                $scope.totalValue.totalMoney+=orderItem.totalFee;
            }
        }
    }
    
    //修改购买商品的数量
    $scope.addGoodsToCartList=function (itemId,num) {
        cartService.addGoodsToCartList(itemId,num).success(
            function (response) {
                if(response.success){
                    //重新查询购物车明细
                    $scope.findCartList();
                }else{
                    alert(response.message);
                }
            }
        )
    }

    $scope.findAddressList=function () {
        cartService.findAddressList().success(
            function (response) {
                $scope.addressList=response;
                for(var i=0;i<$scope.addressList.length;i++){
                    if($scope.addressList[i].isDefault=='1'){
                        $scope.address=$scope.addressList[i];
                        break;
                    }
                }
            }
        )
    }

    $scope.isSelectedAddress=function (address) {
        if(address==$scope.address){
            return true;
        }else{
            return  false;
        }
    }

    $scope.order={paymentType:1};

    $scope.selectpaymentType=function (type) {
        $scope.order.paymentType=type;
    }

    $scope.submitOrder=function () {
        $scope.order.receiverAreaName=$scope.address.address;
        $scope.order.receiverMobile=$scope.address.mobile;
        $scope.order.receiver=$scope.address.contact;
        cartService.submitOrder($scope.order).success(
            function (response) {
                if(response.success){
                    if($scope.order.paymentType=='1'){
                        //跳转到扫码支付页面
                        location.href="pay.html";
                    }else{
                        location.href="paysuccess.html";  //支付成功页面
                    }
                }else{
                    alert(response.message);
                }
            }
        )
    }
    
     $scope.findAddressList=function () {
        cartService.findAddressList().success(
            function (response) {
                $scope.addressList=response;
                for(var i=0;i<$scope.addressList.length;i++){
                    if($scope.addressList[i].isDefault=='1'){
                        $scope.address=$scope.addressList[i];
                        break;
                    }
                }
            }
        )
    }
})
